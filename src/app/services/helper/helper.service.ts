import { ToastService } from './../toast/toast.service';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private translateService: TranslateService,
    private toastService: ToastService) { }

  /**
   * isSuccess - Check whether the http request was successful or not.
   *
   * @param response  http response to be checked
   * @return          boolean that depends on the status
   */
  public isSuccess(response: any): boolean {
    if (response.status === 'success') {
      return true;
    }

    return false;
  }

  /**
   * handleError - Error handling by displaying an error message.
   *
   * @param error the error to be handled
   */
  public handleError(error: any): void {
    if (!error) {
      return;
    }

    let key = error.key;
    let data = error.data;

    // Server Error
    if (error.error) {
      key = error.error.key ? error.error.key : 'NOT_RESPONDING';
      data = error.error.data;
    }

    if (key) {
      // Handled exceptions do not interfere with the program flow and are therefore logged as a warning.
      console.warn(error);
    } else {
      console.error(error);
      key = 'UNKNOWN';
    }

    this.displayErrorMessage(key, data);
  }

  /**
   *  displayErrorMessage - Displays a error message.
   *
   * @param key     a key of the translation to be requested
   * @param params  parameters to fill the wildcards of the translation
   */
  private displayErrorMessage(key: string, params?: object): void {
    this.translateService.get('MESSAGE.ERROR.' + key, params).subscribe(
      (message) => {
        console.log('Loaded message: ', message);
        this.toastService.presentErrorToast(message);
      }
    );
  }

  /**
   *  displaySuccessMessage - Displays a success message.
   *
   * @param key     a key of the translation to be requested
   * @param params  parameters to fill the wildcards of the translation
   */
  public displaySuccessMessage(key: string, params?: object): void {
    this.translateService.get('MESSAGE.SUCCESS.' + key, params).subscribe(
      (message) => {
        console.log('Loaded message: ', message);
        this.toastService.presentSuccessToast(message);
      }
    );
  }

  /**
   * handleUnauthorizedAccess - Error handling by displaying an error message.
   *
   * @param error the error to be handled
   */
  public handleUnauthorizedAccess(): void {
    this.displayErrorMessage('UNAUTHORIZED_ACCESS');
  }

  /**
   * convertDate - Convert a date to ISO format.
   *
   * @param date  the date to be converted
   */
  public convertDate(date: Date): string {
    return date ? date.toISOString() : '';
  }

  /**
   * convertDateString - Convert a date string to Date.
   *
   * @param dateString  the string to be converted
   */
  public convertDateString(dateString: string): Date {
    return dateString ? new Date(dateString) : null;
  }
}
