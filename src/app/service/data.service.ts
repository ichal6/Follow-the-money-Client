import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private email: string;

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
    this.setEmailFromCookie();
  }

  setEmailFromCookie(): void{
    if (this.cookieService.check('e-mail')){
      this.email = this.cookieService.get('e-mail');
    }
  }

  validateUser(email: string, password: string): Observable<{result: string}> {
    return this.http.post<{result: string}>(environment.restUrl + '/login', {email, password}, {withCredentials: true});
  }

  isLogin(): Observable<any>{
    return this.http.get<any>(environment.restUrl + '/isLogin', {withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.get<any>(environment.restUrl + '/logoutUser', {withCredentials: true});
  }

  getUser(): Observable<any>{
    return this.http.get<any>(environment.restUrl + '/api/user/' + this.email, {withCredentials: true});
  }

  getDashboard(): Observable<any>{
    return this.http.get<any>(environment.restUrl + '/api/dashboard/' + this.email, {withCredentials: true});
  }
}
