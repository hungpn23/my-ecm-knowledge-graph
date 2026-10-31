<!-- knowledge-graph: {"id":"libs/contract","baseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","stale":false,"staleSince":null,"verifiedBaseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","sources":[{"path":"libs/contract/package.json","blob":"beceb7ebc039e89a98920a1a3671f13ac00c7d93"},{"path":"libs/contract/src/arktype-global.ts","blob":"dc900194af5d4d9e40734976837451bae2e5089d"},{"path":"libs/contract/src/email/send-welcome.schema.ts","blob":"84c73579d0e590bd576ebcabaa3ee44920da2ef1"},{"path":"libs/contract/src/events/kafka-message.schema.ts","blob":"a2f40aeeacad23604a2cd297adb612456389c1dc"},{"path":"libs/contract/src/events/topic/index.ts","blob":"b8c23d125950407adb7d77acb23688d9612dcfa7"},{"path":"libs/contract/src/events/topic/kafka-topic.schema.ts","blob":"eafd778c5710233029e369017877f0d4ca5f308b"},{"path":"libs/contract/src/events/topic/user-topic.schema.ts","blob":"8ea0a25e24719802f516bc486f25f0851e5e6afb"},{"path":"libs/contract/src/events/user-message.schema.ts","blob":"c328060024363261645e7a7239432b6362f7a031"},{"path":"libs/contract/src/identity/address.schema.ts","blob":"6126f89f4bd9beef5d5f2a218c384b98d0e885af"},{"path":"libs/contract/src/identity/auth.schema.ts","blob":"59816b6d2b6446c5f9e88d8ca1798da27af664a0"},{"path":"libs/contract/src/identity/shop.schema.ts","blob":"bb06237dc7e80ba5f7ec6e6aff91dc73ddbcfa81"},{"path":"libs/contract/src/identity/user.rpc-schema.ts","blob":"242254f9b4fecc0f271196b8beb66e3780f9ae0b"},{"path":"libs/contract/src/identity/user.schema.ts","blob":"50bb284afa3832286f39b93841d347247aaeb457"},{"path":"libs/contract/src/index.ts","blob":"f40adf832812df039cf48a808438f71dce8b20a0"},{"path":"libs/contract/src/inventory/reservation.schema.ts","blob":"7411bf96480c46aa2ee04eefa7abafef0c314ba3"},{"path":"libs/contract/src/inventory/stock.rpc-schema.ts","blob":"2430c5d1fedd7cd133589f516ac04a73c95c6a24"},{"path":"libs/contract/src/microservice/error.rpc-schema.ts","blob":"e4a21101512128ae88a7c5665cc3938c839d4017"},{"path":"libs/contract/src/microservice/event-payload.rpc-schema.ts","blob":"729d0f3d506cd19e510c36da02d65a8824e5a5d7"},{"path":"libs/contract/src/order/checkout.schema.ts","blob":"fc50ffba809baa9c2c2fc3b6adb685546accc70d"},{"path":"libs/contract/src/order/order.schema.ts","blob":"db8cab33025afedfbf5ed30a4a60fd6b4cad3d8a"},{"path":"libs/contract/src/product/category.schema.ts","blob":"ffa5a682e139cbc886573a5b5a265186d1bad54d"},{"path":"libs/contract/src/product/product-catalog.schema.ts","blob":"cb0f4d569a83d0913897b84636fd284c2a2f1bd4"},{"path":"libs/contract/src/product/product.rpc-schema.ts","blob":"78515f0e760aa3fa5d924e35b17f247fd2f908a7"},{"path":"libs/contract/src/product/product.schema.ts","blob":"c489a90c8f131f6e7a8bff6fa5ae0f7dddc2d86d"},{"path":"libs/contract/src/shared/common.constant.ts","blob":"9248260f88706a32a5eda3507e5e59b544409050"},{"path":"libs/contract/src/shared/common.schema.ts","blob":"82f6cead46cf5052184142c13f50bdb3a78bc460"},{"path":"libs/contract/src/shared/date.schema.ts","blob":"247d040d3e4aae5889c4bec148e8a9d561643f35"},{"path":"libs/contract/src/shared/entity-response.rpc-schema.ts","blob":"a0ec8ee2ed11bf2307fce0744b9e296e360b4722"},{"path":"libs/contract/src/shared/entity-response.schema.ts","blob":"14e039065a150a716309816377e40ef1c74331c2"},{"path":"libs/contract/src/shared/number.schema.ts","blob":"15be1d40edba7d06bb5cd95b7d0f3d803ea8e877"},{"path":"libs/contract/src/shared/string.schema.ts","blob":"6d6f082ff94a15ee48c73b294acda8911368d4cf"},{"path":"libs/contract/src/shared/success-response.schema.ts","blob":"2e1fb35c3a0e6f14113c8604a0d093a9858ba1b0"},{"path":"libs/contract/tsconfig.json","blob":"336fa50f6b5cdd66527c89de2f0289ed0323e374"}]} -->
# contract

