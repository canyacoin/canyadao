import { TestBed } from '@angular/core/testing';

import { CanPriceService } from './can-price.service';

describe('CanPriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanPriceService = TestBed.get(CanPriceService);
    expect(service).toBeTruthy();
  });
});
