import { TestBed } from '@angular/core/testing';

import { PayeeService } from './payee.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {data} from './fixture/PayeeJSONFixture';
import {createSpyFromClass, Spy} from 'jasmine-auto-spies';
import {DataService} from './data.service';
import * as PayeeModelFixture from './fixture/PayeeModelFixture';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PayeeService', () => {
  let service: PayeeService;
  let httpSpy: Spy<HttpClient>;

  const payeeObjects = [
    PayeeModelFixture.getBiedronkaPayee(),
    PayeeModelFixture.getJobPayee(),
    PayeeModelFixture.getKomisPayee()
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, HttpClientTestingModule
      ],
      providers: [
        PayeeService,
        {
          provide: HttpClient,
          useValue: createSpyFromClass(HttpClient)
        }
      ]
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayeeService);
    httpSpy = TestBed.inject(HttpClient) as Spy<HttpClient>;
    const email = "example@company.com";
    spyOn(DataService.prototype, 'getEmail').and.returnValue(email);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort payee by name when income from server', (done: DoneFn) => {
    httpSpy.get.and.nextWith(data);

    service.getPayees().subscribe({
      next: payees => {
        expect(payees.length).toEqual(data.length);
        expect(payees).toEqual(payeeObjects);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  });
});
