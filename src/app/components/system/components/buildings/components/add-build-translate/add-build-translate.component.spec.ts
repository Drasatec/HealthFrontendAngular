import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuildTranslateComponent } from './add-build-translate.component';

describe('AddBuildTranslateComponent', () => {
  let component: AddBuildTranslateComponent;
  let fixture: ComponentFixture<AddBuildTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBuildTranslateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBuildTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
