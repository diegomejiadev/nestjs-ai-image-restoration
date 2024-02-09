/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CreateAccessTokenUsecase } from './usecases/create-access-token.usecase';
import { IResponse } from 'src/shared/interfaces/response.interface';

@Injectable()
export class AccessTokenService {
  constructor(private createAccessTokenUsecase: CreateAccessTokenUsecase) {}

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
}
