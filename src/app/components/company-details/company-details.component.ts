import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { AskDialogComponent } from '../ask-dialog/ask-dialog.component';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})

export class CompanyDetailsComponent implements OnInit {

  @Input() company!: Company

  constructor(public authService: AuthenticationService, public dialog: MatDialog, public router: Router) {}

  ngOnInit(): void {
  }

  
  openConfirmationDialog(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      // width: '250px',
    });
  }

  openAskDialog(): void {
    this.dialog.open(AskDialogComponent, {
      data: {
        functionHolder: () => { this.openConfirmationDialog(); }
      }
      // width: '250px',
    });
  }



  challenge() {
    if (this.authService.isLoggedIn) {

      this.authService.isVerified().then(
        (value)=> {
          if (value) {
            this.openAskDialog();
          } else {
            window.alert("Your email is not verified yet!")
            this.router.navigate(['/email_verification']);
          }
    
        }
      )

    } else {
      window.alert("You are not logged in!")
    }
  }




}


  
