import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {GeneralType, Transaction} from '../../../../model/Transaction';
import {Subscription} from 'rxjs';
import {AccountsService} from '../../../../service/accounts.service';
import {Account} from '../../../../model/Account';
import {Category} from '../../../../model/Category';
import {Payee} from '../../../../model/Payee';
import {PayeeService} from '../../../../service/payee.service';
import {CategoryService} from '../../../../service/category.service';
import {FormResetService} from '../../../../service/form-reset.service';
import {TransactionsService} from '../../../../service/transactions.service';
import {Router} from '@angular/router';
import {FormChangeService} from '../../../../service/form-change.service';

@Component({
  selector: 'app-transaction-form-add',
  templateUrl: './transaction-form-add.component.html',
  styleUrls: ['./transaction-form-add.component.css']
})
export class TransactionFormAddComponent implements OnInit, OnDestroy {
  newTransaction: Transaction;
  message: string;
  allAccounts: Array<Account>;
  allCategoriesForExpense: Array<Category>;
  allCategoriesForIncome: Array<Category>;
  allPayeesForExpense: Array<Payee>;
  allPayees: Array<Payee>;

  dataChangedEvent = new EventEmitter();

  isAccountIdValid = false;
  isTypeValid = false;
  isValueValid = false;
  isDateValid = false;
  isTitleValid = false;
  isPayeeIdValid = false;
  isCategoryIdValid = false;

  subscribe: Subscription;
  transactionResetSubscription: Subscription;

  constructor(private accountsService: AccountsService,
              private payeeService: PayeeService,
              private categoryService: CategoryService,
              private transactionsService: TransactionsService,
              private formResetService: FormResetService,
              private router: Router,
              private formChangeService: FormChangeService) { }

  ngOnInit(): void {
    this.newTransaction = new Transaction();
    this.newTransaction.accountId = null;
    this.newTransaction.payeeId = null;
    this.newTransaction.categoryId = null;
    this.newTransaction.type = null;
    this.newTransaction.date = this.getLocalISODatetime();
    this.isDateValid = true;
    this.transactionResetSubscription = this.formResetService.resetTransactionFormEvent.subscribe(
      transaction => {
        this.newTransaction = transaction;
      }
    );
    this.subscribe = this.accountsService.getAccounts().subscribe(
      next => {
        this.allAccounts = next;
      }
    );
    this.subscribe = this.payeeService.getPayees().subscribe(
      next => {
        this.allPayees = next;
      }
    );
    this.subscribe = this.categoryService.getAllCategories().subscribe(
      next => {
        this.allCategoriesForExpense = next;
      }
    );
    this.subscribe = this.categoryService.getAllCategories().subscribe(
      next => {
        this.allCategoriesForIncome = next;
      }
    );
  }

  ngOnDestroy(): void {
    this.transactionResetSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.message = 'Saving new transaction...';
    const timeWithZone = this.newTransaction.date;
    console.info('Date Local: ' + this.newTransaction.date);
    this.newTransaction.date = this.getUTCISODateTime(new Date(this.newTransaction.date));
    console.info('Date ISO: ' + this.newTransaction.date);
    this.transactionsService.addTransaction(this.newTransaction).subscribe({
      next: () => {
        this.dataChangedEvent.emit();
        this.redirectTo('payments');
      },
      error: (err) => {
        this.message = err.message;
        this.newTransaction.date = timeWithZone;
      }
    });
  }

  getPayees(): Array<Payee> {
    return this.allPayees;
  }

  getCategoriesForType(): Array<Category> {
    if (this.newTransaction.type === GeneralType.EXPENSE) {
      return this.allCategoriesForExpense;
    } else {
      return this.allCategoriesForIncome;
    }
  }

  checkIfAccountIdIsValid(): void {
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

  checkIfDateIsValid(): void {
    this.isDateValid = this.newTransaction.date != null;
  }

  checkIfTitleIsValid(): void {
    if (this.newTransaction.title) {
      this.isTitleValid = this.newTransaction.title.trim().length >= 3;
    } else {
      this.isTitleValid = false;
    }
  }

  checkIfCategoryIdIsValid(): void {
    this.isCategoryIdValid = this.newTransaction.categoryId != null &&
      !isNaN(Number(this.newTransaction.categoryId.toString()));
  }

  checkIfPayeeIdIsValid(): void {
    this.isPayeeIdValid = this.newTransaction.payeeId != null &&
      !isNaN(Number(this.newTransaction.payeeId.toString()));
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  toTransfer(): void {
    console.log('To transfer active');
    this.formChangeService.changeFormToTransfer();
  }

  private getLocalISODatetime(): string {
    const tzOffsetMilliseconds = new Date().getTimezoneOffset() * 60000;
    const dateAsMilliseconds = Date.now();
    return new Date(dateAsMilliseconds - tzOffsetMilliseconds).toISOString().slice(0, -5);
  }

  private getUTCISODateTime(date: Date): string {
    console.info('Converted date: ' + date);
    const dateAsMilliseconds = date.getTime();
    return new Date(dateAsMilliseconds).toISOString().slice(0, -5);
  }
}
