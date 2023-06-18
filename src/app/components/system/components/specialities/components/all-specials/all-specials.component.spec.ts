import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSpecialsComponent } from './all-specials.component';

describe('AllSpecialsComponent', () => {
  let component: AllSpecialsComponent;
  let fixture: ComponentFixture<AllSpecialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSpecialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSpecialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
