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
import {ValidatorService} from '../../../../service/common/validator.service';
import {PaymentsService} from "../../../../service/payments.service";


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
              private paymentService: PaymentsService,
              private accountsService: AccountsService,
              private payeesService: PayeeService,
              private categoryService: CategoryService,
              private validator: ValidatorService,
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
        this.updateTransaction.date = this.paymentService.getLocalISODatetime(new Date(this.updateTransaction.date));
      },
      error: err => console.log('problem with loading the transaction: ', err),
      complete: () => console.log('Completed fetch transaction to edit')
    });
  }

  onSubmit(): void {
    this.message = 'Update a transaction...';
    const timeWithZone = this.updateTransaction.date;
    this.updateTransaction.date = this.paymentService.getUTCISODateTime(new Date(this.updateTransaction.date));
    this.subscriptionUpdate = this.transactionsService.updateTransaction(this.updateTransaction).subscribe( {
      next: () => this.redirectTo('payments'),
      error: err => {
        this.message = err.message;
        this.updateTransaction.date = timeWithZone;
      }
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
    return this.isTitleValid() &&
      this.isDateIsValid() &&
      this.validator.checkIfTypeIsValid(this.updateTransaction.type) &&
      this.isValueIsValid();
  }

  isTitleValid(): boolean {
    return this.validator.checkIfTitleIsValid(this.updateTransaction.title)
  }

  isDateIsValid(): boolean {
    return this.validator.checkIfDateIsValid(this.updateTransaction.date);
  }

  isValueIsValid(): boolean {
    return this.validator.checkIfValueIsValid(this.updateTransaction.value);
  }

  returnToTransaction() {
    this.formChangeService.changeFormToTransaction();
  }
}
