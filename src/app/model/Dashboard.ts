import {Account} from './Account';

export class Dashboard{
  totalBalance = 0.0;
  difference = 0.0;
  popularAccounts: Array<Account>;

  static fromHttp(dashboard: Dashboard): Dashboard {
    const newDashboard = new Dashboard();
    newDashboard.totalBalance = dashboard.totalBalance;
    newDashboard.difference = dashboard.difference;
    newDashboard.popularAccounts = this.fillPopularAccounts(dashboard);
    console.log(dashboard, newDashboard);
    return newDashboard;
  }

  private static fillPopularAccounts(dashboard: Dashboard): Array<Account>{
    const accountsJSON = dashboard.popularAccounts;
    const accountsTS = new Array<Account>();
    for (const account of accountsJSON){
      accountsTS.push(Account.fromHttp(account));
    }
    return accountsTS;
  }
}
