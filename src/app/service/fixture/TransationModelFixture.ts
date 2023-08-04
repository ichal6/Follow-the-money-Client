import {GeneralType, Transaction} from '../../model/Transaction';

export function getBuyCarTransaction(): Transaction {
  const transaction = new Transaction();
  transaction.title = 'Buy Car';
  transaction.value = 123;
  transaction.type = GeneralType.EXPENSE;

  return transaction;
}
