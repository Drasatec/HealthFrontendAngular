import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCurrancyComponent } from './add-currancy.component';

describe('AddCurrancyComponent', () => {
  let component: AddCurrancyComponent;
  let fixture: ComponentFixture<AddCurrancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCurrancyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCurrancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
