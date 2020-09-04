import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // {path : 'admin/users', component : UsersComponent, canActivate : [AuthRouteGuardService]},
  // {path : 'admin/rooms', component: RoomsComponent, canActivate : [AuthRouteGuardService]},
  // {path : '', component: CalendarComponent},
  // {path : 'editBooking', component: EditBookingComponent, resolve :
  // {rooms : PrefectchRoomsService, users: PrefectchUsersService}, canActivate : [AuthRouteGuardService]},
  // {path : 'addBooking', component: EditBookingComponent, resolve :
  // {rooms : PrefectchRoomsService, users: PrefectchUsersService}, canActivate : [AuthRouteGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  // {path : '404', component : PageNotFoundComponent},
  {path : '**', redirectTo : '/login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
