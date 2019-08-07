import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataPage } from './basic-data.page';

describe('BasicDataPage', () => {
  let component: BasicDataPage;
  let fixture: ComponentFixture<BasicDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
