import { TestBed } from '@angular/core/testing';

import { ErrorDialogService } from './error-dialog-service';

describe('ErrorDialogServiceService', () => {
  let service: ErrorDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
