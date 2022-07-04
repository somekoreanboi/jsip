import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyDialogComponent } from '../components/add-company-dialog/add-company-dialog.component';
import { Company } from '../interfaces/company';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-picture-grid',
  templateUrl: './picture-grid.component.html',
  styleUrls: ['./picture-grid.component.scss']
})
export class PictureGridComponent implements OnInit {

  companies?: Company[];


openCompanyAddDialog() {
  this.matDialog.open(AddCompanyDialogComponent, {
    data: {functionHolder: () => { this.getCompanies(); } }
  });
}

getCompanies() {
  this.authService.GetAllCompanies().then((companies)=> {
    this.companies = companies;
  });
}

  constructor(public authService: AuthenticationService, public matDialog: MatDialog) { }

  ngOnInit(): void {

    this.getCompanies();

  }

}
