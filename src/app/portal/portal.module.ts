import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainPortalLayoutComponent} from './shared-components/main-portal-layout/main-portal-layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {MenuComponent} from './shared-components/menu/menu.component';
import {HeaderComponent} from './shared-components/header/header.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { HeaderMobileComponent } from './shared-components/header-mobile/header-mobile.component';
import { BalanceComponent } from './pages/dashboard/balance/balance.component';
import { ChartComponent } from './pages/dashboard/chart/chart.component';
import { ActivityComponent } from './pages/dashboard/activity/activity.component';
import { AccountsPopularComponent } from './pages/dashboard/accounts-popular/accounts-popular.component';
import {ChartsModule} from 'ng2-charts';

const routes: Routes = [
  {
    path: 'portal',
    component: MainPortalLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent }
    ]
  },
  {
    path: 'accounts',
    component: MainPortalLayoutComponent,
    children: [
      {
        path: '',
        component: AccountsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    HeaderComponent,
    MainPortalLayoutComponent,
    AccountsComponent,
    HeaderMobileComponent,
    BalanceComponent,
    ChartComponent,
    ActivityComponent,
    AccountsPopularComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartsModule
  ],
  exports: [RouterModule]
})

export class PortalModule { }
