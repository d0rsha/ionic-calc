import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashbarPage } from './flashbar.page';

describe('FlashbarPage', () => {
  let component: FlashbarPage;
  let fixture: ComponentFixture<FlashbarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashbarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashbarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
