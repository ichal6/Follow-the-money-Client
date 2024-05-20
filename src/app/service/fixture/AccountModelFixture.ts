import {Account, AccountType} from "../../model/Account";

export function getMillenniumAccount() {
  return Account.fromJavaScript(
    {
      id: 1,
      name: "Millennium",
      accountType: AccountType.BANK,
      startingBalance: 0,
      currentBalance: 100
    }
  );
}
