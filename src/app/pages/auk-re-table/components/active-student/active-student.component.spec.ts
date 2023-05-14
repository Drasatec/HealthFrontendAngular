import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveStudentComponent } from './active-student.component';

describe('ActiveStudentComponent', () => {
  let component: ActiveStudentComponent;
  let fixture: ComponentFixture<ActiveStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
