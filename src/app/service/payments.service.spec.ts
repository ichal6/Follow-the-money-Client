import { TestBed } from '@angular/core/testing';

import { PaymentsService } from './payments.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {  HttpClientTestingModule } from '@angular/common/http/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { data } from './fixture/PaymentJSONFixture';
import * as PaymentModelFixture from './fixture/PaymentModelFixture';
import {spyDataServiceGetEmail} from './common/SpyObjects';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let httpSpy: Spy<HttpClient>;
  const getTime = Date.prototype.getTime;
  const getTimezoneOffset = Date.prototype.getTimezoneOffset;

  const paymentsObjects = [
    PaymentModelFixture.getCashDepositSeptember(),
    PaymentModelFixture.getBuyCarPayment(),
    PaymentModelFixture.getBuyAnotherCarPayment()
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, HttpClientTestingModule
      ],
      providers: [
        PaymentsService,
        {
          provide: HttpClient,
          useValue: createSpyFromClass(HttpClient)
        }
      ]
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsService);
    httpSpy = TestBed.inject(HttpClient) as Spy<HttpClient>;
    spyDataServiceGetEmail();

    const timestamp = 1699976646000;
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(timestamp)); // 14 nov 2023 15:44:06 UTC
    Date.prototype.getTimezoneOffset =  () => -60; // Time zone for Warsaw
    Date.prototype.getTime = () => timestamp;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    Date.prototype.getTime = getTime;
    Date.prototype.getTimezoneOffset = getTimezoneOffset;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http Get method and return all payments', (done: DoneFn) => {
    // restore origin functions
    Date.prototype.getTime = getTime;
    Date.prototype.getTimezoneOffset = getTimezoneOffset;

    httpSpy.get.and.nextWith(data);

    service.getPayments().subscribe({
      next: payments => {
        expect(payments.length).toEqual(data.length);
        expect(payments).toEqual(paymentsObjects);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should return local time with ISO format', () => {
    expect(service.getLocalISODatetime()).toBe('2023-11-14T16:44:06');
  })

  it('should return local time for custom date with ISO format', () => {
    // restore origin functions
    Date.prototype.getTime = getTime;
    // given
    const timestamp = 1700152171000; // 2023-11-16-16T16:29:31 UTC
    // when
    const date = service.getLocalISODatetime(new Date(timestamp));
    // then
    expect(date).toBe('2023-11-16T17:29:31');
  })

  it('should get UTC ISO date time in string format', () => {
    expect(service.getUTCISODateTime(new Date())).toBe('2023-11-14T15:44:06');
  });
});
