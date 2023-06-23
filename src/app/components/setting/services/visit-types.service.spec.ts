import { TestBed } from '@angular/core/testing';

import { VisitTypesService } from './visit-types.service';

describe('VisitTypesService', () => {
  let service: VisitTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
