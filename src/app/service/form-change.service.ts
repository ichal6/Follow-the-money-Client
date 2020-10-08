import { Injectable } from '@angular/core';
import {Account} from '../model/Account';
import {Category, Subcategory} from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class FormChangeService {
  public formAction = 'add';
  public account: Account;
  public category: Category;
  public subcategory: Subcategory;

  constructor() { }

  changeFormToEdit(accountToUpdate: Account): void {
    this.formAction = 'edit';
    this.account = accountToUpdate;
  }

  changeFormToEditForCategory(categoryToEdit: Category): void {
    this.formAction = 'edit';
    this.category = categoryToEdit;
  }

  changeFormToEditForSubcategory(subcategoryToEdit: Subcategory): void {
    this.formAction = 'edit';
    this.subcategory = subcategoryToEdit;
  }
}
