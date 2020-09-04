import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  validateUser(email: string, password: string): Observable<boolean> {
    const authData = btoa(`${email}:${password}`);
    console.log(authData);
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + authData);
    console.log(environment.restUrl + '/login');
    const obj = this.http.post<any>(environment.restUrl + '/login', {email: email, password: password}).pipe(
      map(userData => {
        console.log(email);
        const tokenStr = 'Bearer ' + userData.token;
        console.log(tokenStr);
        return userData;
      })
    );;
    console.log(obj);
    return obj;
  }
}
