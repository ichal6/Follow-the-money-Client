import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {GeneralType, Transaction} from '../../../../model/Transaction';
import {Subscription} from 'rxjs';
import {AccountsService} from '../../../../service/accounts.service';
import {Account} from '../../../../model/Account';
import {Category} from '../../../../model/Category';

@Component({
  selector: 'app-transaction-form-add',
  templateUrl: './transaction-form-add.component.html',
  styleUrls: ['./transaction-form-add.component.css']
})
export class TransactionFormAddComponent implements OnInit, OnDestroy {
  newTransaction: Transaction;
  message: string;
  allAccounts: Array<Account>;
  allCategories: Array<Category>;
  allPayees: Array<Payee>;

  dataChangedEvent = new EventEmitter();

  isAccountIdValid = false;
  isTypeValid = false;
  isValueValid = false;

  subscribe: Subscription;

  constructor(private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.newTransaction = new Transaction();
    this.newTransaction.accountId = null;
    this.newTransaction.type = null;
    this.subscribe = this.accountsService.getAccounts().subscribe(
      next => {
        this.allAccounts = next;
      },
      error => {
        console.log('problem with loading the accounts: ', error);
      }
    );
  }

  ngOnDestroy(): void {
  }

  checkIfAccountIdIsValid(): void {
    console.log(this.newTransaction.accountId);
    this.isAccountIdValid = this.newTransaction.accountId != null &&
      !isNaN(Number(this.newTransaction.accountId.toString()));
  }

  checkIfTypeIsValid(): void {
    this.isTypeValid = (this.newTransaction.type.toUpperCase() === GeneralType.INCOME
      || this.newTransaction.type.toUpperCase() === GeneralType.EXPENSE);
  }

  checkIfValueIsValid(): void {
    this.isValueValid = ((this.newTransaction.value != null) &&
      (this.newTransaction.value.toString() !== '') &&
      (!isNaN(Number(this.newTransaction.value.toString()))) &&
      (Number(this.newTransaction.value.toString()) > 0)
    );
  }
}
