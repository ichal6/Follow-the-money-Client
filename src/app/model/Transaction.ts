import {Injectable} from '@angular/core';

@Injectable()
export class Transaction {
  id: number;
  title: string;
  type: GeneralType;
  value: number;
  categoryId: number;
  payeeId: number;
  accountId: number;
  date: string;

  static fromHttp(transaction: Transaction): Transaction {
    const newTransaction = new Transaction();
    newTransaction.accountId = transaction.accountId;
    newTransaction.title = transaction.title;
    newTransaction.type = (transaction.type === GeneralType.INCOME) ? GeneralType.INCOME : GeneralType.EXPENSE;
    newTransaction.value = transaction.value;
    newTransaction.categoryId = transaction.categoryId;
    newTransaction.payeeId = transaction.payeeId;
    newTransaction.accountId = transaction.accountId;
    newTransaction.date = transaction.date;
    newTransaction.id = transaction.id;
    return newTransaction;
  }
}



export enum GeneralType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}
