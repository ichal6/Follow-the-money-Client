import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../../../service/category.service';
import {Category, GeneralType, Subcategory} from '../../../../model/Category';
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
  @Input()
  public updateSubcategory: Subcategory;

  updatedCategoryForm;

  message: string;
  idCategory: number;

  isNameValid = false;
  isTypeValid = false;
  allCategories: Array<Category>;
  private isSubcategory = false;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private formChangeService: FormChangeService) { }

  ngOnInit(): void {
    this.initializeForm();
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

  initializeForm(): void {
    if (this.formChangeService.isSubcategory){
      this.updatedCategoryForm = Object.assign({}, this.updateSubcategory);
    } else{
      this.updatedCategoryForm = Object.assign({}, this.updateCategory);
    }
    this.checkIfNameIsValid();
    this.checkIfTypeIsValid();
  }

  onSubmit(): void {
    this.message = 'Saving new category...';
    if (this.formChangeService.isSubcategory){
      this.saveSubcategory();
    }
    else{
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
  }

  saveSubcategory(): void{
    this.categoryService.updateSubcategory(this.updatedCategoryForm, this.formChangeService.idCategoryForSubcategory).subscribe(
      (category) => {
        this.formChangeService.formAction = 'add';
        this.formChangeService.isSubcategory = false;
        this.formChangeService.subcategory = new Subcategory();
        this.redirectTo('category');
      },
      (error) => {
        this.message = error.error;
        console.log(error);
      }
    );
  }

  checkIfNameIsValid(): void {
    if (this.updatedCategoryForm.name) {
      this.isNameValid = this.updatedCategoryForm.name.trim().length >= 3;
    } else {
      this.isNameValid = false;
    }
  }

  checkIfTypeIsValid(): void {
    this.isTypeValid = (this.updatedCategoryForm.type.toUpperCase() === GeneralType.INCOME
      || this.updatedCategoryForm.type.toUpperCase() === GeneralType.EXPENSE);
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  checkIfSubcategory(): void {
    this.isSubcategory = true;
  }
}
