import { IncompleteDataError } from './../../errors/incomplete-data-error';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UnknownError } from './../../errors/unknown-error';
import { UserService } from './../../services/user/user.service';
import { HelperService } from './../../services/helper/helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  public readonly MIN_PASSWORD_LENGTH: number = 8;

  public changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      username: new FormControl(
        {
          value: this.userService.getUsername(),
          disabled: true
        }
      ),
      password: new FormControl('', [
        Validators.required
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(this.MIN_PASSWORD_LENGTH)
      ])
    });
  }

  /**
   * doChangePassword - Executes the password change request of a user.
   */
  public doChangePassword(): void {
    if (!this.changePasswordForm.valid) {
      this.helperService.handleError(new IncompleteDataError());
    }

    const formData = this.changePasswordForm.getRawValue();

    this.userService.changePassword(formData).subscribe((response) => {
      if (this.helperService.isSuccess(response)) {
        this.helperService.displaySuccessMessage(response.key);
        this.userService.logout();
      } else {
        this.helperService.handleError(new UnknownError());
      }
    }, error => {
      console.log(error);
      this.helperService.handleError(error);
    });
  }
}
