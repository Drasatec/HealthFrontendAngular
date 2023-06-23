import { TestBed } from '@angular/core/testing';

import { SsntypesService } from './ssntypes.service';

describe('SsntypesService', () => {
  let service: SsntypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsntypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
