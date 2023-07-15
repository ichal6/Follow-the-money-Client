import {Transaction} from './Transaction';

describe('Transaction', () => {
  it('should return false for undefined title', () => {
    // given
    const transaction = new Transaction();
    // when
    const isValid = transaction.checkIfTitleIsValid();
    // then
    expect(isValid).toBe(false);
  });

  it('should return false for null title', () => {
    // given
    const transaction = new Transaction();
    transaction.title = null;
    // when
    const isValid = transaction.checkIfTitleIsValid();
    // then
    expect(isValid).toBe(false);
  })

  it('should return false if title length = 2', () => {
    // given
    const transaction = new Transaction();
    transaction.title = "sh";
    // when
    const isValid = transaction.checkIfTitleIsValid();
    // then
    expect(isValid).toBe(false);
  });

  it('should return false if title length = 1', () => {
    // given
    const transaction = new Transaction();
    transaction.title = "h";
    // when
    const isValid = transaction.checkIfTitleIsValid();
    // then
    expect(isValid).toBe(false);
  });

  it('should return false if title length = 0', () => {
    // given
    const transaction = new Transaction();
    transaction.title = "";
    // when
    const isValid = transaction.checkIfTitleIsValid();
    // then
    expect(isValid).toBe(false);
  });

  it('should return false if title length less than 3 after trim', () => {
    // given
    const transaction = new Transaction();
    transaction.title = " ti  ";
    // when
    const isValid = transaction.checkIfTitleIsValid();
    // then
    expect(isValid).toBe(false);
  });

  it('should return true for title longer equals 3', () => {
    // given
    const transaction = new Transaction();
    transaction.title = "thi";
    // when
    const isValid = transaction.checkIfTitleIsValid();
    // then
    expect(isValid).toBe(true);
  });

  it('should return true for title longer equals 3 with 2 whitespace', () => {
    // given
    const transaction = new Transaction();
    transaction.title = " thi ";
    // when
    const isValid = transaction.checkIfTitleIsValid();
    // then
    expect(isValid).toBe(true);
  });

  it('should return true for title longer more than 3', () => {
    // given
    const transaction = new Transaction();
    transaction.title = "title";
    // when
    const isValid = transaction.checkIfTitleIsValid();
    // then
    expect(isValid).toBe(true);
  });

});
