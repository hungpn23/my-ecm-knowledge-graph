<!-- knowledge-graph: {"id":"apps/identity-service","baseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","stale":false,"staleSince":null,"verifiedBaseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","sources":[{"path":"apps/identity-service/entities.generated.ts","blob":"2e714f82ac17678b40550fde60096820f44dce95"},{"path":"apps/identity-service/mikro-orm.config.ts","blob":"031c94b2490e3f0bbc0d0e1ca7f601235f214afc"},{"path":"apps/identity-service/package.json","blob":"9ee9465135b837e59475e641ad4449a0058f592a"},{"path":"apps/identity-service/src/app.module.ts","blob":"263591d6552e34397b990102a2f5dd02e0b0215d"},{"path":"apps/identity-service/src/database/entity/address.entity.ts","blob":"1918d11db35ab2156f92c7867dfa5a95db0ed8f8"},{"path":"apps/identity-service/src/database/entity/index.ts","blob":"8136309b296985d442ad89390792910b533a33b8"},{"path":"apps/identity-service/src/database/entity/refresh-token.entity.ts","blob":"f7ffb12531bcd9cc1a6ad6f8917c3209e955cc94"},{"path":"apps/identity-service/src/database/entity/shop.entity.ts","blob":"24cc1d8a5e61bedfe814c63c07245b5fae477947"},{"path":"apps/identity-service/src/database/entity/user.entity.ts","blob":"eec4a9eb0d53402cb001c8d63f8fc6c46907027e"},{"path":"apps/identity-service/src/database/migration/.snapshot-identity-service.json","blob":"c968a0d74fb60bb67c1b42e68259fbb7c5721a8f"},{"path":"apps/identity-service/src/database/migration/Migration20260913160054_CreateUserTable.ts","blob":"93d1b39da03d1e4e59cd38f73414123304dedea2"},{"path":"apps/identity-service/src/database/migration/Migration20260923141632_CreateOutboxEventTable.ts","blob":"2ca06f008f8d0e000178b7c22213acf2e8566c7c"},{"path":"apps/identity-service/src/database/migration/Migration20260926182531_RenameAndUpdateOutboxTable.ts","blob":"569d5b6121f54d56c5361240d5deee3eda14234c"},{"path":"apps/identity-service/src/database/migration/Migration20260929152256_CreateShopTableAndRelationship.ts","blob":"e5891c1e25196a4ce9f256326c2173fd3bf00437"},{"path":"apps/identity-service/src/database/migration/Migration20261004024918_UpdateUserTableAddRoleColumn.ts","blob":"484189fb537e30c9aed220a40f798e53d70f68db"},{"path":"apps/identity-service/src/database/migration/Migration20261007040836_CreateAuthenticationStorage.ts","blob":"f62526b8ec57c3ef97fc59d51ca113479cfb7354"},{"path":"apps/identity-service/src/database/migration/Migration20261009032011_RemoveAuthTablePrefix.ts","blob":"2682a06637cbcb3ebe54dc30a634baee1a9c7f8f"},{"path":"apps/identity-service/src/database/migration/Migration20261020134118_RemoveMfaStorage.ts","blob":"6e9230f66774a44047bda6a03d6b94123e3569a6"},{"path":"apps/identity-service/src/database/migration/Migration20261025145527_AddAddress.ts","blob":"060d857a1dce1904ea6d4c93625a4523b0a78001"},{"path":"apps/identity-service/src/main.ts","blob":"f2bd264465eff299eee182a0a27ee8fa7ecbbcac"},{"path":"apps/identity-service/src/module/address/address.controller.ts","blob":"5cdc4b8178abdd921d11b15ae36d515ecfa9b7de"},{"path":"apps/identity-service/src/module/address/address.module.ts","blob":"e7a970a696b6449f2ab66be0bfa9d8f364ee4fb2"},{"path":"apps/identity-service/src/module/address/address.service.ts","blob":"050e4021b47fafb3e2fa53d34b8b8217e43a0d7d"},{"path":"apps/identity-service/src/module/auth/auth.config.ts","blob":"4c8e255fa80fda841e9401361e22b33e6eb6d27a"},{"path":"apps/identity-service/src/module/auth/auth.controller.ts","blob":"04f9c74f21c40ccee3aa77616e78c53fbdf58978"},{"path":"apps/identity-service/src/module/auth/auth.interface.ts","blob":"06f2c9713024b0c5ad46535439ce946a5c9535ad"},{"path":"apps/identity-service/src/module/auth/auth.module.ts","blob":"af7250879d06535590355b402e71dee01bb72105"},{"path":"apps/identity-service/src/module/auth/auth.service.ts","blob":"b12a79127a78a85f685e87a24d5963e7d2b016f5"},{"path":"apps/identity-service/src/module/auth/auth.store.ts","blob":"ec625586e939a53db9556ca5c9d3a8674eff2104"},{"path":"apps/identity-service/src/module/auth/jwt-auth.provider.ts","blob":"e4583513a5e6baca77b88626c98cfac79a6eebc4"},{"path":"apps/identity-service/src/module/shop/shop.controller.ts","blob":"515bc4036fb50c2506adcfbab0d542f624325314"},{"path":"apps/identity-service/src/module/shop/shop.module.ts","blob":"09abfc6029171cd7c5c465c3efc4a21635601d59"},{"path":"apps/identity-service/src/module/shop/shop.policy.ts","blob":"fdb8f79f92fb76f75379715a565a498ae16b02fb"},{"path":"apps/identity-service/src/module/shop/shop.service.ts","blob":"9204447c804998f3f69e87b6c57392ad058dd5a7"},{"path":"apps/identity-service/src/module/user/user.consumer.ts","blob":"d2c763097350825f004b3e173cae1e5ab2b7b165"},{"path":"apps/identity-service/src/module/user/user.controller.ts","blob":"8c6930cab3bdf3b16923a723018a3424ceb52700"},{"path":"apps/identity-service/src/module/user/user.module.ts","blob":"896134e97f1bdcd27ea9461a34fc90ebad2ffcf1"},{"path":"apps/identity-service/src/module/user/user.rpc-service.ts","blob":"c7654ece787c59e6b1f18e9ae7e8add6332f5cbb"},{"path":"apps/identity-service/src/module/user/user.service.ts","blob":"05cdc18f1f778d671024ea8a0912e70a5f7d6d5b"},{"path":"apps/identity-service/tsconfig.json","blob":"01561a2badeebb47a1f4ae8fbe8200f866dbb61b"}]} -->
# identity-service

