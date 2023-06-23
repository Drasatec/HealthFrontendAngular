import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsnTypesComponent } from './ssn-types.component';

describe('SsnTypesComponent', () => {
  let component: SsnTypesComponent;
  let fixture: ComponentFixture<SsnTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsnTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsnTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
