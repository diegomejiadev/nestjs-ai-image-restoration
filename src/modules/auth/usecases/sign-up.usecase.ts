import {
  BadRequestException,
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
      //* 1. Check if the email is already in use
      const foundUser = await this.prismaService.user.findFirst({
        where: { email: body.email },
      });

      //* 1.1. If it's found then send an error
      if (foundUser)
        throw new BadRequestException(
          'The entered email is already in use. Try a different one.',
        );

      //* 2. Hashing the DTO password
      const hashedPassword = await hashPassword(body.password);

      //* 3. Override the password with the hashedPassword
      body.password = hashedPassword;

      //* 4. Create the user
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
      if (e instanceof HttpException) throw e;

      throw new InternalServerErrorException('Internal server error');
    }
  }
}
