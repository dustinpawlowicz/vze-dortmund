import { UserService } from './../../services/user/user.service';
import { HelperService } from './../../services/helper/helper.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticationGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private helperService: HelperService) { }

  /**
   * canActivate - Decide whether a route can be activated or not.
   *
   * @param next  route information
   * @param state state of the router
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isAdmin()) {
      console.log('Route activated.', next);
      return true;
    }

    if (!this.userService.isLoggedIn()) {
      console.log('Route declined. Redirect to login page.');
      this.router.navigate(['/login']);
    } else {
      console.log('Route declined.');
    }

    this.helperService.handleUnauthorizedAccess();
    return false;
  }
}
