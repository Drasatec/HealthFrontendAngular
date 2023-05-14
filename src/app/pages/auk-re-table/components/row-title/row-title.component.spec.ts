import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowTitleComponent } from './row-title.component';

describe('RowTitleComponent', () => {
  let component: RowTitleComponent;
  let fixture: ComponentFixture<RowTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RowTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
