import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payment} from '../../../../model/Payment';
import {Subscription} from 'rxjs';
import {PaymentsService} from '../../../../service/payments.service';
import {AccountsService} from '../../../../service/accounts.service';
import {Account, NoAccount} from '../../../../model/Account';

@Component({
  selector: 'app-payments-all',
  templateUrl: './payments-all.component.html',
  styleUrls: ['./payments-all.component.css']
})
export class PaymentsAllComponent implements OnInit, OnDestroy {
  public payments: Array<Payment>;
  public allAccounts: Array<Account>;
  public account: Account;
  public noAccount: NoAccount;
  public periodInDays: number;
  private subscribePayment: Subscription;
  private subscribeAccount: Subscription;

  constructor(private paymentsService: PaymentsService,
              private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.noAccount = new NoAccount();
    this.account = this.noAccount;
    this.periodInDays = 0;
    this.requestAccounts();
    this.requestPayments();
  }

  private requestAccounts() : void {
    this.subscribeAccount = this.accountsService.getAccounts().subscribe({
      next: (res) => this.allAccounts = res,
      error: err => console.log('problem with loading the accounts: ', err),
      complete: () => console.log('Completed fetch accounts')
    });
  }

  requestPayments(): void {
    this.subscribePayment = this.paymentsService.getPayments(this.account.id, this.periodInDays).subscribe({
      next: (res) => this.payments = res,
      error: (err) => console.log('problem with getting the payments: ', err),
      complete: () => console.log('Completed fetch all payments')
    });
  }

  ngOnDestroy(): void {
    this.subscribePayment.unsubscribe();
    this.subscribeAccount.unsubscribe();
  }
}
