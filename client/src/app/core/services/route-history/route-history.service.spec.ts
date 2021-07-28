import { TestBed } from '@angular/core/testing';

import { RouteHistoryService } from './route-history.service';

describe('RouteHistoryService', () => {
  let service: RouteHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
