<!-- knowledge-graph: {"id":"libs/common","baseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","stale":false,"staleSince":null,"verifiedBaseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","sources":[{"path":"libs/common/package.json","blob":"c33ebe3c57673e8f6e941ec0bbab4d1c59d6702b"},{"path":"libs/common/src/constant/x-request-id.constant.ts","blob":"08fe76d844e619515b568937eb88d45bf1c17532"},{"path":"libs/common/src/decorator/endpoint.decorator.ts","blob":"8d4baf4ed4f7b1691f8c1ed201162569ad327d53"},{"path":"libs/common/src/decorator/endpoint.interface.ts","blob":"ec50e3b9b9c72737d7320d708955b0e1e6b864dd"},{"path":"libs/common/src/decorator/endpoint.type.ts","blob":"85f238968aa45db89900e786a4058c1609bd305e"},{"path":"libs/common/src/error-handling/mikro-orm.exception-filter.ts","blob":"2a3c735b9943a03fc1824ee8a8f93901b22fcaff"},{"path":"libs/common/src/error-handling/rpc.exception-filter.ts","blob":"2974548fd0f2f14e759d65600be2b8520488fc1f"},{"path":"libs/common/src/error-handling/rpc.exception.ts","blob":"7884889fe9dfba1c54e6c64553756322ee8b1969"},{"path":"libs/common/src/error-handling/rxjs.exception-filter.ts","blob":"59c832653502e0530d197556892fcc975ed89e33"},{"path":"libs/common/src/helper/deep-merge.ts","blob":"636c2ebc5b62b64fbef56b0154ce6f33c1e12323"},{"path":"libs/common/src/index.ts","blob":"d9e9511afa95e49c4b5d06020f6b6ad8625c28d1"},{"path":"libs/common/src/pipe/arktype-validation.pipe.ts","blob":"e6aede73dc32072ebdfc194018783bac334caa36"}]} -->
# common

<!-- AUTO:start inventory -->
## Inventory

- Baseline: `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`
- Trạng thái cần rà soát: chưa phát hiện.
- Phạm vi: package.json và file TypeScript trong src, trừ migration.

- `libs/common/package.json`
- `libs/common/src/constant/x-request-id.constant.ts`
- `libs/common/src/decorator/endpoint.decorator.ts`
- `libs/common/src/decorator/endpoint.interface.ts`
- `libs/common/src/decorator/endpoint.type.ts`
- `libs/common/src/error-handling/mikro-orm.exception-filter.ts`
- `libs/common/src/error-handling/rpc.exception-filter.ts`
- `libs/common/src/error-handling/rpc.exception.ts`
- `libs/common/src/error-handling/rxjs.exception-filter.ts`
- `libs/common/src/helper/deep-merge.ts`
- `libs/common/src/index.ts`
- `libs/common/src/pipe/arktype-validation.pipe.ts`
<!-- AUTO:end inventory -->

## Ghi chú thủ công

- `Endpoint` kết hợp decorator route NestJS với schema request/response và khai báo xác thực. Nguồn: `libs/common/src/decorator/endpoint.decorator.ts#Endpoint`.
