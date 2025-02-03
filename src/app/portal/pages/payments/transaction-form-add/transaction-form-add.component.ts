import {Component, OnDestroy, OnInit} from '@angular/core';
import {Transaction} from '../../../../model/Transaction';
import {Subscription} from 'rxjs';
import {AccountsService} from '../../../../service/accounts.service';
import {Account} from '../../../../model/Account';
import {Category, Subcategory} from '../../../../model/Category';
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
  styleUrls: ['./transaction-form-add.component.css', '../transaction-form-edit/transaction-form-edit.component.css']
})
export class TransactionFormAddComponent implements OnInit, OnDestroy {
  newTransaction: Transaction;
  message: string;
  allAccounts: Array<Account>;
  allCategories: Array<Category>;
  allPayees: Array<Payee>;

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

    this.loadAccounts();
    this.loadPayees();
    this.loadCategories();
  }

  initializeNewTransaction() {
    this.newTransaction = new Transaction();
    this.newTransaction.accountId = null;
    this.newTransaction.payeeId = null;
    this.newTransaction.categoryId = null;
    this.newTransaction.subcategoryId = null;
    this.newTransaction.type = null;
    this.newTransaction.date = this.paymentService.getLocalISODatetime();

    this.checkIfDateIsValid();
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

  checkIfAccountIdIsValid(): boolean {
    return this.newTransaction.accountId != null &&
      !isNaN(Number(this.newTransaction.accountId.toString()));
  }

  checkIfTypeIsValid(): boolean {
    return this.validator.checkIfTypeIsValid(this.newTransaction.type);
  }

  checkIfValueIsValid(): boolean {
    return this.validator.checkIfValueIsValid(this.newTransaction.value);
  }

  checkIfDateIsValid(): boolean {
    return  this.validator.checkIfDateIsValid(this.newTransaction.date);
  }

  checkIfTitleIsValid(): boolean {
    return this.validator.checkIfTitleIsValid(this.newTransaction.title);
  }

  checkIfCategoryIdIsValid(): boolean {
    return  this.newTransaction.categoryId != null &&
      !isNaN(Number(this.newTransaction.categoryId.toString()));
  }

  checkIfPayeeIdIsValid(): boolean {
    return  this.newTransaction.payeeId != null &&
      !isNaN(Number(this.newTransaction.payeeId.toString()));
  }

  private redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  setNullSubcategoryIdForTransaction(): void {
    this.newTransaction.subcategoryId = null;
  }

  getSubcategories(): Array<Subcategory> {
    return this.allCategories?.filter(c => c.id == this.newTransaction.categoryId)?.shift()?.subcategories;
  }

  checkTransactionValidity(): boolean {
    return this.checkIfTitleIsValid() &&
      this.checkIfDateIsValid() &&
      this.validator.checkIfTypeIsValid(this.newTransaction.type) &&
      this.checkIfValueIsValid();
  }

  getSelectStyles(value:string | number | null) {
    return {
      color: value ? '#404040' : '#A0A0A1',
    }
  }

  handlePayeeIdEvent($event: { id: number }) {
    this.newTransaction.payeeId = $event.id;
  }
}
