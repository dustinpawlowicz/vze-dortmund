import { ExportOption } from './../../services/export/export.service';
import { RoadConditionRecordingService } from './../../services/road-condition-recording/road-condition-recording.service';
import { HelperService } from './../../services/helper/helper.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { validCurrentOrPastDate, beginDateBeforeEndDate } from 'src/app/helpers/validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public roadConditionForm: FormGroup;
  public minDate: Date;
  public maxDate: Date;

  public profile: { username: string, firstName: string, lastName: string, roleName: string } = {
    username: '',
    firstName: '',
    lastName: '',
    roleName: ''
  };

  public statistic: { recordingsTotal: number, recordingsSelectedRange: number } = {
    recordingsTotal: 0,
    recordingsSelectedRange: 0
  };

  constructor(
    private userService: UserService,
    private helperService: HelperService,
    private roadConditionRecordingService: RoadConditionRecordingService,
    private formBuilder: FormBuilder) {
      const user = this.userService.getUser();
      this.profile.username = user.username;
      this.profile.firstName = user.firstName;
      this.profile.lastName = user.lastName;
      this.profile.roleName = user.roleName;

      this.maxDate = new Date();
      this.minDate = new Date(this.maxDate.getTime());
      this.minDate.setFullYear(this.minDate.getFullYear() - 10);
    }

  ngOnInit(): void {
    try {
      this.roadConditionForm = this.formBuilder.group({
        dates: this.formBuilder.group({
          beginDate: new FormControl(this.maxDate.toISOString(), [
            Validators.required,
            validCurrentOrPastDate()
          ]),
          endDate: new FormControl(this.maxDate.toISOString(), [
            Validators.required,
            validCurrentOrPastDate()
          ])
        }, { validator: beginDateBeforeEndDate('beginDate', 'endDate')})
      });

      this.roadConditionForm.controls.dates.valueChanges.subscribe((beginDate: string) => {
        this.updateStatistic();
    });
    } catch (error) {
      this.helperService.handleError(error);
    }
  }

  /**
   * ionViewWillEnter - Fired when entering a page, before it becomes the active page.
   */
  public ionViewWillEnter(): void {
    this.updateStatistic();

    this.roadConditionRecordingService.getNumberOfRoadConditions().then(value => {
      this.statistic.recordingsTotal = value;
    });
  }

  private async updateStatistic(): Promise<void> {
    if (this.roadConditionForm.valid) {
      this.roadConditionRecordingService.getNumberOfRoadConditions(
        new Date(this.roadConditionForm.controls.dates.get('beginDate').value),
        new Date(this.roadConditionForm.controls.dates.get('endDate').value)
        ).then(value => {
          this.statistic.recordingsSelectedRange = value;
      });
    }
  }

  public doXLSXExport(): void {
    this.doExport(ExportOption.XLSX);
  }

  public doCSVExport(): void {
    this.doExport(ExportOption.CSV);
  }

  public doJSONExport(): void {
    this.doExport(ExportOption.JSON);
  }

  public doExport(exportOption: ExportOption): void {
    if (this.roadConditionForm.valid) {
      this.roadConditionRecordingService.exportRoadConditions(
        exportOption,
        new Date(this.roadConditionForm.controls.dates.get('beginDate').value),
        new Date(this.roadConditionForm.controls.dates.get('endDate').value));
    }
  }

  /**
   * doLogout - Executes a logout attempt.
   */
  public doLogout(): void {
    this.userService.logout();
  }

  /**
   * isAdmin - Check if the user has the admin role.
   *
   * @return  a boolean whether isAdmin or not
   */
  public isAdmin(): boolean {
    return this.userService.isAdmin();
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
}
