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

  it('should parse date to correct format after fromHttp call', () => {
    // given
    const fromHttp = new Transaction();
    fromHttp.date = '2023-07-27T17:57:00';
    // when
    const transaction = Transaction.fromHttp(fromHttp);
    // then
    expect(transaction.date).toBe('2023-07-27T17:57');
  })

  it('should not assign id after fromHttp call when payload does not contain id', () => {
    // given
    const fromHttp = new Transaction();
    fromHttp.id = undefined;
    fromHttp.date = '2023-07-27T17:57:00';
    // when
    const transaction = Transaction.fromHttp(fromHttp);
    // then
    expect(transaction.id).toBeUndefined();
  })

  it('should check is date correct for correct date', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '2023-07-27T17:57';
    // when
    const isDateCorrect = transaction.checkIfDateIsValid();
    // then
    expect(isDateCorrect).toBe(true);
  })

  it('should check is date incorrect for incorrect month', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '2023-27-27T17:57';
    // when
    const isDateCorrect = transaction.checkIfDateIsValid();
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should check is date incorrect for incorrect hour', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '2023-27-27T24:57';
    // when
    const isDateCorrect = transaction.checkIfDateIsValid();
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should check is date incorrect for incorrect minute', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '2023-27-27T22:60';
    // when
    const isDateCorrect = transaction.checkIfDateIsValid();
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should check is date incorrect for incorrect day', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '2023-02-30T22:59';
    // when
    const isDateCorrect = transaction.checkIfDateIsValid();
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should check is date incorrect for empty string', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '';
    // when
    const isDateCorrect = transaction.checkIfDateIsValid();
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should check is date incorrect for undefined', () => {
    // given
    const transaction = new Transaction();
    // when
    const isDateCorrect = transaction.checkIfDateIsValid();
    // then
    expect(isDateCorrect).toBe(false);
  })

  it('should check is date incorrect for only time', () => {
    // given
    const transaction = new Transaction();
    transaction.date = '22:59';
    // when
    const isDateCorrect = transaction.checkIfDateIsValid();
    // then
    expect(isDateCorrect).toBe(false);
  })
});
