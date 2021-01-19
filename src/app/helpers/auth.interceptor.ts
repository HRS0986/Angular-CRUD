import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { HttpEvent, HttpInterceptor } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';
// import { filter, take } from 'rxjs/operators';
// import { BehaviorSubject } from 'rxjs';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private isRefreshing: boolean = false;
//   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
//     null
//   );
//   private refreshURL: string = 'http://127.0.0.1:3000/auth/refresh';

//   constructor(
//     private tokenStorage: TokenStorageService,
//     private auth: AuthService
//   ) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     if (this.tokenStorage.getAccessToken()) {
//       const TOKEN = this.tokenStorage.getAccessToken();
//       request = this.attachToken(request, TOKEN);
//     }
//     return next.handle(request).pipe(
//       catchError((err: any) => {
//         if (err.url == this.refreshURL && err.status == 401) {
//           this.auth
//             .logout()
//             .toPromise()
//             .then(() => console.log('Logout Succeeded'))
//             .catch((err) => console.log(err));
//           return throwError(err);
//         } else if (err instanceof HttpErrorResponse && err.status == 401) {
//           return this.handleUnauthorizedError(request, next);
//         } else {
//           return throwError(err);
//         }
//       })
//     );
//   }

//   private attachToken(
//     request: HttpRequest<any>,
//     token: string | null
//   ): HttpRequest<any> {
//     return request.clone({
//       setHeaders: { Authorization: `Bearer ${token}` },
//     });
//   }

//   private handleUnauthorizedError(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ) {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;
//       this.refreshTokenSubject.next(null);

//       return this.auth.tokenRefresh().pipe(
//         tap((data: any) => {
//           this.tokenStorage.saveAccessToken(data.jwt);
//         }),
//         switchMap((token: any) => {
//           this.isRefreshing = false;
//           this.refreshTokenSubject.next(token.jwt);
//           return next.handle(this.attachToken(request, token.jwt));
//         })
//       );
//     } else {
//       return this.refreshTokenSubject.pipe(
//         filter((token) => token != null),
//         take(1),
//         switchMap((jwt: any) => {
//           return next.handle(this.attachToken(request, jwt));
//         })
//       );
//     }
//   }
// }
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenStorage: TokenStorageService,
    private auth: AuthService
  ) {}
  
  // API route for token refresh
  private refreshURL = 'http://127.0.0.1:3000/auth/refresh';

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const ACCESS_TOKEN = this.tokenStorage.getAccessToken();
    if (ACCESS_TOKEN) {
      request = this.addToken(request, ACCESS_TOKEN);
    }
    return next.handle(request).pipe(      
      catchError((err) => {
        // If refresh token error occurred, this block will do a logout 
        if (
          err.status == 401 &&
          err instanceof HttpErrorResponse &&
          err.url == this.refreshURL
        ) {
          this.auth
            .logout()
            .toPromise()
            .then(() => console.log('Logout Succeeded'))
            .catch((er) => console.log(er));
          return throwError(err);

        // When Access Token Expired, This block will get new access token 
        } else if (err.status == 401 && err instanceof HttpErrorResponse) {
          const REFRESH_TOKEN = this.tokenStorage.getRefreshToken();

          // If there is no refresh token, this block will do a logout
          if (!REFRESH_TOKEN) {
            this.auth
              .logout()
              .toPromise()
              .then(() => console.log('Logout Succeeded'))
              .catch((er) => console.log(er));
            return throwError(err);
          } else {

            // Get new refresh token and send the request with it
            return this.auth.tokenRefresh().pipe(
              tap((token) => {
                // Save new access token in session storage
                this.tokenStorage.saveAccessToken(token.jwt);
              }),
              switchMap((token) => {
                // Attach new access token to request and send it to server
                const newReq = request.clone({
                  headers: request.headers.set(
                    'Authorization',
                    `Bearer ${token.jwt}`
                  ),
                });
                return next.handle(newReq);
              })
            );
          }
        }
        return throwError(err);
      })
    );
  }


  //This Method Attach Access Token To Outgoing Http Requests
  private addToken(
    req: HttpRequest<any>,
    token: string | null
  ): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}
