import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/interfaces/company';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})

export class CompanyDetailsComponent implements OnInit {

  @Input() company!: Company

  constructor(public authService: AuthenticationService, public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openConfirmationDialog(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
    });
  }


  challenge() {
    if (this.authService.isLoggedIn == true) {
     this.openConfirmationDialog()
    } else {
      window.alert("You are not logged in!")
    }
  }




}


  
