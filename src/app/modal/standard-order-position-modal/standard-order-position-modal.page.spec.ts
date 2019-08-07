import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardOrderPositionModalPage } from './standard-order-position-modal.page';

describe('StandardOrderPositionModalPage', () => {
  let component: StandardOrderPositionModalPage;
  let fixture: ComponentFixture<StandardOrderPositionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardOrderPositionModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardOrderPositionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
