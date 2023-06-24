import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPricecategoryComponent } from './add-pricecategory.component';

describe('AddPricecategoryComponent', () => {
  let component: AddPricecategoryComponent;
  let fixture: ComponentFixture<AddPricecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPricecategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPricecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
