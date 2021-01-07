import { TestBed } from '@angular/core/testing';

import { FacilityAuthGuard } from './facility-auth.guard';

describe('FacilityAuthGuard', () => {
  let guard: FacilityAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FacilityAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
