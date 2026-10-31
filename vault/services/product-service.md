<!-- knowledge-graph: {"id":"apps/product-service","baseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","stale":false,"staleSince":null,"verifiedBaseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","sources":[{"path":"apps/product-service/package.json","blob":"bfcfaa8bd88af286bd9017799b5e6333f4d9a71d"},{"path":"apps/product-service/src/app.module.ts","blob":"fc77c6134ae961bc7a61980d07a1bd1bdb386d56"},{"path":"apps/product-service/src/database/entity/category.entity.ts","blob":"811b52f8e3867af4411b63161bb8d35617f820ab"},{"path":"apps/product-service/src/database/entity/index.ts","blob":"48437a5e8ffbb88330151df5fcef6aab74446711"},{"path":"apps/product-service/src/database/entity/product.entity.ts","blob":"b7325ce48b3f4f697b318428178f3b9147a54892"},{"path":"apps/product-service/src/main.ts","blob":"8cb6bf0ea24cca5ea3fd67ac4ac240b55cd39d97"},{"path":"apps/product-service/src/module/category/category.controller.ts","blob":"19deae412ad74954921c9e4f14ed3103a02403e8"},{"path":"apps/product-service/src/module/category/category.module.ts","blob":"ed65efd4d64e6bd237c33bb5d4614514f9a15e5f"},{"path":"apps/product-service/src/module/category/category.policy.ts","blob":"3168589b936640844ba515286d8932bc57a2ebbc"},{"path":"apps/product-service/src/module/category/category.service.ts","blob":"91b998394eb9b05fb457755c50df35e0b34ef16e"},{"path":"apps/product-service/src/module/product-catalog/product-catalog.controller.ts","blob":"f87aa385ea9a07e923aa202c62f835e261c66b35"},{"path":"apps/product-service/src/module/product-catalog/product-catalog.module.ts","blob":"665a3c84c38dfc3525d983ac8ca38386c0c9969f"},{"path":"apps/product-service/src/module/product-catalog/product-catalog.service.ts","blob":"ff01902248c16198d9bdc46215e878f3ff49a59f"},{"path":"apps/product-service/src/module/product/product.controller.ts","blob":"f05cfe61190612846428d9b6ec5e21c3b9904a92"},{"path":"apps/product-service/src/module/product/product.module.ts","blob":"d22feaad7c23272bb20ca47425d9b673db9a7293"},{"path":"apps/product-service/src/module/product/product.policy.ts","blob":"a931421a9cd7abea190bfa5168bd9ba9af09bc42"},{"path":"apps/product-service/src/module/product/product.service.ts","blob":"c2566c209d2ff2791e1535b2bb44ceae9bdc5cf1"}]} -->
# product-service

<!-- AUTO:start inventory -->
## Inventory

- Baseline: `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`
- Trạng thái cần rà soát: chưa phát hiện.
- Phạm vi: package.json và file TypeScript trong src, trừ migration.

- `apps/product-service/package.json`
- `apps/product-service/src/app.module.ts`
- `apps/product-service/src/database/entity/category.entity.ts`
- `apps/product-service/src/database/entity/index.ts`
- `apps/product-service/src/database/entity/product.entity.ts`
- `apps/product-service/src/main.ts`
- `apps/product-service/src/module/category/category.controller.ts`
- `apps/product-service/src/module/category/category.module.ts`
- `apps/product-service/src/module/category/category.policy.ts`
- `apps/product-service/src/module/category/category.service.ts`
- `apps/product-service/src/module/product-catalog/product-catalog.controller.ts`
- `apps/product-service/src/module/product-catalog/product-catalog.module.ts`
- `apps/product-service/src/module/product-catalog/product-catalog.service.ts`
- `apps/product-service/src/module/product/product.controller.ts`
- `apps/product-service/src/module/product/product.module.ts`
- `apps/product-service/src/module/product/product.policy.ts`
- `apps/product-service/src/module/product/product.service.ts`
<!-- AUTO:end inventory -->

## Ghi chú thủ công

- `AppModule` đăng ký module category, product và product-catalog. Nguồn: `apps/product-service/src/app.module.ts#AppModule`.