<!-- AUTO:start inventory -->
## Inventory

- Baseline: `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`
- Trạng thái cần rà soát: chưa phát hiện.
- Phạm vi: package.json, tsconfig.json, cấu hình ORM, entity discovery và file .ts/.tsx/.json trong src, bao gồm migration.

- `apps/identity-service/entities.generated.ts`
- `apps/identity-service/mikro-orm.config.ts`
- `apps/identity-service/package.json`
- `apps/identity-service/src/app.module.ts`
- `apps/identity-service/src/database/entity/address.entity.ts`
- `apps/identity-service/src/database/entity/index.ts`
- `apps/identity-service/src/database/entity/refresh-token.entity.ts`
- `apps/identity-service/src/database/entity/shop.entity.ts`
- `apps/identity-service/src/database/entity/user.entity.ts`
- `apps/identity-service/src/database/migration/.snapshot-identity-service.json`
- `apps/identity-service/src/database/migration/Migration20260913160054_CreateUserTable.ts`
- `apps/identity-service/src/database/migration/Migration20260923141632_CreateOutboxEventTable.ts`
- `apps/identity-service/src/database/migration/Migration20260926182531_RenameAndUpdateOutboxTable.ts`
- `apps/identity-service/src/database/migration/Migration20260929152256_CreateShopTableAndRelationship.ts`
- `apps/identity-service/src/database/migration/Migration20261004024918_UpdateUserTableAddRoleColumn.ts`
- `apps/identity-service/src/database/migration/Migration20261007040836_CreateAuthenticationStorage.ts`
- `apps/identity-service/src/database/migration/Migration20261009032011_RemoveAuthTablePrefix.ts`
- `apps/identity-service/src/database/migration/Migration20261020134118_RemoveMfaStorage.ts`
- `apps/identity-service/src/database/migration/Migration20261025145527_AddAddress.ts`
- `apps/identity-service/src/main.ts`
- `apps/identity-service/src/module/address/address.controller.ts`
- `apps/identity-service/src/module/address/address.module.ts`
- `apps/identity-service/src/module/address/address.service.ts`
- `apps/identity-service/src/module/auth/auth.config.ts`
- `apps/identity-service/src/module/auth/auth.controller.ts`
- `apps/identity-service/src/module/auth/auth.interface.ts`
- `apps/identity-service/src/module/auth/auth.module.ts`
- `apps/identity-service/src/module/auth/auth.service.ts`
- `apps/identity-service/src/module/auth/auth.store.ts`
- `apps/identity-service/src/module/auth/jwt-auth.provider.ts`
- `apps/identity-service/src/module/shop/shop.controller.ts`
- `apps/identity-service/src/module/shop/shop.module.ts`
- `apps/identity-service/src/module/shop/shop.policy.ts`
- `apps/identity-service/src/module/shop/shop.service.ts`
- `apps/identity-service/src/module/user/user.consumer.ts`
- `apps/identity-service/src/module/user/user.controller.ts`
- `apps/identity-service/src/module/user/user.module.ts`
- `apps/identity-service/src/module/user/user.rpc-service.ts`
- `apps/identity-service/src/module/user/user.service.ts`
- `apps/identity-service/tsconfig.json`
<!-- AUTO:end inventory -->

## Ghi chú thủ công

- `AppModule` đăng ký các module auth, address, shop và user. Nguồn: `apps/identity-service/src/app.module.ts#AppModule`.
- `AuthService.signUp` phát sự kiện `user.created` sau giao dịch tạo user. Nguồn: `apps/identity-service/src/module/auth/auth.service.ts#AuthService.signUp`. Consumer liên quan: [[services/notification-service|notification-service]].
- `UserConsumer.getUser` xử lý RPC `get.user.by-id`. Nguồn: `apps/identity-service/src/module/user/user.consumer.ts#UserConsumer.getUser`.
- Auth cung cấp đăng ký, đăng nhập, đổi mật khẩu, thu hồi và làm mới token; luồng có nguồn chi tiết tại [[flows/identity-and-product|identity và product]]. Nguồn: `apps/identity-service/src/module/auth/auth.controller.ts#AuthController`, `apps/identity-service/src/module/auth/auth.service.ts#AuthService`.
- `AddressService` dùng user hiện tại và khóa user khi thay đổi địa chỉ; `ShopService.create` tạo shop và gán owner trong transaction. Nguồn: `apps/identity-service/src/module/address/address.service.ts#AddressService`, `apps/identity-service/src/module/shop/shop.service.ts#ShopService.create`.
- Entity user, shop, address và refresh token: [[architecture/data-model|data model]]. Nguồn: `apps/identity-service/src/database/entity/user.entity.ts#UserSchema`, `apps/identity-service/src/database/entity/shop.entity.ts#ShopSchema`, `apps/identity-service/src/database/entity/address.entity.ts#AddressSchema`, `apps/identity-service/src/database/entity/refresh-token.entity.ts#RefreshTokenSchema`.
