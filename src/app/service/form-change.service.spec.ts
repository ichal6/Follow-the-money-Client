import { TestBed } from '@angular/core/testing';

import { FormChangeService } from './form-change.service';
import {HttpClientModule} from '@angular/common/http';

describe('FormChangeService', () => {
  let service: FormChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
