import { languages } from './../../properties/languages';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../services/settings/settings.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {
  public readonly AVAILABE_LANGUAGES = languages;

  private settingsSubscription: Subscription;
  private settings: any;
  public settingsReady = false;
  public settingsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
  }

  /**
   * buildForm - Create the settings form with the stored settings value.
   */
  private async buildForm(): Promise<void> {
    this.settings = await this.settingsService.getAllSettings();

    const group: any = {
      language: [this.settings.language],
      displayNodes: [this.settings.displayNodes]
    };
    this.settingsForm = this.formBuilder.group(group);
    this.settingsReady = true;

    this.settingsSubscription = this.settingsForm.valueChanges.subscribe((result) => {
      console.log('Settings changed: ', this.settingsForm.value);
      this.settingsService.merge(this.settingsForm.value);
    });
  }
}
