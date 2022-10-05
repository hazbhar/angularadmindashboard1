import { TestBed } from '@angular/core/testing';

import { TypepersonnelService } from './typepersonnel.service';

describe('TypepersonnelService', () => {
  let service: TypepersonnelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypepersonnelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
