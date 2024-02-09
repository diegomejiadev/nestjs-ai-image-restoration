import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SignUpEmailDto } from '../dto/sign-up-email.dto';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class SignUpUsecase {
  constructor(private prismaService: PrismaService) {}

  async handle(body: SignUpEmailDto) {
    try {
      //* 1. Hashing the DTO password
      const hashedPassword = await hashPassword(body.password);

      //* 2. Override the password with the hashedPassword
      body.password = hashedPassword;

      return this.prismaService.user.create({
        data: { ...body },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (e) {
      console.log(e);

      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
