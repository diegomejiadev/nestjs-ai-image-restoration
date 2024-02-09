import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';
import { SignUpUsecase } from './usecases/sign-up.usecase';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SignInUsecase } from './usecases/sign-in.usecase';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('NESTJS_JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('NESTJS_JWT_EXPIRE_TIME'),
          },
          verifyOptions: { ignoreExpiration: false },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    SignUpUsecase,
    SignInUsecase,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
