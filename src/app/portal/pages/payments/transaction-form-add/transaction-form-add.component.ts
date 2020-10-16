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
  allPayeesForIncome: Array<Payee>;

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
              private router: Router) { }

  ngOnInit(): void {
    this.newTransaction = new Transaction();
    this.newTransaction.accountId = null;
    this.newTransaction.payeeId = null;
    this.newTransaction.categoryId = null;
    this.newTransaction.type = null;
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
    this.subscribe = this.payeeService.getPayeeByExpense().subscribe(
      next => {
        this.allPayeesForExpense = next;
      }
    );
    this.subscribe = this.payeeService.getPayeeByIncome().subscribe(
      next => {
        this.allPayeesForIncome = next;
      }
    );
    this.subscribe = this.categoryService.getCategoriesByExpense().subscribe(
      next => {
        this.allCategoriesForExpense = next;
      }
    );
    this.subscribe = this.categoryService.getCategoriesByIncome().subscribe(
      next => {
        this.allCategoriesForIncome = next;
      }
    );
  }

  ngOnDestroy(): void {
    this.transactionResetSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.message = 'Saving new account...';
    this.transactionsService.addTransaction(this.newTransaction).subscribe(
      (transaction) => {
        this.dataChangedEvent.emit();
        this.redirectTo('payments');
      }
    );
  }

  getPayeesForType(): Array<Payee> {
    if (this.newTransaction.type === GeneralType.EXPENSE) {
      return this.allPayeesForExpense;
    } else {
      return this.allPayeesForIncome;
    }
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