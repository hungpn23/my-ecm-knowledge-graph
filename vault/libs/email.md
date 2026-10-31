<!-- knowledge-graph: {"id":"libs/email","baseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","stale":false,"staleSince":null,"verifiedBaseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","sources":[{"path":"libs/email/package.json","blob":"cc34f4149ddd46653f1f830517b644aadf0370ec"},{"path":"libs/email/src/index.ts","blob":"d193f39af7f339df19999e6cb565027116adb1b9"},{"path":"libs/email/src/templates/index.ts","blob":"9e049fc65be2fff4261df5c11d7f8b54be6077ee"},{"path":"libs/email/src/templates/welcome.tsx","blob":"edece545d0e2563ddbaf27d1e61874c7b2e4b5de"},{"path":"libs/email/tsconfig.json","blob":"24594d5a21c0d07812c9343c30aa0f4954a02fd9"}]} -->
# email

<!-- AUTO:start inventory -->
## Inventory

- Baseline: `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`
- Trạng thái cần rà soát: chưa phát hiện.
- Phạm vi: package.json, tsconfig.json, cấu hình ORM, entity discovery và file .ts/.tsx/.json trong src, bao gồm migration.

- `libs/email/package.json`
- `libs/email/src/index.ts`
- `libs/email/src/templates/index.ts`
- `libs/email/src/templates/welcome.tsx`
- `libs/email/tsconfig.json`
<!-- AUTO:end inventory -->

## Ghi chú thủ công

- Thư viện export template `Welcome`; notification render template này thành HTML trong `EmailService.sendWelcomeEmail`. Nguồn: `libs/email/src/index.ts`, `libs/email/src/templates/index.ts`, `apps/notification-service/src/module/email/email.service.ts#EmailService.sendWelcomeEmail`.
- `EmailModule` chọn SMTP hoặc SES theo cấu hình; source chỉ mô tả cơ chế, không xác nhận cấu hình thực tế hay gửi mail thành công. Nguồn: `apps/notification-service/src/module/email/email.module.ts#EmailModule`.
