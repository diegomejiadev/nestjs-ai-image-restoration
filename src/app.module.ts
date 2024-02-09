import { CoreModule } from './core/core.module';
import { AccessTokenModule } from './modules/access-token/access-token.module';
import { PrismaService } from './database/prisma.service';
import { DatabaseModule } from './database/database.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './core/env.validation';
import { AuthModule } from './modules/auth/auth.module';
import { RequestInjectorMiddleware } from './core/middlewares/request.middleware';
import { RequestScopedService } from './core/services/request.service';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    AccessTokenModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validate,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestInjectorMiddleware).forRoutes('*');
  }
}
