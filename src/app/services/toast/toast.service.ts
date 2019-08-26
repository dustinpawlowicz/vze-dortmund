import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastQueue: HTMLIonToastElement[] = new Array<HTMLIonToastElement>();
  private buttonTexts: string[];

  constructor(
    private toastController: ToastController,
    private translateService: TranslateService) {
      this.translateService.get([
        'TOAST.GOT_IT',
        'TOAST.OK',
      ]).subscribe(
        (values) => {
          console.log('Loaded values: ', values);
          this.buttonTexts = values;
        }
      );
  }

  /**
   * presentSuccessToast - Creates and displays a success message.
   *
   * @param msg content of the notification
   */
  public async presentSuccessToast(msg: string): Promise<void> {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      color: 'success',
      duration: 2000,
      buttons: [
        {
          icon: 'checkmark-circle',
          text: this.buttonTexts['TOAST.OK'],
          role: 'cancel'
        }
      ]
    });

    this.addToast(toast);
  }

  /**
   * presentErrorToast - Creates and displays an error message.
   *
   * @param msg content of the notification
   */
  public async presentErrorToast(msg: string): Promise<void> {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      color: 'danger',
      duration: 15000,
      buttons: [
        {
          icon: 'information-circle-outline',
          text: this.buttonTexts['TOAST.GOT_IT'],
          role: 'cancel'
        }
      ]
    });

    this.addToast(toast);
  }

  /**
   * addToast - Adds a toast to the toastQueue and display it when the previous toast has ended.
   *
   * @param toast toast to display
   */
  private async addToast(toast: HTMLIonToastElement): Promise<void> {
    this.toastQueue.push(toast);

    if (this.toastQueue.length === 1) {
      this.toastQueue[0].present();
    }

    const dismiss = await toast.onDidDismiss();
    this.presentNext();

    if (dismiss.role === 'cancel') {
      console.log('Toast button pressed.');
    } else if (dismiss.role === 'timeout') {
      console.log('Toast duration ended');
    }
  }

  private presentNext(): void {
    this.toastQueue.shift();

    if (this.toastQueue.length >= 1) {
      this.toastQueue[0].present();
    }
  }
}
