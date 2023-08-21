import { TestBed } from '@angular/core/testing';

import { ContatUsService } from './contat-us.service';

describe('ContatUsService', () => {
  let service: ContatUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContatUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
