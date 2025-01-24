import { TestBed } from '@angular/core/testing';
import { DateMatcherService, DateParts, SearchDateParts } from './date-matcher.service';

describe('DateMatcherService', () => {
  let service: DateMatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateMatcherService]
    });
    service = TestBed.inject(DateMatcherService);
  });

  describe('extractDateParts', () => {
    it('should correctly extract date parts from a Date object', () => {
      const testDate = new Date('2023-12-05');
      const expected: DateParts = {
        year: '2023',
        month: '12',
        day: '05',
        monthNormalized: '12',
        dayNormalized: '5'
      };

      const result = service.extractDateParts(testDate);
      expect(result).toEqual(expected);
    });

    it('should handle single digit months and days', () => {
      const testDate = new Date('2023-02-05');
      const expected: DateParts = {
        year: '2023',
        month: '02',
        day: '05',
        monthNormalized: '2',
        dayNormalized: '5'
      };

      const result = service.extractDateParts(testDate);
      expect(result).toEqual(expected);
    });

    it('should handle last day of the year', () => {
      const testDate = new Date('2023-12-31');
      const expected: DateParts = {
        year: '2023',
        month: '12',
        day: '31',
        monthNormalized: '12',
        dayNormalized: '31'
      };

      const result = service.extractDateParts(testDate);
      expect(result).toEqual(expected);
    });

    it('should handle first day of the year', () => {
      const testDate = new Date('2023-01-01');
      const expected: DateParts = {
        year: '2023',
        month: '01',
        day: '01',
        monthNormalized: '1',
        dayNormalized: '1'
      };

      const result = service.extractDateParts(testDate);
      expect(result).toEqual(expected);
    });
  });

  describe('parseSearchDate', () => {
    it('should parse complete date with dots', () => {
      const input = '5.12.2023';
      const expected: SearchDateParts = {
        searchDay: '5',
        searchMonth: '12',
        searchYear: '2023'
      };

      const result = service.parseSearchDate(input);
      expect(result).toEqual(expected);
    });

    it('should parse complete date with hyphens', () => {
      const input = '5-12-2023';
      const expected: SearchDateParts = {
        searchDay: '5',
        searchMonth: '12',
        searchYear: '2023'
      };

      const result = service.parseSearchDate(input);
      expect(result).toEqual(expected);
    });

    it('should parse partial date with only day and month', () => {
      const input = '5.12';
      const expected: SearchDateParts = {
        searchDay: '5',
        searchMonth: '12',
        searchYear: undefined
      };

      const result = service.parseSearchDate(input);
      expect(result).toEqual(expected);
    });

    it('should parse date with leading zeros', () => {
      const input = '05.02.2023';
      const expected: SearchDateParts = {
        searchDay: '5',
        searchMonth: '2',
        searchYear: '2023'
      };

      const result = service.parseSearchDate(input);
      expect(result).toEqual(expected);
    });

    it('should handle single day input', () => {
      const input = '5';
      const expected: SearchDateParts = {
        searchDay: '5',
        searchMonth: undefined,
        searchYear: undefined
      };

      const result = service.parseSearchDate(input);
      expect(result).toEqual(expected);
    });

    it('should handle empty input', () => {
      const input = '';
      const expected: SearchDateParts = {
        searchDay: '',
        searchMonth: undefined,
        searchYear: undefined
      };

      const result = service.parseSearchDate(input);
      expect(result).toEqual(expected);
    });
  });

  describe('isYearPattern', () => {
    it('should return true for valid year format', () => {
      expect(service.isYearPattern('2023')).toBeTruthy();
      expect(service.isYearPattern('2023-')).toBeTruthy();
      expect(service.isYearPattern('2023.')).toBeTruthy();
      expect(service.isYearPattern('2023.12')).toBeTruthy();
      expect(service.isYearPattern('2023-05')).toBeTruthy();
    });

    it('should return false for invalid year format', () => {
      expect(service.isYearPattern('202')).toBeFalsy();
      expect(service.isYearPattern('12.2023')).toBeFalsy();
      expect(service.isYearPattern('abcd')).toBeFalsy();
      expect(service.isYearPattern('12-05-2023')).toBeFalsy();
    });
  });

  describe('edge case', () => {
    it('should handle various date separator combinations', () => {
      const inputs = ['5.12-2023', '5-12.2023', '5..2023', '5--2023'];
      inputs.forEach(input => {
        expect(() => service.parseSearchDate(input)).not.toThrow();
      });
    });
  });
});
