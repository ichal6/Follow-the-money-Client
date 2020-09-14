import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }

  validateUser(email: string, password: string): Observable<{result: string}> {
    return this.http.post<{result: string}>(environment.restUrl + '/login', {email, password}, {withCredentials: true});
  }

  getSomething(): Observable<any> {
    return this.http.get<any>(environment.restUrl + '/api/user/jan@kowalski@gmail.com', {withCredentials: true});
  }

  isLogin(): Observable<any>{
    return this.http.get<any>(environment.restUrl + '/isLogin', {withCredentials: true});
  }

  logout(): Observable<any> {
    return this.http.get<any>(environment.restUrl + '/logoutUser', {withCredentials: true});
  }

  getUser(): Observable<any>{
    const email = this.cookieService.get('e-mail');
    return this.http.get<any>(environment.restUrl + '/api/user/' + email, {withCredentials: true});
  }
}
