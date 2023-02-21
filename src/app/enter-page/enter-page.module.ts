import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NgChartsModule} from 'ng2-charts';
import {EnterPageComponent} from './enter-page.component';
import {PortalComponent} from '../portal/portal.component';
import {HeaderComponent} from './header/header.component';
import {EnterPageContentComponent} from './content-enter-page/enter-page-content.component';
import {LoginTextComponent} from './content-enter-page/texts/login-text/login-text.component';
import {LoginFormComponent} from './content-enter-page/forms/login-form/login-form.component';
import {RegisterFormComponent} from './content-enter-page/forms/register-form/register-form.component';
import {RegisterTextComponent} from './content-enter-page/texts/register-text/register-text.component';
import { FormsComponent } from './content-enter-page/forms/forms.component';
import { TextsComponent } from './content-enter-page/texts/texts.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: 'login',
    component: EnterPageComponent,
    children: [
      {
        path: '',
        component: EnterPageContentComponent
      }
    ]
  },
  {
    path: 'register',
    component: EnterPageComponent,
    children: [
      {
        path: '',
        component: EnterPageContentComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    PortalComponent,
    HeaderComponent,
    EnterPageContentComponent,
    LoginTextComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RegisterTextComponent,
    FormsComponent,
    TextsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgChartsModule,
    FormsModule
  ],
  exports: [RouterModule, HeaderComponent, EnterPageContentComponent]
})

export class EnterPageModule { }
