export class Account {
  id: number;
  name: string;
  accountType: AccountType;
  currentBalance: number;

  static fromHttp(account: Account): Account {
    const newAccount = new Account();
    newAccount.id = account.id;
    newAccount.name = account.name;
    newAccount.currentBalance = account.currentBalance;
    newAccount.accountType = (account.accountType === AccountType.CASH) ? AccountType.CASH : AccountType.BANK;
    return newAccount;
  }
}

export enum AccountType {
  CASH = 'CASH',
  BANK = 'BANK'
}
