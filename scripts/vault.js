import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const graphRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(graphRoot, "../..");
const vaultRoot = join(graphRoot, "vault");
const startMarker = "<!-- AUTO:start inventory -->";
const endMarker = "<!-- AUTO:end inventory -->";
const metadataPattern = /^<!-- knowledge-graph: (.*) -->$/m;

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
  const tree = git("ls-tree", "-r", "-z", "--full-tree", commit, "--", ...config.scanPaths);
  const packages = new Map();
  for (const entry of tree.split("\0").filter(Boolean)) {
    const match = /^(\d+) blob ([0-9a-f]+)\t((apps|libs)\/([^/]+)\/(.+))$/.exec(entry);
    if (!match) continue;
    const [, , blob, path, kind, name, relative] = match;
    if (relative !== "package.json" && !(relative.startsWith("src/") && relative.endsWith(".ts") && !relative.includes("/migration/"))) continue;
    const id = `${kind}/${name}`;
    if (!packages.has(id)) packages.set(id, { id, kind, name, sources: [] });
    packages.get(id).sources.push({ path, blob });
  }
  return { ref: config.baselineRef, commit, packages: [...packages.values()].sort((a, b) => a.id.localeCompare(b.id)) };
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
  return `${startMarker}\n## Inventory\n\n- Baseline: \`${baseline.ref}@${baseline.commit}\`\n- Trạng thái cần rà soát: ${metadata.stale ? `có (từ ${metadata.staleSince})` : "chưa phát hiện"}.\n- Phạm vi: package.json và file TypeScript trong src, trừ migration.\n\n${files}\n${endMarker}`;
}

function renderNote(item, baseline) {
  const path = notePath(item);
  const old = existsSync(path) ? parseNote(path) : null;
  if (old && old.metadata.id !== item.id) throw new Error(`ID không khớp: ${path}`);
  const changed = old && JSON.stringify(old.metadata.sources) !== JSON.stringify(item.sources);
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

function writeAtomically(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  const temp = `${path}.${process.pid}.tmp`;
  writeFileSync(temp, content, { flag: "wx" });
  renameSync(temp, path);
}

function main() {
  const [command, ...options] = process.argv.slice(2);
  if (!['sync', 'check', 'status'].includes(command) || options.some((option) => option !== "--dry-run") || (command !== "sync" && options.length)) {
    throw new Error("Dùng: vault.js sync [--dry-run] | check | status");
  }
  const baseline = readBaseline();
  const updates = prepare(baseline);
  const changed = updates.filter(({ path, content }) => !existsSync(path) || readFileSync(path, "utf8") !== content);
  const stale = baseline.packages.filter((item) => {
    const path = notePath(item);
    return existsSync(path) && (parseNote(path).metadata.stale || JSON.stringify(parseNote(path).metadata.sources) !== JSON.stringify(item.sources));
  });
  console.log(`Baseline: ${baseline.ref}@${baseline.commit}\nPackages: ${baseline.packages.length}; cần sync: ${changed.length}; stale: ${stale.length}`);
  for (const item of stale) console.log(`Stale: ${item.id}`);
  if (command === "sync") {
    if (options.includes("--dry-run")) {
      for (const update of changed) console.log(`Sẽ cập nhật: ${update.path}`);
    } else {
      for (const update of changed) writeAtomically(update.path, update.content);
      console.log(`Đã cập nhật ${changed.length} file; lưu ý từng file được ghi an toàn riêng lẻ.`);
    }
  }
  if (command === "check" && (changed.length || stale.length)) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(`Knowledge graph: ${error.message}`);
  process.exitCode = 1;
}
