import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadNetworkPage } from './road-network.page';

describe('RoadNetworkPage', () => {
  let component: RoadNetworkPage;
  let fixture: ComponentFixture<RoadNetworkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadNetworkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadNetworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
