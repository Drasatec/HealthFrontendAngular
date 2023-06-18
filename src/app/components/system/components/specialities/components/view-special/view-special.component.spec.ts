import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecialComponent } from './view-special.component';

describe('ViewSpecialComponent', () => {
  let component: ViewSpecialComponent;
  let fixture: ComponentFixture<ViewSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpecialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
