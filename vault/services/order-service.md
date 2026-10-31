<!-- knowledge-graph: {"id":"apps/order-service","baseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","stale":false,"staleSince":null,"verifiedBaseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","sources":[{"path":"apps/order-service/entities.generated.ts","blob":"f3d21d12d937bc9d36968a2062ea1b4e818712a9"},{"path":"apps/order-service/mikro-orm.config.ts","blob":"031c94b2490e3f0bbc0d0e1ca7f601235f214afc"},{"path":"apps/order-service/package.json","blob":"797f095055a891edb0bc33908fb536105f415a2e"},{"path":"apps/order-service/src/app.module.ts","blob":"963577c6e467e9a08ab460fda58be84f15d7a381"},{"path":"apps/order-service/src/database/entity/checkout.entity.ts","blob":"b1388df0c18aaddd599d0442bf56c8aef80d9739"},{"path":"apps/order-service/src/database/entity/index.ts","blob":"4ff2c6652f378309fd3907a0358615ab9e30b489"},{"path":"apps/order-service/src/database/entity/order.entity.ts","blob":"31366e6266c8a26ed63051a7f7a91cb619aad15c"},{"path":"apps/order-service/src/database/migration/.snapshot-order-service.json","blob":"6b79c1d46885fc8fd4d1c7184b1a8d8d3f1e84ab"},{"path":"apps/order-service/src/database/migration/Migration20261025151658_CreateCheckoutAndOrder.ts","blob":"06b10701c25043dc377f1dcbe0ec503ec0164121"},{"path":"apps/order-service/src/main.ts","blob":"94cacd3f67123aa39e4d28b1766a09f9be376083"},{"path":"apps/order-service/tsconfig.json","blob":"336fa50f6b5cdd66527c89de2f0289ed0323e374"}]} -->
# order-service

<!-- AUTO:start inventory -->
## Inventory

- Baseline: `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`
- Trạng thái cần rà soát: chưa phát hiện.
- Phạm vi: package.json, tsconfig.json, cấu hình ORM, entity discovery và file .ts/.tsx/.json trong src, bao gồm migration.

- `apps/order-service/entities.generated.ts`
- `apps/order-service/mikro-orm.config.ts`
- `apps/order-service/package.json`
- `apps/order-service/src/app.module.ts`
- `apps/order-service/src/database/entity/checkout.entity.ts`
- `apps/order-service/src/database/entity/index.ts`
- `apps/order-service/src/database/entity/order.entity.ts`
- `apps/order-service/src/database/migration/.snapshot-order-service.json`
- `apps/order-service/src/database/migration/Migration20261025151658_CreateCheckoutAndOrder.ts`
- `apps/order-service/src/main.ts`
- `apps/order-service/tsconfig.json`
<!-- AUTO:end inventory -->

## Ghi chú thủ công

- Có entity `Checkout` và `Order`; order tham chiếu checkout một-một. Thông tin trường và check: [[architecture/data-model|data model]]. Nguồn: `apps/order-service/src/database/entity/checkout.entity.ts#CheckoutSchema`, `apps/order-service/src/database/entity/order.entity.ts#OrderSchema`.
- App module tại baseline đăng ký auth và hạ tầng dùng chung, chưa đăng ký module checkout/order nghiệp vụ. Không suy ra có API đặt hàng end-to-end từ entity và schema. Nguồn: `apps/order-service/src/app.module.ts#AppModule`.
