import { TestBed } from '@angular/core/testing';

import { HabilitaionService } from './habilitaion.service';

describe('HabilitaionService', () => {
  let service: HabilitaionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabilitaionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
