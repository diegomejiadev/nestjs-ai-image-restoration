import { Body, Controller, Post } from '@nestjs/common';
import { SignUpEmailDto } from './dto/sign-up-email.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() body: SignUpEmailDto) {
    return this.authService.signUp(body);
  }
}
