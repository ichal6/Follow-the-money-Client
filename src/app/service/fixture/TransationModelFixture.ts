import {TransactionType, Transaction} from '../../model/Transaction';

export function getBuyCarTransaction(): Transaction {
  const transaction = new Transaction();
  transaction.id = 1;
  transaction.title = 'Buy Car';
  transaction.value = 123;
  transaction.type = TransactionType.EXPENSE;
  transaction.accountId = 1;
  transaction.payeeId = 1;
  transaction.categoryId = 1;
  transaction.date = '2023-11-18T16:15:00';

  return transaction;
}
