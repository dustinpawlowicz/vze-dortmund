import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly SETTINGS_KEY = 'settings_';
  private currentUserId: number;
  private settings: any;
  private defaultSettings: any = {
    language: 'de',
    displayNodes: true
  };

  constructor(
    private storage: Storage,
    private translateService: TranslateService) {
  }

  /**
   * load - Load the settings from memory or set the defaults.
   *
   * @param userId  id of the user for whom the settings are to be saved
   * @return        a promise that resolves when the key and value are set
   */
  public async load(userId: number): Promise<any> {
    this.currentUserId = userId;
    const settings = await this.storage.get(this.SETTINGS_KEY + this.currentUserId);
    if (settings) {
      this.settings = settings;
      return this.mergeDefaults(this.defaultSettings);
    } else {
      return this.setAll(this.defaultSettings).then((val) => {
        this.settings = val;
      });
    }
  }

  /**
   * mergeDefaults - Merge the settings with the defaults.
   *
   * @param defaults  the default settings, which are to be set
   * @return          resolve of storage save
   */
  private mergeDefaults(defaults: any): any {
    for (const setting in defaults) {
      if (!(setting in this.settings)) {
        this.settings[setting] = defaults[setting];
      }
    }
    return this.setAll(this.settings);
  }

  /**
   * setAll - Save all settings in the storage.
   *
   * @param value the settings that will be saved
   * @return      resolve of storage save
   */
  private setAll(value: any): any {
    return this.storage.set(this.SETTINGS_KEY + this.currentUserId, value).then(() => {
      this.applyGeneralSettings();
    });
  }

  /**
   * merge - Merge the saved settings with the new settings and save them on the device.
   *
   * @param settings  the settings to merge
   * @return          resolve of storage save
   */
  public merge(settings: any): any {
    for (const setting in settings) {
      if (settings[setting] != null) {
        this.settings[setting] = settings[setting];
      }
    }
    return this.save();
  }

  /**
   * save - Execute settings save.
   *
   * @return  resolve of storage save
   */
  private save(): any {
    return this.setAll(this.settings);
  }


  /**
   * getAllSettings - Get all user-specific settings.
   *
   * @return  the user spezific settings
   */
  public getAllSettings(): Promise<any> {
    return this.settings;
  }

  /**
   * getSetting - Get a specific setting using the key.
   *
   * @return  a promise with the value of the given key
   */
  public getSetting(key: string): Promise<any> {
    return this.storage.get(this.SETTINGS_KEY + this.currentUserId)
      .then(settings => {
        return settings[key];
      });
  }

  /**
   * applyGeneralSettings - Apply the general settings
   */
  public applyGeneralSettings(): void {
    this.getSetting('language').then(language => {
      this.translateService.use(language);
    });
  }
}
