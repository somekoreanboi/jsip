import { Component, OnInit } from '@angular/core';
import {Country} from '@angular-material-extensions/select-country'; 
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserProfile } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import * as _moment from 'moment';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  selectedGender = 'male';
  isEditing = false;

  signUpForm = new FormGroup({
    name: new FormControl({value: '', disabled: true}, Validators.required),
    email: new FormControl({value: '', disabled: true}, [Validators.email, Validators.required]),
    gender: new FormControl({value: '', disabled: true}, [Validators.required]),
    dateOfBirth: new FormControl({value: '', disabled: true}, [Validators.required]),
    nameOfUniversity: new FormControl({value: '', disabled: true}, [Validators.required]),
    graduationPeriod: new FormControl({value: '', disabled: true}, [Validators.required]),
    yearOfStudy: new FormControl({value: '', disabled: true}, [Validators.required]),
    japaneseProficiency: new FormControl({value: '', disabled: true}, [Validators.required]),
    major: new FormControl({value: '', disabled: true},),
    jobType: new FormControl({value: '', disabled: true}, [Validators.required]),
    // standOut: new FormControl('',),
    // reason: new FormControl('', [Validators.required]),
    // expectation: new FormControl('', [Validators.required]),
    futureWorkplace: new FormControl({value: '', disabled: true}, [Validators.required]),
    industryField: new FormControl({value: '', disabled: true}, [Validators.required]),
    nationality: new FormControl({value: '', disabled: true}, [Validators.required]),
  },)

  toggleEditMode() {
    if(!this.isEditing){
      this.isEditing = true;
      this.authService.openSnackBar("You can edit your profile now!");
      this.name?.enable();
      this.email?.enable();
      this.gender?.enable();
      this.dateOfBirth?.enable();
      this.nameOfUniversity?.enable();
      this.graduationPeriod?.enable();
      this.yearOfStudy?.enable();
      this.japaneseProficiency?.enable();
      this.major?.enable();
      this.jobType?.enable();
      this.futureWorkplace?.enable();
      this.industryField?.enable();
      this.nationality?.enable();
    }
}




  constructor(private formBuilder: FormBuilder, public authService: AuthenticationService,  public afs: AngularFirestore,
    public dialog: MatDialog) {
   }

  ngOnInit(): void {
    const user_mail = JSON.parse(localStorage.getItem('user')!).email;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user_mail}`
    );
    userRef.
    ref
    .get()
    .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          console.log(doc.data());
          this.setData(userData);
        } else {
            window.alert("Error while loading user data!")
        }
      })

  }

  setData(userData: any) {

    this.signUpForm.setValue({
      name: userData.name,
      email: userData.email,
      nationality: userData.nationality,
      dateOfBirth: userData.birthday,
      nameOfUniversity: userData.universityName,
      graduationPeriod: userData.graduationPeriod,
      yearOfStudy: userData.yearOfStudy,
      japaneseProficiency: userData.japaneseProficiency,
      major: userData.faculty,
      jobType: userData.jobType.split(','),
      futureWorkplace: userData.futureWorkPlace.split(','),
      industryField: userData.interestedIndustry.split(','),
      gender: userData.gender,
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

  get futureWorkplace() {
    return this.signUpForm.get('futureWorkplace');
  }

  get industryField() {
    return this.signUpForm.get('industryField');
  }

  get nationality() {
    return this.signUpForm.get('nationality');
  }

  openResetPasswordDialog() {
    this.dialog.open(ResetPasswordDialogComponent, {});
  }

  convertMoment(date: any) {
    const momentDate = new Date(date); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    return formattedDate;
  }

  cancelEdit() {
    this.isEditing = false;
    this.name?.disable();
    this.email?.disable();
    this.gender?.disable();
    this.dateOfBirth?.disable();
    this.nameOfUniversity?.disable();
    this.graduationPeriod?.disable();
    this.yearOfStudy?.disable();
    this.japaneseProficiency?.disable();
    this.major?.disable();
    this.jobType?.disable();
    this.futureWorkplace?.disable();
    this.industryField?.disable();
    this.nationality?.disable(); 
  }

  submitEdit() {
    const userData: UserProfile = {
      name: this.name?.value,
      email: this.email?.value,
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
    };

    
    console.log(userData);

    if (this.signUpForm.valid) {
      this.authService.SetUserData(userData).then(() => {
        this.isEditing = false;
        this.name?.disable();
        this.email?.disable();
        this.gender?.disable();
        this.dateOfBirth?.disable();
        this.nameOfUniversity?.disable();
        this.graduationPeriod?.disable();
        this.yearOfStudy?.disable();
        this.japaneseProficiency?.disable();
        this.major?.disable();
        this.jobType?.disable();
        this.futureWorkplace?.disable();
        this.industryField?.disable();
        this.nationality?.disable();
        this.authService.openSnackBar("Your profile is edited successfully!");
      }).catch((error) => {
        window.alert(error.message);
      });
    } else {
      window.alert("It seems like you didn't fill in the profile properly!");
    }
  }

}
