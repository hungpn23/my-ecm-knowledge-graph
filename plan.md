# Knowledge graph cho my-ecm

*Tài liệu kế hoạch; baseline khảo sát: `main` tại `e5314140df03504c10bc01fb956ae332682f312a`, ngày 31/10/2026. Đây là ảnh chụp tại thời điểm khảo sát, không phải khẳng định về các commit sau đó.*

## 1. Mục tiêu và phạm vi

Xây dựng một vault Markdown có thể mở bằng Obsidian để hỗ trợ agent và người dùng tìm hiểu kiến trúc, contract, luồng nghiệp vụ và nguồn chứng cứ của my-ecm. Code tại baseline là nguồn đối chiếu chính; note là bản đồ có thể lỗi thời, không thay thế việc đọc code khi thực hiện hoặc review thay đổi.

MVP ưu tiên bản đồ nhỏ có nguồn, phát hiện thay đổi và khả năng tra cứu. Chỉ tự động trích xuất thông tin đã chứng minh được độ chính xác đối với cấu trúc thực tế của dự án. Thông tin không phân giải được phải thể hiện là chưa biết, không suy đoán thành sự thật. Flow xuyên service, lý do thiết kế, radar tích hợp và tự động làm giàu bằng LLM là các pha sau, không phải điều kiện để MVP hoàn thành.

Phạm vi cá nhân: toàn bộ dữ liệu và công cụ knowledge graph nằm trong `.workspace/knowledge-graph/`; file hướng dẫn cục bộ `AGENTS.local.md` nằm ở gốc repo. Không sửa code ứng dụng, root `package.json`, lockfile hay `.gitignore` dùng chung để triển khai kế hoạch này. Không tự commit, push, tạo branch hay thay đổi lịch sử Git; chỉ làm khi người dùng yêu cầu.

## 2. Những gì đã đối chiếu với baseline

| Nội dung | Kết quả tại commit khảo sát | Nguồn tiêu biểu |
| --- | --- | --- |
| Monorepo | Bun workspaces với `apps/*`, `libs/*`; root script `check:types` | `package.json` |
| Service | `identity-service`, `inventory-service`, `notification-service`, `order-service`, `payment-service`, `product-service`, `shipping-service`; sự hiện diện của service không chứng minh chức năng đã hoàn tất | `apps/` |
| ORM | MikroORM, driver PostgreSQL; entity sử dụng `defineEntity` và property builder, không chỉ decorator | `apps/identity-service/src/database/entity/address.entity.ts`, `libs/core/src/database/database.module.ts` |
| HTTP contract | Có decorator dự án `@Endpoint` bao bọc route NestJS, khai báo request/response bằng schema; không thể chỉ tìm `@Get`/`@Post` | `libs/common/src/decorator/endpoint.decorator.ts`, `apps/identity-service/src/module/address/address.controller.ts` |
| RPC/event | Các entrypoint service cấu hình `Transport.TCP`; có `@MessagePattern`, `@EventPattern` và client wrapper | `apps/identity-service/src/main.ts`, `apps/identity-service/src/module/user/user.consumer.ts`, `apps/notification-service/src/module/user/user.consumer.ts` |
| Schema | ArkType được dùng trong `libs/contract`, bao gồm các schema HTTP và RPC | `libs/contract/src/identity/`, `libs/contract/src/inventory/` |
| Kafka | Code Kafka vẫn hiện diện nhưng `KafkaModule` đánh dấu pipeline Kafka/outbox/Debezium deprecated. Không suy ra nó đang hoạt động từ sự tồn tại của code | `libs/core/src/kafka/kafka.module.ts` |
| Hook | Repo có Husky; cấu hình Git cục bộ lúc khảo sát có `core.hooksPath=.husky/_` | `.husky/`, cấu hình Git cục bộ |
| Observability | Các app module import `@nestjs/observe`; chưa xác minh traces runtime hay khả năng dùng chúng để chứng minh flow | `apps/identity-service/src/app.module.ts` |

Tại thời điểm khảo sát, `main` và ref cục bộ `origin/main` cùng trỏ tới commit trên. Chưa fetch để kiểm tra remote thực tế. Không giả định chức năng order flow end-to-end đã hoàn thành chỉ vì có entity hoặc service.

## 3. Bố cục và cách ly

```text
<repo>/
  AGENTS.local.md                 # hướng dẫn cá nhân, ngoài vault
  .workspace/                     # được repo cha ignore theo cấu hình cục bộ hiện tại
    knowledge-graph/              # Git repository riêng; gốc chứa plan này
      plan.md
      config.yml
      vault/                      # mở thư mục này bằng Obsidian nếu muốn
        _README.md
        index.md
        services/ modules/ contracts/ entities/ libs/
        flows/ adr/ gotchas/ glossary/ conventions/
        work/ inbox/
        .state/                   # dữ liệu sinh lại được
      scripts/                    # công cụ và mã nguồn của knowledge graph
```

