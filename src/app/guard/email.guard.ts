import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EmailGuard implements CanActivate {

  constructor(public authService: AuthenticationService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.isVerified().then(value => {
        if (value == true) {
          window.alert('Your email is verified already!');
          this.router.navigate(['/']);
        }
      })

      return true;
  }
  
}
