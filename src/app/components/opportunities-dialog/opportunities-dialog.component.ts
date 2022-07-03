import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/interfaces/company';
import { Opportunity } from 'src/app/interfaces/opportunity';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AddOpportunityDialogComponent } from '../add-opportunity-dialog/add-opportunity-dialog.component';
import { AskDialogComponent } from '../ask-dialog/ask-dialog.component';
import { EditOpportunityDialogComponent } from '../edit-opportunity-dialog/edit-opportunity-dialog.component';
import { OpportunityDetailsComponent } from '../opportunity-details/opportunity-details.component';

@Component({
  selector: 'app-opportunities-dialog',
  templateUrl: './opportunities-dialog.component.html',
  styleUrls: ['./opportunities-dialog.component.scss']
})
export class OpportunitiesDialogComponent implements OnInit {

  @Input() company!: Company;

  constructor(public dialog: MatDialog, public authService: AuthenticationService) {
}

  ngOnInit(): void {
  }

  openOpportunityDetail(opportunity: Opportunity) {
    let dialogRef = this.dialog.open(OpportunityDetailsComponent);
    let instance  = dialogRef.componentInstance;
    instance.opportunity = opportunity;
    instance.companyName = this.company.name;
    instance.companyDescription = this.company.description;
    instance.companyBusiness = this.company.description;
  }

  openEditDialog(opportunityPosition: string) {
    let dialogRef = this.dialog.open(EditOpportunityDialogComponent, {
      data: { 
        company: this.company,
        functionHolder: () => { this.getOpportunities(); }
       }
     });
     let instance  = dialogRef.componentInstance;
     instance.companyName = this.company.name!;
     instance.opportunityPosition = opportunityPosition;
  }

  deleteOppportunity(companyName: string, opportunityId: string) {
    this.authService.deleteOpportunity(companyName, opportunityId).then(()=> {
      this.authService.openSnackBar('Opportunity deleted successfully!')
      this.getOpportunities();
    })
  }

  openDeleteAskDialog(companyName: string,  opportunityId: string) {
    this.dialog.open(AskDialogComponent, {
      data: { 
        functionHolder: () => { this.deleteOppportunity(companyName, opportunityId); }
       }
     });
  }


  openAddOpportunityDialog() {
    var dialog = this.dialog.open(AddOpportunityDialogComponent, {
      data: {functionHolder: () => { this.getOpportunities(); } }
    });
    dialog.componentInstance.companyName = this.company.name!;
  }

  getOpportunities() {
    this.authService.GetOpportunities(this.company.name!).then((opportunities)=> {
      this.company.opportunities = opportunities;
    })
  }

}
