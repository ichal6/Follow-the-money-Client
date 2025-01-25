import { PaymentFilterService } from './payment-filter.service';
import { Payment } from '../../model/Payment';
import {
  getBuyCarPayment,
  getMonthlySalary,
  getCashDepositSeptember
} from '../fixture/PaymentModelFixture';

describe('PaymentFilterService', () => {
  let service: PaymentFilterService;
  let buyCarPayment: Payment;
  let cashDepositPayment: Payment;
  let salaryPayment: Payment;

  beforeEach(() => {
    service = new PaymentFilterService();
    buyCarPayment = getBuyCarPayment();
    cashDepositPayment = getCashDepositSeptember();
    salaryPayment = getMonthlySalary();
  });

  describe('searchPaymentFields', () => {
    it('should find payment by title', () => {
      expect(service.searchPaymentFields(buyCarPayment, 'car')).toBeTruthy();
      expect(service.searchPaymentFields(buyCarPayment, 'bicycle')).toBeFalsy();
    });

    it('should find payment by from field', () => {
      expect(service.searchPaymentFields(buyCarPayment, 'savings')).toBeTruthy();
      expect(service.searchPaymentFields(cashDepositPayment, 'wallet')).toBeTruthy();
    });

    it('should find payment by to field', () => {
      expect(service.searchPaymentFields(buyCarPayment, 'mercedes')).toBeTruthy();
      expect(service.searchPaymentFields(cashDepositPayment, 'millenium')).toBeTruthy();
    });

    it('should find payment by category name', () => {
      expect(service.searchPaymentFields(buyCarPayment, 'transport')).toBeTruthy();
      expect(service.searchPaymentFields(salaryPayment, 'income')).toBeTruthy();
    });

    it('should handle null category and subcategory', () => {
      expect(service.searchPaymentFields(cashDepositPayment, 'nonexistent')).toBeFalsy();
    });

    it('should be case insensitive', () => {
      expect(service.searchPaymentFields(buyCarPayment, 'MERCEDES')).toBeTruthy();
      expect(service.searchPaymentFields(buyCarPayment, 'Transport')).toBeTruthy();
    });
  });

  describe('matchPartialDate', () => {
    it('should match day only', () => {
      const maySalaryParts = {
        dayNormalized: '15',
        monthNormalized: '5',
        day:  '15',
        month: '05',
        year: '2022'
      };
      expect(service.matchPartialDate('15', maySalaryParts)).toBeTruthy();
      expect(service.matchPartialDate('16', maySalaryParts)).toBeFalsy();
    });

    it('should match day and month', () => {
      const buyCarParts = {
        dayNormalized: '1',
        monthNormalized: '5',
        day:  '15',
        month: '05',
        year: '2022'
      };
      expect(service.matchPartialDate('1-5', buyCarParts)).toBeTruthy();
      expect(service.matchPartialDate('1-6', buyCarParts)).toBeFalsy();
    });

    it('should match complete date', () => {
      const septemberDepositParts = {
        dayNormalized: '1',
        monthNormalized: '9',
        day:  '15',
        month: '05',
        year: '2022'
      };
      expect(service.matchPartialDate('1-9-2022', septemberDepositParts)).toBeTruthy();
      expect(service.matchPartialDate('1-9-2023', septemberDepositParts)).toBeFalsy();
    });
  });

  describe('matchYearPattern', () => {
    const buyCarParts = {
      dayNormalized: '1',
      monthNormalized: '5',
      day:  '15',
      month: '05',
      year: '2022'
    };

    it('should match year only', () => {
      expect(service.matchYearPattern('2022', buyCarParts)).toBeTruthy();
      expect(service.matchYearPattern('2023', buyCarParts)).toBeFalsy();
    });

    it('should match year and month', () => {
      expect(service.matchYearPattern('2022-5', buyCarParts)).toBeTruthy();
      expect(service.matchYearPattern('2022-6', buyCarParts)).toBeFalsy();
    });

    it('should match year with different separators', () => {
      expect(service.matchYearPattern('2022-', buyCarParts)).toBeTruthy();
      expect(service.matchYearPattern('2022.', buyCarParts)).toBeTruthy();
    });
  });

  describe('matchFullDate', () => {
    it('should match Mercedes car purchase date', () => {
      const buyCarParts = {
        dayNormalized: '1',
        monthNormalized: '5',
        day:  '15',
        month: '05',
        year: '2022'
      };
      expect(service.matchFullDate('5-1-2022', buyCarParts)).toBeTruthy();
      expect(service.matchFullDate('5.1.2022', buyCarParts)).toBeTruthy();
    });

    it('should match September deposit date', () => {
      const septemberDepositParts = {
        dayNormalized: '1',
        monthNormalized: '9',
        day:  '15',
        month: '05',
        year: '2022'
      };
      expect(service.matchFullDate('9-1-2022', septemberDepositParts)).toBeTruthy();
      expect(service.matchFullDate('09-01-2022', septemberDepositParts)).toBeTruthy();
    });

    it('should not match incorrect dates', () => {
      const buyCarParts = {
        dayNormalized: '1',
        monthNormalized: '5',
        day:  '15',
        month: '05',
        year: '2022'
      };
      expect(service.matchFullDate('5-2-2022', buyCarParts)).toBeFalsy();
      expect(service.matchFullDate('6-1-2022', buyCarParts)).toBeFalsy();
      expect(service.matchFullDate('5-1-2023', buyCarParts)).toBeFalsy();
    });
  });
});
