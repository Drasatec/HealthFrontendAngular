import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComboboxComponent } from './table-combobox.component';

describe('TableComboboxComponent', () => {
  let component: TableComboboxComponent;
  let fixture: ComponentFixture<TableComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComboboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
