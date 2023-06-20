import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationTypesComponent } from './translation-types.component';

describe('TranslationTypesComponent', () => {
  let component: TranslationTypesComponent;
  let fixture: ComponentFixture<TranslationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
