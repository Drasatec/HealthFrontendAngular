import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrancyComponent } from './currancy.component';

describe('CurrancyComponent', () => {
  let component: CurrancyComponent;
  let fixture: ComponentFixture<CurrancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrancyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
