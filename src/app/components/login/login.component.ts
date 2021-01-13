import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { TokenStorageService } from "../../services/token-storage.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginLogo: string = '../../../assets/images/login-logo.png';
  uname: string = 'Login';

  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMsg: string = '';

  user = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('')
  })

  constructor(
    private auth: AuthService,
    private tokenStorage: TokenStorageService,
  ) { }


  ngOnInit(): void {
    if (this.tokenStorage.getAccessToken()) {
      this.isLoggedIn = true;
    }
  }

  login(): void {
    const email = this.user.getRawValue().email;
    const password = Md5.hashStr(this.user.getRawValue().password.toString()).toString();

    this.auth.login(email, password).subscribe(
      data => {
        console.log(data);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        window.location.reload();
      },
      err => {
        this.errorMsg = err;
        this.isLoginFailed = true;
        console.log(this.errorMsg);
      }
    );
  }

}
