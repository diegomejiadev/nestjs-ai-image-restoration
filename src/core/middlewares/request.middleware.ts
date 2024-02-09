import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestScopedService } from '../services/request.service';

@Injectable()
export class RequestInjectorMiddleware implements NestMiddleware {
  constructor(private readonly requestScopedService: RequestScopedService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.requestScopedService.setRequest(req);
    next();
  }
}
