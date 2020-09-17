export class Dashboard{
  totalBalance = 0.0;
  difference = 0.0;

  static fromHttp(dashboard: Dashboard): Dashboard {
    const newUser = new Dashboard();
    newUser.totalBalance = dashboard.totalBalance;
    newUser.difference = dashboard.difference;
    return newUser;
  }
}
