# Hướng dẫn đọc vault

Bắt đầu từ [[index]] và note service hoặc thư viện liên quan. Inventory được tạo từ commit của `origin/main` đã lưu trên máy, không tự fetch. Xem commit và trạng thái bằng `bun run status` ở thư mục knowledge graph.

Các link trong inventory là đường dẫn source tương đối từ gốc repo my-ecm. Đối chiếu code tại commit thích hợp; khi làm việc trên feature, đọc thêm working tree. Không suy ra các lời gọi, quan hệ hay hành vi runtime từ danh sách file.

`stale` nghĩa là tập file hoặc nội dung nguồn đã thay đổi sau mốc snapshot trước đó và cần người rà soát. `stale: false` không chứng minh nội dung đúng hay đầy đủ. Vùng AUTO được cập nhật khi sync; nội dung ngoài vùng đó được giữ nguyên. Chưa có lệnh xác nhận hết stale tự động: rà soát thủ công và xử lý theo kế hoạch trước khi dùng thông tin ngoài inventory.

Công cụ hiện không trích xuất symbol, route, schema, flow, authorization hoặc quan hệ; không kết luận một thành phần không tồn tại chỉ vì chưa thấy trong vault. Không đưa secret, giá trị `.env` hay code dài vào note.
