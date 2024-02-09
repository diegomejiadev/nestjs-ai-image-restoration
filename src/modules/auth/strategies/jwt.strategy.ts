import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/database/prisma.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.NESTJS_JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const { sub } = payload;
    const foundUser = await this.prismaService.user.findFirst({
      where: {
        id: sub,
      },
      select: { id: true },
    });

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    return { userId: sub };
  }
}
