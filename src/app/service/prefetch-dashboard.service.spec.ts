import { TestBed } from '@angular/core/testing';

import { PrefetchDashboardService } from './prefetch-dashboard.service';
import {HttpClientModule} from '@angular/common/http';

describe('PrefetchDashboardService', () => {
  let service: PrefetchDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefetchDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
