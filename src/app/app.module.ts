import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './portal/pages/dashboard/dashboard.component';
import {MenuComponent} from './portal/shared-components/menu/menu.component';
import {HeaderComponent} from './portal/shared-components/header/header.component';
import {MainPortalLayoutComponent} from './portal/shared-components/main-portal-layout/main-portal-layout.component';
import { PortalComponent } from './portal/portal.component';
import { PortalModule } from './portal/portal.module';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'portal', component: PortalComponent},
  // {path : '404', component : PageNotFoundComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    PortalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
