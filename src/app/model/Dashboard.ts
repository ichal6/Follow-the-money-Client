import {Account} from './Account';
import {Activity} from './Activity';

export class Dashboard{
  totalBalance = 0.0;
  difference = 0.0;
  popularAccounts: Array<Account>;
  recentActivities: Array<Activity>;

  static fromHttp(dashboard: Dashboard): Dashboard {
    const newDashboard = new Dashboard();
    newDashboard.totalBalance = dashboard.totalBalance;
    newDashboard.difference = dashboard.difference;
    newDashboard.popularAccounts = this.fillPopularAccounts(dashboard);
    newDashboard.recentActivities = this.fillRecentActivity(dashboard);
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

  private static fillRecentActivity(dashboard: Dashboard): Array<Activity>{
    const activitiesJSON = dashboard.recentActivities;
    const activitiesTS = new Array<Activity>();
    for (const activity of activitiesJSON){
      activitiesTS.push(Activity.fromHttp(activity));
    }
    return activitiesTS;
  }
}
