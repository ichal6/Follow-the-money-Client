import {Transaction} from '../../model/Transaction';

export function getBuyCarTransaction(): Transaction {
  const transaction = new Transaction();
  transaction.title = 'Buy Car';

  return transaction;
}
