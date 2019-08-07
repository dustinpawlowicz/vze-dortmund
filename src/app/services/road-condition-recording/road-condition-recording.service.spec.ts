import { TestBed } from '@angular/core/testing';

import { RoadConditionRecordingService } from './road-condition-recording.service';

describe('RoadConditionRecordingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoadConditionRecordingService = TestBed.get(RoadConditionRecordingService);
    expect(service).toBeTruthy();
  });
});
