import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopHospitalComponent } from './stop-hospital.component';

describe('StopHospitalComponent', () => {
  let component: StopHospitalComponent;
  let fixture: ComponentFixture<StopHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopHospitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
