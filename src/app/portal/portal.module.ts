import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainPortalLayoutComponent} from './shared-components/main-portal-layout/main-portal-layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {MenuComponent} from './shared-components/menu/menu.component';
import {HeaderComponent} from './shared-components/header/header.component';
import {AccountsComponent} from './pages/accounts/accounts.component';
import {HeaderMobileComponent} from './shared-components/header-mobile/header-mobile.component';
import {BalanceComponent} from './pages/dashboard/balance/balance.component';
import {ChartComponent} from './pages/dashboard/chart/chart.component';
import {ActivityComponent} from './pages/dashboard/activity/activity.component';
import {AccountsPopularComponent} from './pages/dashboard/accounts-popular/accounts-popular.component';
import {AccountsAllComponent} from './pages/accounts/accounts-all/accounts-all.component';
import {AccountsFormEditComponent} from './pages/accounts/accounts-form-edit/accounts-form-edit.component';
import {ChartsModule} from 'ng2-charts';
import {SingleActivityComponent} from './pages/dashboard/activity/single-activity/single-activity.component';
import {PrefetchDashboardService} from '../service/prefetch-dashboard.service';
import {PopularAccountBoxComponent} from './pages/dashboard/accounts-popular/popular-account-box/popular-account-box.component';
import {AccountBoxComponent} from './pages/accounts/accounts-all/account-box/account-box.component';
import {PortalComponent} from './portal.component';
import {AuthRouteGuardService} from '../service/auth-route-guard.service';
import { AccountsFormAddComponent } from './pages/accounts/accounts-form-add/accounts-form-add.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: 'portal',
    component: MainPortalLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      }
    ],
    resolve: {dashboard: PrefetchDashboardService},
    canActivate : [AuthRouteGuardService]
  },
  {
    path: 'accounts',
    component: MainPortalLayoutComponent,
    children: [
      {
        path: '',
        component: AccountsComponent
      }
    ],
    canActivate : [AuthRouteGuardService]
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
    AccountsAllComponent,
    AccountsFormEditComponent,
    SingleActivityComponent,
    PopularAccountBoxComponent,
    AccountBoxComponent,
    AccountsFormAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartsModule,
    FormsModule
  ],
  exports:
    [RouterModule]
})

export class PortalModule { }
