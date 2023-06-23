import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNatioalityComponent } from './add-natioality.component';

describe('AddNatioalityComponent', () => {
  let component: AddNatioalityComponent;
  let fixture: ComponentFixture<AddNatioalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNatioalityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNatioalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
