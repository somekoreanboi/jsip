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


import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
// import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { AuthService } from 'ngx-auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


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
    CompanyDetailsComponent,
    JumbotronComponent,
    // LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    NgbModule,
    MatGridListModule,
    HotToastModule.forRoot(),
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      // useValue: '/jsip',
      useValue: '',
      // AuthService,

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
