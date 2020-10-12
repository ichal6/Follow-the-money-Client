import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Account, AccountType} from '../../../../model/Account';
import {Subscription} from 'rxjs';
import {AccountsService} from '../../../../service/accounts.service';
import {Router} from '@angular/router';
import {FormResetService} from '../../../../service/form-reset.service';
import {Category, GeneralType} from '../../../../model/Category';
import {CategoryService} from '../../../../service/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  newCategory: Category;
  allCategories: Array<Category>;
  idCategory: number;
  message: string;

  dataChangedEvent = new EventEmitter();

  isNameValid = false;
  isTypeValid = false;
  isSubcategory = false;

  constructor(private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.newCategory = new Category();
    this.newCategory.type = null;
    this.loadCategories();
  }

  ngOnDestroy(): void {

  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.allCategories = categories;
      },
      error => {
        this.message = error.getMessages();
        console.log('Problem with server side.');
      }
    );
  }

  onSubmit(): void {
    this.message = 'Saving new category...';
    if (this.isSubcategory){
      this.saveSubcategory();
    } else{
      this.categoryService.createNewCategory(this.newCategory).subscribe(
        (account) => {
          this.dataChangedEvent.emit();
          this.redirectTo('category');
        },
        (error) => {
          this.message = error.error;
          console.log(error);
        }
      );
    }
  }

  saveSubcategory(): void{
    this.categoryService.createNewSubcategory(this.newCategory, this.idCategory).subscribe(
      (account) => {
        this.dataChangedEvent.emit();
        this.redirectTo('category');
      },
      (error) => {
        this.message = error.error;
        console.log(error);
      }
    );
  }

  checkIfNameIsValid(): void {
    if (this.newCategory.name) {
      this.isNameValid = this.newCategory.name.trim().length >= 3;
    } else {
      this.isNameValid = false;
    }
  }

  checkIfTypeIsValid(): void {
    this.isTypeValid = (this.newCategory.type.toUpperCase() === GeneralType.INCOME
      || this.newCategory.type.toUpperCase() === GeneralType.EXPENSE);
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  checkIfSubcategory(): void {
    this.isSubcategory = true;
    console.log(this.idCategory);
  }
}
