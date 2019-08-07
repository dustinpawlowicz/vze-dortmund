import { Picture } from './../../interfaces/picture';
import { CameraError } from './../../errors/camera-error';
import { StandardOrderPosition } from './../../interfaces/order-position';
import { IncompleteDataError } from './../../errors/incomplete-data-error';
import { HelperService } from './../../services/helper/helper.service';
import { RoadConditionRecordingService } from './../../services/road-condition-recording/road-condition-recording.service';
import { CharacteristicGroup, ConditionCharacteristic, ConditionIndicator, Magnitude } from './../../interfaces/characteristic';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-standard-order-position-modal',
  templateUrl: './standard-order-position-modal.page.html',
  styleUrls: ['./standard-order-position-modal.page.scss'],
})
export class StandardOrderPositionModalPage implements OnInit {
  public standardOrderPositionForm: FormGroup;
  public characteristicGroups: CharacteristicGroup[];
  public magnitudes: Magnitude[];
  public selectedCharacteristicGroup: CharacteristicGroup;
  public selectedConditionCharacteristic: ConditionCharacteristic;
  public selectedConditionIndicator: ConditionIndicator;
  public pictures: Picture[] = new Array<Picture>();

  constructor(
    private helperService: HelperService,
    private roadConditionRecordingService: RoadConditionRecordingService,
    private formBuilder: FormBuilder,
    private modalController: ModalController) { }

  ngOnInit(): void {
    try {
      this.characteristicGroups = this.roadConditionRecordingService.getCharacteristicGroups();

      this.standardOrderPositionForm = this.formBuilder.group({
        characteristicGroup: new FormControl('', [
          Validators.required
        ]),
        conditionCharacteristic: new FormControl('', [
          Validators.required
        ]),
        conditionIndicator: new FormControl('', [
          Validators.required
        ]),
        expanse: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*[.|,]?[0-9]{0,4}$')
        ]),
        magnitude: new FormControl('', [
        ])
      });

      this.standardOrderPositionForm.controls.characteristicGroup.valueChanges.subscribe((characteristicGroup: CharacteristicGroup) => {
        this.selectedCharacteristicGroup = characteristicGroup;
        this.standardOrderPositionForm.controls.conditionCharacteristic.setValue('');
      });

      this.standardOrderPositionForm.controls.conditionCharacteristic.valueChanges.subscribe(
        (conditionCharacteristic: ConditionCharacteristic) => {
          this.selectedConditionCharacteristic = conditionCharacteristic;
          this.standardOrderPositionForm.controls.conditionIndicator.setValue('');
      });

      this.standardOrderPositionForm.controls.conditionIndicator.valueChanges.subscribe(
        (conditionIndicator: ConditionIndicator) => {
          this.selectedConditionIndicator = conditionIndicator;

          if (conditionIndicator && conditionIndicator.magnitude && conditionIndicator.magnitude.length > 0) {
            this.magnitudes = conditionIndicator.magnitude;
            this.standardOrderPositionForm.controls.magnitude.setValidators([Validators.required]);
          } else {
            this.magnitudes = null;
            this.standardOrderPositionForm.controls.magnitude.setValue('');
            this.standardOrderPositionForm.controls.magnitude.clearValidators();
          }

          this.standardOrderPositionForm.controls.magnitude.updateValueAndValidity();
      });

    } catch (error) {
      this.helperService.handleError(error);
    }
  }

  /**
   * submitOrder - Submits the custom order position form.
   */
  public submitOrder(): void {
    if (!this.standardOrderPositionForm.valid) {
      this.helperService.handleError(new IncompleteDataError());
      return;
    }

    const characteristicGroup: CharacteristicGroup = this.standardOrderPositionForm.controls.characteristicGroup.value;
    const conditionCharacteristic: ConditionCharacteristic = this.standardOrderPositionForm.controls.conditionCharacteristic.value;
    const conditionIndicator: ConditionIndicator = this.standardOrderPositionForm.controls.conditionIndicator.value;
    const magnitude: Magnitude = this.standardOrderPositionForm.controls.magnitude.value;

    const standardOrderPosition: StandardOrderPosition = new StandardOrderPosition(
      characteristicGroup.getProperty(),
      conditionCharacteristic.getProperty(),
      conditionIndicator.getProperty(),
      magnitude ? magnitude.getProperty() : null,
      magnitude ? magnitude.text : '',
      this.standardOrderPositionForm.controls.expanse.value,
      this.pictures
    );

    this.modalController.dismiss(standardOrderPosition);
  }

  /**
   * addPicture - Takes a new picture and adds it to the order.
   */
  public addPicture(): void {
    this.roadConditionRecordingService.addPicture().then((picture: Picture) => {
      if (picture) {
        this.pictures.push(picture);
      }
    }, error => {
      console.warn(error);
      this.helperService.handleError(new CameraError());
    });
  }

  /**
   * removePicture - Removes a provided picture from the order.
   *
   * @picture the picture to be removed
   */
  public removePicture(picture: Picture): void {
    const index = this.pictures.indexOf(picture, 0);
    if (index > -1) {
      this.pictures.splice(index, 1);
    }
  }

  /**
   * cancelOrder - Close modal and cancel the order.
   */
  public cancelOrder(): void {
    this.modalController.dismiss(null);
  }
}
