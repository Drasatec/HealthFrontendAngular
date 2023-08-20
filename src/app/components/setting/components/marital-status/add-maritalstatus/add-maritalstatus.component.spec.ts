import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaritalstatusComponent } from './add-maritalstatus.component';

describe('AddMaritalstatusComponent', () => {
  let component: AddMaritalstatusComponent;
  let fixture: ComponentFixture<AddMaritalstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaritalstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMaritalstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
