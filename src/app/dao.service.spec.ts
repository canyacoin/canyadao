import { TestBed } from '@angular/core/testing';

import { DaoService } from './dao.service';

describe('DaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DaoService = TestBed.get(DaoService);
    expect(service).toBeTruthy();
  });
});
