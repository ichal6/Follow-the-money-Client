import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {GeneralType, Transaction} from '../model/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
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

  addTransaction(newTransaction: Transaction): Observable<any> {
    const calculatedValue = (newTransaction.type === GeneralType.EXPENSE) ? 0 - newTransaction.value : newTransaction.value;
    const transactionToAdd = {
      id: newTransaction.id,
      title: newTransaction.title,
      type: newTransaction.type,
      value: calculatedValue,
      categoryId: newTransaction.categoryId,
      payeeId: newTransaction.payeeId,
      accountId: newTransaction.accountId,
      date: newTransaction.date};
    return this.http.post<any>(environment.restUrl + '/api/payment/transaction/' + this.email, transactionToAdd , {withCredentials : true});
  }
}
