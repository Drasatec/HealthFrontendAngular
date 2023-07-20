import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTranslationComponent } from './patient-translation.component';

describe('PatientTranslationComponent', () => {
  let component: PatientTranslationComponent;
  let fixture: ComponentFixture<PatientTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientTranslationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
