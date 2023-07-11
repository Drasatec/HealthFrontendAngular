import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStatusComponent } from './doctor-status.component';

describe('DoctorStatusComponent', () => {
  let component: DoctorStatusComponent;
  let fixture: ComponentFixture<DoctorStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
