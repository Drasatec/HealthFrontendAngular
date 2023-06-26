import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorssComponent } from './add-doctorss.component';

describe('AddDoctorssComponent', () => {
  let component: AddDoctorssComponent;
  let fixture: ComponentFixture<AddDoctorssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoctorssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
