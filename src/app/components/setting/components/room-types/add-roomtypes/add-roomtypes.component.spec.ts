import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomtypesComponent } from './add-roomtypes.component';

describe('AddRoomtypesComponent', () => {
  let component: AddRoomtypesComponent;
  let fixture: ComponentFixture<AddRoomtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoomtypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoomtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
