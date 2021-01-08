import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenStorageService } from "../services/token-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.tokenStorage.getToken()) {
      const TOKEN = this.tokenStorage.getToken();
      const req = request.clone({ headers: request.headers.set("Authorization", `Bearer ${TOKEN}`) });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
