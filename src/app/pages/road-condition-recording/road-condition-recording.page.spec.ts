import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadConditionRecordingPage } from './road-condition-recording.page';

describe('RoadConditionRecordingPage', () => {
  let component: RoadConditionRecordingPage;
  let fixture: ComponentFixture<RoadConditionRecordingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadConditionRecordingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadConditionRecordingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
