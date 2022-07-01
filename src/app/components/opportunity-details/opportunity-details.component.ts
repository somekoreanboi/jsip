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
    this.authService.sendJobApplicationMail(this.companyName, this.companyDescription, this.companyBusiness, this.opportunity);
    this.dialog.open(ConfirmationDialogComponent, {
      // width: '250px',
    });
  }

  openAskDialog(): void {
    this.dialog.open(AskDialogComponent, {
      data: {
        functionHolder: () => { this.submitApplication
      (); }
      }
      // width: '250px',
    });
  }



  challenge() {
    this.openAskDialog();
  }




}


  
