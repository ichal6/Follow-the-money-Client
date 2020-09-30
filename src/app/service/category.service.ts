import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {Dashboard} from '../model/Dashboard';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Category} from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
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

  getCategoriesByIncome(): Observable<Array<Category>>{
    return this.http.get<Array<Category>>(environment.restUrl + '/api/Category/income' + this.email, {withCredentials: true})
      .pipe(
        map(
          data => {
            const categories = new Array<Category>();
            for (const category of data) {
              categories.push(Category.fromHttp(category));
            }
            return categories;
          }
        )
      );
  }

  getCategoriesByExpense(): Observable<Array<Category>>{
    return this.http.get<Array<Category>>(environment.restUrl + '/api/Category/expense' + this.email, {withCredentials: true})
      .pipe(
        map(
          data => {
            const categories = new Array<Category>();
            for (const category of data) {
              categories.push(Category.fromHttp(category));
            }
            return categories;
          }
        )
      );
  }
}
