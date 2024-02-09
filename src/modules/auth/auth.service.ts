import { IResponse } from 'src/shared/interfaces/response.interface';
import { SignUpEmailDto } from './dto/sign-up-email.dto';
import { SignUpUsecase } from './usecases/sign-up.usecase';
import { Injectable } from '@nestjs/common';
import { SignInUsecase } from './usecases/sign-in.usecase';
import { SignInEmailDto } from './dto/sign-in-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private signUpUsecase: SignUpUsecase,
    private signInUsecase: SignInUsecase,
  ) {}

  async signUp(
    body: SignUpEmailDto,
  ): Promise<
    IResponse<{ id: number; email: string; createdAt: Date; updatedAt: Date }>
  > {
    const data = await this.signUpUsecase.handle(body);

    return { data };
  }

  async signIn(body: SignInEmailDto): Promise<{ access_token: string }> {
    return this.signInUsecase.handle(body);
  }
}
