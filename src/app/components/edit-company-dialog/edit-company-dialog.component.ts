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
    description: new FormControl('', Validators.required),
    company_link: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
    ourBusiness: new FormControl('', Validators.required),
  },)

  constructor(public authService: AuthenticationService, @Inject(MAT_DIALOG_DATA) data: { functionHolder: Function }) {
    this.refreshCompanies = data.functionHolder;
}

  ngOnInit(): void {
    this.name?.setValue(this.company.name);
    this.name?.disable();
    this.description?.setValue(this.company.description);
    this.company_link?.setValue(this.company.company_link);
    this.img?.setValue(this.company.img);
    this.ourBusiness?.setValue(this.company.ourBusiness); 
  }

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

get description() {
  return this.editCompanyForm.get('description');
}

get company_link() {
  return this.editCompanyForm.get('company_link');
}

get img() {
  return this.editCompanyForm.get('img');
}

get ourBusiness() {
  return this.editCompanyForm.get('ourBusiness');
}

}
