import { SingCategory } from '../../interfaces/sign';
import { CameraError } from './../../errors/camera-error';
import { SignageOrderPosition } from './../../interfaces/order-position';
import { IncompleteDataError } from './../../errors/incomplete-data-error';
import { ModalController } from '@ionic/angular';
import { Picture } from './../../interfaces/picture';
import { RoadConditionRecordingService } from './../../services/road-condition-recording/road-condition-recording.service';
import { HelperService } from './../../services/helper/helper.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signage-order-position-modal',
  templateUrl: './signage-order-position-modal.page.html',
  styleUrls: ['./signage-order-position-modal.page.scss'],
})
export class SignageOrderPositionModalPage implements OnInit {
  public signageOrderPositionForm: FormGroup;
  public signCategories: SingCategory[];
  public selectedSignCategory: SingCategory;
  public pictures: Picture[] = new Array<Picture>();

  constructor(
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    private roadConditionRecordingService: RoadConditionRecordingService,
    private modalController: ModalController) { }

  ngOnInit(): void {
    try {
      this.signCategories = this.roadConditionRecordingService.getSignGroups();
      this.signageOrderPositionForm = this.formBuilder.group({
        count: new FormControl(1, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.min(1)
        ]),
        text: new FormControl('', [
          Validators.required
        ]),
        signCategory: new FormControl('', [
          Validators.required
        ]),
        sign: new FormControl('', [
          Validators.required
        ])
      });
    } catch (error) {
      this.helperService.handleError(error);
    }

    this.signageOrderPositionForm.controls.signCategory.valueChanges.subscribe((signCategory: SingCategory) => {
      this.selectedSignCategory = signCategory;
      this.signageOrderPositionForm.controls.sign.setValue('');
    });
  }

  /**
   * submitOrder - Submits the custom order position form.
   */
  public submitOrder(): void {
    if (!this.signageOrderPositionForm.valid) {
      this.helperService.handleError(new IncompleteDataError());
      return;
    }

    const singCategory: SingCategory = this.signageOrderPositionForm.controls.signCategory.value;

    const signageOrderPosition: SignageOrderPosition = new SignageOrderPosition(
      this.signageOrderPositionForm.controls.count.value,
      this.signageOrderPositionForm.controls.text.value,
      singCategory.getProperty(),
      this.signageOrderPositionForm.controls.sign.value,
      this.pictures
    );
    this.modalController.dismiss(signageOrderPosition);
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
