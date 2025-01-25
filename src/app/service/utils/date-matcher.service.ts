import { Injectable } from '@angular/core';

export interface DateParts {
  year: string;
  month: string;
  day: string;
  monthNormalized: string;
  dayNormalized: string;
}

export interface SearchDateParts {
  searchDay?: string;
  searchMonth?: string;
  searchYear?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DateMatcherService {
  private readonly DATE_SEPARATORS = /[-.]/;
  private readonly YEAR_PATTERN = /^\d{4}([-.])?/;

  private normalizeValue(value?: string): string {
    return value ? value.replace(/^0+/, '') : '';
  }

  extractDateParts(date: Date): DateParts {
    const [year, month, day] = date.toISOString().split('T')[0].split('-');
    return {
      year,
      month,
      day,
      monthNormalized: this.normalizeValue(month),
      dayNormalized: this.normalizeValue(day)
    };
  }

  parseSearchDate(word: string): SearchDateParts {
    const parts = word.split(this.DATE_SEPARATORS);
    return {
      searchDay: this.normalizeValue(parts[0]),
      searchMonth: parts[1] ? this.normalizeValue(parts[1]) : undefined,
      searchYear: parts[2]
    };
  }

  isYearPattern(word: string): boolean {
    return this.YEAR_PATTERN.test(word);
  }
}
