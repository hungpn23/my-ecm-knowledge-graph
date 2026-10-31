# Bản đồ HTTP API

> Đối chiếu tĩnh với `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`. Note viết tay được theo dõi thay đổi theo các đường dẫn nguồn được dẫn. Đây là path trong controller; identity và product cấu hình prefix `api` và URI version mặc định `1`. Nguồn: `apps/identity-service/src/main.ts#bootstrap`, `apps/product-service/src/main.ts#bootstrap`.

## Identity

| Method | Path tương đối | Hành vi khai báo | Nguồn |
| --- | --- | --- | --- |
| POST | `/auth/sign-up` | Public; đăng ký | `apps/identity-service/src/module/auth/auth.controller.ts#AuthController.signUp` |
| POST | `/auth/token` | Public; đăng nhập | `apps/identity-service/src/module/auth/auth.controller.ts#AuthController.signIn` |
| POST | `/auth/change-password` | Đổi mật khẩu | `apps/identity-service/src/module/auth/auth.controller.ts#AuthController.changePassword` |
| POST | `/auth/token/revoke` | Public; thu hồi refresh token | `apps/identity-service/src/module/auth/auth.controller.ts#AuthController.revokeToken` |
| POST | `/auth/token/refresh` | Public; làm mới token | `apps/identity-service/src/module/auth/auth.controller.ts#AuthController.refreshToken` |
| GET | `/users/info` | Thông tin user hiện tại | `apps/identity-service/src/module/user/user.controller.ts#UserController.getInfo` |
| POST | `/shops` | Tạo shop; có `ShopPolicy.create` | `apps/identity-service/src/module/shop/shop.controller.ts#ShopController.create` |
| GET, POST | `/addresses` | Liệt kê, tạo address của user | `apps/identity-service/src/module/address/address.controller.ts#AddressController` |
| PATCH | `/addresses/:id/default` | Đặt address mặc định | `apps/identity-service/src/module/address/address.controller.ts#AddressController.setDefault` |
| PATCH, DELETE | `/addresses/:id` | Sửa, xóa address | `apps/identity-service/src/module/address/address.controller.ts#AddressController` |

## Product

| Method | Path tương đối | Hành vi khai báo | Nguồn |
| --- | --- | --- | --- |
| POST, GET | `/categories` | Tạo và liệt kê category | `apps/product-service/src/module/category/category.controller.ts#CategoryController` |
| PATCH, DELETE | `/categories/:categoryId` | Sửa và xóa category | `apps/product-service/src/module/category/category.controller.ts#CategoryController` |
| POST, GET | `/products` | Tạo và liệt kê product theo shop | `apps/product-service/src/module/product/product.controller.ts#ProductController` |
| GET, PATCH, DELETE | `/products/:productId` | Chi tiết, sửa và xóa product theo shop | `apps/product-service/src/module/product/product.controller.ts#ProductController` |
| GET | `/catalog/products` | Public; danh sách catalog | `apps/product-service/src/module/product-catalog/product-catalog.controller.ts#ProductCatalogController.find` |
| GET | `/catalog/products/:productId` | Public; chi tiết catalog | `apps/product-service/src/module/product-catalog/product-catalog.controller.ts#ProductCatalogController.findOne` |

Policy, schema đầu vào/đầu ra và scope cần xem trực tiếp tại source và [[flows/identity-and-product|các luồng identity/product]]. Không suy ra endpoint public chỉ vì có `@Can.Anyone()`; metadata public được `Endpoint` xử lý riêng. Nguồn: `libs/common/src/decorator/endpoint.decorator.ts#Endpoint`.
