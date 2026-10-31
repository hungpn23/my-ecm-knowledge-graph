# Tổng quan my-ecm

> Đối chiếu tĩnh với `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`. Note được viết thủ công; dùng status/check để phát hiện thay đổi đối với nguồn được dẫn và xác minh lại khi làm việc trên nhánh khác.

## Các phần chính

- [[services/identity-service|Identity]] quản lý auth, user, shop và address; [[services/product-service|product]] đăng ký module category, product và catalog. Nguồn: `apps/identity-service/src/app.module.ts#AppModule`, `apps/product-service/src/app.module.ts#AppModule`.
- [[services/inventory-service|Inventory]] có entity stock và reservation; [[services/order-service|order]] có checkout và order. `AppModule` của từng service ở baseline chỉ đăng ký hạ tầng dùng chung và auth, chưa đăng ký module xử lý inventory/order. Nguồn: `apps/inventory-service/src/app.module.ts#AppModule`, `apps/order-service/src/app.module.ts#AppModule` và các entity tương ứng.
- [[services/payment-service|Payment]] và [[services/shipping-service|shipping]] có app module nền tảng; không suy ra có flow thanh toán/vận chuyển chỉ từ tên service. Nguồn: `apps/payment-service/src/app.module.ts#AppModule`, `apps/shipping-service/src/app.module.ts#AppModule`.
- [[services/notification-service|Notification]] nhận sự kiện user và gửi email; template nằm trong [[libs/email|email]]. Nguồn: `apps/notification-service/src/module/user/user.consumer.ts#UserConsumer.handleUserCreated`, `apps/notification-service/src/module/email/email.service.ts#EmailService.sendWelcomeEmail`.

## Giao tiếp và dữ liệu

- Client dùng NestJS TCP theo cấu hình `MicroserviceModule`; danh mục message và schema nằm tại [[architecture/microservice-contracts|contract microservice]]. Việc có tên trong registry không chứng minh đã có handler. Nguồn: `libs/core/src/microservice/microservice.module.ts#MicroserviceModule.registerAsync`, `libs/core/src/microservice/microservice.rpc-schema.ts`.
- Identity và product thiết lập global prefix `api`, URI version mặc định `1`, Swagger và TCP khi bootstrap. Nguồn: `apps/identity-service/src/main.ts#bootstrap`, `apps/product-service/src/main.ts#bootstrap`.
- Các ứng dụng có DB dùng `DatabaseModule` với MikroORM PostgreSQL và danh sách entity của app. Sơ đồ thực thể: [[architecture/data-model|data model]]. Nguồn: `libs/core/src/database/database.module.ts#DatabaseModule.forRoot`, `apps/order-service/src/app.module.ts#AppModule`.
- Contract ArkType và các thư viện dùng chung nằm trong `libs/*`; xem [[libs/contract|contract]], [[libs/core|core]] và [[libs/common|common]]. Nguồn: root `package.json`, `libs/contract/src/index.ts`.

## APISIX cũ

Theo xác nhận của người dùng ngày 31/10/2026, nội dung APISIX còn trong repo đã cũ và không phản ánh codebase hiện tại; không dùng các file này làm nguồn sự thật cho gateway hoặc route hiện hành. Ví dụ file tồn tại tại baseline: `apisix/apisix.json`. Chưa xác minh gateway hiện hành từ nguồn khác.

## Điều chưa chứng minh

Note chưa ghi nhận bằng chứng chi tiết về trạng thái service/DB, giao dịch thực tế, độ tin cậy gửi event, tính hoàn chỉnh của order flow hay lịch sử lý do thiết kế. Người dùng cho biết đã kiểm thử thủ công toàn bộ luồng; xem [[flows/identity-and-product|luồng identity và product]]. Không dùng inventory làm bằng chứng rằng code đã được gọi trong runtime.
