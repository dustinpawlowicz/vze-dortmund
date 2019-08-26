import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoadConditionRecordingService } from 'src/app/services/road-condition-recording/road-condition-recording.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-road-condition-recording',
  templateUrl: './road-condition-recording.page.html',
  styleUrls: ['./road-condition-recording.page.scss'],
})
export class RoadConditionRecordingPage implements OnInit, OnDestroy {
  private destroySubject = new Subject();

  public basicDataCompleted: boolean;
  public characteristicsCompleted: boolean;

  constructor(private roadConditionRecordingService: RoadConditionRecordingService) { }

  ngOnInit(): void {
    this.roadConditionRecordingService.getBasicDataCompleted().pipe(
      takeUntil(this.destroySubject)
    ).subscribe((basicDataCompleted: boolean) => {
        this.basicDataCompleted = basicDataCompleted;
    });

    this.roadConditionRecordingService.getCharacteristicsCompleted()
      .subscribe((characteristicsCompleted: boolean) => {
        this.characteristicsCompleted = characteristicsCompleted;
    });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
}
