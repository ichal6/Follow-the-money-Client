import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  validateUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(environment.restUrl + '/login', {email, password});
  }
}
