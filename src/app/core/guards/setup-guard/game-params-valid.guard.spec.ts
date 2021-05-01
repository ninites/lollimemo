import { TestBed } from '@angular/core/testing';

import { GameParamsValidGuard } from './game-params-valid.guard';

describe('GameParamsValidGuard', () => {
  let guard: GameParamsValidGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GameParamsValidGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
