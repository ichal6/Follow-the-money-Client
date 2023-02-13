import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Payment} from '../model/Payment';
import {HttpClient} from '@angular/common/http';
import {Transfer} from '../model/Transfer';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
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

  addTransfer(newTransfer: Transfer): Observable<any> {
    const transferToAdd = {
      id: newTransfer.id,
      title: newTransfer.title,
      value: newTransfer.value,
      accountIdFrom: newTransfer.accountFromId,
      accountIdTo: newTransfer.accountToId,
      date: newTransfer.date};
    return this.http.post<any>(environment.restUrl + '/api/payment/transfer/' + this.email, transferToAdd , {withCredentials : true});
  }

  deleteTransfer(idTransfer): Observable<Payment>{
    return this.http.delete<null>(
      environment.restUrl + '/api/payment/transfer/' + idTransfer,
      {withCredentials: true});
  }
}
