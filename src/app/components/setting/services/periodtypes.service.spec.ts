import { TestBed } from '@angular/core/testing';

import { PeriodtypesService } from './periodtypes.service';

describe('PeriodtypesService', () => {
  let service: PeriodtypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodtypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
