import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeriodtypesComponent } from './add-periodtypes.component';

describe('AddPeriodtypesComponent', () => {
  let component: AddPeriodtypesComponent;
  let fixture: ComponentFixture<AddPeriodtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPeriodtypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPeriodtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
