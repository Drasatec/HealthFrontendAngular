import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureImageComponent } from './feature-image.component';

describe('FeatureImageComponent', () => {
  let component: FeatureImageComponent;
  let fixture: ComponentFixture<FeatureImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
