import { TestBed } from '@angular/core/testing';

import { FormResetService } from './form-reset.service';
import {HttpClientModule} from '@angular/common/http';

describe('FormResetService', () => {
  let service: FormResetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
