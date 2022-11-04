import { TestBed } from '@angular/core/testing';

import { EapService } from './eap.service';

describe('EapService', () => {
  let service: EapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
