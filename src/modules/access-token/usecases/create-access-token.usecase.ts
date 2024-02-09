import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestScopedService } from 'src/core/services/request.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CreateAccessTokenUsecase {
  constructor(
    private configService: ConfigService,
    private requestService: RequestScopedService,
    private prismaService: PrismaService,
  ) {}

  async handle() {
    try {
      //* 1. Extract the userId from the request
      const request = this.requestService.getRequest();
      const userId = request['user']['userId'];

      //* 2. Check how many access tokens has
      const accessTokenCount = await this.prismaService.accessToken.count({
        where: {
          userId,
        },
      });

      //* 2.1. If has the limit of access tokens then send an exception
      if (
        accessTokenCount >=
        Number(this.configService.get('NESTJS_ACCESS_TOKENS_LIMIT_SIZE'))
      ) {
        throw new BadRequestException(
          "You've reached the limit of Access Tokens for your user.",
        );
      }

      const randomUuid = crypto.randomUUID();

      //* 3. Create the new access token and return it
      return await this.prismaService.accessToken.create({
        data: {
          api_key: randomUuid,
          userId,
        },
      });
    } catch (e) {
      console.log(e);
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
