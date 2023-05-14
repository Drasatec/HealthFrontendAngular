import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHumanCardComponent } from './table-human-card.component';

describe('TableHumanCardComponent', () => {
  let component: TableHumanCardComponent;
  let fixture: ComponentFixture<TableHumanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableHumanCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHumanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
