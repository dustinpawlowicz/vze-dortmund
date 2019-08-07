import { IncompleteDataError } from './../../errors/incomplete-data-error';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UnknownError } from './../../errors/unknown-error';
import { UserService } from './../../services/user/user.service';
import { HelperService } from './../../services/helper/helper.service';
import { User } from './../../interfaces/user';
import { Role } from '../../interfaces/role';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { validCurrentOrFutureDate } from 'src/app/helpers/validators';
import { IncorrectDataError } from 'src/app/errors/incorrect-data-error';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  public readonly MIN_PASSWORD_LENGTH: number = 8;

  public adminConfirmForm: FormGroup;
  public editUserForm: FormGroup;
  public roles: Role[] = new Array<Role>();
  public users: User[] = null;
  public selectedUser: User = null;
  public minDeactivationDate: Date;
  public maxDeactivationDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private helperService: HelperService,
    private userService: UserService) {
      this.minDeactivationDate = new Date();
      this.maxDeactivationDate = new Date(this.minDeactivationDate.getTime());
      this.maxDeactivationDate.setHours(23, 59, 59, 999);
      this.maxDeactivationDate.setFullYear(this.maxDeactivationDate.getFullYear() + 10);
  }

  ngOnInit(): void {
    this.fetchRoles();

    this.adminConfirmForm = this.formBuilder.group({
      adminUsername: new FormControl(
        {
          value: this.userService.getUsername(),
          disabled: true
        }
      ),
      adminPassword: new FormControl('', [
        Validators.required
      ])
    });

    this.editUserForm = this.formBuilder.group({
      username: new FormControl('', [
      ]),
      password: new FormControl('', [
        Validators.minLength(this.MIN_PASSWORD_LENGTH)
      ]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      roleName: new FormControl(''),
      deactivatedUntil: new FormControl('', [
        validCurrentOrFutureDate()
      ])
    });
  }

  /**
   *  doEdit - Executes the edit change request of a user for all edited user information.
   */
  public doEdit(): void {
    if (!this.adminConfirmForm.valid || !this.editUserForm.valid) {
      this.helperService.handleError(new IncompleteDataError());
    }

    const formData = {
      ...this.adminConfirmForm.getRawValue(),
      ...this.editUserForm.getRawValue()
    };

    if (this.selectedUser.firstName === this.editUserForm.controls.firstName.value) {
      delete formData.firstName;
    }

    if (this.selectedUser.lastName === this.editUserForm.controls.lastName.value) {
      delete formData.lastName;
    }

    if (!this.editUserForm.controls.password) {
      delete formData.password;
    }

    if (this.selectedUser.roleName === this.editUserForm.controls.roleName.value) {
      delete formData.roleName;
    }

    if ((!this.selectedUser.deactivatedUntil && !this.editUserForm.controls.deactivatedUntil.value)
        || this.selectedUser.deactivatedUntil === this.editUserForm.controls.deactivatedUntil.value) {
      delete formData.deactivatedUntil;
    }

    this.userService.edit(formData).subscribe((response) => {
      if (this.helperService.isSuccess(response)) {
        this.helperService.displaySuccessMessage(response.key, { username: formData.username });

        // Logout after the admin changed the password or the deactivation date of his own account.
        if (formData.username === this.userService.getUsername() &&
            (formData.hasOwnProperty('password') || formData.hasOwnProperty('deactivatedUntil'))) {
          this.userService.logout();
        } else {
          this.clearForm();
        }
      } else {
        this.helperService.handleError(new UnknownError());
      }
    }, error => {
      console.log(error);
      this.helperService.handleError(error);
    });
  }

  /**
   * doDelete - Executes a request to delete an specific user.
   */
  public doDelete(): void {
    if (!this.adminConfirmForm.valid || !this.editUserForm.controls.username.valid) {
      this.helperService.handleError(new IncompleteDataError());
    }

    const formData = {
      ...this.adminConfirmForm.getRawValue(),
      username: this.editUserForm.controls.username.value
    };

    this.userService.delete(formData).subscribe((response) => {
      if (this.helperService.isSuccess(response)) {
        this.helperService.displaySuccessMessage(response.key, { username: formData.username });

        // Logout after the admin deleted his own account.
        console.log(formData.username, this.userService.getUsername());
        if (formData.username === this.userService.getUsername()) {
          this.userService.logout();
        } else {
          this.clearForm();
        }
      } else {
        this.helperService.handleError(new UnknownError());
      }
    }, error => {
      console.log(error);
      this.helperService.handleError(error);
    });
  }

  /**
   * fetchRoles - Request all user roles from the Server.
   */
  private fetchRoles(): void {
    this.userService.fetchRoles().subscribe((response) => {
      if (this.helperService.isSuccess(response)) {
        this.helperService.displaySuccessMessage(response.key);

        const roles = new Array<Role>();
        response.data.roles.forEach((role: Role) => {
          roles.push(role);
        });
        this.roles = roles;
      } else {
        this.helperService.handleError(new UnknownError());
      }
    }, (error) => {
      this.helperService.handleError(error);
      this.location.back();
    });
  }

  /**
   * fetchUsers - Request all users from the Server.
   */
  public fetchUsers(): void {
    const formData = this.adminConfirmForm.getRawValue();

    this.userService.fetchUsers(formData).subscribe((response) => {
      if (this.helperService.isSuccess(response)) {
        this.helperService.displaySuccessMessage(response.key);

        const users = new Array<User>();
        response.data.users.forEach(user => {
          users.push(new User(user));
        });
        this.users = users;
      } else {
        this.helperService.handleError(new UnknownError());
      }
    }, (error) => {
      this.helperService.handleError(error);
    });
  }

  /**
   * doSelectUser - Specify the current user to be edited.
   */
  public doSelectUser(): void {
    const user = this.getUserByUsername(this.editUserForm.controls.username.value);

    if (user) {
      this.editUserForm.controls.firstName.setValue(user.firstName);
      this.editUserForm.controls.lastName.setValue(user.lastName);
      this.editUserForm.controls.roleName.setValue(user.roleName);
      const deactivatedUntil = this.helperService.convertDateString(user.deactivatedUntil);
      this.editUserForm.controls.deactivatedUntil.setValue(
        deactivatedUntil && deactivatedUntil.getTime() > this.minDeactivationDate.getTime() ? user.deactivatedUntil : ''
      );
      this.selectedUser = user;
      console.log('User \'%s\' selected for editing.', user);
      return;
    }

    this.selectedUser = null;
  }

  /**
   * getUserByUsername - Find a user in users by their username.
   *
   * @param username  the username of the user to find
   * @return          the found user
   */
  private getUserByUsername(username: string): User {
    if (!username) {
      return null;
    }

    for (const user of this.users) {
      if (user.username === username) {
        return user;
      }
    }

    return null;
  }

  /**
   * convertDate - Convert a date to ISO format.
   *
   * @param date  the date to be converted
   * @return      the ISO date string
   */
  public convertDate(date: Date): string {
    return this.helperService.convertDate(date);
  }

  /**
   * clearDeactivationDate - Clear the currently set deactivatedUntil date within the edit form.
   */
  public clearDeactivationDate(): void {
    this.editUserForm.controls.deactivatedUntil.setValue('');
  }

  /**
   * clearForm - Clear the edit form to start with a fresh edit selection.
   */
  private clearForm(): void {
    this.selectedUser = null;
    this.users = null;
    this.editUserForm.reset('');
    this.fetchUsers();
  }
}
