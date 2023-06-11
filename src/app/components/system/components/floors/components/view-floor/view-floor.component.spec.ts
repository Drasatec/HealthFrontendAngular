import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFloorComponent } from './view-floor.component';

describe('ViewFloorComponent', () => {
  let component: ViewFloorComponent;
  let fixture: ComponentFixture<ViewFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFloorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
