import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {GeneralType, Transaction} from '../model/Transaction';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient,
              private dataService: DataService) {
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
    return this.http.post<any>(environment.restUrl + '/api/payment/transaction/' + this.dataService.getEmail(), transactionToAdd , {withCredentials : true});
  }

  deleteTransaction(idTransaction): Observable<Transaction>{
    return this.http.delete<null>(
      environment.restUrl + '/api/payment/transaction/' + idTransaction,
      {withCredentials: true});
  }
}
