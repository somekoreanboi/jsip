import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../interfaces/company';
import {MatDialog} from '@angular/material/dialog';
import { OpportunitiesDialogComponent } from '../opportunities-dialog/opportunities-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AskDialogComponent } from '../ask-dialog/ask-dialog.component';
import { EditCompanyDialogComponent } from '../edit-company-dialog/edit-company-dialog.component';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {

  @Input() company!: Company;
  @Input() refreshCompanies!: () => void

  openOpportunities() {

    let dialogRef = this.dialog.open(OpportunitiesDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.company = this.company;
    
    // if (this.authService.isLoggedIn) {

    //   this.authService.isVerified().then(
    //     (value)=> {
    //       if (value) {
    //         let dialogRef = this.dialog.open(OpportunitiesDialogComponent);
    //         let instance = dialogRef.componentInstance;
    //         instance.company = this.company;
    //       } else {
    //         this.authService.openSnackBar("Your email is not verified yet!")
    //         this.router.navigate(['/email_verification']);
    //       }
    
    //     }
    //   )

    // } else {
    //   this.authService.openSnackBar("You are not logged in!")
    //   this.router.navigate(['/login']);
    // }

  }

  goToLink(){
    window.open(this.company.company_link, "_blank");
}

  constructor(public dialog: MatDialog, public authService: AuthenticationService, public router: Router) {}

  ngOnInit(): void {
  }

  deleteCompany(companyName: string) {
    this.authService.deleteCompany(companyName).then(()=> {
        this.authService.openSnackBar("Deleted successfully!")
        this.refreshCompanies();
    })
  }

  openDeleteAskDialog(): void {

  this.dialog.open(AskDialogComponent, {
   data: { 
     functionHolder: () => { this.deleteCompany(this.company.name!); }
    }
  });
}

openEditDialog(): void {
  let dialogRef = this.dialog.open(EditCompanyDialogComponent, {
   data: { 
     company: this.company,
     functionHolder: () => { this.refreshCompanies(); }
    }
  });
  let instance  = dialogRef.componentInstance;
  instance.company = this.company;
}



}
