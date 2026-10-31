import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const graphRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(graphRoot, "../..");
const vaultRoot = join(graphRoot, "vault");
const startMarker = "<!-- AUTO:start inventory -->";
const endMarker = "<!-- AUTO:end inventory -->";
const metadataPattern = /^<!-- knowledge-graph: (.*) -->$/m;
const manifestPath = join(vaultRoot, "source-manifest.json");
const trackedNoteDirectories = ["services", "libs", "architecture", "flows"];

function isInventorySource(path) {
  return ["package.json", "tsconfig.json", "mikro-orm.config.ts", "entities.generated.ts"].includes(path) ||
    (path.startsWith("src/") && /\.(?:ts|tsx|json)$/.test(path));
}

function treeBlobs(commit) {
  const tree = git("ls-tree", "-r", "-z", "--full-tree", commit);
  return new Map(tree.split("\0").filter(Boolean).flatMap((entry) => {
    const match = /^\d+ blob ([0-9a-f]+)\t(.+)$/.exec(entry);
    return match ? [[match[2], match[1]]] : [];
  }));
}

function inventorySources(blobs, id) {
  return [...blobs].flatMap(([path, blob]) => {
    const prefix = `${id}/`;
    return path.startsWith(prefix) && isInventorySource(path.slice(prefix.length)) ? [{ path, blob }] : [];
  });
}

