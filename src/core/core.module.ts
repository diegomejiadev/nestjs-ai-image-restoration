/*
https://docs.nestjs.com/modules
*/

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestInjectorMiddleware } from './middlewares/request.middleware';
import { RequestScopedService } from './services/request.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RequestScopedService],
  exports: [RequestScopedService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestInjectorMiddleware).forRoutes('*');
  }
}
