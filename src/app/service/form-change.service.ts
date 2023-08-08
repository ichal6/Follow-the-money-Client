import { Injectable } from '@angular/core';
import {Account} from '../model/Account';
import {Category, Subcategory} from '../model/Category';
import {Payee} from '../model/Payee';
import {Payment} from '../model/Payment';

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
  public payment: Payment;

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

  changeFormToEditTransaction(transactionToEdit: Payment): void {
    this.formAction = 'edit-transaction';
    this.payment = transactionToEdit;
  }

  changeFormToEditTransfer(transferToEdit: Payment): void {
    this.formAction = 'edit-transfer';
    this.payment = transferToEdit;
  }

  changeFormToTransfer(): void {
    this.formAction = 'transfer';
  }
}
