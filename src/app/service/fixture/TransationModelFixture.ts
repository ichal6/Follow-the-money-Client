import {TransactionType, Transaction} from '../../model/Transaction';
import {getTaxiSubcategory, getTransportCategory} from './CategoryModelFixture';

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

export function getTaxi(): Transaction {
  const transaction = new Transaction();
  transaction.id = 2;
  transaction.title = 'Get Taxi';
  transaction.value = 20;
  transaction.type = TransactionType.EXPENSE;
  transaction.accountId = 1;
  transaction.payeeId = 1;
  transaction.categoryId = getTransportCategory().id;
  transaction.date = '2024-02-24T16:15:00';

  return transaction;
}

export function getTaxiWithSubcategory(): Transaction {
  const transaction = getTaxi()
  transaction.subcategoryId = getTaxiSubcategory().id;

  return transaction;
}
