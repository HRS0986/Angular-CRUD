import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { HttpEvent, HttpInterceptor } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private refreshURL: string = 'http://127.0.0.1:3000/auth/refresh';

  constructor(
    private tokenStorage: TokenStorageService,
    private auth: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.tokenStorage.getAccessToken()) {
      const TOKEN = this.tokenStorage.getAccessToken();
      request = this.attachToken(request, TOKEN);
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err.url == this.refreshURL && err.status == 401) {
          this.auth
            .logout()
            .toPromise()
            .then(() => console.log('Logout Succeeded'))
            .catch((err) => console.log(err));
          return throwError(err);
        } else if (err instanceof HttpErrorResponse && err.status == 401) {
          return this.handleUnauthorizedError(request, next);
        } else {
          return throwError(err);
        }
      })
    );
  }

  private attachToken(
    request: HttpRequest<any>,
    token: string | null
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  private handleUnauthorizedError(
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.auth.tokenRefresh().pipe(
        tap((data: any) => {
          this.tokenStorage.saveAccessToken(data.jwt);
        }),
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.attachToken(request, token.jwt));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt: any) => {
          return next.handle(this.attachToken(request, jwt));
        })
      );
    }
  }
}
