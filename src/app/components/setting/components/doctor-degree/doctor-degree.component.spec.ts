import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDegreeComponent } from './doctor-degree.component';

describe('DoctorDegreeComponent', () => {
  let component: DoctorDegreeComponent;
  let fixture: ComponentFixture<DoctorDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorDegreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
