<!-- knowledge-graph: {"id":"apps/payment-service","baseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","stale":false,"staleSince":null,"verifiedBaseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","sources":[{"path":"apps/payment-service/entities.generated.ts","blob":"46173cd8273ddf15f7c349233bcc09206ce3a2f4"},{"path":"apps/payment-service/mikro-orm.config.ts","blob":"031c94b2490e3f0bbc0d0e1ca7f601235f214afc"},{"path":"apps/payment-service/package.json","blob":"b41906ba8d07f605e57c419e7603047156043660"},{"path":"apps/payment-service/src/app.module.ts","blob":"963577c6e467e9a08ab460fda58be84f15d7a381"},{"path":"apps/payment-service/src/database/entity/index.ts","blob":"cb0ff5c3b541f646105198ee23ac0fc3d805023e"},{"path":"apps/payment-service/src/main.ts","blob":"11e76516892bb1a8605b106cade66eba82c0df71"},{"path":"apps/payment-service/tsconfig.json","blob":"336fa50f6b5cdd66527c89de2f0289ed0323e374"}]} -->
# payment-service

<!-- AUTO:start inventory -->
## Inventory

- Baseline: `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`
- Trạng thái cần rà soát: chưa phát hiện.
- Phạm vi: package.json, tsconfig.json, cấu hình ORM, entity discovery và file .ts/.tsx/.json trong src, bao gồm migration.

- `apps/payment-service/entities.generated.ts`
- `apps/payment-service/mikro-orm.config.ts`
- `apps/payment-service/package.json`
- `apps/payment-service/src/app.module.ts`
- `apps/payment-service/src/database/entity/index.ts`
- `apps/payment-service/src/main.ts`
- `apps/payment-service/tsconfig.json`
<!-- AUTO:end inventory -->

## Ghi chú thủ công

- App module đăng ký cấu hình, database, logger, auth, validation và các filter dùng chung. Tại baseline chưa thấy module payment nghiệp vụ trong `AppModule`; không có căn cứ để mô tả flow thanh toán đã hoạt động. Nguồn: `apps/payment-service/src/app.module.ts#AppModule`.
- Entrypoint khởi tạo HTTP và TCP; xem cấu hình trực tiếp trước khi dùng vì runtime chưa được kiểm chứng. Nguồn: `apps/payment-service/src/main.ts#bootstrap`.
