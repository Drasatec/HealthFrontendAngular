import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDoctorssComponent } from './all-doctorss.component';

describe('AllDoctorssComponent', () => {
  let component: AllDoctorssComponent;
  let fixture: ComponentFixture<AllDoctorssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDoctorssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDoctorssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
