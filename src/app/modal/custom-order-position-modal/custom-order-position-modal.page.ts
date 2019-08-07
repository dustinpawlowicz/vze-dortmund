import { RoadConditionRecordingService } from './../../services/road-condition-recording/road-condition-recording.service';
import { CameraError } from './../../errors/camera-error';
import { Picture } from './../../interfaces/picture';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from './../../services/helper/helper.service';
import { IncompleteDataError } from './../../errors/incomplete-data-error';
import { CustomOrderPosition } from './../../interfaces/order-position';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-custom-order-position-modal',
  templateUrl: './custom-order-position-modal.page.html',
  styleUrls: ['./custom-order-position-modal.page.scss'],
})
export class CustomOrderPositionModalPage implements OnInit {
  public customOrderPositionForm: FormGroup;
  public pictures: Picture[] = new Array<Picture>();

  constructor(
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private roadConditionRecordingService: RoadConditionRecordingService,
    private modalController: ModalController) { }

  ngOnInit(): void {
    try {
      this.customOrderPositionForm = this.formBuilder.group({
        count: new FormControl(1, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(1)
        ]),
        text: new FormControl('', [
          Validators.required
        ])
      });
    } catch (error) {
      this.helperService.handleError(error);
    }
  }

  /**
   * submitOrder - Submits the custom order position form.
   */
  public submitOrder(): void {
    if (!this.customOrderPositionForm.valid) {
      this.helperService.handleError(new IncompleteDataError());
      return;
    }

    const customOrderPosition: CustomOrderPosition = new CustomOrderPosition(
      this.customOrderPositionForm.controls.count.value,
      this.customOrderPositionForm.controls.text.value,
      this.pictures
    );
    this.modalController.dismiss(customOrderPosition);
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