Các thư mục được tạo theo nhu cầu, không cần tạo note rỗng để lấp đầy cấu trúc. Git riêng theo dõi `plan.md`, note, cấu hình, mã nguồn script và các template cần thiết; ignore dependency, cache, worktree tạm và dữ liệu có thể sinh lại như `vault/.state/`. Một file graph phục vụ tra cứu có thể sinh lại trong `.state/`; không coi nó là nguồn dữ liệu duy nhất. Git riêng và backup là hai việc khác nhau: remote private hoặc bản sao ngoài repo là tùy chọn do người dùng quản lý.

Tại thời điểm khảo sát, `.workspace` được ignore bởi thay đổi **chưa commit** trong `.gitignore` của repo cha; trên `main` chưa có quy tắc đó. Không tự sửa hoặc commit thay đổi này. Khi triển khai, kiểm tra `git check-ignore -v .workspace/knowledge-graph/plan.md` và `git ls-files -- .workspace` trong repo cha: ignore chỉ áp dụng cho file chưa được Git cha theo dõi. Nếu quy tắc không còn hiệu lực, báo rõ và chọn cách ignore cục bộ phù hợp; không mặc định repo cha sạch.

Thêm `/AGENTS.local.md` vào `.git/info/exclude` của repo cha khi triển khai để file gốc repo không xuất hiện như file chưa theo dõi; kiểm tra file đó chưa được track trước. `info/exclude` là cấu hình cục bộ, không được chia sẻ qua commit và ignore không bảo vệ file khỏi lệnh dọn dẹp có xóa file ignored. Cả `.workspace/` và Git repository riêng trong đó đều có thể bị xóa bởi lệnh dọn dẹp như `git clean -fdx`; cần backup trước khi dùng các lệnh như vậy.

Việc tạo Git repository riêng chỉ là bước trong kế hoạch này, không ngụ ý tạo commit hoặc remote. Các lệnh Git phải chỉ rõ repo làm việc để tránh thao tác nhầm repo cha và repo con.

## 4. Baseline và quy tắc đọc nguồn

Cấu hình nguồn tham chiếu duy nhất, ví dụ:

```yaml
baseline_ref: origin/main
scan_paths:
  - apps
  - libs
```

- `origin/main` là **ref cục bộ theo dõi remote**, không bảo đảm mới nhất. Sync không tự fetch; hiển thị tên ref và commit đang dùng. Muốn cập nhật ref, người dùng hoặc agent chủ động thực hiện fetch khi phù hợp.
- Resolve ref thành một commit bất biến **một lần ở đầu mỗi lần chạy**; mọi thao tác đọc source, hash và diff trong lần đó dùng cùng commit. Nếu ref không tồn tại hoặc không đọc được, dừng và báo lỗi; không âm thầm dùng working tree hay một nhánh khác.
- Đọc nội dung tại commit bằng Git hoặc snapshot tạm tách biệt; không dùng code chưa commit làm baseline. Nếu cần worktree tạm, đặt trong `.workspace/knowledge-graph/`, quản lý vòng đời rõ ràng và không mặc định nó là bất biến hay để lại metadata Git sau khi dọn.
- Mỗi kết quả ghi rõ `baseline_ref`, `baseline_commit` và thời điểm chạy; đây là mốc kiểm chứng, không phải bảo đảm nội dung đúng mãi mãi. Nếu ref đổi lịch sử, so sánh commit thực tế và xử lý diff; hash của một commit vẫn xác định nội dung của commit đó.
- Vault baseline không mô tả code feature chưa merge. Khi làm việc trên feature, đọc code của nhánh/working tree tương ứng; có thể dùng note như bản đồ, nhưng kiểm tra nguồn trực tiếp khi cần.

## 5. Mô hình note và chứng cứ

Bắt đầu với `index`, service, module, contract, entity và thư viện quan trọng. Thêm flow, ADR, gotcha hoặc glossary khi có chứng cứ và nhu cầu thực tế. Một note biểu diễn một khái niệm có ích, không bắt buộc một class một note hoặc một kích thước cố định.

Ví dụ frontmatter:

```yaml
---
type: contract
id: identity.address.create
sources:
  - path: apps/identity-service/src/module/address/address.controller.ts
    symbol: AddressController.create
    blob: <git-blob-id>
baseline_commit: <commit-id>
verified_at: <date>
provenance: human       # auto | human | llm | session | inferred
status: active          # active | unresolved | orphan | deprecated
stale: false
stale_since: null
---
```

