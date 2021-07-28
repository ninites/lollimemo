import { TestBed } from '@angular/core/testing';

import { BigSpinnerService } from './big-spinner.service';

describe('BigSpinnerService', () => {
  let service: BigSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
