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
    const url = encodeURI(state.url);
    if (this.userService.isAdmin()) {
      console.log('Route \'%s\' activated.', url);
      return true;
    }

    if (!this.userService.isLoggedIn()) {
      console.log('Route \'%s\' declined. Redirect to login page.', url);
      this.router.navigate(['/login']);
    } else {
      console.log('Route \'%s\' declined.', url);
    }

    this.helperService.handleUnauthorizedAccess();
    return false;
  }
}
