import { IonSlides } from '@ionic/angular';
import { Slide } from './../../interfaces/slide';
import { Component, OnInit, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})

export class TutorialPage implements OnInit {
  @ViewChild('slides', { read: IonSlides, static: true }) public ionSlides: IonSlides;

  tutorialSlides: Slide[];
  isLastSlide = false;

  slideOpts = {
    zoom: false
  };

  constructor(
    private translateService: TranslateService) {
      this.initSlides();
  }

  ngOnInit(): void {
  }

  /**
   * initSlides - Initializing the slide contents.
   */
  private initSlides(): void {
    this.translateService.get([
      'TUTORIAL.SLIDE1_TITLE',
      'TUTORIAL.SLIDE1_DESCRIPTION',
      'TUTORIAL.SLIDE2_TITLE',
      'TUTORIAL.SLIDE2_DESCRIPTION',
      'TUTORIAL.SLIDE3_TITLE',
      'TUTORIAL.SLIDE3_DESCRIPTION',
      'TUTORIAL.SLIDE4_TITLE',
      'TUTORIAL.SLIDE4_DESCRIPTION',
    ]).subscribe(
      (values) => {
        console.log('Loaded values: ', values);
        this.tutorialSlides = [
          {
            title: values['TUTORIAL.SLIDE1_TITLE'],
            description: values['TUTORIAL.SLIDE1_DESCRIPTION'],
            image: 'assets/img/tutorial-slide-1.png'
          },
          {
            title: values['TUTORIAL.SLIDE2_TITLE'],
            description: values['TUTORIAL.SLIDE2_DESCRIPTION'],
            image: 'assets/img/tutorial-slide-2.png'
          },
          {
            title: values['TUTORIAL.SLIDE3_TITLE'],
            description: values['TUTORIAL.SLIDE3_DESCRIPTION'],
            image: 'assets/img/tutorial-slide-3.png'
          },
          {
            title: values['TUTORIAL.SLIDE4_TITLE'],
            description: values['TUTORIAL.SLIDE4_DESCRIPTION'],
            image: 'assets/img/tutorial-slide-4.png'
          }
        ];
      }
    );
  }

  /**
   * checkForSlidesEnd - Checks if the last slide has been reached.
   */
  public checkForSlidesEnd(): void {
    this.ionSlides.isEnd().then(result => {
      console.log('Tutorial slide end reached: ' + result);
      this.isLastSlide = result;
      });
  }
}
