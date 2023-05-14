import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLabelTitleComponent } from './table-label-title.component';

describe('TableLabelTitleComponent', () => {
  let component: TableLabelTitleComponent;
  let fixture: ComponentFixture<TableLabelTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLabelTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLabelTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
