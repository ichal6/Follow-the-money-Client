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
              private accountsService: AccountsService) { }

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
    const htmlElement = event.target as HTMLInputElement;
    const searchPhrase = htmlElement.value.trim().toLowerCase();
    const words = searchPhrase.split(' ').filter(word => word !== '');

    this.displayPayments = this.allPayments
      .filter(payment => {
        const {year, monthNormalized, dayNormalized} = this.normalizeDateParts(payment.date);

        return words.every(word =>
          this.searchPaymentFields(payment, word) ||
          this.matchPartialDate(word, dayNormalized, monthNormalized, year) ||
          this.matchYearPattern(word, year, monthNormalized, dayNormalized) ||
          this.matchFullDate(word, year, monthNormalized, dayNormalized));
      })
      .map(payment => Payment.copy(payment));
  }

  private normalizeDateParts(date: Date): {
    year: string,
    month: string,
    day: string,
    monthNormalized: string,
    dayNormalized: string
  } {
    const dateParts = date.toISOString().split('T')[0].split('-');
    const [year, month, day] = dateParts;
    const {monthNormalized, dayNormalized} = this.removeLeadingZeros(month, day);

    return {year, month, day, monthNormalized, dayNormalized};
  }

  private searchPaymentFields(payment: Payment, word: string): boolean {
    return payment.title.toLowerCase().includes(word) ||
      payment.from.toLowerCase().includes(word) ||
      payment.to.toLowerCase().includes(word) ||
      payment.categoryName?.toLowerCase().includes(word) ||
      payment.subcategoryName?.toLowerCase().includes(word);
  }

  private matchPartialDate(word: string, dayNormalized: string, monthNormalized: string, year: string): boolean {
    if (this.getRegexpToHandlePartialDate().test(word)) {
      const parts = word.split(/[-.]/);
      const [searchDay, searchMonth, searchYear] = parts;
      const searchDayNormalized = searchDay.replace(/^0+/, '');
      const searchMonthNormalized = searchMonth ? searchMonth.replace(/^0+/, '') : '';

      if (this.isOnlyDayIsProvided(searchMonth)) {
        return dayNormalized === searchDayNormalized;
      }

      if (this.isDayAndPartialOrCompleteMonthProvided(searchMonth, searchYear)) {
        return dayNormalized === searchDayNormalized && monthNormalized.startsWith(searchMonthNormalized);
      }

      if (searchYear) {
        return dayNormalized === searchDayNormalized &&
          monthNormalized === searchMonthNormalized &&
          year.startsWith(searchYear);
      }
    }
    return false;
  }

  private matchYearPattern(word: string, year: string, monthNormalized: string, dayNormalized: string): boolean {
    const yearPattern = /^\d{4}([-.])?/;
    if (yearPattern.test(word)) {
      const searchYear = word.substring(0, 4);

      if (this.isYearWithOrWithoutSeparator(word, searchYear)) {
        return year === searchYear;
      }

      if (this.isMoreThanOnlyYear(word)) {
        const separator = word.charAt(4);
        const remainingPart = word.substring(5);

        const [searchMonth, searchDay] = remainingPart.split(separator);
        const searchMonthNormalized = searchMonth ? searchMonth.replace(/^0+/, '') : '';
        const searchDayNormalized = searchDay ? searchDay.replace(/^0+/, '') : '';

        if (!searchDay) {
          return year === searchYear && monthNormalized.startsWith(searchMonthNormalized || '');
        }

        return year === searchYear &&
          monthNormalized === searchMonthNormalized &&
          (searchDayNormalized === '' || dayNormalized.startsWith(searchDayNormalized));
      }
    }
    return false;
  }

  private matchFullDate(word: string, year: string, monthNormalized: string, dayNormalized: string): boolean {
    if (this.getRegexForM_D_YYYY().test(word)) {
      const parts = word.split(/[-.]/);
      const [searchMonth, searchDay, searchYear] = parts;
      const searchMonthNormalized = searchMonth.replace(/^0+/, '');
      const searchDayNormalized = searchDay.replace(/^0+/, '');

      return year === searchYear &&
        monthNormalized === searchMonthNormalized &&
        dayNormalized === searchDayNormalized;
    }
    return false;
  }

  private getRegexForM_D_YYYY() {
    return /^([1-9]|0?[1-9]|1[0-2])[.-]([1-9]|0?[1-9]|[12]\d|3[01])[.-]\d{4}$/;
  }

  private isMoreThanOnlyYear(word: string) {
    return word.length > 4;
  }

  private isYearWithOrWithoutSeparator(word: string, searchYear: string) {
    return word === searchYear || word === searchYear + '-' || word === searchYear + '.';
  }

  private isDayAndPartialOrCompleteMonthProvided(searchMonth: string, searchYear: string) {
    return searchMonth && !searchYear;
  }

  private isOnlyDayIsProvided(searchMonth: string) {
    return !searchMonth || searchMonth === '';
  }

  // Handle partial date inputs (D.M or DD.MM or DD.MM.YYYY or D.MM or DD.M)
  private getRegexpToHandlePartialDate() {
    return /^(0?[1-9]|[12]\d|3[01])[.-]?(?:(?:0?(?:[1-9]|0)|1[0-2])(?:[.-]\d{4})?)?$/;
  }

  private removeLeadingZeros(month: string, day: string) {
    const unpadMonth = month.replace(/^0+/, '');
    const unpadDay = day.replace(/^0+/, '');
    return {monthNormalized: unpadMonth, dayNormalized: unpadDay};
  }

  ngOnDestroy(): void {
    this.subscribePayment.unsubscribe();
    this.subscribeAccount.unsubscribe();
  }
}
