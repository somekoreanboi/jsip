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

import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    PageNotFoundComponent,
    PictureGridComponent,
    CompanyCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/angular-material-nav'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
