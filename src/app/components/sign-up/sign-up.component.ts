import { Component, OnInit } from '@angular/core';
import {Country} from '@angular-material-extensions/select-country'; 
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password != confirmPassword) {
      return {
        passwordsDontMatch: true
      }
    }

    return null;

  };


}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', Validators.required),
    gender: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    nameOfUniversity: new FormControl('', [Validators.required]),
    graduationPeriod: new FormControl('', [Validators.required]),
    yearOfStudy: new FormControl('', [Validators.required]),
    japaneseProficiency: new FormControl('', [Validators.required]),
    major: new FormControl('', [Validators.required]),
    jobType: new FormControl('', [Validators.required]),




  }, { validators: passwordsMatchValidator(), 
  },)


  industryField = this.formBuilder.group({
    consulting: false,
    manufacturingCompany: false,
    IT: false,
    foodIndustry: false,
    media: false,
    banking: false,
    realEstate: false,
    employmentAgency: false,
    advertisingAgency: false,
    npo: false,
    etc: false,
  });

  countryFormControl = new FormControl();
  countryFormGroup!: FormGroup;

  selectedGender = 'male';

  constructor(private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.countryFormGroup = this.formBuilder.group({
      country: [
        {
        name: 'Singapore',
        alpha2Code: 'SG',
        alpha3Code: 'SGP',
        numericCode: '702'
      }
  ]
    });

    this.countryFormGroup?.get('country')?.valueChanges
.subscribe(country => console
.log('this.countryFormGroup.get("country").valueChanges', country));

    this.countryFormControl.valueChanges
.subscribe(country => console
.log('this.countryFormControl.valueChanges', country));
  }


  onCountrySelected($event: Country) {
    console.log($event);
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get gender() {
    return this.signUpForm.get('gender');
  }

}
