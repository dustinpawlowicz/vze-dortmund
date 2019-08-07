import { SettingsService } from './../settings/settings.service';
import { Router } from '@angular/router';
import { User, UserProperty } from './../../interfaces/user';
import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

enum Endpoint {
  LOGIN = '/login',
  REGISTRATION = '/register',
  CHANGE_PASSWORD = '/change-password',
  EDIT_USER = '/edit-user',
  DELETE_USER = '/delete-user',
  ROLES = '/roles',
  USERS = '/users'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;

  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private apiService: ApiService) { }

  /**
   * login - Execution of a login attempt.
   *
   * @param data  data to be transmitted with the request
   * @return      the http response
   */
  public async login(data: any): Promise<any> {
      try {
        const response = await this.apiService.post(Endpoint.LOGIN, data).toPromise();

        if (response.status === 'success') {
          await this.setLoggedIn(response.data);
          await this.settingsService.load(this.user.id);
          this.settingsService.applyGeneralSettings();
          console.log('User data set:', this.user);
        }
        return response;
      } catch (error) {
        this.handleError(error);
        throw error;
      }
  }

  /**
   * registration - Execution of a registration attempt.
   *
   * @param data  data to be transmitted with the request
   * @return      the http request
   */
  public registration(data: any): Observable<any> {
    const request = this.apiService.post(Endpoint.REGISTRATION, data);

    request.subscribe((response: any) => {
      if (response.status === 'success') {
        console.log('User \'%s\' successfully registered.', data.username);
      }
    }, error => {
      this.handleError(error);
    });

    return request;
  }

  /**
   * changePassword - Execution of a changePassword attempt.
   *
   * @param data  data to be transmitted with the request
   * @return      the http request
   */
  public changePassword(data: any): Observable<any> {
      const request = this.apiService.post(Endpoint.CHANGE_PASSWORD, data);

      request.subscribe((response: any) => {
        if (response.status === 'success') {
          console.log('Password for user \'%s\' changed successfully.', data.username);
        }
      }, error => {
        this.handleError(error);
      });

      return request;
  }

  /**
   * edit - Execution of a edit user attempt.
   *
   * @param data  data to be transmitted with the request
   * @return      the http request
   */
  public edit(data: any): Observable<any> {
    const request = this.apiService.post(Endpoint.EDIT_USER, data);

    request.subscribe((response: any) => {
      if (response.status === 'success') {
        console.log('User \'%s\' successfully edited.', data.username);
      }
    }, error => {
      this.handleError(error);
    });

    return request;
  }

  /**
   * edit - Execution of a delete user attempt.
   *
   * @param data  data to be transmitted with the request
   * @return      the http request
   */
  public delete(data: any): Observable<any> {
    const request = this.apiService.post(Endpoint.DELETE_USER, data);

    request.subscribe((response: any) => {
      if (response.status === 'success') {
        console.log('User \'%s\' successfully deleted.', data.username);
      }
    }, error => {
      this.handleError(error);
    });

    return request;
  }

  /**
   * setLoggedIn - Sets the user that was sent with the API response.
   *
   * @param userJson API response data
   */
  private setLoggedIn(userJson: any): void {
    if (userJson) {
      this.user = new User(userJson);
    }
  }

  /**
   * logout - Remove the current user and navigate to the login page.
   */
  public logout(): void {
    this.router.navigate(['/login']);
    this.user = null;
  }

  /**
   * fetchRoles - Fetch the existing user roles.
   *
   * @return  the http request
   */
  public fetchRoles(): Observable<any> {
    const request = this.apiService.get(Endpoint.ROLES);

    request.subscribe((response: any) => {
      if (response.status === 'success') {
        console.log('User roles fetched.');
      }
    }, error => {
      this.handleError(error);
    });

    return request;
  }

  /**
   * fetchUsers - Fetch the existing users.
   *
   * @return  the http request
   */
  public fetchUsers(data: any): Observable<any> {
    const request = this.apiService.post(Endpoint.USERS, data);

    request.subscribe((response: any) => {
      if (response.status === 'success') {
        console.log('Users fetched.');
      }
    }, error => {
      this.handleError(error);
    });

    return request;
  }

  /**
   * handleError - Error Handling of the User Service.
   *
   * @param error error to handle
   */
  private handleError(error): void {
    if (!error && !error.error) {
      return;
    }

    if (!error.error.key) {
      console.warn('Server not responding!', error);
      return;
    }

    console.warn('An error occurred in UserService. Key: %s, Msg: %s', error.error.key, error.error.msg );
  }

  /**
   * isAdmin - Check if the user has the admin role.
   */
  public isAdmin(): boolean {
    return this.isLoggedIn() && this.getRole() === 'admin';
  }

  /**
   * isLoggedIn - Check if the user is logged in.
   */
  public isLoggedIn(): boolean {
    return this.user != null;
  }

  /**
   * getUser - Returns the user.
   */
  public getUser(): User {
    return this.user;
  }

  /**
   * getUserProperty - Returns the user property.
   */
  public getUserProperty(): UserProperty {
    return this.isLoggedIn() ? this.user.getUserProperty() : null;
  }

  /**
   * getUserId - Returns the user id.
   */
  public getUserId(): number {
    return this.isLoggedIn() ? this.user.id : null;
  }

  /**
   * getUsername - Returns the username.
   */
  public getUsername(): string {
    return this.isLoggedIn() ? this.user.username : null;
  }

  /**
   * getFirstName - Returns the firstName.
   */
  public getFirstName(): string {
    return this.isLoggedIn() ? this.user.firstName : null;
  }

  /**
   * getLastName - Returns the lastName.
   */
  public getLastName(): string {
    return this.isLoggedIn() ? this.user.lastName : null;
  }

  /**
   * getRole - Returns the roleName.
   */
  public getRole(): string {
    return this.isLoggedIn() ? this.user.roleName : null;
  }
}
