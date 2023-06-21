import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {DataService} from '../service/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './enter-page.component.html',
  styleUrls: ['./enter-page.component.css']
})
export class EnterPageComponent implements OnInit, OnDestroy{
  isDisplay: boolean;
  loginSubscribe: Subscription;
  registerSubscribe: Subscription;
  authenticateResultSubscribe: Subscription;

  constructor(private authService: AuthService,
              private dataService: DataService) {
    this.isDisplay = false;
  }

  ngOnInit(): void {
    this.displayPopup();
    this.hidePopup();
  }

  private displayPopup(): void {
    this.loginSubscribe = this.authService.tryLoginEvent.subscribe(
      next => this.isDisplay = next,
      () => this.isDisplay = false
    );

    this.registerSubscribe = this.dataService.tryRegisterEvent.subscribe(
      next => this.isDisplay = next,
      () => this.isDisplay = false
    );
  }

  private hidePopup(): void {
    this.authenticateResultSubscribe = this.authService.authenticationResultEvent.subscribe(
      next => this.isDisplay = next,
      () => this.isDisplay = false
    );
  }

  ngOnDestroy(): void {
    this.loginSubscribe?.unsubscribe();
    this.registerSubscribe?.unsubscribe();
    this.authenticateResultSubscribe?.unsubscribe();
  }
}
