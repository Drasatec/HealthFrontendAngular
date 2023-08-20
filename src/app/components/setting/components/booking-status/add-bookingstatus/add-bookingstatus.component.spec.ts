import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingstatusComponent } from './add-bookingstatus.component';

describe('AddBookingstatusComponent', () => {
  let component: AddBookingstatusComponent;
  let fixture: ComponentFixture<AddBookingstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookingstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookingstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
