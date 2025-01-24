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
        const dateParts = payment.date.toISOString().split('T')[0].split('-'); // Extract year, month, day
        const [year, month, day] = dateParts;
        const {monthNormalized, dayNormalized} = this.removeLeadingZeros(month, day);

        return words.every(word => {
          if (this.searchTextInTitle(payment, word)) {
            return true;
          }

          // Handle partial date inputs (D.M or DD.MM or DD.MM.YYYY or D.MM or DD.M)
          if (this.getRegexpToHandlePartialDate().test(word)) {
            const parts = word.split(/[-.]/)
            const [searchDay, searchMonth, searchYear] = parts;
            const searchDayNormalized = searchDay.replace(/^0+/, '');
            const searchMonthNormalized = searchMonth ? searchMonth.replace(/^0+/, '') : '';

            if (this.isOnlyDayIsProvided(searchMonth)) {
              return dayNormalized === searchDayNormalized;
            }

            if (this.isDayAndPartialOrCompleteMonthProvided(searchMonth, searchYear)) {
              return dayNormalized === searchDayNormalized && monthNormalized.startsWith(searchMonthNormalized);
            }

            // If day, month and partial/complete year is provided (e.g., "7.2.2" or "7.2.2023")
            if (searchYear) {
              return dayNormalized === searchDayNormalized &&
                monthNormalized === searchMonthNormalized &&
                year.startsWith(searchYear);
            }
          }

          // Check if the word starts with a year pattern
          const yearPattern = /^\d{4}([-.])?/;
          if (yearPattern.test(word)) {
            const searchYear = word.substring(0, 4);

            if (this.isYearWithOrWithoutSeparator(word, searchYear)) {
              return year === searchYear;
            }

            // If there's more after the year, try to match month pattern
            if (this.isMoreThanOnlyYear(word)) {
              const separator = word.charAt(4);
              const remainingPart = word.substring(5);

              const [searchMonth, searchDay] = remainingPart.split(separator);
              const searchMonthNormalized = searchMonth ? searchMonth.replace(/^0+/, '') : '';
              const searchDayNormalized = searchDay ? searchDay.replace(/^0+/, '') : '';

              // Handle year and month
              if (!searchDay) {
                return year === searchYear && monthNormalized.startsWith(searchMonthNormalized || '');
              }

              // Handle year, month and partial day
              return year === searchYear &&
                monthNormalized === searchMonthNormalized &&
                (searchDayNormalized === '' || dayNormalized.startsWith(searchDayNormalized));
            }
          }

          if (this.getRegexForM_D_YYYY().test(word)) {
            const parts = word.split(/[-.]/)
            const [searchMonth, searchDay, searchYear] = parts;
            const searchMonthNormalized = searchMonth.replace(/^0+/, '');
            const searchDayNormalized = searchDay.replace(/^0+/, '');

            return year === searchYear &&
              monthNormalized === searchMonthNormalized &&
              dayNormalized === searchDayNormalized;
          }

          // Check for individual date parts
          return year.includes(word) ||
            monthNormalized === word ||
            month === word ||
            dayNormalized === word ||
            day === word;
        });
      })
      .map(payment => Payment.copy(payment));
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

  private searchTextInTitle(payment: Payment, word: string) {
    return payment.title.toLowerCase().includes(word);
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
