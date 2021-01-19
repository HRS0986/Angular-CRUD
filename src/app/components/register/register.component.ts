import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder } from "@angular/forms";
import { checkPasswords } from '../../app.validators';
import { AuthService } from "../../services/auth.service";
import { Md5 } from 'ts-md5';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginLogo: string = '../../../assets/images/login-logo.png';
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMsg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
    ) { }

  newUserForm = this.formBuilder.group({
    username: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  },{validators : checkPasswords()});

  ngOnInit(): void {  
  }

  register(): void {
    const username = this.newUserForm.getRawValue().username;
    const email = this.newUserForm.getRawValue().email;
    const password = Md5.hashStr(this.newUserForm.getRawValue().password.toString()).toString();
    
    this.auth.register(username, email, password).toPromise().then(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      }).catch(
      err => {
        this.errorMsg = err.error.message;
        this.isSignUpFailed = true;
        console.log(this.errorMsg);
      }
    );

  }

}
