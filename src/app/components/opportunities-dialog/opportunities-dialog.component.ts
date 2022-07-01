import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/interfaces/company';
import { Opportunity } from 'src/app/interfaces/opportunity';
import { OpportunityDetailsComponent } from '../opportunity-details/opportunity-details.component';

@Component({
  selector: 'app-opportunities-dialog',
  templateUrl: './opportunities-dialog.component.html',
  styleUrls: ['./opportunities-dialog.component.scss']
})
export class OpportunitiesDialogComponent implements OnInit {

  @Input() company!: Company;

  constructor(public dialog: MatDialog) {
}

  ngOnInit(): void {
  }

  openOpportunityDetail(opportunity: Opportunity) {
    let dialogRef = this.dialog.open(OpportunityDetailsComponent);
    let instance  = dialogRef.componentInstance;
    instance.opportunity = opportunity;
  }
}
