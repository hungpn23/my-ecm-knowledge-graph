# Các luồng identity và product đã xác minh

> Đối chiếu tĩnh với `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`. Note viết tay được theo dõi thay đổi theo các đường dẫn nguồn được dẫn. Người dùng cho biết đã kiểm thử thủ công toàn bộ luồng; note chưa ghi lại môi trường, thời điểm hoặc kết quả chi tiết của từng bước.

## Đăng ký và email

1. `POST /auth/sign-up` nhận `BaseAuth`; controller đánh dấu public. Nguồn: `apps/identity-service/src/module/auth/auth.controller.ts#AuthController.signUp`.
2. `AuthService.signUp` hash mật khẩu, tạo user role `USER` trong transaction, sau đó phát event `user.created` và gọi cấp token. Event nằm sau transaction tạo user; việc này không chứng minh giao nhận bền vững hay atomic với việc tạo user. Nguồn: `apps/identity-service/src/module/auth/auth.service.ts#AuthService.signUp`.
3. Consumer notification nhận `user.created` và gọi `sendWelcomeEmail`; email service render template `Welcome` rồi gọi mailer. Nguồn: `apps/notification-service/src/module/user/user.consumer.ts#UserConsumer.handleUserCreated`, `apps/notification-service/src/module/email/email.service.ts#EmailService.sendWelcomeEmail`.

## Xác thực và shop

- Provider dùng chung `JwtAuth.validate` kiểm tra subject là UUID rồi gọi identity qua `get.user.by-id`; consumer identity gọi RPC service để tra user. Nguồn: `libs/core/src/auth/jwt-auth.provider.ts#JwtAuth.validate`, `apps/identity-service/src/module/user/user.consumer.ts#UserConsumer.getUser`.
- Identity-service có provider `JwtAuth` riêng: sau khi kiểm tra UUID, provider này gọi trực tiếp `UserService.findOne`, không gọi RPC của chính identity. Nguồn: `apps/identity-service/src/module/auth/jwt-auth.provider.ts#JwtAuth.validate`, `apps/identity-service/src/module/auth/auth.module.ts#AuthModule`.
- `ShopPolicy.create` kiểm tra chưa là shop member; `ShopService.create` tạo shop và gán owner làm member role `OWNER` trong transaction. Nguồn: `apps/identity-service/src/module/shop/shop.policy.ts#ShopPolicy.create`, `apps/identity-service/src/module/shop/shop.service.ts#ShopService.create`.
- Address service lọc theo user hiện tại; khi tạo, đổi default, sửa hoặc xóa, service khóa user trong transaction. Địa chỉ đầu tiên thành default; khi xóa default, service chọn địa chỉ còn lại mới nhất làm thay thế nếu có. Nguồn: `apps/identity-service/src/module/address/address.service.ts#AddressService`.

## Quản lý và xem catalog

- Product controller dùng `ProductPolicy`; policy yêu cầu shop member. Product service lấy `shopId` từ `ShopContext`, áp dụng scope vào các thao tác trên product. Nguồn: `apps/product-service/src/module/product/product.controller.ts#ProductController`, `apps/product-service/src/module/product/product.policy.ts#ProductPolicy`, `apps/product-service/src/module/product/product.service.ts#ProductService`.
- Catalog có các endpoint public; service chỉ tìm product `ACTIVE`, hỗ trợ lọc và sắp xếp theo schema/query đã khai báo. Nguồn: `apps/product-service/src/module/product-catalog/product-catalog.controller.ts#ProductCatalogController`, `apps/product-service/src/module/product-catalog/product-catalog.service.ts#ProductCatalogService`.
- Quản lý category: policy yêu cầu `SYSTEM_ADMIN` cho create/update/delete; endpoint danh sách đánh dấu `@Can.Anyone()`. Không suy ra `@Can.Anyone()` tự động đồng nghĩa bỏ qua authentication; `Endpoint` tự xử lý metadata public. Nguồn: `apps/product-service/src/module/category/category.policy.ts#CategoryPolicy`, `apps/product-service/src/module/category/category.controller.ts#CategoryController`, `libs/common/src/decorator/endpoint.decorator.ts#Endpoint`.

Đường dẫn controller ở trên chưa bao gồm global prefix và URI version; identity/product bootstrap cấu hình prefix `api`, default version `1`. Nguồn: `apps/identity-service/src/main.ts#bootstrap`, `apps/product-service/src/main.ts#bootstrap`.
