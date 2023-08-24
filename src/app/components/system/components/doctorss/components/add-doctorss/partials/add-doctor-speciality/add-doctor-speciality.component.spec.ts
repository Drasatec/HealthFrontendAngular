import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorSpecialityComponent } from './add-doctor-speciality.component';

describe('AddDoctorSpecialityComponent', () => {
  let component: AddDoctorSpecialityComponent;
  let fixture: ComponentFixture<AddDoctorSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorSpecialityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoctorSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
