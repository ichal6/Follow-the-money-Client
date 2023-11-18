import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import * as TransactionModelFixture from './fixture/TransationModelFixture';
import {environment} from '../../environments/environment';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TransactionService ]
    }).compileComponents();

    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sent PUT request when try edit Transaction', () =>{
    service.updateTransaction(TransactionModelFixture.getBuyCarTransaction()).subscribe(
      response => {
        expect(response).toBeNull();
      });

    const req = httpMock.expectOne(environment.restUrl + '/api/payment/transaction');
    expect(req.request.method).toBe('PUT');
  })

  it('should add sign to value before sent', () =>{
    service.updateTransaction(TransactionModelFixture.getBuyCarTransaction()).subscribe(
      response => {
        expect(response).toBeNull();
      });

    const req = httpMock.expectOne(environment.restUrl + '/api/payment/transaction');
    expect(req.request.body.value).toBe(TransactionModelFixture.getBuyCarTransaction().value * -1);
  })
});
