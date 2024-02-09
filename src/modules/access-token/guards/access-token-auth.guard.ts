import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AccessTokenAuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const apiKeyHeader = request.headers['api-key'] as string;

    if (!apiKeyHeader)
      throw new ForbiddenException('You must set an [api-key] header.');

    const foundAccessToken = await this.prisma.accessToken.findFirst({
      where: { api_key: apiKeyHeader },
    });

    if (!foundAccessToken) {
      return false;
    }

    return true;
  }
}
