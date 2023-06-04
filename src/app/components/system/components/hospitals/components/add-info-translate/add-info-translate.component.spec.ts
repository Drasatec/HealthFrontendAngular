import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfoTranslateComponent } from './add-info-translate.component';

describe('AddInfoTranslateComponent', () => {
  let component: AddInfoTranslateComponent;
  let fixture: ComponentFixture<AddInfoTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInfoTranslateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInfoTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
