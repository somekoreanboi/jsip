import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })


  constructor(
    // private authService: AuthService, 
    private toast: HotToastService, private router: Router) { }

  ngOnInit(): void {
  }


}