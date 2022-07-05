import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Opportunity } from 'src/app/interfaces/opportunity';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-add-opportunity-dialog',
  templateUrl: './add-opportunity-dialog.component.html',
  styleUrls: ['./add-opportunity-dialog.component.scss']
})
export class AddOpportunityDialogComponent implements OnInit {
  
  @Input() companyName!: string;


  addOpportunityForm = new FormGroup({

  position: new FormControl('', Validators.required),
  job_overview: new FormControl('', Validators.required),
  qualifications: new FormControl('', Validators.required),
  period: new FormControl('', Validators.required),
  monthly_salary: new FormControl('', Validators.required),
  working_location: new FormControl('', Validators.required),
  },);


  constructor(public authService: AuthenticationService, @Inject(MAT_DIALOG_DATA) data: { 
    functionHolder: Function
   }) {
    this.refreshOpportunities = data.functionHolder;
}
  ngOnInit(): void {
  }

  refreshOpportunities: Function;

  makeOpportunity(): Opportunity { 
    const opportunity: Opportunity = {
      position: this.position?.value,
      job_overview: this.job_overview?.value,
      qualifications: this.qualifications?.value,
      period: this.period?.value,
      monthly_salary: this.monthly_salary?.value,
      working_location: this.working_location?.value,
    }
    return opportunity;
  }

  addOpportunity() {
    const newCompany: Opportunity = this.makeOpportunity();
    if (this.addOpportunityForm.valid) {
      this.authService.addOpportunity(this.companyName, newCompany).then((value)=> {
        if (value) {
          this.refreshOpportunities();
          this.authService.openSnackBar("Opportunity added successfully!")
        }
      })
    } else {
      this.authService.openSnackBar("You didn't fill in the form properly!")
    }
  }

  get position() {
    return this.addOpportunityForm.get('position');
  }

  get job_overview() {
    return this.addOpportunityForm.get('job_overview');
  }
  
  get qualifications() {
    return this.addOpportunityForm.get('qualifications');
  }

  get period() {
    return this.addOpportunityForm.get('period');
  }

  get monthly_salary() {
    return this.addOpportunityForm.get('monthly_salary');
  }

  get working_location() {
    return this.addOpportunityForm.get('working_location');
  }



}
