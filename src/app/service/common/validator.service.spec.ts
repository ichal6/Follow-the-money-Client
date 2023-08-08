import { TestBed } from '@angular/core/testing';

import { ValidatorService } from './validator.service';
import {GeneralType, Transaction} from '../../model/Transaction';

describe('ValidatorService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return false for undefined title', () => {
    // given
    const transaction = new Transaction();
    // when
    const isValid = service.checkIfTitleIsValid(transaction.title);
    // then
    expect(isValid).toBe(false);
  });

  it('should return false for null title', () => {
    // given
    const transaction = new Transaction();
    transaction.title = null;
    // when
    const isValid = service.checkIfTitleIsValid(transaction.title);
    // then
    expect(isValid).toBe(false);
  })

  it('should return false if title length = 2', () => {
    // given
    const transaction = new Transaction();
    transaction.title = "sh";
    // when
    const isValid = service.checkIfTitleIsValid(transaction.title);
    // then
    expect(isValid).toBe(false);
  });

  it('should return false if title length = 1', () => {
    // given
    const transaction = new Transaction();
    transaction.title = "h";
    // when
    const isValid = service.checkIfTitleIsValid(transaction.title);
    // then
    expect(isValid).toBe(false);
  });

  it('should return false if title length = 0', () => {
    // given
    const transaction = new Transaction();
    transaction.title = "";
    // when
    const isValid = service.checkIfTitleIsValid(transaction.title);
    // then
    expect(isValid).toBe(false);
  });

  it('should return false if title length less than 3 after trim', () => {
    // given
    const transaction = new Transaction();
    transaction.title = " ti  ";
    // when
    const isValid = service.checkIfTitleIsValid(transaction.title);
    // then
    expect(isValid).toBe(false);
  });

  it('should return true for title longer equals 3', () => {
    // given
    const transaction = new Transaction();
    transaction.title = "thi";
    // when
    const isValid = service.checkIfTitleIsValid(transaction.title);
    // then
    expect(isValid).toBe(true);
  });

  it('should return true for title longer equals 3 with 2 whitespace', () => {
    // given
    const transaction = new Transaction();
    transaction.title = " thi ";
    // when
    const isValid = service.checkIfTitleIsValid(transaction.title);
    // then
    expect(isValid).toBe(true);
  });

  it('should return true for title longer more than 3', () => {
    // given
    const transaction = new Transaction();
    transaction.title = "title";
    // when
    const isValid = service.checkIfTitleIsValid(transaction.title);
    // then
    expect(isValid).toBe(true);
  });

  it('should check is date correct for correct date', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '2023-07-27T17:57';
    // when
    const isDateCorrect = service.checkIfDateIsValid(transaction.date);
    // then
    expect(isDateCorrect).toBe(true);
  })

  it('should check is date incorrect for incorrect month', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '2023-27-27T17:57';
    // when
    const isDateCorrect = service.checkIfDateIsValid(transaction.date);
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should check is date incorrect for incorrect hour', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '2023-27-27T24:57';
    // when
    const isDateCorrect = service.checkIfDateIsValid(transaction.date);
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should check is date incorrect for incorrect minute', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '2023-27-27T22:60';
    // when
    const isDateCorrect = service.checkIfDateIsValid(transaction.date);
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should check is date incorrect for incorrect day', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '2023-02-30T22:59';
    // when
    const isDateCorrect = service.checkIfDateIsValid(transaction.date);
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should check is date incorrect for empty string', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '';
    // when
    const isDateCorrect = service.checkIfDateIsValid(transaction.date);
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should check is date incorrect for undefined', () => {
    // given
    const transaction = new Transaction();
    // when
    const isDateCorrect = service.checkIfDateIsValid(transaction.date);
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should check is date incorrect for only time', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '22:59';
    // when
    const isDateCorrect = service.checkIfDateIsValid(transaction.date);
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should return false for undefined type', () => {
    // given
    const transaction = new Transaction();
    // when
    const isValid = service.checkIfTypeIsValid(transaction.type);
    // then
    expect(isValid).toBe(false);
  });

  it('should return false for null type', () => {
    // given
    const transaction = new Transaction();
    transaction.type = null;
    // when
    const isValid = service.checkIfTypeIsValid(transaction.type);
    // then
    expect(isValid).toBe(false);
  });

  it('should return false for expense type', () => {
    // given
    const transaction = new Transaction();
    transaction.type = GeneralType.EXPENSE;
    // when
    const isValid = service.checkIfTypeIsValid(transaction.type);
    // then
    expect(isValid).toBe(true);
  });

  it('should return false for income type', () => {
    // given
    const transaction = new Transaction();
    transaction.type = GeneralType.INCOME;
    // when
    const isValid = service.checkIfTypeIsValid(transaction.type);
    // then
    expect(isValid).toBe(true);
  });

  it('should return false for undefined value', () => {
    // given
    const transaction = new Transaction();
    // when
    const isValid = service.checkIfTypeIsValid(transaction.type);
    // then
    expect(isValid).toBe(false);
  });

  it('should return false for minus value', () => {
    // given
    const transaction = new Transaction();
    transaction.value = -123;
    // when
    const isValid = service.checkIfTypeIsValid(transaction.type);
    // then
    expect(isValid).toBe(false);
  });

  it('should return true for correct value', () => {
    // given
    const transaction = new Transaction();
    transaction.value = 123.23;
    // when
    const isValid = service.checkIfValueIsValid(transaction.value);
    // then
    expect(isValid).toBe(true);
  });

  it('should return false for null value', () => {
    // given
    const transaction = new Transaction();
    transaction.value = null;
    // when
    const isValid = service.checkIfValueIsValid(transaction.value);
    // then
    expect(isValid).toBe(false);
  });
});
