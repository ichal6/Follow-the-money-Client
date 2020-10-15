import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Account} from '../model/Account';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private email: string;

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
    this.setEmailFromCookie();
  }

  setEmailFromCookie(): void {
    if (this.cookieService.check('e-mail')) {
      this.email = this.cookieService.get('e-mail');
    }
  }

  getAccounts(): Observable<Array<Account>> {
    return this.http.get<Array<Account>>(environment.restUrl + '/api/account/' + this.email, {withCredentials: true})
      .pipe(
        map(data => {
            return this.extractAccountsFromJSON(data);
          }
        )
      );
  }

  extractAccountsFromJSON(accounts: Array<Account>): Array<Account> {
    const accountsJSON = accounts;
    const accountsTS = new Array<Account>();

    for (const account of accountsJSON) {
      accountsTS.push(Account.fromHttp(account));
    }
    return accountsTS;
  }

  addAccount(newAccount: Account): Observable<any> {
    const accountToAdd = {name: newAccount.name, accountType: newAccount.accountType,
      currentBalance: newAccount.startingBalance, startingBalance: newAccount.startingBalance, userEmail: this.email};
    return this.http.post<any>(environment.restUrl + '/api/account', accountToAdd , {withCredentials : true});
  }

  updateAccount(updatedAccount: Account): Observable<Account> {
    const accountToUpdate = {id: updatedAccount.id, name: updatedAccount.name, accountType: updatedAccount.accountType,
      currentBalance: updatedAccount.currentBalance, startingBalance: updatedAccount.startingBalance, userEmail: this.email};
    return this.http.put<any>(environment.restUrl + '/api/account', accountToUpdate , {withCredentials : true});
  }

  deleteAccount(accountToDelete: Account): Observable<any> {
    return this.http.delete<any>(environment.restUrl + '/api/account/' + accountToDelete.id, {withCredentials: true});
  }
}
