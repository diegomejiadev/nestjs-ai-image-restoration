import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SignInEmailDto } from '../dto/sign-in-email.dto';
import { comparePassword } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignInUsecase {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async handle(body: SignInEmailDto): Promise<{ access_token: string }> {
    const { email, password } = body;
    try {
      //* 1. Check if the email is valid
      const foundUser = await this.prismaService.user.findFirst({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          password: true,
        },
      });

      //* 1.1. If it's not then throw a generic exception
      if (!foundUser) {
        throw new BadRequestException(
          'The email or password credentials are incorrect.',
        );
      }

      //* 2. Compare the password with the found user password
      const areSamePassword = await comparePassword(
        password,
        foundUser.password,
      );

      //* 2.1. If are not matching at hash then trow a generic exception
      if (!areSamePassword) {
        throw new BadRequestException(
          'The email or password credentials are incorrect.',
        );
      }

      //* 3. Build the payload
      const payload = {
        sub: foundUser.id,
      };

      //* 4. Return the JWT signed access token
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
