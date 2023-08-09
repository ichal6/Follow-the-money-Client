import { TestBed } from '@angular/core/testing';

import { TransferService } from './transfer.service';
import * as TransferModelFixture from './fixture/TransferModelFixture';
import {environment} from '../../environments/environment';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TransferService', () => {
  let service: TransferService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(TransferService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sent PUT request when try edit Transfer', () =>{
    service.updateTransfer(TransferModelFixture.getCashDepositSeptember()).subscribe(
      response => {
        expect(response).toBeNull();
      });

    const req = httpMock.expectOne(environment.restUrl + '/api/payment/transfer');
    expect(req.request.method).toBe('PUT');
  })
});
