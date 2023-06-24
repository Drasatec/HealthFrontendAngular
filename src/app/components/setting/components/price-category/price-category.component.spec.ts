import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCategoryComponent } from './price-category.component';

describe('PriceCategoryComponent', () => {
  let component: PriceCategoryComponent;
  let fixture: ComponentFixture<PriceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
