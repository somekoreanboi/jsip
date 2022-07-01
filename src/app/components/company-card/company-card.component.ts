import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../interfaces/company';
import {MatDialog} from '@angular/material/dialog';
import { OpportunitiesDialogComponent } from '../opportunities-dialog/opportunities-dialog.component';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {

  @Input() company!: Company;

  openOpportunities() {
    let dialogRef = this.dialog.open(OpportunitiesDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.company = this.company;
  }

  goToLink(){
    window.open(this.company.company_link, "_blank");
}

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }



}
