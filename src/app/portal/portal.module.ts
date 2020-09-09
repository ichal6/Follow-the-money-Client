import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainPortalLayoutComponent} from './shared-components/main-portal-layout/main-portal-layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {MenuComponent} from './shared-components/menu/menu.component';
import {HeaderComponent} from './shared-components/header/header.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { HeaderMobileComponent } from './shared-components/header-mobile/header-mobile.component';

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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PortalModule { }
