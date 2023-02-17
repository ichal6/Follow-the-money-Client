export class Account {
  private _id: number;
  private _name: string;
  accountType: AccountType;
  startingBalance: number;
  currentBalance: number;

  static fromHttp(account): Account {
    const newAccount = new Account();
    newAccount._id = account.id;
    newAccount._name = account.name;
    newAccount.currentBalance = account.currentBalance;
    newAccount.startingBalance = account.startingBalance;
    newAccount.accountType = this.setAccountType(account.accountType);
    return newAccount;
  }

  private static setAccountType(accountType: string): AccountType {
    switch (accountType) {
      case AccountType.BANK:
        return AccountType.BANK;
      case AccountType.CASH:
        return AccountType.CASH;
      case AccountType.LOAN:
        return AccountType.LOAN;
    }
  }

  getCurrentBalance(): string {
    return this.currentBalance.toFixed(2);
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  isNull(): boolean {
    return false;
  }
}

export class NoAccount extends Account {
  isNull(): boolean {
    return true;
  }

  getCurrentBalance(): string {
    throw new Error('Try run get current balance on null object');
  }

  get id(): number {
    return null;
  }

  get name(): string {
    return 'All';
  }

}

export enum AccountType {
  CASH = 'CASH',
  BANK = 'BANK',
  LOAN = 'LOAN'
}
