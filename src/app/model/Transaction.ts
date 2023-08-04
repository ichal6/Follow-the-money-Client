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
    newTransaction.date = transaction.date.substring(0, 16);
    newTransaction.id = transaction.id;
    return newTransaction;
  }

  public checkIfTitleIsValid(): boolean {
    return this.title !== undefined && this.title !== null && this.title.trim().length >= 3;
  }

  public checkIfDateIsValid(): boolean {
    const isoDateTimeRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[0-1])T([01]\d|2[0-3]):([0-5]\d)$/;
    if(this.date != null && isoDateTimeRegex.test(this.date))
    {
      try {
        const date = new Date(this.date);
        // Check if the date object is valid
        if (isNaN(date.getTime())) {
          return false;
        }

        // Construct the ISO-like string manually
        const isoString = this.constructISOString(date);

        // Check if the date matches the input string exactly to ensure no additional characters.
        return this.date === isoString;
      } catch (error) {
        return false; // Parsing error, not a valid date.
      }
    }
    return false;
  }

  private constructISOString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }
}



export enum GeneralType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}
