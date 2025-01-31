import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {TransactionType, Transaction} from '../model/Transaction';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient,
              private dataService: DataService) {
  }

  getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(
      environment.restUrl + "/api/payment/transaction/" + this.dataService.getEmail() + "/" + id,
      {withCredentials: true}
    );
  }

  addTransaction(newTransaction: Transaction): Observable<void> {
    newTransaction.value = this.calculateValue(newTransaction);
    return this.http.post<void>(
      environment.restUrl + '/api/payment/transaction/' + this.dataService.getEmail(),
      newTransaction ,
      {withCredentials : true}
    );
  }

  deleteTransaction(idTransaction): Observable<Transaction>{
    return this.http.delete<null>(
      environment.restUrl + '/api/payment/transaction/' + idTransaction,
      {withCredentials: true});
  }

  updateTransaction(transaction: Transaction): Observable<void> {
    transaction.value = this.calculateValue(transaction);
    return this.http.put<null>(
      environment.restUrl + '/api/payment/transaction',
      transaction,
      {withCredentials: true}
    );
  }

  private calculateValue(transaction: Transaction): number {
    return (transaction.type === TransactionType.EXPENSE) ? 0 - transaction.value : transaction.value;
  }
}
