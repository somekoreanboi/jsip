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
import { Opportunity } from '../interfaces/opportunity';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData?: UserProfile; // Save logged in user data

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private _snackBar: MatSnackBar,
    private http: HttpClient,
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.GetUserData(user.email!).then(()=>{
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

  public sendNewMemberMail() {
    emailjs.send("service_14f2b2e","template_faqxazn",{
      name: this.userData?.name,
      email: this.userData?.email,
      nationality: this.userData?.nationality?.name,
      birthday: this.userData?.birthday,
      gender: this.userData?.gender,
      universityName: this.userData?.universityName,
      graduationPeriod: this.userData?.graduationPeriod,
      yearOfStudy: this.userData?.yearOfStudy,
      faculty: this.userData?.faculty,
      japaneseProficiency: this.userData?.japaneseProficiency,
      futureWorkPlace: this.userData?.futureWorkPlace,
      jobType: this.userData?.jobType,
      interestedIndustry: this.userData?.interestedIndustry,
      // reason: userProfile.reason,
      // expectation: userProfile.expectation,
      // standOut: userProfile.standOut,
      },
      'WGH4g3DXxavORwVuf'
      );
}

public sendJobApplicationMail(companyName?: string,
  companyDescription?: string, companybusiness?: string, opportunity?: Opportunity) {
  emailjs.send("service_14f2b2e","template_3p1n6is",{
    name: this.userData?.name,
    email: this.userData?.email,
    nationality: this.userData?.nationality?.name,
    birthday: this.userData?.birthday,
    gender: this.userData?.gender,
    universityName: this.userData?.universityName,
    graduationPeriod: this.userData?.graduationPeriod,
    yearOfStudy: this.userData?.yearOfStudy,
    faculty: this.userData?.faculty,
    japaneseProficiency: this.userData?.japaneseProficiency,
    futureWorkPlace: this.userData?.futureWorkPlace,
    jobType: this.userData?.jobType,
    interestedIndustry: this.userData?.interestedIndustry,
    company_name: companyName,
    company_description: companyDescription,
    company_business: companybusiness,
    job_overview: opportunity?.job_overview,
    qualifications: opportunity?.qualifications,
    period: opportunity?.period,
    monthly_salary: opportunity?.monthly_salary,
    working_location: opportunity?.working_location,
    other: opportunity?.other
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
            this.isAdmin;
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
        this.SetUserData(userProfile).then(()=> {
          this.sendNewMemberMail();
          this.router.navigate(['/email_verification']);
          this.openSnackBar("Signed up successfully Please verify your email!")
        })
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
    // return user !== null && user.emailVerified !== false ? true : false;
    return user !== null ? true : false;
  }

  // Returns true if the email is verified
  async isVerified() {
    const localUser = JSON.parse(localStorage.getItem('user')!);
    let currentUser = await this.afAuth.currentUser;
    var beforeVerification = currentUser?.emailVerified && localUser.emailVerified;
    await currentUser?.reload();
    currentUser = await this.afAuth.currentUser;
    var afterVerification = currentUser?.emailVerified;
    // If the email is verified for the first time
    if (!beforeVerification && afterVerification && localStorage.getItem('welcomed' + this.userData?.email) != 'true') {
      this.sendWelcomeMail();
      localStorage.setItem('welcomed' + this.userData?.email, 'true');
    }
    return afterVerification;
  }

  get isAdmin(): boolean {
    if (this.userData == null) {
      return false;
    }
    return this.userData.is_admin!;
  }


sendWelcomeMail() {
  var mail = {
  to: this.userData?.email,
  message: {
    subject: "Welcome to JLink!",
    text:
    `Dear ${this.userData?.name},


    A very warm welcome to JLink and thank you for signing up with us!
    
    Now, you will be able to apply to any companies listed on our website.
    
    Click the link below to find out what positions are available!
    https://jap-link.com/companies
    
    Please remember to join our telegram channel so that you can receive the latest news updates for internship or job opportunities!
    
    Click the link below to join our telegram channel!
    https://t.me/+3BPmT3QfhwU3Zjc1
    
    For any inquiry, please contact us at contact@jpsg-link.com
    
    Welcome to JLink again and we wish you all the best in your internship and job applications!
    
    Yours sincerely,
    JLink Team`,
  }

}

const mailRef: AngularFirestoreDocument<any> = this.afs.doc(
  `mails/${this.userData?.email}welcomed`
);

return mailRef.ref.get().then(doc=> {
  if (doc.exists) {
  } else {
    mailRef.set(mail, {
      merge: true
    }).then(value=>{
    })
  }
})

}

  sendAppliedMail(companyName: string, opportunity_id: string) {
    var mail = {
    // to: this.userData?.email,
    to: "info@jpsg-link.com",
    message: {
      subject: "[JLink] Your application has been received",
      text:
      `Dear ${this.userData?.name},
      

    We have received your application for ${companyName} and it is currently being reviewed.

    Successful applicants will receive an email from the company in a few weeks.
    
    Rest assured that in the event of an unsuccessful application, an email will be sent out to inform you of the result. In the meantime, we seek your patience and understanding.
    
    For any inquiry, please contact us at contact@jpsg-link.com
    
    We wish you all the best in your application!
    
    Yours sincerely,
    JLink Team`,
    }

  }

  const mailRef: AngularFirestoreDocument<any> = this.afs.doc(
    `mails/${this.userData?.email}${opportunity_id}`
  );

  return mailRef.ref.get().then(doc=> {
    if (doc.exists) {
      throw new Error("You have applied already!")
    } else {
      mailRef.set(mail, {
        merge: true
      }).then(value=>{
      })
    }
  })

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
      is_admin: (data.is_admin == null) ? false : data.is_admin,
      applied_opportunities: (data.applied_opportunities == null) ? [] : data.applied_opportunities,
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
              let opportunity_data: Opportunity = doc.data();
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

      return companies;

  }

  
  getOpportunityDetail(companyName: string, opportunityPosition: string) {
    var opportunityRef: AngularFirestoreDocument<any> = this.afs.doc(
      `companies/${companyName}/opportunities/${opportunityPosition}`
    );

    return opportunityRef.ref.get().then(doc=> {
      if (!doc.exists) {
        throw new Error("The opportunity data doesn't exist!");
      } else {
        return doc.data();
      }
    })
  }

  GetOpportunities(companyName: string) {
    var companyRef: AngularFirestoreDocument<any> = this.afs.doc(
      `companies/${companyName}`
    );
    var opportunities: Opportunity[] = [];

    companyRef.ref.get().then(doc=> {
      if (!doc.exists) {
        throw new Error("The company data doesn't exist!");
      }
    })

    const opportunityCollection = companyRef.collection('opportunities');
    return opportunityCollection.ref.get().then((collection)=> {
      collection.forEach(opportunity=> {
        opportunities.push(opportunity.data());
      })
    }).then(()=> {
      return opportunities;
    })
  }

  deleteOpportunity(companyName: string, opportunityPosition: string) {
    var opportunityRef: AngularFirestoreDocument<any> = this.afs.doc(
      `companies/${companyName}/opportunities/${opportunityPosition}`
    );

    return opportunityRef.ref.get().then(doc=> {
      if (!doc.exists) {
        throw new Error("The opportunity data doesn't exist!");
      } else {
        return opportunityRef.delete();
      }
    })

  }

  editOpportunity(companyName: string, opportunity: Opportunity) {
    var opportunityRef: AngularFirestoreDocument<any> = this.afs.doc(
      `companies/${companyName}/opportunities/${opportunity.position}`
    );

    return opportunityRef.ref.get().then(doc=> {
      if (!doc.exists) {
        throw new Error("The opportunity data doesn't exist!");
      } else {
        return opportunityRef.set(opportunity, {
          merge: true,
        }).then(()=> {
          return true;
        })
      }
    })

  }

  addOpportunity(companyName: string, opportunity: Opportunity) {
    var opportunityRef: AngularFirestoreDocument<any> = this.afs.doc(
      `companies/${companyName}/opportunities/${opportunity.position}`
    );

    return opportunityRef.ref.get().then(doc=> {
      if (doc.exists) {
        throw new Error("The opportunity data exists already!");
      } else {
        return opportunityRef.set(opportunity, {
          merge: true,
        }).then(()=> {
          return true;
        })
      }
    })

  }

  async checkAndAddAppliedCompany(opportunity_id: string) {
    if (this.userData?.applied_opportunities != null) {
      if (this.userData.applied_opportunities.includes(opportunity_id)) {
        this.openSnackBar("You already have applied!")
        return false;
      }
    }

    this.userData?.applied_opportunities?.push(opportunity_id);

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${this.userData!.email}`
    );

    return await userRef.set(this.userData, {
      merge: true,
    }).then(()=>{
      localStorage.setItem('user', JSON.stringify(this.userData));
      return true;
    });

  }

  addCompany(company: Company) {

    const companyRef: AngularFirestoreDocument<any> = this.afs.doc(
      `companies/${company.name}`
    );


    return companyRef.ref.get().then((doc)=> {
      if (doc.exists) {
        throw new Error("This company exists already!");
      }

      companyRef.set(company, {
        merge: true
      })
    }).then(()=> {
      return true;
    }).catch((error)=>window.alert(error.message));
  }

  deleteCompany(companyName: string) {

    const companyRef: AngularFirestoreDocument<any> = this.afs.doc(
      `companies/${companyName}`
    );


    return companyRef.ref.get().then((doc)=> {
      if (!doc.exists) {
        this.openSnackBar("Error! This company doesn't exist!")
        return false;
      }

      companyRef.delete().then(()=> {
      return true;
    }).catch((error)=>window.alert(error.message));
    return false;
  })

  }

  editCompany(company: Company) {

    const companyRef: AngularFirestoreDocument<any> = this.afs.doc(
      `companies/${company.name}`
    );


    return companyRef.ref.get().then((doc)=> {
      if (!doc.exists) {
        this.openSnackBar("This company doesn't exist!")
        return;
      }

      companyRef.set(company, {
        merge: true
      })
    }).then(()=> {
      return true;
    }).catch((error)=>window.alert(error.message));
  }

  deleteAccount() {
    this.afAuth.currentUser.then((currentUser)=> {
      currentUser?.delete().then(()=> {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
          `users/${this.userData?.email}`
        );
        return userRef.ref.get().then((doc)=> {
          if (doc.exists) {
            userRef.delete().then(()=> {
              localStorage.setItem('welcomed' + this.userData?.email, 'null');
              this.SignOut();
            })
          } else {
            window.alert("An error with deleting user data!")
          }
        }).catch(error=> {
          window.alert("Error! Try login again!");
        })
      })
    })
  }

}
