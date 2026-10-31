<!-- knowledge-graph: {"id":"apps/product-service","baseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","stale":false,"staleSince":null,"verifiedBaseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","sources":[{"path":"apps/product-service/entities.generated.ts","blob":"6fc78073b12805d50e0a09661bbec0c802e6417a"},{"path":"apps/product-service/mikro-orm.config.ts","blob":"031c94b2490e3f0bbc0d0e1ca7f601235f214afc"},{"path":"apps/product-service/package.json","blob":"bfcfaa8bd88af286bd9017799b5e6333f4d9a71d"},{"path":"apps/product-service/src/app.module.ts","blob":"fc77c6134ae961bc7a61980d07a1bd1bdb386d56"},{"path":"apps/product-service/src/database/entity/category.entity.ts","blob":"811b52f8e3867af4411b63161bb8d35617f820ab"},{"path":"apps/product-service/src/database/entity/index.ts","blob":"48437a5e8ffbb88330151df5fcef6aab74446711"},{"path":"apps/product-service/src/database/entity/product.entity.ts","blob":"b7325ce48b3f4f697b318428178f3b9147a54892"},{"path":"apps/product-service/src/database/migration/.snapshot-product-service.json","blob":"274f69dbf4e7e20417215e191eb22f2af12d2000"},{"path":"apps/product-service/src/database/migration/Migration20260913160036_CreateProductAndCategoryTables.ts","blob":"adf14fe41fcac9c9567177c307044d0a28d14101"},{"path":"apps/product-service/src/database/migration/Migration20260923141733_CreateOutboxEventTable.ts","blob":"18bc2b3863ebe4da267e13c418b6e87620f4c9ee"},{"path":"apps/product-service/src/database/migration/Migration20260926192752_RenameAndUpdateOutboxTable.ts","blob":"daa8a6abdba5acd0f34e3cab554c4fd0374a069c"},{"path":"apps/product-service/src/database/migration/Migration20260926195310_DeleteProductStatusConstraint.ts","blob":"1c5734a87855cf031317b9cfc5d1e736abd54dcc"},{"path":"apps/product-service/src/database/migration/Migration20260929152443_UpdateProductTableAddShopId.ts","blob":"2f7fdc289d6fa3852e20587b36eb7c12b4a8da40"},{"path":"apps/product-service/src/database/migration/Migration20261029104530_RestoreProductStatusConstraint.ts","blob":"a3194bfe7975320834bcbef758bb6e293382c961"},{"path":"apps/product-service/src/main.ts","blob":"8cb6bf0ea24cca5ea3fd67ac4ac240b55cd39d97"},{"path":"apps/product-service/src/module/category/category.controller.ts","blob":"19deae412ad74954921c9e4f14ed3103a02403e8"},{"path":"apps/product-service/src/module/category/category.module.ts","blob":"ed65efd4d64e6bd237c33bb5d4614514f9a15e5f"},{"path":"apps/product-service/src/module/category/category.policy.ts","blob":"3168589b936640844ba515286d8932bc57a2ebbc"},{"path":"apps/product-service/src/module/category/category.service.ts","blob":"91b998394eb9b05fb457755c50df35e0b34ef16e"},{"path":"apps/product-service/src/module/product-catalog/product-catalog.controller.ts","blob":"f87aa385ea9a07e923aa202c62f835e261c66b35"},{"path":"apps/product-service/src/module/product-catalog/product-catalog.module.ts","blob":"665a3c84c38dfc3525d983ac8ca38386c0c9969f"},{"path":"apps/product-service/src/module/product-catalog/product-catalog.service.ts","blob":"ff01902248c16198d9bdc46215e878f3ff49a59f"},{"path":"apps/product-service/src/module/product/product.controller.ts","blob":"f05cfe61190612846428d9b6ec5e21c3b9904a92"},{"path":"apps/product-service/src/module/product/product.module.ts","blob":"d22feaad7c23272bb20ca47425d9b673db9a7293"},{"path":"apps/product-service/src/module/product/product.policy.ts","blob":"a931421a9cd7abea190bfa5168bd9ba9af09bc42"},{"path":"apps/product-service/src/module/product/product.service.ts","blob":"c2566c209d2ff2791e1535b2bb44ceae9bdc5cf1"},{"path":"apps/product-service/tsconfig.json","blob":"336fa50f6b5cdd66527c89de2f0289ed0323e374"}]} -->
# product-service

<!-- AUTO:start inventory -->
## Inventory

- Baseline: `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`
- Trạng thái cần rà soát: chưa phát hiện.
- Phạm vi: package.json, tsconfig.json, cấu hình ORM, entity discovery và file .ts/.tsx/.json trong src, bao gồm migration.

- `apps/product-service/entities.generated.ts`
- `apps/product-service/mikro-orm.config.ts`
- `apps/product-service/package.json`
- `apps/product-service/src/app.module.ts`
- `apps/product-service/src/database/entity/category.entity.ts`
- `apps/product-service/src/database/entity/index.ts`
- `apps/product-service/src/database/entity/product.entity.ts`
- `apps/product-service/src/database/migration/.snapshot-product-service.json`
- `apps/product-service/src/database/migration/Migration20260913160036_CreateProductAndCategoryTables.ts`
- `apps/product-service/src/database/migration/Migration20260923141733_CreateOutboxEventTable.ts`
- `apps/product-service/src/database/migration/Migration20260926192752_RenameAndUpdateOutboxTable.ts`
- `apps/product-service/src/database/migration/Migration20260926195310_DeleteProductStatusConstraint.ts`
- `apps/product-service/src/database/migration/Migration20260929152443_UpdateProductTableAddShopId.ts`
- `apps/product-service/src/database/migration/Migration20261029104530_RestoreProductStatusConstraint.ts`
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
- `apps/product-service/tsconfig.json`
<!-- AUTO:end inventory -->

## Ghi chú thủ công

- `AppModule` đăng ký module category, product và product-catalog. Nguồn: `apps/product-service/src/app.module.ts#AppModule`.
- Product CRUD dùng `ShopContext.shopId` để giới hạn phạm vi; `ProductPolicy` kiểm tra shop member. Nguồn: `apps/product-service/src/module/product/product.service.ts#ProductService`, `apps/product-service/src/module/product/product.policy.ts#ProductPolicy`.
- Catalog public chỉ tìm sản phẩm `ACTIVE`; category create/update/delete theo policy `SYSTEM_ADMIN`. Xem [[flows/identity-and-product|identity và product]]. Nguồn: `apps/product-service/src/module/product-catalog/product-catalog.service.ts#ProductCatalogService`, `apps/product-service/src/module/category/category.policy.ts#CategoryPolicy`.
- Product và category có quan hệ ORM; shop được tham chiếu bằng UUID. Nguồn: `apps/product-service/src/database/entity/product.entity.ts#ProductSchema`, `apps/product-service/src/database/entity/category.entity.ts#CategorySchema`.
