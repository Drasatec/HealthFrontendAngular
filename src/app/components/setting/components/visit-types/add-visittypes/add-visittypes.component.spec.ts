import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisittypesComponent } from './add-visittypes.component';

describe('AddVisittypesComponent', () => {
  let component: AddVisittypesComponent;
  let fixture: ComponentFixture<AddVisittypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVisittypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVisittypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
