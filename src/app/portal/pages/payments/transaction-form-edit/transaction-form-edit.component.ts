import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormChangeService} from '../../../../service/form-change.service';
import {TransactionsService} from '../../../../service/transactions.service';
import {Router} from '@angular/router';
import {Transaction} from '../../../../model/Transaction';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-transaction-form-edit',
  templateUrl: './transaction-form-edit.component.html',
  styleUrls: ['./transaction-form-edit.component.css']
})
export class TransactionFormEditComponent  implements OnInit, OnDestroy{
  message: string;
  updateTransaction: Transaction;
  subscription: Subscription;

  constructor(public formChangeService: FormChangeService,
              private transactionsService: TransactionsService,
              private router: Router) { }

  ngOnInit(): void {
    this.updateTransaction = new Transaction();
    this.updateTransaction.id = this.formChangeService.transaction.id;
  }

  onSubmit(): void {
    this.message = 'Update a transaction...';
    this.subscription = this.transactionsService.updateTransaction(this.updateTransaction).subscribe(
      () => {
        this.redirectTo('payments');
      }
    );
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  ngOnDestroy(): void {
    if(this.subscription)
      this.subscription?.unsubscribe();
  }

  isTransactionValid(): boolean {
    return this.updateTransaction.checkIfTitleIsValid();
  }
}
