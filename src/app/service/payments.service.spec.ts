import { TestBed } from '@angular/core/testing';

import { PaymentsService } from './payments.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {  HttpClientTestingModule } from '@angular/common/http/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { data } from './fixture/PaymentJSONFixture';
import * as PaymentModelFixture from './fixture/PaymentModelFixture';
describe('PaymentsService', () => {
  let service: PaymentsService;
  let httpSpy: Spy<HttpClient>;

  const paymentsObjects = [PaymentModelFixture.getBuyCarPayment(),
    PaymentModelFixture.getBuyAnotherCarPayment(),
    PaymentModelFixture.getCashDepositSeptember()];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, HttpClientTestingModule
      ],
      providers: [
        PaymentsService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http Get method and return all payments', (done: DoneFn) => {
    httpSpy.get.and.nextWith(data);

    service.getPayments().subscribe(payments => {
        expect(payments.length).toEqual(data.length);
        expect(payments).toEqual(paymentsObjects);
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
});
