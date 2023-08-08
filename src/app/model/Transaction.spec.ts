import {GeneralType, Transaction} from './Transaction';

describe('Transaction', () => {
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
});
