import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/interfaces/company';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})

export class CompanyDetailsComponent implements OnInit {

  @Input() company!: Company

  constructor() {}

  ngOnInit(): void {
  }

}
