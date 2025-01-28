import {Component, OnDestroy, OnInit} from '@angular/core';
import {Transaction} from '../../../../model/Transaction';
import {Subscription} from 'rxjs';
import {AccountsService} from '../../../../service/accounts.service';
import {Account} from '../../../../model/Account';
import {Category} from '../../../../model/Category';
import {Payee} from '../../../../model/Payee';
import {PayeeService} from '../../../../service/payee.service';
import {CategoryService} from '../../../../service/category.service';
import {TransactionService} from '../../../../service/transaction.service';
import {Router} from '@angular/router';
import {PaymentsService} from "../../../../service/payments.service";
import {ValidatorService} from "../../../../service/common/validator.service";

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

  isAccountIdValid = false;
  isTypeValid = false;
  isValueValid = false;
  isDateValid = false;
  isTitleValid = false;
  isPayeeIdValid = false;
  isCategoryIdValid = false;

  subscriptionAccounts: Subscription;
  subscriptionPayees: Subscription;
  subscriptionCategories: Subscription;

  constructor(private accountsService: AccountsService,
              private payeeService: PayeeService,
              private categoryService: CategoryService,
              private transactionsService: TransactionService,
              private paymentService: PaymentsService,
              private validator: ValidatorService,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeNewTransaction();
    this.checkIfDateIsValid();

    this.loadAccounts();
    this.loadPayees();
    this.loadCategories();
  }

  private initializeNewTransaction() {
    this.newTransaction = new Transaction();
    this.newTransaction.accountId = null;
    this.newTransaction.payeeId = null;
    this.newTransaction.categoryId = null;
    this.newTransaction.type = null;
    this.newTransaction.date = this.paymentService.getLocalISODatetime();
  }

  private loadCategories(): void {
    this.subscriptionCategories = this.categoryService.getAllCategories().subscribe({
      next: (res) => this.allCategories = res,
      error: (err) => this.message = err.error,
      complete: () => console.log("Completed fetch categories")
    });
  }

  private loadPayees(): void {
    this.subscriptionPayees = this.payeeService.getPayees().subscribe({
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

  ngOnDestroy(): void {
    this.subscriptionAccounts?.unsubscribe();
    this.subscriptionPayees?.unsubscribe();
    this.subscriptionCategories?.unsubscribe();
  }

  onSubmit(): void {
    this.message = 'Saving new transaction...';
    const timeWithZone = this.newTransaction.date;
    this.newTransaction.date = this.paymentService.getUTCISODateTime(new Date(this.newTransaction.date));

    this.transactionsService.addTransaction(this.newTransaction).subscribe({
      next: () => {
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

  getCategories(): Array<Category> {
    return this.allCategories;
  }

  checkIfAccountIdIsValid(): void {
    this.isAccountIdValid = this.newTransaction.accountId != null &&
      !isNaN(Number(this.newTransaction.accountId.toString()));
  }

  checkIfTypeIsValid(): void {
    this.isTypeValid = this.validator.checkIfTypeIsValid(this.newTransaction.type);
  }

  checkIfValueIsValid(): void {
    this.isValueValid = this.validator.checkIfValueIsValid(this.newTransaction.value);
  }

  checkIfDateIsValid(): void {
    this.isDateValid = this.validator.checkIfDateIsValid(this.newTransaction.date);
  }

  checkIfTitleIsValid(): void {
    this.isTitleValid = this.validator.checkIfTitleIsValid(this.newTransaction.title);
  }

  checkIfCategoryIdIsValid(): void {
    this.isCategoryIdValid = this.newTransaction.categoryId != null &&
      !isNaN(Number(this.newTransaction.categoryId.toString()));
  }

  checkIfPayeeIdIsValid(): void {
    this.isPayeeIdValid = this.newTransaction.payeeId != null &&
      !isNaN(Number(this.newTransaction.payeeId.toString()));
  }

  private redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
