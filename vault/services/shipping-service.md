<!-- knowledge-graph: {"id":"apps/shipping-service","baseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","stale":false,"staleSince":null,"verifiedBaseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","sources":[{"path":"apps/shipping-service/entities.generated.ts","blob":"46173cd8273ddf15f7c349233bcc09206ce3a2f4"},{"path":"apps/shipping-service/mikro-orm.config.ts","blob":"031c94b2490e3f0bbc0d0e1ca7f601235f214afc"},{"path":"apps/shipping-service/package.json","blob":"d8e062b4714d59b5ee18b7ac3a96bfd7dd7828d2"},{"path":"apps/shipping-service/src/app.module.ts","blob":"963577c6e467e9a08ab460fda58be84f15d7a381"},{"path":"apps/shipping-service/src/database/entity/index.ts","blob":"cb0ff5c3b541f646105198ee23ac0fc3d805023e"},{"path":"apps/shipping-service/src/main.ts","blob":"60469146ef1682f64f0fd7b00474032a72d8c1ce"},{"path":"apps/shipping-service/tsconfig.json","blob":"336fa50f6b5cdd66527c89de2f0289ed0323e374"}]} -->
# shipping-service

<!-- AUTO:start inventory -->
## Inventory

- Baseline: `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`
- Trạng thái cần rà soát: chưa phát hiện.
- Phạm vi: package.json, tsconfig.json, cấu hình ORM, entity discovery và file .ts/.tsx/.json trong src, bao gồm migration.

- `apps/shipping-service/entities.generated.ts`
- `apps/shipping-service/mikro-orm.config.ts`
- `apps/shipping-service/package.json`
- `apps/shipping-service/src/app.module.ts`
- `apps/shipping-service/src/database/entity/index.ts`
- `apps/shipping-service/src/main.ts`
- `apps/shipping-service/tsconfig.json`
<!-- AUTO:end inventory -->

## Ghi chú thủ công

- App module đăng ký cấu hình, database, logger, auth, validation và các filter dùng chung. Tại baseline chưa thấy module shipping nghiệp vụ trong `AppModule`; không có căn cứ để mô tả flow vận chuyển đã hoạt động. Nguồn: `apps/shipping-service/src/app.module.ts#AppModule`.
- Entrypoint khởi tạo HTTP và TCP; runtime chưa được kiểm chứng. Nguồn: `apps/shipping-service/src/main.ts#bootstrap`.
