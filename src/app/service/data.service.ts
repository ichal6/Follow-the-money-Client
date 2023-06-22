import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {map} from 'rxjs/operators';
import {Dashboard} from '../model/Dashboard';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  tryRegisterEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }

  getEmail(): string{
    console.log('List of Cookies - ', this.cookieService.getAll());
    if (this.cookieService.check('e-mail')){
      return this.cookieService.get('e-mail');
    } else {
      throw Error("Email is not set");
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
    return this.http.get<any>(environment.restUrl + '/api/user/' + this.getEmail(), {withCredentials: true});
  }

  getDashboard(): Observable<Dashboard>{
    return this.http.get<Dashboard>(environment.restUrl + '/api/dashboard/' + this.getEmail(), {withCredentials: true})
      .pipe(
        map(
          data => {
            return Dashboard.fromHttp(data);
          }
        )
      );
  }

  register(user: User, password: string): Observable<User>{
    this.tryRegisterEvent.emit(true);
    const userWithPassword = {name: user.name, email: user.email, password};
    return this.http.post<User>(environment.restUrl + '/register', userWithPassword);
  }
}
