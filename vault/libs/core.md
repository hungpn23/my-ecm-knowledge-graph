<!-- knowledge-graph: {"id":"libs/core","baseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","stale":false,"staleSince":null,"verifiedBaseline":"7f0fc6265d12adcad03c87e4501216d891b8d51a","sources":[{"path":"libs/core/package.json","blob":"1461e1ff88e997cb231738b88d9590cad54ddf2a"},{"path":"libs/core/src/auth/auth.module.ts","blob":"b984f4289799a769f52e65d6fb5a67ec14f10a13"},{"path":"libs/core/src/auth/auth.type.ts","blob":"435b00673055d64443bed4009f3422970c6e8e31"},{"path":"libs/core/src/auth/jwt-auth.provider.ts","blob":"8d7b96a1bc98ae14ad7fafd38da48833b14f91cc"},{"path":"libs/core/src/auth/jwt.config.ts","blob":"17119334369b4d7b8e5284bcd1d440089b54abc3"},{"path":"libs/core/src/aws/aws.config.ts","blob":"4cc372819d94b34e91dd6d2c426bf3af8c640c82"},{"path":"libs/core/src/config/app.config.ts","blob":"9a2f9db5cc65cc11f0cc90c7d6c1cd1d697ba0b0"},{"path":"libs/core/src/config/config.module.ts","blob":"a1a0b84258d86e332a2b4686807a5a5aeb46d7a8"},{"path":"libs/core/src/config/tcp.config.ts","blob":"759f2a93b87c692ab7c9890b44fd83e244772637"},{"path":"libs/core/src/database/database.config.ts","blob":"f0d58b31d32a4235ef09db7cad22f8714e9aa9d6"},{"path":"libs/core/src/database/database.helper.ts","blob":"602f998b71c6013a4ee754cb33c818bbe10f3287"},{"path":"libs/core/src/database/database.module.ts","blob":"b9d9a8570f2b3bb560be7c24a04b6555194369fd"},{"path":"libs/core/src/database/entity/index.ts","blob":"0f383e57c1be54315076d06008c79d31fd21ba31"},{"path":"libs/core/src/database/entity/outbox.entity.ts","blob":"2f5e3e6740c6b0d14f9f5fe192f94b2285f43d9a"},{"path":"libs/core/src/index.ts","blob":"b6f1b894b08f69ed9f92e641a72ddfa7f1fb6ba6"},{"path":"libs/core/src/kafka/kafka-options.factory.ts","blob":"100721810583b020600cc40a8eca6739e597ef06"},{"path":"libs/core/src/kafka/kafka.config.ts","blob":"e229c4d670966709e9be2208c0795d9eee122539"},{"path":"libs/core/src/kafka/kafka.constant.ts","blob":"3721c275b010a1eaca7b5249d5b3006b151c8eb7"},{"path":"libs/core/src/kafka/kafka.decorator.ts","blob":"bbba16895043fd453fb78dbd5365d7bbd2f1a0fb"},{"path":"libs/core/src/kafka/kafka.module.ts","blob":"12408ccd260237bc892d1174d392c06f4df15c5e"},{"path":"libs/core/src/kafka/kafka.service.ts","blob":"76648195298f77ecf2c9b2a5bcb8386525ddee06"},{"path":"libs/core/src/kafka/message-by-topic.ts","blob":"49336c204ffcd7fdb2e274ccbfa33b1c548ff986"},{"path":"libs/core/src/kafka/message-serializer.service.ts","blob":"f65a2ca9d746ab9384d879928b3ea1fe765891fc"},{"path":"libs/core/src/logging/logger.module.ts","blob":"9b7bc0bad7b1ae13fa5a28dbdcccbf9ffa9aef9f"},{"path":"libs/core/src/microservice/client/identity.client.ts","blob":"bbde05b748fc50120697ccbd7fced23709a5bf3d"},{"path":"libs/core/src/microservice/client/inventory.client.ts","blob":"43f02cf6ee514e1462f25a4636fc7c450ac1bd8b"},{"path":"libs/core/src/microservice/client/microservice.client.ts","blob":"f3fa92365f3c62b6940f68961eea95e031c8e247"},{"path":"libs/core/src/microservice/client/notification.client.ts","blob":"b82e1b664728cc7b5d5250f7d9a20f988d7007fd"},{"path":"libs/core/src/microservice/client/product.client.ts","blob":"ab1bd6e851364e92a8d8aff2d93344d9088685ec"},{"path":"libs/core/src/microservice/microservice.decorator.ts","blob":"e97346d4281335e86681f8436c700206cce98be4"},{"path":"libs/core/src/microservice/microservice.module.ts","blob":"de68d625a64c1e66429aa7accffa59256bd82d9d"},{"path":"libs/core/src/microservice/microservice.rpc-schema.ts","blob":"0b93a29b99da5ae3fb6708bb283d1577de8b0f4f"},{"path":"libs/core/src/microservice/payload-by-command.ts","blob":"79283448fdf7ccedda86c3ce7f8f24fac05ae4c5"},{"path":"libs/core/src/microservice/payload-by-event.ts","blob":"58630e06aacd559510789d88e624ae4ee16d2f1b"},{"path":"libs/core/src/microservice/response-by-command.ts","blob":"3127a3e28863388fb1133ad5c9befa73a82c4f7e"},{"path":"libs/core/src/outbox/aggregate-type.schema.ts","blob":"c0a405e619de2c026e6b8d61bb7cc8949e83f326"},{"path":"libs/core/src/outbox/outbox.module.ts","blob":"22f384ed4f78de63efce47b830aa9df797ebd633"},{"path":"libs/core/src/outbox/outbox.service.ts","blob":"df64f03cbe383cc4027b8c4195d79970e79a0a59"},{"path":"libs/core/src/redis/redis.config.ts","blob":"a5dd03334ccd7408b6a974b6aa4e92756de37906"},{"path":"libs/core/src/redis/redis.constant.ts","blob":"3ab4b23a7711f6f0d2f35a0fb50f4dfa1c6214f0"},{"path":"libs/core/src/redis/redis.module.ts","blob":"77e9254dd0567a1d8c8cd9b6fa82a6b1ab1f3feb"},{"path":"libs/core/src/redis/redis.service.ts","blob":"fc8f7c0e7252180efd2147e6cda372bcbdcbf498"},{"path":"libs/core/src/shop/shop-context.module.ts","blob":"2e964e1c6d4f0e551af26b23959037699024cb5c"},{"path":"libs/core/src/shop/shop.context.ts","blob":"9c00b5ab24016acbb3d03d9d9c045f96ce07b11d"},{"path":"libs/core/src/shop/shop.helper.ts","blob":"028b64d8f0c48ebcd83a7886d6c8dc035541ad0c"},{"path":"libs/core/tsconfig.json","blob":"336fa50f6b5cdd66527c89de2f0289ed0323e374"}]} -->
# core

