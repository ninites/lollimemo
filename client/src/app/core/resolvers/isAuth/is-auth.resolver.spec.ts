import { TestBed } from '@angular/core/testing';

import { IsAuthResolver } from './is-auth.resolver';

describe('IsAuthResolver', () => {
  let resolver: IsAuthResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(IsAuthResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
