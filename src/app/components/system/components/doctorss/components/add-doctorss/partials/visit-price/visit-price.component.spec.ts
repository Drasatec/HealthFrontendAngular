import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitPriceComponent } from './visit-price.component';

describe('VisitPriceComponent', () => {
  let component: VisitPriceComponent;
  let fixture: ComponentFixture<VisitPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
