import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignageOrderPositionModalPage } from './signage-order-position-modal.page';

describe('SignageOrderPositionModalPage', () => {
  let component: SignageOrderPositionModalPage;
  let fixture: ComponentFixture<SignageOrderPositionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignageOrderPositionModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignageOrderPositionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
