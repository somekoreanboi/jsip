import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
//
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PictureGridComponent } from './picture-grid/picture-grid.component';
import { LoginPageComponent } from './login-page/login-page/login-page.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { label: 'Home' } },
  { path: 'about', component: AboutComponent, data: { label: 'About Us' } },
  { path: 'companies', component: PictureGridComponent, data: { label: 'Internship Opportunities'}},
    { path: 'contact', component: ContactComponent, data: { label: 'Contact Us' } },
  { path: 'login', component: LoginPageComponent, data: { label: 'Login'}},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

const routeOptions: ExtraOptions = {
  enableTracing: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routeOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
