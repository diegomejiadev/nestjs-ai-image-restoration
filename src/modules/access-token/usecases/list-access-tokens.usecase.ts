import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RequestScopedService } from 'src/core/services/request.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ListAccessTokensUsecase {
  constructor(
    private prismaService: PrismaService,
    private requestService: RequestScopedService,
  ) {}

  async handle(): Promise<
    {
      id: number;
      api_key: string;
      createdAt: Date;
    }[]
  > {
    try {
      //* 1. Extract the userId from the request
      const request = this.requestService.getRequest();
      const userId = request['user']['userId'];

      //* 2. Return the access tokens that belongs to that user
      return await this.prismaService.accessToken.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          api_key: true,
          createdAt: true,
        },
      });
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
