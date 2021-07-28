import { TestBed } from '@angular/core/testing';

import { SmallGameParamsGuard } from './small-game-params.guard';

describe('SmallGameParamsGuard', () => {
  let guard: SmallGameParamsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SmallGameParamsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
