import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../../../service/category.service';
import {Category, GeneralType} from '../../../../model/Category';
import {Router} from '@angular/router';
import {FormChangeService} from '../../../../service/form-change.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input()
  public updateCategory: Category;

  updatedCategoryForm: Category;

  message: string;

  isNameValid = false;
  isTypeValid = false;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private formChangeService: FormChangeService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {

  }

  initializeForm(): void {
    this.updatedCategoryForm = Object.assign({}, this.updateCategory);
    this.checkIfNameIsValid();
    this.checkIfTypeIsValid();
  }

  onSubmit(): void {
    this.message = 'Saving new account...';
    this.categoryService.updateCategory(this.updatedCategoryForm).subscribe(
      (category) => {
        this.formChangeService.formAction = 'add';
        this.formChangeService.category = new Category();
        this.redirectTo('category');
      },
      (error) => {
        this.message = error.error;
        console.log(error);
      }
    );
  }

  checkIfNameIsValid(): void {
    if (this.updateCategory.name) {
      this.isNameValid = this.updateCategory.name.trim().length >= 3;
    } else {
      this.isNameValid = false;
    }
  }

  checkIfTypeIsValid(): void {
    this.isTypeValid = (this.updateCategory.type.toUpperCase() === GeneralType.INCOME
      || this.updateCategory.type.toUpperCase() === GeneralType.EXPENSE);
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

}
