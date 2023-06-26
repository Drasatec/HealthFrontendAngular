import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoJobsComponent } from './info-jobs.component';

describe('InfoJobsComponent', () => {
  let component: InfoJobsComponent;
  let fixture: ComponentFixture<InfoJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
