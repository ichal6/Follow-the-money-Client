import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../../../service/category.service';
import {Category, GeneralType} from '../../../../model/Category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  @Input()
  public updateCategory: Category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.categoryService.updateCategory(new Category('nowaCategoria', GeneralType.INCOME )).subscribe(
      category => {
        console.log(category);
      }
    );
  }

}
