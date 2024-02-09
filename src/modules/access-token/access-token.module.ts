import { AccessTokenService } from './access-token.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CreateAccessTokenUsecase } from './usecases/create-access-token.usecase';
import { RequestScopedService } from 'src/core/services/request.service';
import { DatabaseModule } from 'src/database/database.module';
import { AccessTokenController } from './access-token.controller';
import { RequestInjectorMiddleware } from 'src/core/middlewares/request.middleware';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [DatabaseModule, CoreModule],
  controllers: [AccessTokenController],
  providers: [
    AccessTokenService,
    CreateAccessTokenUsecase,
    RequestScopedService,
  ],
})
export class AccessTokenModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestInjectorMiddleware).forRoutes('*');
  }
}