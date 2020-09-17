import { TestBed } from '@angular/core/testing';

import { PrefetchDashboardService } from './prefetch-dashboard.service';

describe('PrefetchDashboardService', () => {
  let service: PrefetchDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefetchDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
