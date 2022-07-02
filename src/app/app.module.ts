import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
//
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './shared/custom-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
// routed components
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PictureGridComponent } from './picture-grid/picture-grid.component';
import { CompanyCardComponent } from './components/company-card/company-card.component';
//Angular material
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';

import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import {HttpClientModule} from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';




import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthenticationService } from './services/authentication.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { AskDialogComponent } from './components/ask-dialog/ask-dialog.component';
import { MY_DATE_FORMATS } from './models/my-date-formats';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordDialogComponent } from './components/reset-password-dialog/reset-password-dialog.component';
import { OpportunitiesDialogComponent } from './components/opportunities-dialog/opportunities-dialog.component';
import { OpportunityDetailsComponent } from './components/opportunity-details/opportunity-details.component';
import { AddCompanyDialogComponent } from './components/add-company-dialog/add-company-dialog.component';
import { EditCompanyDialogComponent } from './components/edit-company-dialog/edit-company-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    PageNotFoundComponent,
    PictureGridComponent,
    CompanyCardComponent,
    OpportunityDetailsComponent,
    JumbotronComponent,
    LoginPageComponent,
    SignUpComponent,
    ConfirmationDialogComponent,
    MyProfileComponent,
    EmailVerificationComponent,
    AskDialogComponent,
    ForgotPasswordComponent,
    ResetPasswordDialogComponent,
    OpportunitiesDialogComponent,
    AddCompanyDialogComponent,
    EditCompanyDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    NgbModule,
    MatGridListModule,
    HotToastModule.forRoot(),
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatSelectCountryModule.forRoot('en'), // you can use 'br' | 'de' | 'en' | 'es' | 'fr' | 'hr' | 'it' | 'nl' | 'pt' --> MatSelectCountrySupportedLanguages
    HttpClientModule,
    MatSelectModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    
    
    
  ],
  providers: [
    AuthenticationService,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
