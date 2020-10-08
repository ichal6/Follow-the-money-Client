import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {Dashboard} from '../model/Dashboard';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Category, Subcategory} from '../model/Category';

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
    return this.http.get<Array<Category>>(environment.restUrl + '/api/category/income/' + this.email, {withCredentials: true})
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
    return this.http.get<Array<Category>>(environment.restUrl + '/api/category/expense/' + this.email, {withCredentials: true})
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

  deleteCategory(id): Observable<Category>{
    return this.http.delete<null>(environment.restUrl + '/api/category/' + this.email + '/' + id,
      {withCredentials: true});
  }

  deleteSubcategory(idCategory, idSubcategory): Observable<Subcategory>{
    const url = environment.restUrl + '/api/category/' + this.email + '/' + idCategory + '/' + idSubcategory;
    return this.http.delete<null>(url, {withCredentials: true});
  }

  createNewCategory(newCategory: Category): Observable<Category>{
    const categoryJSON = {name: newCategory.name, type: newCategory.type, subcategories: []};
    return this.http.post<Category>(environment.restUrl + '/api/category/' + this.email, categoryJSON, {withCredentials : true});
  }

  updateCategory(updatedCategory: Category): Observable<Category>{
    const categoryJSON = {id: updatedCategory.id, name: updatedCategory.name, type: updatedCategory.type, subcategories: []};
    return this.http.put<Category>(environment.restUrl + '/api/category/' + this.email + '/' + updatedCategory.id, categoryJSON,
      {withCredentials : true});
  }
}
