import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/interfaces/company';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-add-company-dialog',
  templateUrl: './add-company-dialog.component.html',
  styleUrls: ['./add-company-dialog.component.scss']
})
export class AddCompanyDialogComponent implements OnInit {

  addCompanyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    company_link: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
    ourBusiness: new FormControl('', Validators.required),
  },)

  constructor(public authService: AuthenticationService, @Inject(MAT_DIALOG_DATA) data: { functionHolder: Function }) {
    this.refreshCompanies = data.functionHolder;
}

  ngOnInit(): void {
  }

  refreshCompanies: Function;

  makeCompany():Company { 
    const company: Company = {
      name: this.name?.value,
      description: this.description?.value,
      company_link: this.company_link?.value,
      img: this.img?.value,
      ourBusiness: this.ourBusiness?.value, 
    }
    return company;

  }

  
  addCompany() {
    const newCompany: Company = this.makeCompany();
    if (this.addCompanyForm.valid) {
      this.authService.addCompany(newCompany).then((value)=> {
        if (value) {
          this.refreshCompanies();
          this.authService.openSnackBar("Company added successfully!")
        }
      })
    } else {
      this.authService.openSnackBar("You didn't fill in the form properly!")
    }
  }


get name() {
  return this.addCompanyForm.get('name');
}

get description() {
  return this.addCompanyForm.get('description');
}

get company_link() {
  return this.addCompanyForm.get('company_link');
}

get img() {
  return this.addCompanyForm.get('img');
}

get ourBusiness() {
  return this.addCompanyForm.get('ourBusiness');
}

}
