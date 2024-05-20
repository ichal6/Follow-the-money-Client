import {Component, Input, OnInit} from '@angular/core';
import {AccountsService} from '../../../../service/accounts.service';
import {Router} from '@angular/router';
import {Account, AccountType} from '../../../../model/Account';

@Component({
  selector: 'app-accounts-form-edit',
  templateUrl: './accounts-form-edit.component.html',
  styleUrls: ['./accounts-form-edit.component.css']
})
export class AccountsFormEditComponent implements OnInit {
  @Input()
  updatedAccount: Account;

  updatedAccountForm: Account;
  message: string;

  isNameValid = false;
  isTypeValid = false;
  isBalanceValid = false;

  constructor(private accountsService: AccountsService,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.updatedAccountForm = Account.fromJavaScript(
      {
        id: this.updatedAccount.id,
        name: this.updatedAccount.name,
        accountType: this.updatedAccount.accountType,
        startingBalance: this.updatedAccount.startingBalance,
        currentBalance: this.updatedAccount.currentBalance}
    );
    this.checkIfNameIsValid();
    this.checkIfTypeIsValid();
    this.checkIfBalanceIsValid();
  }

  onSubmit(): void {
    this.message = 'Updating account...';
    this.editAccount();
  }

  private editAccount(): void {
    this.accountsService.updateAccount(this.updatedAccountForm).subscribe({
      next: () => this.redirectTo('accounts'),
      error: error => this.message = error.message
    });
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

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
