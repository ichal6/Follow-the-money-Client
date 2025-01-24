import { Injectable } from '@angular/core';
import { DateParts } from './date-matcher.service';
import {Payment} from "../../model/Payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentFilterService {
  public searchPaymentFields(payment: Payment, word: string): boolean {
    return payment.title.toLowerCase().includes(word.toLowerCase()) ||
      payment.from.toLowerCase().includes(word.toLowerCase()) ||
      payment.to.toLowerCase().includes(word.toLowerCase()) ||
      payment.categoryName?.toLowerCase().includes(word.toLowerCase()) ||
      payment.subcategoryName?.toLowerCase().includes(word.toLowerCase());
  }

  public matchPartialDate(word: string, dateParts: DateParts): boolean {
    if (this.getRegexpToHandlePartialDate().test(word)) {
      const parts = word.split(/[-.]/);
      const [searchDay, searchMonth, searchYear] = parts;
      const searchDayNormalized = searchDay.replace(/^0+/, '');
      const searchMonthNormalized = searchMonth ? searchMonth.replace(/^0+/, '') : '';

      if (this.isOnlyDayIsProvided(searchMonth)) {
        return dateParts.dayNormalized === searchDayNormalized;
      }

      if (this.isDayAndPartialOrCompleteMonthProvided(searchMonth, searchYear)) {
        return dateParts.dayNormalized === searchDayNormalized && dateParts.monthNormalized.startsWith(searchMonthNormalized);
      }

      if (searchYear) {
        return dateParts.dayNormalized === searchDayNormalized &&
          dateParts.monthNormalized === searchMonthNormalized &&
          dateParts.year.startsWith(searchYear);
      }
    }
    return false;
  }

  public matchYearPattern(word: string, dateParts: DateParts): boolean {
    const yearPattern = /^\d{4}([-.])?/;
    if (yearPattern.test(word)) {
      const searchYear = word.substring(0, 4);

      if (this.isYearWithOrWithoutSeparator(word, searchYear)) {
        return dateParts.year === searchYear;
      }

      if (this.isMoreThanOnlyYear(word)) {
        const separator = word.charAt(4);
        const remainingPart = word.substring(5);

        const [searchMonth, searchDay] = remainingPart.split(separator);
        const searchMonthNormalized = searchMonth ? searchMonth.replace(/^0+/, '') : '';
        const searchDayNormalized = searchDay ? searchDay.replace(/^0+/, '') : '';

        if (!searchDay) {
          return dateParts.year === searchYear && dateParts.monthNormalized.startsWith(searchMonthNormalized || '');
        }

        return dateParts.year === searchYear &&
          dateParts.monthNormalized === searchMonthNormalized &&
          (searchDayNormalized === '' || dateParts.dayNormalized.startsWith(searchDayNormalized));
      }
    }
    return false;
  }

  public matchFullDate(word: string, dateParts: DateParts): boolean {
    if (this.getRegexForM_D_YYYY().test(word)) {
      const parts = word.split(/[-.]/);
      const [searchMonth, searchDay, searchYear] = parts;
      const searchMonthNormalized = searchMonth.replace(/^0+/, '');
      const searchDayNormalized = searchDay.replace(/^0+/, '');

      return dateParts.year === searchYear &&
        dateParts.monthNormalized === searchMonthNormalized &&
        dateParts.dayNormalized === searchDayNormalized;
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
}
