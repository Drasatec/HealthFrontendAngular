import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorTranslateComponent } from './add-doctor-translate.component';

describe('AddDoctorTranslateComponent', () => {
  let component: AddDoctorTranslateComponent;
  let fixture: ComponentFixture<AddDoctorTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorTranslateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoctorTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
