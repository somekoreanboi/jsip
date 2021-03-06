import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }  from "@angular/platform-browser/animations"
//
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PictureGridComponent } from './picture-grid/picture-grid.component';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthenticationService } from './services/authentication.service';
import { SecureInnerPagesGuard } from './guard/secure-inner-pages.guard';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AuthGuard } from './guard/auth.guard';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { EmailGuard } from './guard/email.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { label: 'Home', animation: 'Home' } },
  { path: 'about', component: AboutComponent, data: { label: 'About Us', animation: 'About Us'  } },
  { path: 'companies', component: PictureGridComponent, data: { label: 'Internship Opportunities', animation: 'Internship Opportunities'}},
  // { path: 'contact', component: ContactComponent, data: { label: 'Contact Us' } },
  { path: 'login', component: LoginPageComponent, canActivate: [SecureInnerPagesGuard], data: { animation: 'Login'}},
  { path: 'signup', component: SignUpComponent, canActivate: [SecureInnerPagesGuard], data: { animation: 'Signup'}},
  { path: 'email_verification', component: EmailVerificationComponent, canActivate: [EmailGuard], },
  { path: 'my_profile', component: MyProfileComponent, canActivate: [AuthGuard], },
  { path: 'forgot_password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard], },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

const routeOptions: ExtraOptions = {
  enableTracing: false
};

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes, routeOptions)],
  exports: [RouterModule],
  providers: [
    AuthenticationService,
  ],
},
)
export class AppRoutingModule {}
