import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorHosComponent } from './add-doctor-hos.component';

describe('AddDoctorHosComponent', () => {
  let component: AddDoctorHosComponent;
  let fixture: ComponentFixture<AddDoctorHosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorHosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoctorHosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
