import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent implements OnInit {

  constructor(public authService: AuthenticationService, 
    ) {
}

  ngOnInit(): void {
  }


  sendPasswordResetEmail() {
    this.authService.resetPassword();
  }

}
