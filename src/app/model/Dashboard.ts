export class Dashboard{
  totalBalance = 0.0;
  difference = 0.0;

  static fromHttp(dashboard: Dashboard): Dashboard {
    // zmienić nazwy zmiennych
    const newDashboard = new Dashboard();
    newDashboard.totalBalance = dashboard.totalBalance;
    newDashboard.difference = dashboard.difference;
    return newDashboard;
  }
}
