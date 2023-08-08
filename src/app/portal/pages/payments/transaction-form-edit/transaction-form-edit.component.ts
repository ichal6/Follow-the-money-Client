import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormChangeService} from '../../../../service/form-change.service';
import {TransactionsService} from '../../../../service/transactions.service';
import {Router} from '@angular/router';
import {Transaction} from '../../../../model/Transaction';
import {Subscription} from 'rxjs';
import {Account} from '../../../../model/Account';
import {AccountsService} from '../../../../service/accounts.service';
import {Payee} from '../../../../model/Payee';
import {PayeeService} from '../../../../service/payee.service';
import {Category} from '../../../../model/Category';
import {CategoryService} from '../../../../service/category.service';


@Component({
  selector: 'app-transaction-form-edit',
  templateUrl: './transaction-form-edit.component.html',
  styleUrls: ['./transaction-form-edit.component.css', '../transaction-form-add/transaction-form-add.component.css']
})
export class TransactionFormEditComponent  implements OnInit, OnDestroy{
  message: string;
  updateTransaction: Transaction;
  allAccounts: Array<Account>;
  allPayees: Array<Payee>;
  allCategories: Array<Category>;

  subscriptionUpdate: Subscription;
  subscriptionGet: Subscription;
  subscriptionAccounts: Subscription;
  subscriptionPayees: Subscription;
  subscriptionCategories: Subscription;

  constructor(public formChangeService: FormChangeService,
              private transactionsService: TransactionsService,
              private accountsService: AccountsService,
              private payeesService: PayeeService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.updateTransaction = new Transaction();
    this.loadTransaction();
    this.loadAccounts();
    this.loadPayees();
    this.loadCategories();
  }

  private loadCategories(): void {
    this.subscriptionCategories = this.categoryService.getAllCategories().subscribe({
      next: (res) => this.allCategories = res,
      error: (err) => this.message = err.error,
      complete: () => console.log("Completed fetch categories")
    });
  }

  private loadPayees(): void {
    this.subscriptionPayees = this.payeesService.getPayees().subscribe({
      next: (res) => this.allPayees = res,
      error: (err) => this.message = err.error,
      complete: () => console.log("Completed fetch payees")
    });
  }

  private loadAccounts(): void {
    this.subscriptionAccounts = this.accountsService.getAccounts().subscribe({
      next: (res) => this.allAccounts = res,
      error: (err) => this.message = err.error,
      complete: () => console.log("Completed fetch accounts")
    })
  }

  private loadTransaction() {
    this.subscriptionGet = this.transactionsService.getTransaction(this.formChangeService.payment.id).subscribe({
      next: (res) => {
        this.updateTransaction = Transaction.fromHttp(res);
        this.updateTransaction.value = Math.abs(this.updateTransaction.value);
      },
      error: err => console.log('problem with loading the transaction: ', err),
      complete: () => console.log('Completed fetch transaction to edit')
    });
  }

  onSubmit(): void {
    this.message = 'Update a transaction...';
    this.subscriptionUpdate = this.transactionsService.updateTransaction(this.updateTransaction).subscribe( {
      next: () =>   this.redirectTo('payments'),
      error: err => this.message = err.error
    });
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  ngOnDestroy(): void {
    this.subscriptionUpdate?.unsubscribe();
    this.subscriptionGet?.unsubscribe();
    this.subscriptionAccounts?.unsubscribe();
    this.subscriptionPayees?.unsubscribe();
    this.subscriptionCategories?.unsubscribe();
  }

  isTransactionValid(): boolean {
    return this.updateTransaction.checkIfTitleIsValid() &&
        this.updateTransaction.checkIfDateIsValid() &&
      this.updateTransaction.checkIfTypeIsValid() &&
      this.updateTransaction.checkIfValueIsValid();
  }

  isTitleValid(): boolean {
    return this.updateTransaction.checkIfTitleIsValid();
  }

  isDateIsValid():boolean {
    return this.updateTransaction.checkIfDateIsValid();
  }

  isValueIsValid(): boolean {
    return this.updateTransaction.checkIfValueIsValid();
  }

  returnToTransaction() {
    this.formChangeService.changeFormToTransaction();
  }
}
