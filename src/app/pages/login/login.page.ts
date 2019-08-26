import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UnknownError } from './../../errors/unknown-error';
import { HelperService } from './../../services/helper/helper.service';
import { RoadNetworkService } from './../../services/road-network/road-network.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { IncompleteDataError } from 'src/app/errors/incomplete-data-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LogInPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private helperService: HelperService,
    private userService: UserService,
    private roadNetworkService: RoadNetworkService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  /**
   * doLogin - Executes the login request of a user.
   */
  public async doLogin(): Promise<void> {
    try {
      if (!this.loginForm.valid) {
        throw new IncompleteDataError();
      }

      const formData = this.loginForm.getRawValue();
      const response = await this.userService.login(formData);

      if (this.helperService.isSuccess(response) && this.userService.isLoggedIn()) {
        this.helperService.displaySuccessMessage(response.key, { username: this.userService.getUsername() });

        this.fetchRoadNetworkData(formData);
        this.router.navigate(['/home']);
      } else {
        this.helperService.handleError(new UnknownError());
      }
    } catch (error) {
      this.helperService.handleError(error);
    }
  }

  private fetchRoadNetworkData(formData: any): void {
    this.roadNetworkService.fetchNodes(formData).subscribe((nodesResponse) => {
      if (this.helperService.isSuccess(nodesResponse)) {
        this.helperService.displaySuccessMessage(nodesResponse.key);
      } else {
        this.helperService.handleError(new UnknownError());
      }
    }, (error) => {
      this.helperService.handleError(error);
    });

    this.roadNetworkService.fetchEdges(formData).subscribe((edgesResponse) => {
      if (this.helperService.isSuccess(edgesResponse)) {
        this.helperService.displaySuccessMessage(edgesResponse.key);
      } else {
        this.helperService.handleError(new UnknownError());
      }
    }, (error) => {
      this.helperService.handleError(error);
    });
  }
}