ID phải ổn định và duy nhất trong vault; tên ví dụ không phải dữ liệu đã sinh. Source path và symbol phải được xác minh tại commit tương ứng; Git blob xác định nội dung file, không chứng minh symbol hay ý nghĩa của note vẫn đúng. Một claim có thể cần nhiều nguồn, bao gồm registry, schema và caller. Lý do thiết kế chưa có chứng cứ phải ghi rõ chưa biết; không suy luận từ code thành quyết định lịch sử.

Phần script quản lý có marker `<!-- AUTO:start <name> -->` và `<!-- AUTO:end <name> -->`. Nội dung ngoài marker là do người/agent quản lý và không bị script ghi đè. Cần quy định ranh giới metadata do script quản lý trước khi hiện thực; marker thiếu, trùng hoặc hỏng phải gây lỗi an toàn, không ghi lại file. Quan hệ có hướng và có nguồn, ví dụ `calls`, `emits`, `consumes`, `owns`, `depends_on`; chỉ sinh cạnh và cạnh ngược khi có đủ chứng cứ, không mặc định mọi injection là lời gọi runtime. Lưu trạng thái `unresolved` cho quan hệ chưa xác định.

Không lưu giá trị secret, token, nội dung `.env` thực tế hoặc đoạn code dài. Nếu cần ghi cấu hình, chỉ ghi tên và nguồn đã kiểm tra an toàn. Tài liệu và log/đầu ra công cụ phải tuân thủ cùng nguyên tắc.

## 6. Phát hiện thay đổi và độ tin cậy

Một lần kiểm tra so sánh blob của từng source được lưu với blob tại commit baseline vừa resolve. Source bị đổi, xóa, đổi tên hoặc không xác định được cần được báo riêng; không tự gắn orphan chỉ vì một trong nhiều source đã mất. Kiểm tra symbol chỉ được khẳng định nếu bộ phân tích hỗ trợ trường hợp đó. Những nguồn phụ thuộc chưa được liệt kê là giới hạn của kết quả.

Khi source thay đổi:

1. Đánh dấu các phần hoặc note chịu ảnh hưởng là cần xác minh, lưu commit/thời điểm phát hiện đầu tiên và lý do.
2. Có thể cập nhật phần AUTO đã được hỗ trợ và kiểm chứng; giữ nguyên phần thủ công và không tự xóa cờ stale chỉ vì tái sinh AUTO thành công.
3. Xác minh nội dung diễn giải và quan hệ liên quan theo source mới; chỉ xóa stale sau khi việc xác minh được ghi nhận. Không cập nhật hash theo cách che mất phần chưa được xác minh: lưu riêng mốc đã kiểm chứng của nội dung và mốc trích xuất mới, hoặc trạng thái tương đương minh bạch.
4. Chỉ đánh dấu `orphan` sau khi xác nhận đối tượng thực sự không còn tại baseline; trường hợp chưa phân giải được thì dùng `unresolved`.

Note không stale chỉ có nghĩa là **không phát hiện thay đổi theo phạm vi nguồn và bộ kiểm tra đã khai báo**, không bảo đảm đúng hoặc đầy đủ. Note stale là giả thuyết cần đối chiếu code. Lint kiểm tra định dạng, ID trùng, link gãy, marker và nguồn; phát hiện lỗi không đồng nghĩa với chứng minh tính đúng đắn nghiệp vụ.

## 7. MVP: trích xuất và lệnh

Công cụ là đề xuất TypeScript/ts-morph; trước khi chọn chính thức cần xác minh khả năng xử lý module resolution và cấu hình TypeScript của repo tại baseline. Dependency của công cụ được quản lý trong `.workspace/knowledge-graph/`, không sửa dependency hay lockfile root. Khi verify/test dự án Bun/Node monorepo, tuân thủ lệnh có sẵn trong root `package.json`, bao gồm `bun check:types`; không `cd` vào app để bypass root script. Không tự tạo test file hay test case nếu người dùng không yêu cầu. Việc kiểm tra công cụ độc lập trong knowledge graph phải được mô tả rõ trong pha triển khai và không giả làm kiểm tra monorepo.

Bắt đầu bằng inventory của `apps/`, `libs/`, module và source, sau đó bổ sung các extractor đã kiểm chứng:

