/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CreateAccessTokenUsecase } from './usecases/create-access-token.usecase';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { ListAccessTokensUsecase } from './usecases/list-access-tokens.usecase';

@Injectable()
export class AccessTokenService {
  constructor(
    private createAccessTokenUsecase: CreateAccessTokenUsecase,
    private listAccessTokensUsecase: ListAccessTokensUsecase,
  ) {}

  async createAccessToken(): Promise<
    IResponse<{
      id: number;
      token: string;
      userId: number;
      createdAt: Date;
      updatedAt: Date;
    }>
  > {
    const data = await this.createAccessTokenUsecase.handle();

    return { data };
  }

  async listAccessTokens(): Promise<
    IResponse<
      {
        id: number;
        token: string;
        createdAt: Date;
      }[]
    >
  > {
    const data = await this.listAccessTokensUsecase.handle();
    return { data };
  }
}
