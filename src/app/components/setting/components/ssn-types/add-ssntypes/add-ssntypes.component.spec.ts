import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSsntypesComponent } from './add-ssntypes.component';

describe('AddSsntypesComponent', () => {
  let component: AddSsntypesComponent;
  let fixture: ComponentFixture<AddSsntypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSsntypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSsntypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
