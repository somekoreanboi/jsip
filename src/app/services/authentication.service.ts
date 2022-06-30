import { Injectable, NgZone } from '@angular/core';
import { UserProfile } from '../models/user-profile';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from '../interfaces/company';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData?: UserProfile; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private _snackBar: MatSnackBar,
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.GetUserData(user.email!).then(()=>{
          console.log((this.userData));
          localStorage.setItem('user', JSON.stringify(this.userData));
        }); 
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "OK", {
      duration: 5000,
    });
  }

  public sendNewMemberMail(userProfile: UserProfile) {
    emailjs.send("service_14f2b2e","template_faqxazn",{
      name: userProfile.name,
      email: userProfile.email,
      nationality: userProfile.nationality?.name,
      birthday: userProfile.birthday,
      gender: userProfile.gender,
      universityName: userProfile.universityName,
      graduationPeriod: userProfile.graduationPeriod,
      yearOfStudy: userProfile.yearOfStudy,
      faculty: userProfile.faculty,
      japaneseProficiency: userProfile.japaneseProficiency,
      futureWorkPlace: userProfile.futureWorkPlace,
      jobType: userProfile.jobType,
      interestedIndustry: userProfile.interestedIndustry,
      // reason: userProfile.reason,
      // expectation: userProfile.expectation,
      // standOut: userProfile.standOut,
      },
      'WGH4g3DXxavORwVuf'
      );
}

  // Sign in with email/password
  SignIn(email:string, password:string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          if (!result.user?.emailVerified) {
            this.router.navigate(['/email_verification']);
            this.openSnackBar("Your email is not verified yet!");
          } else {
            this.router.navigate(['/']);
            this.openSnackBar("Logged in successfully!");
            this.isAdmin()
          }
        });

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password, and other required information
  SignUp(userProfile: UserProfile) {
    return this.afAuth
      .createUserWithEmailAndPassword(userProfile.email!, userProfile.password!)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(userProfile);
        this.sendNewMemberMail(userProfile);
        this.router.navigate(['/']);
        this.openSnackBar("Signed up successfully!")
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['email_verification']);
        this.openSnackBar("Verification email sent successfully!");
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }


  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    console.log(localStorage.getItem('user')!);
    const user = JSON.parse(localStorage.getItem('user')!);
    // return user !== null && user.emailVerified !== false ? true : false;
    return user !== null ? true : false;
  }

  // Returns true if the email is verified
  async isVerified() {
    // const user = JSON.parse(localStorage.getItem('user')!);
    const currentUser = await this.afAuth.currentUser;
    return currentUser?.emailVerified;
  }

  // // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
  //     if (res) {
  //       this.router.navigate(['/']);
  //     }
  //   });
  // }
//Auth login and google login shall be implemented later
  // // Auth logic to run auth providers
  // AuthLogin(provider: any) {
  //   return this.afAuth
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['/']);
  //       });
  //       this.SetUserData(result.user);        
  //     })
  //     .catch((error) => {
  //       window.alert(error);
  //     });
  // }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: UserProfile) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.email}`
    );

    return userRef.set(user, {
      merge: true,
    }).then(()=>{
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = undefined;
      window.location.reload();
      this.router.navigate(['/home']);
      //refresh when sign out
  
      window.alert("logged out successfully!")
    });
  }

  resetPassword() {
    const user_mail = this.userData?.email;
    return this.afAuth.sendPasswordResetEmail(user_mail!).
    then(() => {
      this.openSnackBar("An email for password reset has been sent successfully to your email!");
    });
  }

  isAdmin() {
    const user_mail = this.userData?.email;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user_mail}`
    );
    userRef.
    ref
    .get()
    .then((doc) => {
        if (doc.exists) {
          console.log(doc.data().is_admin);
        }
      })
  }

  GetUserData(email: string) {
    // const user_mail = JSON.parse(localStorage.getItem('user')!).email;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${email}`
    );
    return userRef.
    ref
    .get()
    .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const userData = this.parseUser(data);
          this.userData = userData;
          console.log(this.userData);
        } else {
            window.alert("Error while loading user data!")
        }
      })

  }

  parseUser(data: any): UserProfile {
    return {
      name: data.name,
      email: data.email,
      password: data.password,
      nationality: data.nationality,
      birthday: data.birthday,
      gender: data.gender,
      universityName: data.universityName,
      graduationPeriod: data.graduationPeriod,
      yearOfStudy: data.yearOfStudy,
      faculty: data.faculty,
      japaneseProficiency: data.japaneseProficiency,
      futureWorkPlace: data.futureWorkPlace,
      jobType: data.jobType,
      interestedIndustry: data.interestedIndustry,
      is_admin: data.is_admin,
    }
  }

  async GetAllCompanies() {
    const companies: Company[] = [];
    const companyCollection: AngularFirestoreCollection<Company> = this.afs.collection(
      `companies/`
    );
    await companyCollection.ref.get()
    .then((querySnapshot) => { 
      querySnapshot.forEach(async (company_detail) => {
        let company: Company = company_detail.data();
        const opportunitiesCollection = companyCollection.doc(company_detail.id).collection("opportunities").get();
        opportunitiesCollection.forEach(opportunity => {
          opportunity.forEach(doc => {
              let opportunity_data = doc.data();
              if (company.opportunities == null)  {
                company.opportunities = [];
              }
              company.opportunities?.push(opportunity_data);
          })
      });
      companies.push(company);
      })
      
   }).catch((error)=>{
        window.alert(error.message);
      })

      console.log(companies);
      return companies;

  }

}