import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthenticationService, public router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.isVerified().then(value => {
      if (value !== true) {
        if (this.authService.isLoggedIn !== true) {
          window.alert('Access Denied, Login with a verificed account to Access This Page!');
          this.router.navigate(['/login']);
        } else {
          window.alert('Access Denied, your account is not verified yet!');
          this.router.navigate(['/email_verification']);
        }
      }
    })


    return true;
  }
}