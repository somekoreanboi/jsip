import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })


  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }


  get email() {
    return this.loginForm.get('email');
  }


  get password() {
    return this.loginForm.get('password');
  }

  

  submit() {


    const {email, password} = this.loginForm.value;
    console.log(email, password);
    if (this.loginForm.valid) {
      this.authService.SignIn(email, password);
    } else {
      console.log('error');
    }

    

  }

}