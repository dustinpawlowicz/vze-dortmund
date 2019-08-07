import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOrderPositionModalPage } from './custom-order-position-modal.page';

describe('CustomOrderPositionModalPage', () => {
  let component: CustomOrderPositionModalPage;
  let fixture: ComponentFixture<CustomOrderPositionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomOrderPositionModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomOrderPositionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
