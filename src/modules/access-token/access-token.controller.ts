import { Controller, Get, Post } from '@nestjs/common';
import { AccessTokenService } from './access-token.service';

@Controller('access-token')
export class AccessTokenController {
  constructor(private accessTokenService: AccessTokenService) {}

  @Post('generate')
  create() {
    return this.accessTokenService.createAccessToken();
  }

  @Get('list')
  list() {
    return this.accessTokenService.listAccessTokens();
  }
}
