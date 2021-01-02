import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginLogo: string = '../../../assets/images/login-logo.png';
  uname: string = 'Login';

  user = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private authService: AuthServiceService
  ) { }


  ngOnInit(): void {
  }

  login(): void {
    const LOGIN_DATA = JSON.parse(JSON.stringify(this.user.getRawValue()));
    
  }

}
