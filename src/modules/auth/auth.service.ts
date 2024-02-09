import { IResponse } from 'src/shared/interfaces/response.interface';
import { SignUpEmailDto } from './dto/sign-up-email.dto';
import { SignUpUsecase } from './usecases/sign-up.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private signUpUsecase: SignUpUsecase) {}

  async signUp(
    body: SignUpEmailDto,
  ): Promise<
    IResponse<{ id: number; email: string; createdAt: Date; updatedAt: Date }>
  > {
    const data = await this.signUpUsecase.handle(body);

    return { data };
  }
}
