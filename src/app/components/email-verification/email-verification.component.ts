import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  constructor(public authService: AuthenticationService, public router: Router) { }

  ngOnInit(): void {

    var keepChecking = setInterval(()=> {
      this.authService.isVerified().then((value)=> {
        if(value) {
          this.authService.openSnackBar('Your email is verified already!');
          this.router.navigate(['/home']);
          clearInterval(keepChecking);
        }
      }) 
     }, 1000)

    }

}
