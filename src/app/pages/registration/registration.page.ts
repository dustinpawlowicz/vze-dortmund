import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UnknownError } from './../../errors/unknown-error';
import { UserService } from './../../services/user/user.service';
import { Role } from '../../interfaces/role';
import { HelperService } from './../../services/helper/helper.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public readonly MIN_PASSWORD_LENGTH: number = 8;

  public registrationForm: FormGroup;
  public roles: Role[] = new Array<Role>();

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private helperService: HelperService,
    private userService: UserService) {
    }

  ngOnInit(): void {
    this.fetchRoles();

    this.registrationForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required
      ]),
      firstName: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.MIN_PASSWORD_LENGTH)
      ]),
      roleName: new FormControl('', [
        Validators.required
      ]),
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
  }

  /**
   * doRegistration - Executes the registration request of a user.
   */
  public doRegistration(): void {
    const formData = this.registrationForm.getRawValue();

    this.userService.registration(formData).subscribe((response) => {
      if (this.helperService.isSuccess(response)) {
        this.helperService.displaySuccessMessage(response.key, { username: formData.username });
        this.location.back();
      } else {
        this.helperService.handleError(new UnknownError());
      }
    }, (error) => {
      console.log(error);
      this.helperService.handleError(error);
    });
  }

  /**
   * fetchRoles - Request all user roles from the Server.
   */
  private fetchRoles(): void {
    this.userService.fetchRoles().subscribe((rolesResponse) => {
      if (this.helperService.isSuccess(rolesResponse)) {
        this.helperService.displaySuccessMessage(rolesResponse.key);

        const roles = new Array<Role>();
        rolesResponse.data.roles.forEach((role: Role) => {
          roles.push(role);

          // Preselection of a default role, if existing
          if (!this.registrationForm.controls.roleName.value && role.name === 'inspector') {
            this.registrationForm.controls.roleName.setValue(role.name);
          }
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
}
