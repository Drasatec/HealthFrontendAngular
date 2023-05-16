import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AukReTableComponent } from './auk-re-table.component';

describe('AukReTableComponent', () => {
  let component: AukReTableComponent;
  let fixture: ComponentFixture<AukReTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AukReTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AukReTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
