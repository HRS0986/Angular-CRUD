import { Injectable } from '@angular/core';


const JWT_TOKEN_KEY = "auth-token";
const REFRESH_TOKEN_KEY = "refresh-token";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  removeAccessToken(): void {
    window.sessionStorage.removeItem(JWT_TOKEN_KEY);     
  }

  removeRefreshToken(): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  saveAccessToken(token: string): void {
    window.sessionStorage.removeItem(JWT_TOKEN_KEY);
    window.sessionStorage.setItem(JWT_TOKEN_KEY, token);
  }
  saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    return window.sessionStorage.getItem(JWT_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }
  
}
