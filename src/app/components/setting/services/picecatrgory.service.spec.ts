import { TestBed } from '@angular/core/testing';

import { PicecatrgoryService } from './picecatrgory.service';

describe('PicecatrgoryService', () => {
  let service: PicecatrgoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicecatrgoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
