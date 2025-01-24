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
        // Remove leading zeros for flexible matching
        const unpadMonth = month.replace(/^0+/, '');
        const unpadDay = day.replace(/^0+/, '');

        return words.every(word => {
          // Check for regular text search in title
          if (payment.title.toLowerCase().includes(word)) {
            return true;
          }

          // Handle partial date inputs (D.M or DD.MM or DD.MM.YYYY or D.MM or DD.M)
          if (/^(0?[1-9]|[12]\d|3[01])[.-]?(?:(?:0?(?:[1-9]|0)|1[0-2])(?:[.-]\d{4})?)?$/.test(word)) {
            const parts = word.split(/[-.]/)
            const [searchDay, searchMonth, searchYear] = parts;
            const searchDayUnpad = searchDay.replace(/^0+/, '');
            const searchMonthUnpad = searchMonth ? searchMonth.replace(/^0+/, '') : '';

            // If only day is provided with separator (e.g., "7.")
            if (!searchMonth || searchMonth === '') {
              return unpadDay === searchDayUnpad;
            }

            // If day and partial/complete month is provided (e.g., "7.2" or "7.12")
            if (searchMonth && !searchYear) {
              return unpadDay === searchDayUnpad && unpadMonth.startsWith(searchMonthUnpad);
            }

            // If day, month and partial/complete year is provided (e.g., "7.2.2" or "7.2.2023")
            if (searchYear) {
              return unpadDay === searchDayUnpad &&
                unpadMonth === searchMonthUnpad &&
                year.startsWith(searchYear);
            }
          }

          // Check if the word starts with a year pattern
          const yearPattern = /^\d{4}([-.])?/;
          if (yearPattern.test(word)) {
            const searchYear = word.substring(0, 4);

            // If it's just the year (with or without separator), match it
            if (word === searchYear || word === searchYear + '-' || word === searchYear + '.') {
              return year === searchYear;
            }

            // If there's more after the year, try to match month pattern
            if (word.length > 4) {
              const separator = word.charAt(4);
              const remainingPart = word.substring(5);

              // If nothing after separator, match the year
              if (remainingPart === '') {
                return year === searchYear;
              }

              // Split remaining part to check for month and day
              const [searchMonth, searchDay] = remainingPart.split(separator);
              const searchMonthUnpad = searchMonth ? searchMonth.replace(/^0+/, '') : '';
              const searchDayUnpad = searchDay ? searchDay.replace(/^0+/, '') : '';

              // Handle year and month
              if (!searchDay) {
                return year === searchYear && unpadMonth.startsWith(searchMonthUnpad || '');
              }

              // Handle year, month and partial day
              return year === searchYear &&
                unpadMonth === searchMonthUnpad &&
                (searchDayUnpad === '' || unpadDay.startsWith(searchDayUnpad));
            }
          }

          // Handle M.D.YYYY format
          if (/^([1-9]|0?[1-9]|1[0-2])[.-]([1-9]|0?[1-9]|[12]\d|3[01])[.-]\d{4}$/.test(word)) {
            const parts = word.split(/[-.]/)
            const [searchMonth, searchDay, searchYear] = parts;
            const searchMonthUnpad = searchMonth.replace(/^0+/, '');
            const searchDayUnpad = searchDay.replace(/^0+/, '');

            return year === searchYear &&
              unpadMonth === searchMonthUnpad &&
              unpadDay === searchDayUnpad;
          }

          // Check for individual date parts
          return year.includes(word) ||
            unpadMonth === word ||
            month === word ||
            unpadDay === word ||
            day === word;
        });
      })
      .map(payment => Payment.copy(payment));
  }

  ngOnDestroy(): void {
    this.subscribePayment.unsubscribe();
    this.subscribeAccount.unsubscribe();
  }
}
