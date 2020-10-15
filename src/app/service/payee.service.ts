import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Payee} from '../model/Payee';
import {Observable} from 'rxjs';
import {Category} from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class PayeeService {
  private email: string;

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
    this.setEmailFromCookie();
  }

  setEmailFromCookie(): void{
    if (this.cookieService.check('e-mail')){
      this.email = this.cookieService.get('e-mail');
    }
  }

  getPayeeByIncome(): Observable<Array<Payee>>{
    return this.http.get<Array<Payee>>(environment.restUrl + '/api/payee/income/' + this.email, {withCredentials: true})
      .pipe(
        map(
          data => {
            const payees = new Array<Payee>();
            for (const payee of data) {
              payees.push(Payee.fromHttp(payee));
            }
            return payees;
          }
        )
      );
  }

  getPayeeByExpense(): Observable<Array<Payee>>{
    return this.http.get<Array<Payee>>(environment.restUrl + '/api/payee/expense/' + this.email, {withCredentials: true})
      .pipe(
        map(
          data => {
            const payees = new Array<Payee>();
            for (const payee of data) {
              payees.push(Payee.fromHttp(payee));
            }
            return payees;
          }
        )
      );
  }

  deletePayee(id): Observable<any>{
    return this.http.delete<null>(environment.restUrl + '/api/payee/' + this.email + '/' + id,
      {withCredentials: true});
  }

  createNewPayee(newPayee: Payee): Observable<any>{
    const payeeJSON = {name: newPayee.name, type: newPayee.type};
    return this.http.post<null>(environment.restUrl + '/api/payee/' + this.email, payeeJSON, {withCredentials : true});
  }

  updatePayee(updatedPayee: Payee): Observable<any>{
    return this.http.put<null>(environment.restUrl + '/api/payee/' + this.email + '/' + updatedPayee.id, updatedPayee.name,
      {withCredentials : true});
  }
}
