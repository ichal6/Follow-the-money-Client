import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payment} from '../../../../model/Payment';
import {Subscription} from 'rxjs';
import {PaymentsService} from '../../../../service/payments.service';
import {AccountsService} from '../../../../service/accounts.service';
import {Account, NoAccount} from '../../../../model/Account';
import {PaymentFilterService} from "../../../../service/utils/payment-filter.service";
import {DateMatcherService, DateParts} from "../../../../service/utils/date-matcher.service";

@Component({
  selector: 'app-payments-all',
  templateUrl: './payments-all.component.html',
  styleUrls: ['./payments-all.component.css']
})
export class PaymentsAllComponent implements OnInit, OnDestroy {
  public displayPayments: Array<Payment>;
  public allPayments: Array<Payment>;
  public allAccounts: Array<Account>;
  public account: Account;
  public noAccount: NoAccount;
  public periodInDays: number;
  public searchPhrase: string;
  private subscribePayment: Subscription;
  private subscribeAccount: Subscription;

  constructor(private paymentsService: PaymentsService,
              private accountsService: AccountsService,
              private paymentFilterService: PaymentFilterService,
              private dateMatcherService: DateMatcherService) { }

  ngOnInit(): void {
    this.noAccount = new NoAccount();
    this.account = this.noAccount;
    this.periodInDays = 0;
    this.searchPhrase = '';
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
      next: (res) => {
        this.allPayments = res;
        this.displayPayments = [...res];
        },
      error: (err) => console.log('problem with getting the payments: ', err),
      complete: () => console.log('Completed fetch all payments')
    });
  }

  filterResult(event: Event) {
    const words = this.processSearchPhrase(event);
    this.filterPaymentsWithSearchTerms(words);
  }

  private processSearchPhrase(event: Event) {
    const htmlElement = event.target as HTMLInputElement;
    const searchPhrase = htmlElement.value.trim().toLowerCase();
    return searchPhrase.split(' ').filter(word => word !== '');
  }

  private filterPaymentsWithSearchTerms(words: string[]) {
    this.displayPayments = this.allPayments
      .filter(payment => {
        const dateParts: DateParts = this.dateMatcherService.extractDateParts(payment.date);

        return words.every(word =>
          this.paymentFilterService.searchPaymentFields(payment, word) ||
          this.paymentFilterService.matchPartialDate(word, dateParts) ||
          this.paymentFilterService.matchYearPattern(word, dateParts) ||
          this.paymentFilterService.matchFullDate(word, dateParts));
      })
      .map(payment => Payment.copy(payment));
  }

  ngOnDestroy(): void {
    this.subscribePayment.unsubscribe();
    this.subscribeAccount.unsubscribe();
  }

  handleCarNameEvent($event: { name: string }) {
    console.log($event.name);
  }
}
