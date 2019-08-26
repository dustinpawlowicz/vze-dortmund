import { HelperService } from './../../services/helper/helper.service';
import { UserService } from './../../services/user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

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
    if (this.userService.isLoggedIn()) {
      console.log('Route \'%s\' activated.', url);
      return true;
    }

    console.log('Route \'%s\' declined. Redirect to login page.', url);
    this.helperService.handleUnauthorizedAccess();
    this.router.navigate(['/login']);
    return false;
  }
}
