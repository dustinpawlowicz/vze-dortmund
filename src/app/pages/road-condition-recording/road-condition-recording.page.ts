import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoadConditionRecordingService } from 'src/app/services/road-condition-recording/road-condition-recording.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-road-condition-recording',
  templateUrl: './road-condition-recording.page.html',
  styleUrls: ['./road-condition-recording.page.scss'],
})
export class RoadConditionRecordingPage implements OnInit, OnDestroy {
  private basicDataCompletedSubscription: Subscription;
  private characteristicsSubscription: Subscription;

  public basicDataCompleted: boolean;
  public characteristicsCompleted: boolean;

  constructor(private roadConditionRecordingService: RoadConditionRecordingService) { }

  ngOnInit(): void {
    this.basicDataCompletedSubscription = this.roadConditionRecordingService.getBasicDataCompleted()
      .subscribe((basicDataCompleted: boolean) => {
        this.basicDataCompleted = basicDataCompleted;
    });

    this.characteristicsSubscription = this.roadConditionRecordingService.getCharacteristicsCompleted()
      .subscribe((characteristicsCompleted: boolean) => {
        this.characteristicsCompleted = characteristicsCompleted;
    });
  }

  ngOnDestroy(): void {
    this.basicDataCompletedSubscription.unsubscribe();
    this.characteristicsSubscription.unsubscribe();
  }
}
