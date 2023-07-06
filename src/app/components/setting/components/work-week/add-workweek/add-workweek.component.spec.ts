import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkweekComponent } from './add-workweek.component';

describe('AddWorkweekComponent', () => {
  let component: AddWorkweekComponent;
  let fixture: ComponentFixture<AddWorkweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkweekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
