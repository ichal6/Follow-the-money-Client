import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Payment} from '../model/Payment';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private email: string;

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
    this.setEmailFromCookie();
  }

  setEmailFromCookie(): void {
    if (this.cookieService.check('e-mail')) {
      this.email = this.cookieService.get('e-mail');
    }
  }

  getPayments(id: number, periodInDays: number): Observable<Array<Payment>> {
    return this.http.get<Array<Payment>>(environment.restUrl + '/api/payment/' + this.email + '?id=' + id + '&period=' + periodInDays,
      {withCredentials: true})
      .pipe(
        map(data => {
          return this.extractPaymentsFromJSON(data);
        })
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
}
