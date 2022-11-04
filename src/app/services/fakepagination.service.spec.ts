import { TestBed } from '@angular/core/testing';

import { FakepaginationService } from './fakepagination.service';

describe('FakepaginationService', () => {
  let service: FakepaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakepaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
