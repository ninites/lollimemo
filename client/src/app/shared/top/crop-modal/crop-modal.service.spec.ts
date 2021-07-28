import { TestBed } from '@angular/core/testing';

import { CropModalService } from './crop-modal.service';

describe('CropModalService', () => {
  let service: CropModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
