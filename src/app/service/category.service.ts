import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Category, Subcategory} from '../model/Category';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,
              private dataService: DataService) {
  }

  getAllCategories(): Observable<Array<Category>>{
    return this.http.get<Array<Category>>(environment.restUrl + '/api/category/' + this.dataService.getEmail(), {withCredentials: true})
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

  getCategoriesByIncome(): Observable<Array<Category>>{
    return this.http.get<Array<Category>>(environment.restUrl + '/api/category/income/' + this.dataService.getEmail(), {withCredentials: true})
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
    return this.http.get<Array<Category>>(environment.restUrl + '/api/category/expense/' + this.dataService.getEmail(), {withCredentials: true})
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
    return this.http.delete<null>(environment.restUrl + '/api/category/' + this.dataService.getEmail() + '/' + id,
      {withCredentials: true});
  }

  deleteSubcategory(idCategory, idSubcategory): Observable<Subcategory>{
    const url = environment.restUrl + '/api/category/' + this.dataService.getEmail() + '/' + idCategory + '/' + idSubcategory;
    return this.http.delete<null>(url, {withCredentials: true});
  }

  createNewCategory(newCategory: Category): Observable<Category>{
    const categoryJSON = {name: newCategory.name, subcategories: []};
    return this.http.post<Category>(environment.restUrl + '/api/category/' + this.dataService.getEmail(), categoryJSON, {withCredentials : true});
  }

  createNewSubcategory(newCategory: Category, idCategory: number): Observable<Category>{
    const subcategoryJSON = {name: newCategory.name, subcategories: []};
    return this.http.post<Category>(environment.restUrl + '/api/category/'  + this.dataService.getEmail()  + '/' + idCategory, subcategoryJSON,
      {withCredentials : true});
  }

  updateCategory(updatedCategory: Category): Observable<Category>{
    const categoryJSON = {id: updatedCategory.id, name: updatedCategory.name, subcategories: []};
    return this.http.put<Category>(environment.restUrl + '/api/category/' + this.dataService.getEmail() + '/' + updatedCategory.id, categoryJSON,
      {withCredentials : true});
  }

  updateSubcategory(updatedSubcategory: Category, idCategory: number): Observable<Category>{
    return this.http.put<Category>(
      environment.restUrl + '/api/category/'  + this.dataService.getEmail()  + '/' + idCategory + '/' + updatedSubcategory.id, updatedSubcategory.name,
      {withCredentials : true});
  }
}