- HTTP: `@Controller`, route NestJS trực tiếp và `@Endpoint(method, params)` của dự án; xem cả path cấp controller, method, schema và decorator có liên quan. Không suy ra đầy đủ guard/authorization chỉ từ một decorator.
- RPC/event: pattern tĩnh của `@MessagePattern`/`@EventPattern`, registry và client wrapper của dự án; nối caller/consumer chỉ khi phân giải được transport, pattern và đích. Pattern động hoặc mơ hồ được báo `unresolved`.
- Entity: MikroORM `defineEntity`, property builder và quan hệ có thể xác định; kiểm tra entity discovery và source sở hữu thay vì chỉ đếm decorator. Không mặc định mỗi entity thuộc riêng một database mà chưa kiểm chứng cấu hình.
- Contract: schema ArkType, import/export và các khai báo HTTP/RPC. Giữ phân biệt input/output, schema và type; không tự đoán payload dựa trên tên DTO hoặc return type.
- Infra và observability: nếu đưa vào MVP, chỉ lập danh sách nguồn và tên cấu hình đã xác minh; không khẳng định runtime từ dependency hoặc file cấu hình đơn lẻ.

Mỗi extractor công bố phạm vi, giới hạn, số kết quả, mục chưa phân giải và provenance. Completeness chỉ áp dụng trong phạm vi cú pháp đã được hỗ trợ; không hứa tìm mọi endpoint bằng grep hay tự dựng toàn bộ call graph. Đối chiếu thủ công mẫu đại diện với code tại cùng commit trước khi nhận một extractor vào MVP.

Các lệnh dự kiến, tên và giao diện chốt khi hiện thực:

| Lệnh | Trách nhiệm |
| --- | --- |
| `vault-sync` | Resolve ref, đọc snapshot baseline, cập nhật các vùng AUTO được hỗ trợ, đánh dấu stale, tạo inventory và trạng thái. Không tự fetch. |
| `vault-check` | Chỉ đọc: kiểm tra schema, marker, nguồn, link, stale và completeness trong phạm vi hỗ trợ; phân biệt lỗi công cụ, dữ liệu không hợp lệ và cảnh báo chưa phân giải. |
| `vault-status` | Hiển thị ref, commit, thời điểm kiểm tra, số note stale/unresolved và giới hạn dữ liệu. |

`--dry-run` cho các lệnh ghi phải trình bày dự kiến thay đổi mà không ghi file. Sync idempotent khi cùng commit và cùng dữ liệu đầu vào; cập nhật an toàn nếu có lỗi giữa chừng. Nếu không thể bảo đảm điều kiện này, không ghi đè dữ liệu và báo rõ. Exit code và chính sách cảnh báo cần được đặc tả khi hiện thực; stale/unresolved không được âm thầm biến mất.

## 8. Quy trình sử dụng cho agent

`vault/_README.md` hướng dẫn chọn lọc thông tin theo tác vụ: bắt đầu từ `index.md` hoặc note liên quan, theo link khi có ích, đọc source tại commit phù hợp trước khi dựa vào chi tiết. Khi sửa hoặc review code, đối chiếu với code thực tế trên nhánh đang làm; note baseline có thể khác với feature. Không bắt buộc chạy status hay thông báo vault ở đầu mọi session.

`AGENTS.local.md` ở gốc repo trỏ đến hướng dẫn này. Không mặc định mọi agent hoặc công cụ tự đọc tên file đó: kiểm chứng hành vi của công cụ đang dùng và, nếu cần, cung cấp đường dẫn trong context theo cơ chế hỗ trợ của công cụ. Nội dung file cục bộ không được ghi đè hướng dẫn repo hay yêu cầu của người dùng.

Ý tưởng phát hiện trong session có thể ghi vào `inbox/` với ngày, provenance, nguồn và trạng thái chưa xác minh; không quảng bá code feature chưa merge thành sự thật của baseline. Việc chuyển ghi chú thành note chính cần được xác minh. Không bịa lý do thiết kế; hỏi người dùng khi quyết định đó thực sự cần thiết và không thể xác minh bằng nguồn sẵn có.

## 9. Các pha triển khai và nghiệm thu

**Pha 0 — Thiết lập cách ly**

- Kiểm tra trạng thái Git repo cha, quy tắc ignore `.workspace/`, tình trạng `AGENTS.local.md` và ref `origin/main`; bảo toàn thay đổi sẵn có.
- Khởi tạo Git riêng trong `.workspace/knowledge-graph/`, cấu hình ignore cho dữ liệu sinh lại, thêm `/AGENTS.local.md` vào exclude cục bộ nếu chưa có; không tạo commit, remote hoặc sửa hook.
- Viết config và hướng dẫn tối thiểu. Xác minh Git cha không liệt kê các file cá nhân mới; không yêu cầu repo cha sạch nếu đã có thay đổi của người dùng từ trước.

