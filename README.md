# my-ecm knowledge graph

Vault Markdown cho my-ecm. Xem [hướng dẫn sử dụng](vault/_README.md) và [kế hoạch](plan.md).

Từ thư mục này, chạy `bun run sync`, `bun run check` hoặc `bun run status`. `bun run sync --dry-run` chỉ xem các thay đổi dự kiến. Công cụ chỉ đọc Git của repo cha tại ref cấu hình, không fetch và không đọc nội dung working tree làm baseline.

Repository này cần nằm tại `.workspace/knowledge-graph` trong checkout my-ecm. Inventory lập danh sách package, cấu hình và file `.ts`, `.tsx`, `.json` trong `src` (bao gồm migration); công cụ theo dõi các đường dẫn nguồn tĩnh được dẫn trong note nhưng không phân tích contract, call graph hay luồng runtime. Không đưa secret hoặc giá trị môi trường vào vault.
