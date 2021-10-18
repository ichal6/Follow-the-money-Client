import { TestBed } from '@angular/core/testing';

import { PayeeService } from './payee.service';
import {HttpClientModule} from '@angular/common/http';

describe('PayeeService', () => {
  let service: PayeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
