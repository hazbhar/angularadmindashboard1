import { TestBed } from '@angular/core/testing';

import { EtatcivilService } from './etatcivil.service';

describe('EtatcivilService', () => {
  let service: EtatcivilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatcivilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
