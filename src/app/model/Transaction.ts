import {Injectable} from '@angular/core';

@Injectable()
export class Transaction {
  id: number;
  title: string;
  type: TransactionType;
  value: number;
  categoryId: number;
  payeeId: number;
  accountId: number;
  date: string;

  static fromHttp(transactionJSON: Transaction): Transaction {
    const transactionTS = new Transaction();
    transactionTS.accountId = transactionJSON.accountId;
    transactionTS.title = transactionJSON.title;
    transactionTS.type = (transactionJSON.type === TransactionType.INCOME) ? TransactionType.INCOME : TransactionType.EXPENSE;
    transactionTS.value = transactionJSON.value;
    transactionTS.categoryId = transactionJSON.categoryId;
    transactionTS.payeeId = transactionJSON.payeeId;
    transactionTS.accountId = transactionJSON.accountId;
    transactionTS.date = transactionJSON.date;
    transactionTS.id = transactionJSON.id;
    return transactionTS;
  }
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}
