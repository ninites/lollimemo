import { TestBed } from '@angular/core/testing';

import { GameParametersService } from './game-parameters.service';

describe('GameParametersService', () => {
  let service: GameParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
