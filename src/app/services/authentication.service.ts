import { Injectable, NgZone } from '@angular/core';
import { UserProfile } from '../models/user-profile';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any; // Save logged in user data

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
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
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
          }
        });
        // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        //   `users/${email}`
        // );
        // userRef.
        // ref
        // .get()
        // .then((doc) => {
        //     if (doc.exists) {
        //         const userProfile: UserProfile = doc.data();
        //         this.SetUserData(userProfile);
        //     } else {
        //         window.alert("Error while loading user data!")
        //     }
        //  })

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password, and other required information
  SignUp(userProfile: UserProfile) {
    return this.afAuth
      .createUserWithEmailAndPassword(userProfile.email, userProfile.password!)
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
    const user = JSON.parse(localStorage.getItem('user')!);
    //Todo: Implement email verification function
    // return user !== null && user.emailVerified !== false ? true : false;
    return user !== null ? true : false;
  }

  // Returns true when user is looged in and email is verified
  get isVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
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
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      window.location.reload();
      this.router.navigate(['/home']);
      //refresh when sign out
  
      window.alert("logged out successfully!")
    });
  }

  // checkVerification() {
  //   if (this.isLoggedIn) {
  //     if (this.isVerified) {
  //       return;
  //     } else {
  //       window.alert("Your email is not verified yet!")
  //       this.router.navigate(['email_verification']);
  //     }
  //   } 
  // }
}