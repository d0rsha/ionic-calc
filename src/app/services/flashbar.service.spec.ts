import { TestBed } from '@angular/core/testing';

import { FlashbarService } from './flashbar.service';

describe('FlashbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlashbarService = TestBed.get(FlashbarService);
    expect(service).toBeTruthy();
  });
});
