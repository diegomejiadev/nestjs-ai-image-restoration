import { Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService {
  private request: Request;

  setRequest(request: Request) {
    this.request = request;
  }

  getRequest() {
    return this.request;
  }
}
