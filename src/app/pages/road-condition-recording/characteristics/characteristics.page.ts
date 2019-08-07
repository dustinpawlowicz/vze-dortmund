import { positionTypes } from './../../../properties/characteristic-types';
import { RoadConditionRecordingService } from './../../../services/road-condition-recording/road-condition-recording.service';
import { CustomOrderPositionModalPage } from './../../../modal/custom-order-position-modal/custom-order-position-modal.page';
import { SignageOrderPositionModalPage } from './../../../modal/signage-order-position-modal/signage-order-position-modal.page';
import { StandardOrderPositionModalPage } from './../../../modal/standard-order-position-modal/standard-order-position-modal.page';
import { Property } from './../../../interfaces/property';
import { OrderPositions } from './../../../interfaces/order-position';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.page.html',
  styleUrls: ['./characteristics.page.scss'],
})
export class CharacteristicsPage implements OnInit {
  public readonly POSITION_TYPES: Property[] = positionTypes;

  public orderPositions: OrderPositions = new OrderPositions();
  public characteristicsValid: boolean;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private roadConditionRecordingService: RoadConditionRecordingService) { }

  ngOnInit(): void {
  }

  /**
   * presentRecordPositionModal - Opens a Modal (dialog) to record a specific order position.
   *
   * @param type  type of the order position
   */
  async presentRecordPositionModal(type: Property) {
    let modal;

    switch (type.key) {
      case 'standard': {
        modal = await this.modalController.create({
          component: StandardOrderPositionModalPage,
        });
        break;
      }
      case 'signage': {
        modal = await this.modalController.create({
          component: SignageOrderPositionModalPage,
        });
        break;
      }
      default: {
        modal = await this.modalController.create({
          component: CustomOrderPositionModalPage,
        });
        break;
      }
    }

    await modal.present();
    const data = await modal.onWillDismiss();
    if (data && data.data) {
      this.orderPositions.addOrderPosition(data.data);
      this.submitOrderPositions();
    }
  }

  /**
   * deleteOrderPosition - Deletes an order position from the entered order positions.
   *
   * @param orderPosition order position to be deleted
   */
  public deleteOrderPosition(orderPosition: any): void {
    this.orderPositions.deleteOrderPosition(orderPosition);
    this.submitOrderPositions();
  }

  /**
   * submitOrderPositions - Adds a new order position.
   */
  private submitOrderPositions(): void {
    this.characteristicsValid = this.orderPositions.hasOrder();
    this.roadConditionRecordingService.completeCharacteristics(this.orderPositions);
  }

  /**
   * cancelRecording - Cancel the process of registering a road condition.
   */
  public cancelRecording(): void {
    this.roadConditionRecordingService.cancelRecording();
    this.router.navigate(['/home']);
  }
}
