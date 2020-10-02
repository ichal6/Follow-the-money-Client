import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Account, AccountType} from '../../../../model/Account';
import {Subscription} from 'rxjs';
import {AccountsService} from '../../../../service/accounts.service';
import {Router} from '@angular/router';
import {FormResetService} from '../../../../service/form-reset.service';

@Component({
  selector: 'app-accounts-form-add',
  templateUrl: './accounts-form-add.component.html',
  styleUrls: ['./accounts-form-add.component.css']
})
export class AccountsFormAddComponent implements OnInit, OnDestroy {
  newAccount: Account;
  message: string;

  dataChangedEvent = new EventEmitter();

  isNameValid = false;
  isTypeValid = false;
  isBalanceValid = false;

  accountResetSubscription: Subscription;

  constructor(private accountsService: AccountsService,
              private router: Router,
              private formResetService: FormResetService) { }

  ngOnInit(): void {
    this.newAccount = new Account();
    this.newAccount.accountType = null;
    this.accountResetSubscription = this.formResetService.resetAccountFormEvent.subscribe(
      account => {
        this.newAccount = account;
      }
    );
  }

  ngOnDestroy(): void {
    this.accountResetSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.message = 'Saving new account...';
    this.accountsService.addAccount(this.newAccount).subscribe(
      (account) => {
        this.dataChangedEvent.emit();
        this.redirectTo('accounts');
      },
      (error) => {
        this.message = error.error;
        console.log(error);
      }
    );
  }

  checkIfNameIsValid(): void {
    if (this.newAccount.name) {
      this.isNameValid = this.newAccount.name.trim().length >= 3;
    } else {
      this.isNameValid = false;
    }
  }

  checkIfTypeIsValid(): void {
    this.isTypeValid = (this.newAccount.accountType.toUpperCase() === AccountType.BANK
    || this.newAccount.accountType.toUpperCase() === AccountType.CASH);
  }

  checkIfBalanceIsValid(): void {
    this.isBalanceValid = ((this.newAccount.startingBalance != null) &&
      (this.newAccount.startingBalance.toString() !== '') &&
      !isNaN(Number(this.newAccount.startingBalance.toString())));
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
