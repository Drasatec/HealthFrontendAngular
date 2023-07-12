import { TestBed } from '@angular/core/testing';

import { DoctorStatusService } from './doctor-status.service';

describe('DoctorStatusService', () => {
  let service: DoctorStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
