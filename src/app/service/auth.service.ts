import {EventEmitter, Injectable } from '@angular/core';
import {DataService} from './data.service';
import {CookieService} from 'ngx-cookie-service';
import {AccountsService} from './accounts.service';
import {CategoryService} from './category.service';
import {PayeeService} from './payee.service';
import {PaymentsService} from './payments.service';
import {TransactionsService} from './transactions.service';
import {AnalysisService} from './analysis.service';
import {catchError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  tryLoginEvent = new EventEmitter<boolean>();

  constructor(private dataService: DataService,
              private accountsService: AccountsService,
              private categoryService: CategoryService,
              private payeeService: PayeeService,
              private paymentsService: PaymentsService,
              private transactionsService: TransactionsService,
              private analysisService: AnalysisService,
              private cookieService: CookieService) { }

  authenticate(name: string, password: string): void {
    this.tryLoginEvent.emit(true);
    this.dataService.validateUser(name, password).subscribe(
      next => {
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
        this.cookieService.set('e-mail', name);
        this.resetEmailInServices();
      },
      error => {
        console.log(error);
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
        this.tryLoginEvent.emit(false);
      }
    );
  }

  checkIfAlreadyAuthenticated(): void {
    this.dataService.isLogin().pipe(
      catchError(err => {
        console.log(err);
        this.isAuthenticated = false;
        this.tryLoginEvent.emit(false);
        throw new Error("Server is not response");
      })
    ).subscribe({
      next:  () =>  {
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
    },
      error: () => {
        this.isAuthenticated = false;
        this.tryLoginEvent.emit(false);
      }
  });
  }

  logout(): void {
    this.authenticationResultEvent.emit(false);
    this.dataService.logout().subscribe();
    this.cookieService.deleteAll();
    this.isAuthenticated = false;
    this.resetEmailInServices();
  }

  resetEmailInServices(): void {
      this.dataService.setEmailFromCookie();
      this.accountsService.setEmailFromCookie();
      this.categoryService.setEmailFromCookie();
      this.payeeService.setEmailFromCookie();
      this.paymentsService.setEmailFromCookie();
      this.transactionsService.setEmailFromCookie();
      this.analysisService.setEmailFromCookie();
  }
}
