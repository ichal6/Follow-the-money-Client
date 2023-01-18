import { Injectable } from '@angular/core';
import {Account} from '../model/Account';
import {Category, Subcategory} from '../model/Category';
import {Payee} from '../model/Payee';

@Injectable({
  providedIn: 'root'
})
export class FormChangeService {
  public formAction = 'add';
  public account: Account;
  public category: Category;
  public subcategory: Subcategory;
  public idCategoryForSubcategory: number;
  public isSubcategory = false;
  public payee: Payee;

  constructor() { }

  changeFormToEdit(accountToUpdate: Account): void {
    this.formAction = 'edit';
    this.account = accountToUpdate;
  }

  changeFormToEditForCategory(categoryToEdit: Category): void {
    this.formAction = 'edit';
    this.category = categoryToEdit;
    this.isSubcategory = false;
    console.log('zmiana edit');
  }

  changeFormToEditForSubcategory(idCategory: number, subcategoryToEdit: Subcategory): void {
    this.isSubcategory = true;
    this.formAction = 'edit';
    this.subcategory = subcategoryToEdit;
    this.idCategoryForSubcategory = idCategory;
  }

  changeFormToEditForPayee(payeeToEdit: Payee): void {
    this.formAction = 'edit';
    this.payee = payeeToEdit;
  }

  changeFormToTransaction(): void {
    this.formAction = 'transaction';
  }

  changeFormToTransfer(): void {
    this.formAction = 'transfer';
  }
}
