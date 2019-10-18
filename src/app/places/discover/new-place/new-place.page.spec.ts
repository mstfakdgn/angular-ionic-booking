import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlacePage } from './new-place.page';

describe('NewPlacePage', () => {
  let component: NewPlacePage;
  let fixture: ComponentFixture<NewPlacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
