import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarReportePage } from './agregar-reporte.page';

describe('AgregarReportePage', () => {
  let component: AgregarReportePage;
  let fixture: ComponentFixture<AgregarReportePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarReportePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarReportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
