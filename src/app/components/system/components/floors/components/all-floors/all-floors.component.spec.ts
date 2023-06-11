import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFloorsComponent } from './all-floors.component';

describe('AllFloorsComponent', () => {
  let component: AllFloorsComponent;
  let fixture: ComponentFixture<AllFloorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFloorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
