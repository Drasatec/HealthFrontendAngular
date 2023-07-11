import { TestBed } from '@angular/core/testing';

import { DoctorDegreeService } from './doctor-degree.service';

describe('DoctorDegreeService', () => {
  let service: DoctorDegreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorDegreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
