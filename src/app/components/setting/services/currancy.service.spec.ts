import { TestBed } from '@angular/core/testing';

import { CurrancyService } from './currancy.service';

describe('CurrancyService', () => {
  let service: CurrancyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrancyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
