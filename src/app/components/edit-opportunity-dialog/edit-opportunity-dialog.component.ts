import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Opportunity } from 'src/app/interfaces/opportunity';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-opportunity-dialog',
  templateUrl: './edit-opportunity-dialog.component.html',
  styleUrls: ['./edit-opportunity-dialog.component.scss']
})
export class EditOpportunityDialogComponent implements OnInit {

  @Input() companyName!: string;
  @Input() opportunityPosition!: string;


  editOpportunityForm = new FormGroup({

  position: new FormControl('', Validators.required),
  job_overview: new FormControl('', Validators.required),
  qualifications: new FormControl('', Validators.required),
  period: new FormControl('', Validators.required),
  monthly_salary: new FormControl('', Validators.required),
  working_location: new FormControl('', Validators.required),
  other: new FormControl(''),
  },);


  constructor(public authService: AuthenticationService, @Inject(MAT_DIALOG_DATA) data: { 
    functionHolder: Function
   }) {
    this.refreshOpportunities = data.functionHolder;
}
  ngOnInit(): void {
    this.authService.getOpportunityDetail(this.companyName, this.opportunityPosition).then(
      (value)=> {
        this.position?.setValue(value.position);
        this.position?.disable();
        this.job_overview?.setValue(value.job_overview);
        this.qualifications?.setValue(value.qualifications);
        this.period?.setValue(value.period);
        this.monthly_salary?.setValue(value.monthly_salary);
        this.working_location?.setValue(value.working_location);
        this.other?.setValue(value.other)
      }
    )
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
      other: this.other?.value,
    }
    return opportunity;
  }

  editOpportunity() {
    const newCompany: Opportunity = this.makeOpportunity();
    if (this.editOpportunityForm.valid) {
      this.authService.editOpportunity(this.companyName, newCompany).then((value)=> {
        if (value) {
          this.refreshOpportunities();
          this.authService.openSnackBar("Opportunity edited successfully!")
        }
      })
    } else {
      this.authService.openSnackBar("You didn't fill in the form properly!")
    }
  }

  get position() {
    return this.editOpportunityForm.get('position');
  }

  get job_overview() {
    return this.editOpportunityForm.get('job_overview');
  }
  
  get qualifications() {
    return this.editOpportunityForm.get('qualifications');
  }

  get period() {
    return this.editOpportunityForm.get('period');
  }

  get monthly_salary() {
    return this.editOpportunityForm.get('monthly_salary');
  }

  get working_location() {
    return this.editOpportunityForm.get('working_location');
  }

  get other() {
    return this.editOpportunityForm.get('other');
  }

}
