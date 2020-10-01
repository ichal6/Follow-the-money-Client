import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {AccountsService} from '../../../../service/accounts.service';
import {Router} from '@angular/router';
import {FormResetService} from '../../../../service/form-reset.service';
import {Account, AccountType} from '../../../../model/Account';

@Component({
  selector: 'app-accounts-form-edit',
  templateUrl: './accounts-form-edit.component.html',
  styleUrls: ['./accounts-form-edit.component.css']
})
export class AccountsFormEditComponent implements OnInit, OnDestroy {
  @Input()
  updatedAccount: Account;

  updatedAccountForm: Account;
  message: string;

  @Output()
  dataChangedEvent = new EventEmitter();

  isNameValid = false;
  isTypeValid = false;
  isBalanceValid = false;

  accountResetSubscription: Subscription;

  constructor(private accountsService: AccountsService,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.accountResetSubscription = this.formResetService.resetAccountFormEvent.subscribe(
      account => {
        this.updatedAccount = account;
        this.initializeForm();
      }
    );
  }

  initializeForm(): void {
    this.updatedAccountForm = Object.assign({}, this.updatedAccount);
    this.checkIfNameIsValid();
    this.checkIfTypeIsValid();
    this.checkIfBalanceIsValid();
  }

  ngOnDestroy(): void {
    this.accountResetSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.message = 'Updating account...';
    this.accountsService.updateAccount(this.updatedAccountForm).subscribe(
      (account) => {
        this.dataChangedEvent.emit();
        this.router.navigate(['portal', 'pages', 'accounts']);
      },
      (error) => {
        this.message = error.error;
      }
    );
  }

  checkIfNameIsValid(): void {
    if (this.updatedAccountForm.name) {
      this.isNameValid = this.updatedAccountForm.name.trim().length >= 3;
    } else {
      this.isNameValid = false;
    }
  }

  checkIfTypeIsValid(): void {
    this.isTypeValid = (this.updatedAccountForm.accountType.toUpperCase() === AccountType.BANK
      || this.updatedAccountForm.accountType.toUpperCase() === AccountType.CASH);
  }

  checkIfBalanceIsValid(): void {
    this.isBalanceValid = ((this.updatedAccountForm.startingBalance != null) &&
      (this.updatedAccountForm.startingBalance.toString() !== '') &&
      !isNaN(Number(this.updatedAccountForm.startingBalance.toString())));
  }
}
