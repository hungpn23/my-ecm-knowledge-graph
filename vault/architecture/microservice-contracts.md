# Contract microservice

> Đối chiếu tĩnh với `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`. Note viết tay được theo dõi thay đổi theo các đường dẫn nguồn được dẫn. Registry và schema không chứng minh có handler hoặc bảo đảm RPC đã chạy.

## Cách kết nối

`MicroserviceModule.registerAsync` đăng ký client identity, notification, product hoặc inventory qua TCP theo cấu hình tương ứng. `AbstractMicroserviceClient.send` validate payload, đặt timeout mặc định 3 giây, chuyển lỗi phù hợp `RpcError` sang HTTP exception, rồi validate response; `emit` validate payload event. Nguồn: `libs/core/src/microservice/microservice.module.ts#MicroserviceModule.registerAsync`, `libs/core/src/microservice/client/microservice.client.ts#AbstractMicroserviceClient`.

| Pattern | Schema đăng ký | Handler đã xác minh ở baseline |
| --- | --- | --- |
| `get.user.by-id` | `GetUserByIdPayload` → `UserRpc` | `UserConsumer.getUser` trong identity; service trả `User` hoặc `null`. |
| `get.products.by-ids` | `GetProductsByIds` → `ProductsRpc` | Chưa thấy consumer tương ứng trong `apps/*/src` ở baseline khảo sát. |
| `reserve.stock` | `ReserveStock` → `StockReservation` | Chưa thấy consumer tương ứng trong `apps/*/src` ở baseline khảo sát. |
| `get.reservation.by-checkout-id` | `GetReservationByCheckoutId` → `NullableStockReservation` | Chưa thấy consumer tương ứng trong `apps/*/src` ở baseline khảo sát. |
| `user.created` | `UserCreatedPayload` | `UserConsumer.handleUserCreated` trong notification. |

Nguồn registry và ánh xạ: `libs/core/src/microservice/microservice.rpc-schema.ts`, `libs/core/src/microservice/payload-by-command.ts`, `libs/core/src/microservice/response-by-command.ts`, `libs/core/src/microservice/payload-by-event.ts`. Nguồn handler: `apps/identity-service/src/module/user/user.consumer.ts#UserConsumer.getUser`, `apps/notification-service/src/module/user/user.consumer.ts#UserConsumer.handleUserCreated`. Kết luận chưa thấy handler dựa trên khảo sát decorator consumer trong `apps/*/src`; không chứng minh không có đường xử lý động khác.

`GetProductsByIds` và `ProductsRpc` khai báo mảng 1–100 phần tử; không suy ra được ứng xử khi không tìm thấy sản phẩm từ registry. `ReserveStock` yêu cầu checkoutId, productId, shopId và số lượng nguyên dương. Nguồn: `libs/contract/src/product/product.rpc-schema.ts`, `libs/contract/src/inventory/stock.rpc-schema.ts`.

Kafka/outbox/Debezium còn code nhưng `KafkaModule` được đánh dấu deprecated; không coi đó là pipeline hoạt động chỉ vì code tồn tại. Nguồn: `libs/core/src/kafka/kafka.module.ts#KafkaModule`.
