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
import {AuthRouteGuardService} from '../service/auth-route-guard.service';
import { CategoryComponent } from './pages/category/category.component';
import { IncomeComponent } from './pages/category/income/income.component';
import { ExpenseComponent } from './pages/category/expense/expense.component';
import { EditCategoryComponent } from './pages/category/edit-category/edit-category.component';
import { IncomeBoxComponent } from './pages/category/income/income-box/income-box.component';
import { IncomeSubcategoryBoxComponent } from './pages/category/income/income-subcategory-box/income-subcategory-box.component';
import { ExpenseSubcategoryBoxComponent } from './pages/category/expense/expense-subcategory-box/expense-subcategory-box.component';
import { ExpenseBoxComponent } from './pages/category/expense/expense-box/expense-box.component';
import {FormsModule} from '@angular/forms';
import {AccountsFormAddComponent} from './pages/accounts/accounts-form-add/accounts-form-add.component';
import { AddCategoryComponent } from './pages/category/add-category/add-category.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { PaymentsAllComponent } from './pages/payments/payments-all/payments-all.component';
import { PaymentComponent } from './pages/payments/payments-all/payment/payment.component';
import { TransactionFormAddComponent } from './pages/payments/transaction-form-add/transaction-form-add.component';
import { TransferFormAddComponent } from './pages/payments/transfer-form-add/transfer-form-add.component';
import { AddPayeeComponent } from './pages/payee/add-payee/add-payee.component';
import { EditPayeeComponent } from './pages/payee/edit-payee/edit-payee.component';
import { ExpensePayeeComponent } from './pages/payee/expense-payee/expense-payee.component';
import { IncomePayeeComponent } from './pages/payee/income-payee/income-payee.component';
import {SingleBoxPayeeComponent} from './pages/payee/single-box-payee/single-box-payee.component';
import {PayeeComponent} from './pages/payee/payee.component';
import { PaymentTypeSelectComponent } from './pages/payments/payment-type-select/payment-type-select.component';

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
  },
  {
    path: 'category',
    component: MainPortalLayoutComponent,
    children: [
      {
        path: '',
        component: CategoryComponent
      }
    ],
    canActivate : [AuthRouteGuardService]
  },
  {
    path: 'payments',
    component: MainPortalLayoutComponent,
    children: [
      {
        path: '',
        component: PaymentsComponent
      }
    ],
    canActivate : [AuthRouteGuardService]
  },
  {
    path: 'payee',
    component: MainPortalLayoutComponent,
    children: [
      {
        path: '',
        component: PayeeComponent
      }
    ],
    canActivate: [AuthRouteGuardService]
  },
  {
    path: 'payments',
    component: MainPortalLayoutComponent,
    children: [
      {
        path: '',
        component: PaymentsComponent
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
    CategoryComponent,
    IncomeComponent,
    ExpenseComponent,
    EditCategoryComponent,
    IncomeBoxComponent,
    IncomeSubcategoryBoxComponent,
    ExpenseSubcategoryBoxComponent,
    ExpenseBoxComponent,
    AccountsFormAddComponent,
    AddCategoryComponent,
    PaymentsComponent,
    PaymentsAllComponent,
    PaymentComponent,
    TransactionFormAddComponent,
    TransferFormAddComponent,
    AddPayeeComponent,
    EditPayeeComponent,
    ExpensePayeeComponent,
    IncomePayeeComponent,
    SingleBoxPayeeComponent,
    PaymentsComponent,
    PaymentsAllComponent,
    PaymentComponent,
    TransactionFormAddComponent,
    TransferFormAddComponent,
    PaymentTypeSelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartsModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    FormsModule
  ],
  exports:
    [RouterModule, IncomePayeeComponent, ExpensePayeeComponent, AddPayeeComponent, EditPayeeComponent]
})

export class PortalModule { }
