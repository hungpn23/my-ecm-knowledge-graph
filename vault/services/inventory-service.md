<!-- knowledge-graph: {"id":"apps/inventory-service","baseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","stale":false,"staleSince":null,"verifiedBaseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","sources":[{"path":"apps/inventory-service/entities.generated.ts","blob":"756ea3c10acf23a0b075a94ad70030856a12e76e"},{"path":"apps/inventory-service/mikro-orm.config.ts","blob":"031c94b2490e3f0bbc0d0e1ca7f601235f214afc"},{"path":"apps/inventory-service/package.json","blob":"9ad11e1f5f7505f135d9d44d591c137ca716a12c"},{"path":"apps/inventory-service/src/app.module.ts","blob":"963577c6e467e9a08ab460fda58be84f15d7a381"},{"path":"apps/inventory-service/src/database/entity/index.ts","blob":"e79a7b758747981eae6c86679ba28ad2c47f784f"},{"path":"apps/inventory-service/src/database/entity/reservation.entity.ts","blob":"91523868084193586500321fac6cff77eec74c3d"},{"path":"apps/inventory-service/src/database/entity/stock.entity.ts","blob":"fc476ddba562d4e986714b893e30cfafb1f43cd8"},{"path":"apps/inventory-service/src/database/migration/.snapshot-inventory-service.json","blob":"3e8a26d7893672b1e2f9950561e560fa4e0efcd8"},{"path":"apps/inventory-service/src/database/migration/Migration20261025151654_CreateStockAndReservation.ts","blob":"e3697870c895f88bc9b17e44f7127bc1d7a4ac9f"},{"path":"apps/inventory-service/src/main.ts","blob":"e5ba252559201ed7b96be2575de45675ce016da7"},{"path":"apps/inventory-service/tsconfig.json","blob":"336fa50f6b5cdd66527c89de2f0289ed0323e374"}]} -->
# inventory-service

<!-- AUTO:start inventory -->
## Inventory

- Baseline: `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`
- Trạng thái cần rà soát: chưa phát hiện.
- Phạm vi: package.json, tsconfig.json, cấu hình ORM, entity discovery và file .ts/.tsx/.json trong src, bao gồm migration.

- `apps/inventory-service/entities.generated.ts`
- `apps/inventory-service/mikro-orm.config.ts`
- `apps/inventory-service/package.json`
- `apps/inventory-service/src/app.module.ts`
- `apps/inventory-service/src/database/entity/index.ts`
- `apps/inventory-service/src/database/entity/reservation.entity.ts`
- `apps/inventory-service/src/database/entity/stock.entity.ts`
- `apps/inventory-service/src/database/migration/.snapshot-inventory-service.json`
- `apps/inventory-service/src/database/migration/Migration20261025151654_CreateStockAndReservation.ts`
- `apps/inventory-service/src/main.ts`
- `apps/inventory-service/tsconfig.json`
<!-- AUTO:end inventory -->

## Ghi chú thủ công

- Có entity `Stock` và `Reservation` với quantity, stock và thời hạn giữ; các check được ghi tại [[architecture/data-model|data model]]. Nguồn: `apps/inventory-service/src/database/entity/stock.entity.ts#StockSchema`, `apps/inventory-service/src/database/entity/reservation.entity.ts#ReservationSchema`.
- App module đăng ký auth và hạ tầng chung, chưa đăng ký module inventory nghiệp vụ ở baseline này. Nguồn: `apps/inventory-service/src/app.module.ts#AppModule`.
- Schema `reserve.stock` và `get.reservation.by-checkout-id` tồn tại trong registry dùng chung; chưa xác minh consumer tương ứng. Xem [[architecture/microservice-contracts|contract microservice]]. Nguồn: `libs/core/src/microservice/microservice.rpc-schema.ts`.
