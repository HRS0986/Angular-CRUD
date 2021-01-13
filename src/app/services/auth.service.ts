import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://127.0.0.1:3000/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(AUTH_API + 'login', { email, password }, httpOptions)
      .pipe(
        tap((tokens: any) => {
          this.tokenStorage.saveAccessToken(tokens.jwt);
          this.tokenStorage.saveRefreshToken(tokens.refreshToken);
        }),
        mapTo(true),
        catchError((err) => {
          alert(err.error);
          return of(false);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    console.log({ email: email, password: password, username: username });
    return this.http.post(
      AUTH_API + 'register',
      { email: email, password: password, username: username },
      httpOptions
    );
  }

  logout(): Observable<boolean> {
    const REFRESH_TOKEN = this.tokenStorage.getRefreshToken();
    return this.http
      .post(AUTH_API + 'logout', { 'refreshToken':REFRESH_TOKEN }, httpOptions)
      .pipe(
        tap(() => {
          this.tokenStorage.removeAccessToken();
          this.tokenStorage.removeRefreshToken();
          this.router.navigate(['/login']);
        }),
        mapTo(true),
        catchError((err) => {
          alert(err.error);
          return of(false);
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.tokenStorage.getAccessToken();
  }

  tokenRefresh(): Observable<any> {
    const REFRESH_TOKEN = this.tokenStorage.getRefreshToken();
    return this.http.post(
      AUTH_API + 'refresh',
      { refreshToken: REFRESH_TOKEN },
      httpOptions
    );
  }
}
