import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { checkPasswords } from '../../app.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginLogo: string = '../../../assets/images/login-logo.png';

  constructor(private formBuilder: FormBuilder) { }

  newUserForm = this.formBuilder.group({
    email: new FormControl('', [Validators.email, Validators.required]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  },{validator: checkPasswords()});

  ngOnInit(): void {
  }

  register(): void {
    console.log(this.newUserForm.getRawValue());
  }

}
