# Hướng dẫn đọc vault

Bắt đầu từ [[index]] và note service hoặc thư viện liên quan. Inventory được tạo từ commit của `origin/main` đã lưu trên máy, không tự fetch. Xem commit và trạng thái bằng `bun run status` ở thư mục knowledge graph.

Các link trong inventory là đường dẫn source tương đối từ gốc repo my-ecm. Đối chiếu code tại commit thích hợp; khi làm việc trên feature, đọc thêm working tree. Không suy ra các lời gọi, quan hệ hay hành vi runtime từ danh sách file.

`stale` nghĩa là tập file hoặc nội dung nguồn đã thay đổi sau mốc snapshot trước đó và cần người rà soát. `stale: false` không chứng minh nội dung đúng hay đầy đủ. Vùng AUTO được cập nhật khi sync; nội dung ngoài vùng đó được giữ nguyên. Sau khi rà soát thủ công toàn bộ nội dung một note với đúng commit hiển thị bởi status, dùng `bun run review <đường-dẫn-note-từ-vault> --baseline=<commit-đầy-đủ>` để ghi nhận; lệnh không tự kiểm chứng nội dung.

Công cụ hiện không trích xuất symbol, route, schema, flow, authorization hoặc quan hệ; không kết luận một thành phần không tồn tại chỉ vì chưa thấy trong vault. Không đưa secret, giá trị `.env` hay code dài vào note.

Nguồn được dẫn bằng đường dẫn file trong backtick ở note `services/`, `libs/`, `architecture/` và `flows/` được theo dõi riêng trong `source-manifest.json`, kể cả nguồn từ package khác. Status/check báo note có nguồn đã thay đổi hoặc bị xóa; sync không tự chấp nhận thay đổi này. Chỉ đường dẫn tĩnh theo định dạng được hỗ trợ mới được theo dõi; nguồn bị thiếu, đường dẫn động hoặc claim không dẫn nguồn vẫn có thể bị bỏ sót. Note bị xóa khỏi vault cần xử lý manifest thủ công. `stale: false` không chứng minh nội dung đúng.