<!-- AUTO:start inventory -->
## Inventory

- Baseline: `origin/main@7f0fc6265d12adcad03c87e4501216d891b8d51a`
- Trạng thái cần rà soát: chưa phát hiện.
- Phạm vi: package.json, tsconfig.json, cấu hình ORM, entity discovery và file .ts/.tsx/.json trong src, bao gồm migration.

- `libs/core/package.json`
- `libs/core/src/auth/auth.module.ts`
- `libs/core/src/auth/auth.type.ts`
- `libs/core/src/auth/jwt-auth.provider.ts`
- `libs/core/src/auth/jwt.config.ts`
- `libs/core/src/aws/aws.config.ts`
- `libs/core/src/config/app.config.ts`
- `libs/core/src/config/config.module.ts`
- `libs/core/src/config/tcp.config.ts`
- `libs/core/src/database/database.config.ts`
- `libs/core/src/database/database.helper.ts`
- `libs/core/src/database/database.module.ts`
- `libs/core/src/database/entity/index.ts`
- `libs/core/src/database/entity/outbox.entity.ts`
- `libs/core/src/index.ts`
- `libs/core/src/kafka/kafka-options.factory.ts`
- `libs/core/src/kafka/kafka.config.ts`
- `libs/core/src/kafka/kafka.constant.ts`
- `libs/core/src/kafka/kafka.decorator.ts`
- `libs/core/src/kafka/kafka.module.ts`
- `libs/core/src/kafka/kafka.service.ts`
- `libs/core/src/kafka/message-by-topic.ts`
- `libs/core/src/kafka/message-serializer.service.ts`
- `libs/core/src/logging/logger.module.ts`
- `libs/core/src/microservice/client/identity.client.ts`
- `libs/core/src/microservice/client/inventory.client.ts`
- `libs/core/src/microservice/client/microservice.client.ts`
- `libs/core/src/microservice/client/notification.client.ts`
- `libs/core/src/microservice/client/product.client.ts`
- `libs/core/src/microservice/microservice.decorator.ts`
- `libs/core/src/microservice/microservice.module.ts`
- `libs/core/src/microservice/microservice.rpc-schema.ts`
- `libs/core/src/microservice/payload-by-command.ts`
- `libs/core/src/microservice/payload-by-event.ts`
- `libs/core/src/microservice/response-by-command.ts`
- `libs/core/src/outbox/aggregate-type.schema.ts`
- `libs/core/src/outbox/outbox.module.ts`
- `libs/core/src/outbox/outbox.service.ts`
- `libs/core/src/redis/redis.config.ts`
- `libs/core/src/redis/redis.constant.ts`
- `libs/core/src/redis/redis.module.ts`
- `libs/core/src/redis/redis.service.ts`
- `libs/core/src/shop/shop-context.module.ts`
- `libs/core/src/shop/shop.context.ts`
- `libs/core/src/shop/shop.helper.ts`
- `libs/core/tsconfig.json`
<!-- AUTO:end inventory -->

## Ghi chú thủ công

- `JwtAuth.validate` gọi `IdentityClient.send` với pattern `get.user.by-id` sau khi kiểm tra UUID. Nguồn: `libs/core/src/auth/jwt-auth.provider.ts#JwtAuth.validate`; consumer: [[services/identity-service|identity-service]].
- `KafkaModule` được đánh dấu deprecated cùng pipeline Kafka/outbox/Debezium. Nguồn: `libs/core/src/kafka/kafka.module.ts#KafkaModule`.
- `MicroserviceModule` cấu hình TCP client; `AbstractMicroserviceClient` kiểm tra schema payload/response và timeout RPC. Xem [[architecture/microservice-contracts|contract microservice]]. Nguồn: `libs/core/src/microservice/microservice.module.ts#MicroserviceModule.registerAsync`, `libs/core/src/microservice/client/microservice.client.ts#AbstractMicroserviceClient`.
- `DatabaseModule` đăng ký MikroORM PostgreSQL với các entity được truyền vào. Nguồn: `libs/core/src/database/database.module.ts#DatabaseModule.forRoot`.
