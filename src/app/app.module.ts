import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {EnterPageComponent} from './enter-page/enter-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { PortalModule } from './portal/portal.module';
import { ChartsModule } from 'ng2-charts';
import {EnterPageModule} from './enter-page/enter-page.module';

const routes: Routes = [
  {path: 'login', component: EnterPageComponent},
  {path: 'portal', component: PortalComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  declarations: [
    AppComponent,
    EnterPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    PortalModule,
    ChartsModule,
    EnterPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
