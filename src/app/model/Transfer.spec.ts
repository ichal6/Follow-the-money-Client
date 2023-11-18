import {Transfer} from './Transfer';

describe('Transfer', () => {
  it('should parse date to correct format after fromHttp call', () => {
    // given
    const fromHttp = new Transfer();
    fromHttp.date = '2023-07-27T17:57:00';
    // when
    const transfer = Transfer.fromHttp(fromHttp);
    // then
    expect(transfer.date).toBe('2023-07-27T17:57:00');
  })

  it('should not assign id after fromHttp call when payload does not contain id', () => {
    // given
    const fromHttp = new Transfer();
    fromHttp.id = undefined;
    fromHttp.date = '2023-07-27T17:57:00';
    // when
    const transfer = Transfer.fromHttp(fromHttp);
    // then
    expect(transfer.id).toBeUndefined();
  })
})