**Pha 1 — Inventory và note có nguồn**

- Sinh inventory service/module/file từ snapshot của commit đã resolve; tạo `index.md` và một tập note đại diện có nguồn.
- Chứng minh đọc đúng baseline khi working tree có thay đổi; báo phần chưa phân giải. Không chỉnh source ứng dụng để thử nghiệm.
- Nghiệm thu bằng đối chiếu mẫu với code tại cùng commit, kiểm tra ID, nguồn, marker và việc bảo toàn phần thủ công.

**Pha 2 — Extractor và stale**

- Bổ sung từng extractor có phạm vi rõ ràng cho `@Endpoint`, RPC/event, `defineEntity`, ArkType khi khả thi; kiểm chứng trên trường hợp đại diện trước khi bật mặc định.
- Thêm sync/check/status, so sánh blob và lưu trạng thái stale theo mục 6. Kiểm chứng file đổi, file bị xóa, marker lỗi, note nhiều source và nội dung thủ công được bảo toàn bằng fixture hoặc dữ liệu tạm thích hợp; không tự bổ sung test file/case khi chưa được yêu cầu.
- Nghiệm thu: chạy lại cùng đầu vào không tạo thay đổi ngoài ý muốn; dry-run không ghi; báo chính xác giới hạn của completeness và các mục unresolved. Không bắt buộc sửa baseline hay tạo branch thử nghiệm.

**Pha 3 — Làm giàu có kiểm chứng**

- Bổ sung mô tả và một số flow thật sự có thể chứng minh; mỗi claim có nguồn tương ứng, các khoảng trống được nêu rõ. ADR chỉ được tạo từ chứng cứ về quyết định, không suy diễn lý do.
- Nghiệm thu bằng đối chiếu mẫu với source tại commit và rà soát của người dùng khi cần. Traces hoặc e2e chỉ được dùng nếu xác minh được chúng tồn tại, phù hợp và có thể truy cập.

**Pha 4 — Tính năng tùy chọn sau MVP**

- Cân nhắc overlay `work/`, radar ảnh hưởng, `vault-impact`, `vault-refresh`, đồ thị có hướng và automation sau khi chứng minh chất lượng dữ liệu nền. Một radar chỉ là tín hiệu tham khảo: thay đổi gián tiếp, file chưa track, rename, dependency động và nguồn thiếu có thể làm bỏ sót rủi ro.
- Không cài hook Git mặc định. Nếu sau này cần tự động hóa, thiết kế phù hợp Husky/core.hooksPath đang dùng và xin phép trước khi thay đổi cấu hình hoặc hook cá nhân.

## 10. Tiêu chí hoàn thành MVP

1. Repo Git riêng hoạt động trong `.workspace/knowledge-graph/`; repo cha không theo dõi dữ liệu cá nhân mới; các thay đổi có sẵn của người dùng được giữ nguyên.
2. Mỗi lần sync/status chỉ rõ commit `origin/main` cục bộ đã dùng; không fetch ngầm, không trộn working tree vào baseline.
3. Note đại diện có ID và nguồn có thể kiểm tra; extractor công bố giới hạn và báo `unresolved` thay vì bịa. Nội dung được trích xuất được đối chiếu với code cùng commit.
4. Source thay đổi được phát hiện trong phạm vi đã khai báo; phần thủ công được bảo toàn và không tự xóa stale khi chưa xác minh.
5. Hướng dẫn đọc, phạm vi tin cậy, cách phục hồi/backup và việc `AGENTS.local.md` có thể không được tự đọc đều rõ ràng. Không ghi secret vào vault.

## 11. Giới hạn và việc cần xác minh khi triển khai

- Quy tắc `.workspace` hiện dựa trên thay đổi `.gitignore` chưa commit; nếu hoàn tác thay đổi này thì phải thiết lập ignore phù hợp trước khi tạo dữ liệu.
- Không có bằng chứng trong đợt khảo sát rằng mọi flow, contract hoặc quan hệ được phân tích tĩnh đầy đủ. Không hứa hoàn thiện đồ thị hay thời gian sync trong vài giây khi chưa đo.
- Cần xác minh cách công cụ cụ thể nạp `AGENTS.local.md`, khả năng phân giải TypeScript của extractor, phạm vi source phụ thuộc và các script kiểm tra phù hợp trước khi hiện thực.
- Không yêu cầu người dùng xác nhận lại các dữ kiện có thể tự kiểm tra từ repo. Nếu quyết định thiết kế mới vượt khỏi các lựa chọn trong kế hoạch, làm rõ trước khi triển khai phần phụ thuộc.
