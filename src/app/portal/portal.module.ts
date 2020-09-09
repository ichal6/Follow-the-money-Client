import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './pages/dashboard.module';
import { DashboardRoutingModule } from './pages/dashboard/dashboard-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    DashboardRoutingModule
  ]
})
export class PortalModule { }
