import { languages } from './properties/languages';
import { SettingsService } from './services/settings/settings.service';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  private readonly DEFAULT_LANG = 'de';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translateService: TranslateService,
    private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.initializeApp();
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  async initTranslate(): Promise<void> {
    this.translateService.setDefaultLang(this.DEFAULT_LANG);

    const browserLang = this.translateService.getBrowserLang();
    if (browserLang) {
      this.translateService.use(browserLang);
      return;
    }

    this.translateService.use(this.DEFAULT_LANG);
  }
}
