import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarReciclajePage } from './agregar-reciclaje.page';

describe('AgregarReciclajePage', () => {
  let component: AgregarReciclajePage;
  let fixture: ComponentFixture<AgregarReciclajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarReciclajePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarReciclajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
