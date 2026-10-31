<!-- knowledge-graph: {"id":"apps/notification-service","baseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","stale":false,"staleSince":null,"verifiedBaseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","sources":[{"path":"apps/notification-service/package.json","blob":"3b0975c1b7d2b3e0d3fcd052bee00bbb1fee5ade"},{"path":"apps/notification-service/src/app.module.ts","blob":"d004470d97f36d6468348f0f2f073bb3af0514cc"},{"path":"apps/notification-service/src/main.ts","blob":"9e043502ac4dd4d12a8d1c9f26f77755f60efec5"},{"path":"apps/notification-service/src/module/email/email.config.ts","blob":"316e095cb5e26ade9e7237ea2ce6596fd1130039"},{"path":"apps/notification-service/src/module/email/email.module.ts","blob":"dc20e890c2f07a61c61a65d61400d0741190e253"},{"path":"apps/notification-service/src/module/email/email.service.ts","blob":"4a589cb95a944aed441405d818db5e96aaf9067f"},{"path":"apps/notification-service/src/module/user/user.consumer.ts","blob":"97249052ed236a8195ab74a1aabea76793c4f573"},{"path":"apps/notification-service/src/module/user/user.module.ts","blob":"3e4e39dab47d83e642158fdce0770f3d319e925d"},{"path":"apps/notification-service/tsconfig.json","blob":"1354616e6deeb5589a9e1f013d9907764e52e731"}]} -->
# notification-service

<!-- AUTO:start inventory -->
## Inventory

- Baseline: `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`
- Trạng thái cần rà soát: chưa phát hiện.
- Phạm vi: package.json, tsconfig.json, cấu hình ORM, entity discovery và file .ts/.tsx/.json trong src, bao gồm migration.

- `apps/notification-service/package.json`
- `apps/notification-service/src/app.module.ts`
- `apps/notification-service/src/main.ts`
- `apps/notification-service/src/module/email/email.config.ts`
- `apps/notification-service/src/module/email/email.module.ts`
- `apps/notification-service/src/module/email/email.service.ts`
- `apps/notification-service/src/module/user/user.consumer.ts`
- `apps/notification-service/src/module/user/user.module.ts`
- `apps/notification-service/tsconfig.json`
<!-- AUTO:end inventory -->

## Ghi chú thủ công

- `UserConsumer.handleUserCreated` nhận sự kiện `user.created` và gọi gửi email chào mừng. Nguồn: `apps/notification-service/src/module/user/user.consumer.ts#UserConsumer.handleUserCreated`. Bên phát đã xác minh: [[services/identity-service|identity-service]].
- Consumer gọi `EmailService`, render template `Welcome` và giao mail cho transport được cấu hình; chưa xác minh gửi thành công trong runtime. Nguồn: `apps/notification-service/src/module/email/email.service.ts#EmailService.sendWelcomeEmail`, `apps/notification-service/src/module/email/email.module.ts#EmailModule`.
- Nguồn event và ranh giới transaction: [[flows/identity-and-product|identity và product]]. Nguồn: `apps/identity-service/src/module/auth/auth.service.ts#AuthService.signUp`.
