import { Component, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import {Country} from '@angular-material-extensions/select-country'; 
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserProfile } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as moment from 'moment';


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
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
    // standOut: new FormControl('',),
    // reason: new FormControl('', [Validators.required]),
    // expectation: new FormControl('', [Validators.required]),
    futureWorkplace: new FormControl('', [Validators.required]),
    industryField: new FormControl('', [Validators.required]),
    nationality: new FormControl('', [Validators.required]),



  }, { validators: passwordsMatchValidator(), 
  },)



  selectedGender = 'male';

  defaultNationality: Country = {
    name: 'Singapore',
    alpha2Code: 'SG',
    alpha3Code: 'SGP',
    numericCode: '702',
    callingCode: '+65'
  };

  constructor(private formBuilder: FormBuilder, public authService: AuthenticationService,) {
   }

  ngOnInit(): void {

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

  // get standOut() {
  //   return this.signUpForm.get('standOut');
  // }

  // get reason() {
  //   return this.signUpForm.get('reason');
  // }

  // get expectation() {
  //   return this.signUpForm.get('expectation');
  // }

  get futureWorkplace() {
    return this.signUpForm.get('futureWorkplace');
  }

  get industryField() {
    return this.signUpForm.get('industryField');
  }

  get nationality() {
    return this.signUpForm.get('nationality');
  }
  
  convertMoment(date: any) {
    const momentDate = new Date(date); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    return formattedDate;
  }

  signup() {
    const userData: UserProfile = {
      name: this.name?.value,
      email: this.email?.value,
      password: this.password?.value,
      nationality: this.nationality?.value,
      birthday: this.convertMoment(this.dateOfBirth?.value),
      gender: this.gender?.value,
      universityName: this.nameOfUniversity?.value,
      graduationPeriod: this.convertMoment(this.graduationPeriod?.value),
      yearOfStudy: this.yearOfStudy?.value,
      faculty: this.major?.value,
      japaneseProficiency: this.japaneseProficiency?.value,
      futureWorkPlace: this.futureWorkplace?.value.toString(),
      jobType: this.jobType?.value.toString(),
      interestedIndustry: this.industryField?.value.toString(),
      // reason: this.reason?.value,
      // expectation: this.expectation?.value,
      // standOut: this.standOut?.value,
    };

    if (this.signUpForm.valid) {
      this.authService.SignUp(userData)
    } else {
      this.authService.openSnackBar("It seems like you didn't fill in the sign-up form properly!");
    }
  }

}
