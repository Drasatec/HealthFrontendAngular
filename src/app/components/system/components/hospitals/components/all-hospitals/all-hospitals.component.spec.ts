import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHospitalsComponent } from './all-hospitals.component';

describe('AllHospitalsComponent', () => {
  let component: AllHospitalsComponent;
  let fixture: ComponentFixture<AllHospitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllHospitalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