<!-- AUTO:start inventory -->
## Inventory

- Baseline: `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`
- Trạng thái cần rà soát: chưa phát hiện.
- Phạm vi: package.json, tsconfig.json, cấu hình ORM, entity discovery và file .ts/.tsx/.json trong src, bao gồm migration.

- `libs/contract/package.json`
- `libs/contract/src/arktype-global.ts`
- `libs/contract/src/email/send-welcome.schema.ts`
- `libs/contract/src/events/kafka-message.schema.ts`
- `libs/contract/src/events/topic/index.ts`
- `libs/contract/src/events/topic/kafka-topic.schema.ts`
- `libs/contract/src/events/topic/user-topic.schema.ts`
- `libs/contract/src/events/user-message.schema.ts`
- `libs/contract/src/identity/address.schema.ts`
- `libs/contract/src/identity/auth.schema.ts`
- `libs/contract/src/identity/shop.schema.ts`
- `libs/contract/src/identity/user.rpc-schema.ts`
- `libs/contract/src/identity/user.schema.ts`
- `libs/contract/src/index.ts`
- `libs/contract/src/inventory/reservation.schema.ts`
- `libs/contract/src/inventory/stock.rpc-schema.ts`
- `libs/contract/src/microservice/error.rpc-schema.ts`
- `libs/contract/src/microservice/event-payload.rpc-schema.ts`
- `libs/contract/src/order/checkout.schema.ts`
- `libs/contract/src/order/order.schema.ts`
- `libs/contract/src/product/category.schema.ts`
- `libs/contract/src/product/product-catalog.schema.ts`
- `libs/contract/src/product/product.rpc-schema.ts`
- `libs/contract/src/product/product.schema.ts`
- `libs/contract/src/shared/common.constant.ts`
- `libs/contract/src/shared/common.schema.ts`
- `libs/contract/src/shared/date.schema.ts`
- `libs/contract/src/shared/entity-response.rpc-schema.ts`
- `libs/contract/src/shared/entity-response.schema.ts`
- `libs/contract/src/shared/number.schema.ts`
- `libs/contract/src/shared/string.schema.ts`
- `libs/contract/src/shared/success-response.schema.ts`
- `libs/contract/tsconfig.json`
<!-- AUTO:end inventory -->

## Ghi chú thủ công

- Contract được khai báo bằng ArkType, chia theo domain và shared schema; identity có schema auth, address, shop, user, product có category/product/catalog và inventory có schema RPC. Nguồn: `libs/contract/src/identity/auth.schema.ts`, `libs/contract/src/identity/address.schema.ts`, `libs/contract/src/product/product.schema.ts`, `libs/contract/src/inventory/stock.rpc-schema.ts`.
- Schema HTTP và RPC cho entity có các khai báo riêng. Không giả định shape runtime từ tên type; xem schema, hướng input/output và nơi validate. Nguồn: `libs/contract/src/shared/entity-response.schema.ts`, `libs/contract/src/shared/entity-response.rpc-schema.ts`.
- Schema và registry chưa chứng minh handler đã hoàn thiện: [[architecture/microservice-contracts|contract microservice]]. Nguồn: `libs/core/src/microservice/microservice.rpc-schema.ts`.
