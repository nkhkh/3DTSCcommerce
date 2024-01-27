import { TestBed } from '@angular/core/testing';

import { BabylonServiceService } from './babylon-service.service';

describe('BabylonServiceService', () => {
  let service: BabylonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BabylonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
