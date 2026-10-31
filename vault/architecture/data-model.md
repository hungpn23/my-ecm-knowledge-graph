# Data model tại baseline

> Đối chiếu tĩnh với `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`. Note viết tay được theo dõi thay đổi theo các đường dẫn nguồn được dẫn; cần đối chiếu source sau khi baseline thay đổi. Các ràng buộc dưới đây là khai báo entity, chưa xác minh migration đã áp dụng vào DB.

## Identity

- `User`: email unique, password hidden/lazy, role, shop và shopRole có thể null; một user có nhiều address. Nguồn: `apps/identity-service/src/database/entity/user.entity.ts#UserSchema`.
- `Shop`: owner quan hệ one-to-one tới user; collection users ánh xạ qua `user.shop`. `ShopEntity.addMember` gán shop và shopRole. Nguồn: `apps/identity-service/src/database/entity/shop.entity.ts#ShopSchema`, `#ShopEntity.addMember`.
- `Address`: thuộc user, có recipient, phone, address và `isDefault`. Nguồn: `apps/identity-service/src/database/entity/address.entity.ts#AddressSchema`.
- `RefreshToken`: có familyId, userId, thời điểm hết hạn, usedAt và revoked. Nguồn: `apps/identity-service/src/database/entity/refresh-token.entity.ts#RefreshTokenSchema`.

## Product

- `Category` có code unique và một tập product; `Product` thuộc category, lưu shopId, giá và status. Nguồn: `apps/product-service/src/database/entity/category.entity.ts#CategorySchema`, `apps/product-service/src/database/entity/product.entity.ts#ProductSchema`.
- `Product` không có ORM relation tới Shop trong schema này; `shopId` là UUID. Không suy ra foreign key xuyên service từ tên trường. Nguồn: `apps/product-service/src/database/entity/product.entity.ts#ProductSchema`.

## Inventory và order

- `Stock`: productId unique, shopId, onHand, reserved; checks khai báo onHand ≥ 0 và 0 ≤ reserved ≤ onHand. Nguồn: `apps/inventory-service/src/database/entity/stock.entity.ts#StockSchema`.
- `Reservation`: checkoutId unique, quan hệ tới Stock, quantity > 0, status và expiresAt. Nguồn: `apps/inventory-service/src/database/entity/reservation.entity.ts#ReservationSchema`.
- `Checkout` lưu snapshot product, giá, số lượng, phí giao hàng, địa chỉ, phương thức thanh toán, status và expiresAt; khai báo check số lượng và các số tiền. Nguồn: `apps/order-service/src/database/entity/checkout.entity.ts#CheckoutSchema`.
- `Order` có quan hệ one-to-one tới checkout và status. Nguồn: `apps/order-service/src/database/entity/order.entity.ts#OrderSchema`.
- Trạng thái khai báo: reservation `HELD`, `COMMITTED`, `EXPIRED`; checkout `OPEN`, `PAYMENT_PENDING`, `ORDER_CREATED`, `EXPIRED`; order `READY_TO_SHIP`, `PROCESSED`, `SHIPPED`, `TO_CONFIRM_RECEIVE`, `COMPLETED`. Chúng là enum contract, không chứng minh có state machine hay transition tương ứng. Nguồn: `libs/contract/src/inventory/reservation.schema.ts`, `libs/contract/src/order/checkout.schema.ts`, `libs/contract/src/order/order.schema.ts`.
