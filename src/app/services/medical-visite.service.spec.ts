import { TestBed } from '@angular/core/testing';

import { MedicalVisiteService } from './medical-visite.service';

describe('MedicalVisiteService', () => {
  let service: MedicalVisiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalVisiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
