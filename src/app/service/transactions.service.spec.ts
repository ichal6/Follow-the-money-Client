import { TestBed } from '@angular/core/testing';

import { TransactionsService } from './transactions.service';
import {HttpClientModule} from '@angular/common/http';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
