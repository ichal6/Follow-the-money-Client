import {Account} from './Account';
import {Activity} from './Activity';

export class Dashboard{
  totalBalance = 0.0;
  difference = 0.0;
  popularAccounts: Array<Account>;
  recentActivities: Array<Activity>;
  incomeFunds = new Map<string, number>();
  expenseFunds = new Map<string, number>();


  static fromHttp(dashboard: Dashboard): Dashboard {
    const newDashboard = new Dashboard();
    newDashboard.totalBalance = dashboard.totalBalance;
    newDashboard.difference = dashboard.difference;
    newDashboard.popularAccounts = this.fillPopularAccounts(dashboard);
    newDashboard.recentActivities = this.fillRecentActivity(dashboard);
    newDashboard.expenseFunds = this.fillMap(dashboard.expenseFunds);
    newDashboard.incomeFunds = this.fillMap(dashboard.incomeFunds);

    return newDashboard;
  }

  private static fillMap(fundsByMonth): Map<string, number>{
    const fundsJSON = fundsByMonth;
    return new Map<string, number>([
      ['JANUARY',  fundsJSON.JANUARY ? fundsJSON.JANUARY : 0],
      ['FEBRUARY', fundsJSON.FEBRUARY ? fundsJSON.FEBRUARY : 0],
      ['MARCH', fundsJSON.MARCH ? fundsJSON.MARCH : 0],
      ['APRIL', fundsJSON.APRIL ? fundsJSON.APRIL : 0],
      ['MAY', fundsJSON.MAY ? fundsJSON.MAY : 0],
      ['JUNE', fundsJSON.JUNE ? fundsJSON.JUNE : 0],
      ['JULY', fundsJSON.JULY ? fundsJSON.JULY : 0],
      ['AUGUST', fundsJSON.AUGUST ? fundsJSON.AUGUST : 0],
      ['SEPTEMBER', fundsJSON.SEPTEMBER ? fundsJSON.SEPTEMBER : 0],
      ['OCTOBER', fundsJSON.OCTOBER ? fundsJSON.OCTOBER : 0],
      ['NOVEMBER', fundsJSON.NOVEMBER ? fundsJSON.NOVEMBER : 0],
      ['DECEMBER', fundsJSON.DECEMBER ? fundsJSON.DECEMBER : 0]
    ]);
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
