import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../interfaces/company';
import {MatDialog} from '@angular/material/dialog';
import { CompanyDetailsComponent } from '../company-details/company-details.component';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {

  @Input() company!: Company;

  openCompanyDetails() {
    let dialogRef = this.dialog.open(CompanyDetailsComponent);
    let instance = dialogRef.componentInstance;
    instance.company = this.company;
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }



}
