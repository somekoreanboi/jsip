import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { AskDialogComponent } from '../ask-dialog/ask-dialog.component';
import { Opportunity } from 'src/app/interfaces/opportunity';


@Component({
  selector: 'app-opportunity-details',
  templateUrl: './opportunity-details.component.html',
  styleUrls: ['./opportunity-details.component.scss']
})

export class OpportunityDetailsComponent implements OnInit {

  @Input() opportunity!: Opportunity

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


  
