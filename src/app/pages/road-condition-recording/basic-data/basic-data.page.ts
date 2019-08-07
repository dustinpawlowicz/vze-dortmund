import * as basicDataProperties from '../../../properties/characteristic-types';
import { HelperService } from './../../../services/helper/helper.service';
import { validCurrentOrPastDate } from '../../../helpers/validators';
import { RoadConditionRecordingService } from './../../../services/road-condition-recording/road-condition-recording.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.page.html',
  styleUrls: ['./basic-data.page.scss'],
})
export class BasicDataPage implements OnInit {
  public readonly MAX_LENGTH_ADDRESS_ADDITION: number = 50;
  public readonly MAX_LENGTH_SHORT_TEXT: number = 100;
  public readonly MAX_LENGTH_LONG_TEXT: number = 500;
  public priorities: Property[];
  public departements: Property[];
  public surfaces: Property[];

  public basicDataForm: FormGroup;
  public minHouseNumber: number;
  public maxHouseNumber: number;
  public minDetectionDate: Date;
  public maxDetectionDate: Date;

  constructor(
    private router: Router,
    private roadConditionRecordingService: RoadConditionRecordingService,
    private formBuilder: FormBuilder,
    private helperService: HelperService) {
      this.maxDetectionDate = new Date();
      this.minDetectionDate = new Date(this.maxDetectionDate.getTime());
      this.minDetectionDate.setFullYear(this.minDetectionDate.getFullYear() - 10);
  }

  ngOnInit(): void {
    try {
      this.priorities = this.roadConditionRecordingService.getPriorities();
      this.departements = this.roadConditionRecordingService.getDepartements();
      this.surfaces = this.roadConditionRecordingService.getSurfaces();

      try {
        this.minHouseNumber = this.roadConditionRecordingService.getMinHouseNumber();
        this.maxHouseNumber = this.roadConditionRecordingService.getMaxHouseNumber();

        // The validation for deactivated fields is skipped and therefore not required.
        this.basicDataForm = this.formBuilder.group({
          location: new FormControl(
            {
              // largest road_number: 79654, largest section_number: 11480
              value: this.roadConditionRecordingService.getLocation(),
              disabled: true
            }
          ),
          roadName: new FormControl(
            {
              value: this.roadConditionRecordingService.getRoadName(),
              disabled: true
            }
          ),
          houseNumberSectionLeft: new FormControl(
            {
              value: this.roadConditionRecordingService.getHouseNumberSectionLeft(),
              disabled: true
            }
          ),
          houseNumberSectionRight: new FormControl(
            {
              value: this.roadConditionRecordingService.getHouseNumberSectionRight(),
              disabled: true
            }
          ),
          houseNumber: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.min(this.minHouseNumber),
            Validators.max(this.maxHouseNumber)
          ]),
          addressAddition: new FormControl('', [
            Validators.maxLength(this.MAX_LENGTH_ADDRESS_ADDITION)
          ]),
          priority: new FormControl('', [
            Validators.required
          ]),
          departement: new FormControl('', [
            Validators.required
          ]),
          surface: new FormControl('', [
            Validators.required
          ]),
          shortText: new FormControl('', [
            Validators.required,
            Validators.maxLength(this.MAX_LENGTH_SHORT_TEXT)
          ]),
          longText: new FormControl('', [
            Validators.maxLength(this.MAX_LENGTH_LONG_TEXT)
          ]),
          detectionDate: new FormControl(new Date().toISOString(), [
            Validators.required,
            validCurrentOrPastDate()
          ])
        });

        this.basicDataForm.valueChanges.subscribe(() => {
          if (this.basicDataForm.valid) {
            this.roadConditionRecordingService.completeBasicData(this.basicDataForm.getRawValue());
            console.log('Basic data submitted.', this.basicDataForm.getRawValue());
          } else {
            this.roadConditionRecordingService.clearBasicData();
          }
        });
      } catch (error) {
        this.helperService.handleError(error);
      }
    } catch (error) {
      this.cancelRecording();
      this.helperService.handleError(error);
    }
  }

  /**
   * cancelRecording - Cancel the process of registering a road condition.
   */
  public cancelRecording(): void {
    this.roadConditionRecordingService.cancelRecording();
    this.router.navigate(['/home']);
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