function git(...args) {
  return execFileSync("git", ["-C", repoRoot, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

function readBaseline() {
  const config = JSON.parse(readFileSync(join(graphRoot, "config.json"), "utf8"));
  if (typeof config.baselineRef !== "string" || !/^[A-Za-z0-9._/-]+$/.test(config.baselineRef)) {
    throw new Error("baselineRef không hợp lệ");
  }
  if (JSON.stringify(config.scanPaths) !== JSON.stringify(["apps", "libs"])) {
    throw new Error("Phiên bản này chỉ hỗ trợ scanPaths [apps, libs]");
  }
  const commit = git("rev-parse", "--verify", `${config.baselineRef}^{commit}`).trim();
  const blobs = treeBlobs(commit);
  const packages = new Map();
  for (const [path, blob] of blobs) {
    const match = /^((apps|libs)\/([^/]+)\/(.+))$/.exec(path);
    if (!match) continue;
    const [, , kind, name, relative] = match;
    if (!isInventorySource(relative)) continue;
    const id = `${kind}/${name}`;
    if (!packages.has(id)) packages.set(id, { id, kind, name, sources: [] });
    packages.get(id).sources.push({ path, blob });
  }
  return { ref: config.baselineRef, commit, blobs, packages: [...packages.values()].sort((a, b) => a.id.localeCompare(b.id)) };
}

function notePath(item) {
  return join(vaultRoot, item.kind === "apps" ? "services" : "libs", `${item.name}.md`);
}

function parseNote(path) {
  const content = readFileSync(path, "utf8");
  const markers = [startMarker, endMarker].map((marker) => content.split(marker).length - 1);
  const metadataMatches = [...content.matchAll(new RegExp(metadataPattern, "gm"))];
  if (markers.some((count) => count !== 1) || content.indexOf(startMarker) > content.indexOf(endMarker) || metadataMatches.length !== 1) {
    throw new Error(`Marker hoặc metadata không hợp lệ: ${path}`);
  }
  const metadata = JSON.parse(metadataMatches[0][1]);
  if (!metadata || typeof metadata.id !== "string" || !Array.isArray(metadata.sources) || typeof metadata.stale !== "boolean") {
    throw new Error(`Metadata không hợp lệ: ${path}`);
  }
  return { content, metadata };
}

function autoContent(item, baseline, metadata) {
  const files = item.sources.map(({ path }) => `- \`${path}\``).join("\n");
  return `${startMarker}\n## Inventory\n\n- Baseline: \`${baseline.ref}@${baseline.commit}\`\n- Trạng thái cần rà soát: ${metadata.stale ? `có (từ ${metadata.staleSince})` : "chưa phát hiện"}.\n- Phạm vi: package.json, tsconfig.json, cấu hình ORM, entity discovery và file .ts/.tsx/.json trong src, bao gồm migration.\n\n${files}\n${endMarker}`;
}

function renderNote(item, baseline) {
  const path = notePath(item);
  const old = existsSync(path) ? parseNote(path) : null;
  if (old && old.metadata.id !== item.id) throw new Error(`ID không khớp: ${path}`);
  const previousSources = old && old.metadata.baseline !== baseline.commit
    ? inventorySources(treeBlobs(old.metadata.baseline), item.id)
    : item.sources;
  const changed = old && JSON.stringify(previousSources) !== JSON.stringify(item.sources);
  const metadata = {
    id: item.id,
    baseline: baseline.commit,
    stale: Boolean(old?.metadata.stale || changed),
    staleSince: old?.metadata.staleSince || (changed ? baseline.commit : null),
    verifiedBaseline: old?.metadata.stale ? (old.metadata.verifiedBaseline || old.metadata.baseline) : (changed ? old.metadata.baseline : baseline.commit),
    sources: item.sources,
  };
  const metadataLine = `<!-- knowledge-graph: ${JSON.stringify(metadata)} -->`;
  const auto = autoContent(item, baseline, metadata);
  if (!old) {
    return `${metadataLine}\n# ${item.name}\n\n${auto}\n\n## Ghi chú thủ công\n\nChưa có thông tin được xác minh.\n`;
  }
  return old.content.replace(metadataPattern, () => metadataLine).replace(
    new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`),
    () => auto,
  );
}

function indexContent(baseline) {
  const links = (kind) => baseline.packages.filter((item) => item.kind === kind)
    .map((item) => `- [[${kind === "apps" ? "services" : "libs"}/${item.name}|${item.name}]]`).join("\n");
  return `# Knowledge graph my-ecm\n\n${startMarker}\n- Baseline: \`${baseline.ref}@${baseline.commit}\`\n- Inventory là danh sách tĩnh, không chứng minh hành vi runtime.\n\n## Services\n\n${links("apps")}\n\n## Thư viện\n\n${links("libs")}\n${endMarker}\n`;
}

function renderIndex(baseline) {
  const path = join(vaultRoot, "index.md");
  const fresh = indexContent(baseline);
  if (!existsSync(path)) return fresh;
  const old = readFileSync(path, "utf8");
  if (old.split(startMarker).length !== 2 || old.split(endMarker).length !== 2 || old.indexOf(startMarker) > old.indexOf(endMarker)) {
    throw new Error(`Marker không hợp lệ: ${path}`);
  }
  const replacement = fresh.slice(fresh.indexOf(startMarker), fresh.indexOf(endMarker) + endMarker.length);
  return old.replace(new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`), () => replacement);
}

function existingNotes() {
  return ["services", "libs"].flatMap((directory) => {
    const path = join(vaultRoot, directory);
    return existsSync(path) ? readdirSync(path).filter((name) => name.endsWith(".md")).map((name) => join(path, name)) : [];
  });
}

function prepare(baseline) {
  const expected = new Set(baseline.packages.map(notePath));
  const extra = existingNotes().filter((path) => !expected.has(path));
  if (extra.length) throw new Error(`Có note không còn trong inventory; cần xử lý thủ công: ${extra.join(", ")}`);
  return [
    { path: join(vaultRoot, "index.md"), content: renderIndex(baseline) },
    ...baseline.packages.map((item) => ({ path: notePath(item), content: renderNote(item, baseline) })),
  ];
}

function noteFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? noteFiles(path) : entry.isFile() && entry.name.endsWith(".md") ? [path] : [];
  });
}

function referencedSources(content, blobs) {
  const manual = content.replace(new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`), "").replace(metadataPattern, "");
  const paths = new Set();
  for (const match of manual.matchAll(/`((?:apps|libs|apisix|scripts)\/[\w./-]+\.(?:ts|tsx|json|ya?ml))(?:#[^`]*)?`/g)) {
    paths.add(match[1]);
  }
  return [...paths].sort().map((path) => ({ path, blob: blobs.get(path) ?? null }));
}

function readManifest() {
  if (!existsSync(manifestPath)) return { version: 1, notes: {} };
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (manifest.version !== 1 || !manifest.notes || Array.isArray(manifest.notes)) throw new Error("Manifest nguồn không hợp lệ");
  return manifest;
}

function checkManualSources(baseline, inventoryUpdates) {
  const manifest = readManifest();
  const notes = {};
  const stale = [];
  const missing = [];
  const planned = new Map(inventoryUpdates.filter(({ path }) => path !== join(vaultRoot, "index.md")).map(({ path, content }) => [path, content]));
  const files = [...new Set([...trackedNoteDirectories.flatMap((directory) => noteFiles(join(vaultRoot, directory))), ...planned.keys()])].sort();
  for (const path of files) {
    const id = relative(vaultRoot, path);
    const sources = referencedSources(planned.get(path) ?? readFileSync(path, "utf8"), baseline.blobs);
    const previous = manifest.notes[id];
    if (sources.some((source) => source.blob === null)) missing.push(id);
    if (previous && JSON.stringify(previous.sources) !== JSON.stringify(sources)) stale.push(id);
    notes[id] = previous ?? { baseline: baseline.commit, sources };
  }
  for (const id of Object.keys(manifest.notes)) {
    if (!(id in notes)) {
      stale.push(`${id} (note đã xóa)`);
      notes[id] = manifest.notes[id];
    }
  }
  return { content: `${JSON.stringify({ version: 1, notes }, null, 2)}\n`, stale, missing };
}

function writeAtomically(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  const temp = `${path}.${process.pid}.tmp`;
  writeFileSync(temp, content, { flag: "wx" });
  renameSync(temp, path);
}

function acknowledgeReview(noteId, expectedCommit, baseline) {
  if (expectedCommit !== baseline.commit) throw new Error("Commit baseline đã đổi; hãy kiểm tra lại trước khi xác nhận");
  const files = trackedNoteDirectories.flatMap((directory) => noteFiles(join(vaultRoot, directory)));
  const path = files.find((file) => relative(vaultRoot, file) === noteId);
  if (!path) throw new Error("Không tìm thấy note trong các thư mục được theo dõi");
  const sources = referencedSources(readFileSync(path, "utf8"), baseline.blobs);
  if (sources.some((source) => source.blob === null)) throw new Error("Note có nguồn không tồn tại tại baseline");
  const manifest = readManifest();
  manifest.notes[noteId] = { baseline: baseline.commit, sources };
  const item = baseline.packages.find((candidate) => notePath(candidate) === path);
  if (item) {
    const note = parseNote(path);
    if (note.metadata.baseline !== baseline.commit || JSON.stringify(note.metadata.sources) !== JSON.stringify(item.sources)) {
      throw new Error("Hãy sync inventory trước khi xác nhận đã rà soát");
    }
    const metadata = { ...note.metadata, stale: false, staleSince: null, verifiedBaseline: baseline.commit };
    const updated = note.content.replace(metadataPattern, () => `<!-- knowledge-graph: ${JSON.stringify(metadata)} -->`)
      .replace(new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`), () => autoContent(item, baseline, metadata));
    writeAtomically(path, updated);
  }
  writeAtomically(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Đã ghi nhận rà soát ${noteId} tại ${baseline.commit}`);
}

function main() {
  const [command, ...options] = process.argv.slice(2);
  if (command === "review") {
    if (options.length !== 2 || !options[1].startsWith("--baseline=")) throw new Error("Dùng: vault.js review <note-relative-path> --baseline=<commit>");
    acknowledgeReview(options[0], options[1].slice("--baseline=".length), readBaseline());
    return;
  }
  if (!['sync', 'check', 'status'].includes(command) || options.some((option) => option !== "--dry-run") || (command !== "sync" && options.length)) {
    throw new Error("Dùng: vault.js sync [--dry-run] | check | status | review <note> --baseline=<commit>");
  }
  const baseline = readBaseline();
  const inventoryUpdates = prepare(baseline);
  const manual = checkManualSources(baseline, inventoryUpdates);
  const updates = [...inventoryUpdates, { path: manifestPath, content: manual.content }];
  const changed = updates.filter(({ path, content }) => !existsSync(path) || readFileSync(path, "utf8") !== content);
  const stale = baseline.packages.filter((item) => {
    const path = notePath(item);
    if (!existsSync(path)) return false;
    const { metadata } = parseNote(path);
    const previous = metadata.baseline === baseline.commit ? item.sources : inventorySources(treeBlobs(metadata.baseline), item.id);
    return metadata.stale || JSON.stringify(previous) !== JSON.stringify(item.sources);
  });
  console.log(`Baseline: ${baseline.ref}@${baseline.commit}\nPackages: ${baseline.packages.length}; cần sync: ${changed.length}; stale: ${stale.length}`);
  for (const item of stale) console.log(`Stale inventory: ${item.id}`);
  for (const id of manual.stale) console.log(`Stale nguồn note: ${id}`);
  for (const id of manual.missing) console.log(`Không tìm thấy nguồn tại baseline: ${id}`);
  console.log(`Note có nguồn thay đổi: ${manual.stale.length}; note có nguồn không tìm thấy: ${manual.missing.length}`);
  if (command === "sync") {
    if (options.includes("--dry-run")) {
      for (const update of changed) console.log(`Sẽ cập nhật: ${update.path}`);
    } else {
      for (const update of changed) writeAtomically(update.path, update.content);
      console.log(`Đã cập nhật ${changed.length} file; lưu ý từng file được ghi an toàn riêng lẻ.`);
    }
  }
  if (command === "check" && (changed.length || stale.length || manual.stale.length || manual.missing.length)) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(`Knowledge graph: ${error.message}`);
  process.exitCode = 1;
}
