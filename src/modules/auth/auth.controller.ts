import { Body, Controller, Post } from '@nestjs/common';
import { SignUpEmailDto } from './dto/sign-up-email.dto';
import { AuthService } from './auth.service';
import { SignInEmailDto } from './dto/sign-in-email.dto';
import { Public } from 'src/core/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() body: SignUpEmailDto) {
    return this.authService.signUp(body);
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() body: SignInEmailDto) {
    return this.authService.signIn(body);
  }
}
