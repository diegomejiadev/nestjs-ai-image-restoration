import { PrismaService } from './database/prisma.service';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './core/env.validation';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validate,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
