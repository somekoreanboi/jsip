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

  @Input() opportunity?: Opportunity
  @Input() companyName?: string;
  @Input() companyDescription?: string;
  @Input() companyBusiness?: string;


  constructor(public authService: AuthenticationService, public dialog: MatDialog, public router: Router) {}

  ngOnInit(): void {
  }

  
  submitApplication(): void {
    this.authService.checkAndAddAppliedCompany(this.opportunity?.id!)?.then(
      (value)=> {
        if (value) {
          this.authService.sendJobApplicationMail(this.companyName, this.companyDescription, this.companyBusiness, this.opportunity);
          this.dialog.open(ConfirmationDialogComponent, {
          });
        }
      }
    )
  }

  openAskDialog(): void {
        if (this.authService.isLoggedIn) {

      this.authService.isVerified().then(
        (value)=> {
          if (value) {
            this.dialog.open(AskDialogComponent, {
              data: {
                functionHolder: () => { this.submitApplication
              (); }
              }
              // width: '250px',
            });
          } else {
            this.authService.openSnackBar("Your email is not verified yet!")
            this.router.navigate(['/email_verification']);
          }
    
        }
      )

    } else {
      this.authService.openSnackBar("You are not logged in!")
      this.dialog.closeAll();
      this.router.navigate(['/login']);
    }

  }



  challenge() {
    this.openAskDialog();
  }




}


  
