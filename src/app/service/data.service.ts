import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  validateUser(email: string, password: string): Observable<{result: string}> {
    return this.http.post<{result: string}>(environment.restUrl + '/login', {email, password}, {withCredentials: true});
  }

  getSomething(): Observable<any> {
    return this.http.get<any>(environment.restUrl + '/user/jan@kowalski@gmail.com', {withCredentials: true});
  }
}
