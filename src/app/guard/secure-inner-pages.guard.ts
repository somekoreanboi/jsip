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
export class SecureInnerPagesGuard implements CanActivate {
  constructor(public authService: AuthenticationService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isVerified) {
      window.alert('You are logged in already!');
      this.router.navigate(['/']);
    }
    return true;
  }
}