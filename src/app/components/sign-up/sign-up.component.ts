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
    major: new FormControl('',),
    jobType: new FormControl('', [Validators.required]),
    standOut: new FormControl('',),
    reason: new FormControl('', [Validators.required]),
    expectation: new FormControl('', [Validators.required]),
    futureWorkplace: new FormControl('', [Validators.required]),
    industryField: new FormControl('', [Validators.required]),







  }, { validators: passwordsMatchValidator(), 
  },)


  countryFormControl = new FormControl('', [Validators.required])
  countryFormGroup!: FormGroup;

  selectedGender = 'male';

  defaultNationality: Country = {
    name: 'Singapore',
    alpha2Code: 'SG',
    alpha3Code: 'SGP',
    numericCode: '702',
    callingCode: '+65'
  };

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

  get yearOfStudy() {
    return this.signUpForm.get('yearOfStudy');
  }

  get dateOfBirth() {
    return this.signUpForm.get('dateOfBirth');
  }

  get nameOfUniversity() {
    return this.signUpForm.get('nameOfUniversity');
  }

  get graduationPeriod() {
    return this.signUpForm.get('graduationPeriod');
  }

  get japaneseProficiency() {
    return this.signUpForm.get('japaneseProficiency');
  }

  get major() {
    return this.signUpForm.get('major');
  }

  get jobType() {
    return this.signUpForm.get('jobType');
  }

  get standOut() {
    return this.signUpForm.get('standOut');
  }

  get reason() {
    return this.signUpForm.get('reason');
  }

  get expectation() {
    return this.signUpForm.get('expectation');
  }

  get futureWorkplace() {
    return this.signUpForm.get('futureWorkplace');
  }

  get industryField() {
    return this.signUpForm.get('industryField');
  }

}