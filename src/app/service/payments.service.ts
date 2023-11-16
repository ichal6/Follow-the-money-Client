import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payment} from '../model/Payment';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient,
              private dataService: DataService) {
  }

  getPayments(accountId?: number, periodInDays?: number): Observable<Array<Payment>> {
    let url = environment.restUrl + '/api/payment/' + this.dataService.getEmail() + '?';
    if (typeof accountId !== 'undefined' && accountId !== null) {
      url += 'id=' + accountId;
    }
    if (periodInDays > 0) {
      url += '&period=' + periodInDays;
    }
    return this.http.get<Array<Payment>>(url,
      {withCredentials: true})
      .pipe(
        map(data => {
          return this.extractPaymentsFromJSON(data);
        }),
        map(result => result.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()))
      );
  }

  extractPaymentsFromJSON(payments: Array<Payment>): Array<Payment> {
    const paymentsJSON = payments;
    const paymentsTS = new Array<Payment>();

    for (const payment of paymentsJSON) {
      paymentsTS.push(Payment.fromHttp(payment));
    }
    return paymentsTS;
  }

  getLocalISODatetime(): string {
    const tzOffsetMilliseconds = new Date().getTimezoneOffset() * 60000;
    const dateAsMilliseconds = Date.now();
    return new Date(dateAsMilliseconds - tzOffsetMilliseconds).toISOString().slice(0, -5);
  }

  getUTCISODateTime(date: Date): string {
    const dateAsMilliseconds = date.getTime();
    return new Date(dateAsMilliseconds).toISOString().slice(0, -5);
  }
}
