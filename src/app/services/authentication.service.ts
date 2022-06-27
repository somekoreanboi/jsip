import { Injectable, NgZone } from '@angular/core';
import { UserProfile } from '../models/user-profile';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
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

  public sendNotificationMail(userProfile: UserProfile) {
    emailjs.send("service_14f2b2e","template_faqxazn",{
      name: userProfile.name,
      email: userProfile.email,
      nationality: userProfile.nationality,
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
      reason: userProfile.reason,
      expectation: userProfile.expectation,
      standOut: userProfile.standOut,
      },
      'WGH4g3DXxavORwVuf'
      );
    // emailjs.sendForm("service_14f2b2e","template_faqxazn", this.signUpForm);
}

  // Sign in with email/password
  SignIn(email:string, password:string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
          `users/${email}`
        );
        // const userProfile: UserProfile = {
        //   name = userRef.get(),
        //   email: string,
        //   password: string,
        //   nationality: string,
        //   birthday: string,
        //   gender: string,
        //   universityName: string,
        //   graduationPeriod: string,
        //   yearOfStudy: string,
        //   faculty: string,
        //   japaneseProficiency: string,
        //   futureWorkPlace: string,
        //   interestedIndustry: string,
        //   reason: string,
        //   expectation: string,
        //   standOut: string,
        // }
        // this.SetUserData(userProfile);
        console.log("testasdfasfdasdfasdftestsdfsdf");
        userRef.
        ref
        .get()
        .then((doc) => {
            if (doc.exists) {
                const userProfile: UserProfile = doc.data();
                this.SetUserData(userProfile);
            } else {
                window.alert("Error while loading user data!")
            }
         })

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password, and other required information
  SignUp(userProfile: UserProfile) {
    return this.afAuth
      .createUserWithEmailAndPassword(userProfile.email, userProfile.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(userProfile);
        this.sendNotificationMail(userProfile);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser
  //     .then((u: any) => u.sendEmailVerification())
  //     .then(() => {
  //       this.router.navigate(['verify-email-address']);
  //     });
  // }

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


  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    //Todo: Implement email verification function
    // return user !== null && user.emailVerified !== false ? true : false;
    return user !== null ? true : false;
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
      //refresh when sign out
      window.location.reload();
      this.router.navigate(['/']);
    });
  }
}