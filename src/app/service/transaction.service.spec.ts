import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import * as TransactionModelFixture from './fixture/TransationModelFixture';
import {environment} from '../../environments/environment';
import { DataService } from './data.service';
import {TransactionType} from "../model/Transaction";

describe('TransactionService', () => {
  let service: TransactionService;
  let dataService: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TransactionService ]
    }).compileComponents();

    service = TestBed.inject(TransactionService);
    dataService = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(dataService, 'getEmail').and.returnValue('email@example.pl');
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
  });

  it('should correctly calculate value for EXPENSE transaction when updating', () => {
    const updatedTransaction = TransactionModelFixture.getBuyCarTransaction();
    service.updateTransaction(updatedTransaction).subscribe(
      response => {
        expect(response).toBeNull();
      });

    const req = httpMock.expectOne(environment.restUrl + '/api/payment/transaction');
    expect(req.request.body.value).toBe(TransactionModelFixture.getBuyCarTransaction().value * -1);
  });

  it('should correctly calculate value for INCOME transaction when updating', () => {
    const updatedTransaction = TransactionModelFixture.getBuyCarTransaction();
    updatedTransaction.type = TransactionType.INCOME;
    service.updateTransaction(updatedTransaction).subscribe(
      response => {
        expect(response).toBeNull();
      });

    const req = httpMock.expectOne(environment.restUrl + '/api/payment/transaction');
    expect(req.request.body.value).toBe(TransactionModelFixture.getBuyCarTransaction().value);
  });

  it('should send POST request when adding a new transaction', () => {
    const newTransaction = TransactionModelFixture.getBuyCarTransaction();
    service.addTransaction(newTransaction).subscribe(
      response => {
        expect(response).toBeNull();
      });

    const req = httpMock.expectOne(environment.restUrl + '/api/payment/transaction/' + dataService.getEmail());
    expect(req.request.method).toBe('POST');
  });

  it('should correctly calculate value for EXPENSE transaction', () => {
    const newTransaction = TransactionModelFixture.getBuyCarTransaction();
    service.addTransaction(newTransaction).subscribe(
      response => {
        expect(response).toBeNull();
      });

    const req = httpMock.expectOne(
      environment.restUrl + '/api/payment/transaction/' + dataService.getEmail()
    );
    expect(req.request.body.value).toBe(TransactionModelFixture.getBuyCarTransaction().value * -1);
  });

  it('should correctly calculate value for INCOME transaction', () => {
    const newTransaction = TransactionModelFixture.getBuyCarTransaction();
    newTransaction.type = TransactionType.INCOME;
    service.addTransaction(newTransaction).subscribe(
      response => {
        expect(response).toBeNull();
      });

    const req = httpMock.expectOne(
      environment.restUrl + '/api/payment/transaction/' + dataService.getEmail()
    );
    expect(req.request.body.value).toBe(TransactionModelFixture.getBuyCarTransaction().value);
  });
});
