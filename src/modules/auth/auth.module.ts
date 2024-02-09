import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './auth.service';
import { SignUpUsecase } from './usecases/sign-up.usecase';
import { AuthController } from './auth.controller';

@Module({
  imports: [DatabaseModule],
  providers: [AuthService, SignUpUsecase],
  controllers: [AuthController],
})
export class AuthModule {}
