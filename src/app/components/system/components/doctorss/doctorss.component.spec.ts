import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorssComponent } from './doctorss.component';

describe('DoctorssComponent', () => {
  let component: DoctorssComponent;
  let fixture: ComponentFixture<DoctorssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
