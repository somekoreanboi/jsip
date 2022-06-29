import { Component, OnInit } from '@angular/core';
import {Country} from '@angular-material-extensions/select-country'; 
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserProfile } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
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



  },)



  selectedGender = 'male';

  defaultNationality: Country = {
    name: 'Singapore',
    alpha2Code: 'SG',
    alpha3Code: 'SGP',
    numericCode: '702',
    callingCode: '+65'
  };

  constructor(private formBuilder: FormBuilder, public authService: AuthenticationService,  public afs: AngularFirestore,) {
   }

  ngOnInit(): void {

      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${this.authService.userData.email}`
    );
    userRef.
    ref
    .get()
    .then((doc) => {
        if (doc.exists) {
            const userProfile: UserProfile = doc.data();
            console.log(userProfile);
        } else {
            window.alert("Error while loading user data!")
        }
      })

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


  

  signup() {
    const userData: UserProfile = {
      name: this.name?.value,
      email: this.email?.value,
      password: this.password?.value,
      nationality: this.nationality?.value.name,
      birthday: this.dateOfBirth?.value,
      gender: this.gender?.value,
      universityName: this.nameOfUniversity?.value,
      graduationPeriod: this.graduationPeriod?.value,
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
      window.alert("It seems like you didn't fill in the sign-up form properly!");
    }
  }

}
