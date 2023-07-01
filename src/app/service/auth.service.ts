import {EventEmitter, Injectable } from '@angular/core';
import {DataService} from './data.service';
import {CookieService} from 'ngx-cookie-service';
import {PaymentsService} from './payments.service';
import {TransactionsService} from './transactions.service';
import {AnalysisService} from './analysis.service';
import {catchError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  tryLoginEvent = new EventEmitter<boolean>();

  constructor(private dataService: DataService,
              private route: Router,
              private paymentsService: PaymentsService,
              private transactionsService: TransactionsService,
              private analysisService: AnalysisService,
              private cookieService: CookieService) { }

  authenticate(name: string, password: string): void {
    this.tryLoginEvent.emit(true);
    this.dataService.validateUser(name, password).subscribe(
      next => {
        console.log('All cookies: ', this.cookieService.getAll());
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
        this.cookieService.set('e-mail', name);
        this.resetEmailInServices();
      },
      error => {
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
    this.dataService.logout().subscribe({
      next: () => {
        this.cookieService.deleteAll();
        this.isAuthenticated = false;
        this.resetEmailInServices();
      },
      error: (err) => console.dir({'problem with logout: ': err}),
      complete: () => this.route.navigate(['login'])
    });
  }

  resetEmailInServices(): void {
      this.analysisService.setEmailFromCookie();
  }
}
