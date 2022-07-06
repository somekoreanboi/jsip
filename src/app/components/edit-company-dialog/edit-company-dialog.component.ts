import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/interfaces/company';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-company-dialog',
  templateUrl: './edit-company-dialog.component.html',
  styleUrls: ['./edit-company-dialog.component.scss']
})
export class EditCompanyDialogComponent implements OnInit {

  @Input() company!: Company;
  refreshCompanies: Function;


  editCompanyForm = new FormGroup({
    name: new FormControl('', Validators.required,),
    profile: new FormControl('', Validators.required),
    company_link: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
    application_headline: new FormControl('', Validators.required),
  },)

  constructor(public authService: AuthenticationService, @Inject(MAT_DIALOG_DATA) data: { functionHolder: Function }) {
    this.refreshCompanies = data.functionHolder;
}

  ngOnInit(): void {
    this.name?.setValue(this.company.name);
    this.name?.disable();
    this.profile?.setValue(this.company.profile);
    this.company_link?.setValue(this.company.company_link);
    this.img?.setValue(this.company.img);
    this.application_headline?.setValue(this.application_headline);
  }

  makeCompany():Company { 
    const company: Company = {
      name: this.name?.value,
      profile: this.profile?.value,
      company_link: this.company_link?.value,
      img: this.img?.value,
      application_headline: this.application_headline?.value,
    }
    return company;

  }

  
  editCompany() {
    const newCompany: Company = this.makeCompany();
    if (this.editCompanyForm.valid) {
      this.authService.editCompany(newCompany).then((value)=> {
        if (value) {
          this.authService.openSnackBar("Company edited successfully!")
          this.refreshCompanies();
        }
      })
    } else {
      this.authService.openSnackBar("You didn't fill in the form properly!")
    }
  }


get name() {
  return this.editCompanyForm.get('name');
}

get profile() {
  return this.editCompanyForm.get('profile');
}

get company_link() {
  return this.editCompanyForm.get('company_link');
}

get img() {
  return this.editCompanyForm.get('img');
}

get application_headline() {
  return this.editCompanyForm.get('application_headline');
}



}
