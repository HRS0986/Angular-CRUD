import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {

  constructor(
    private auth:AuthService,
    private router: Router,
  ) {}

  canActivate( ): boolean{
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/facilities'])
    }
    return !this.auth.isLoggedIn();
  }
  
}
