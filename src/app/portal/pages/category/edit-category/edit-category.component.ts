import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../../service/category.service';
import {Category, GeneralType} from '../../../../model/Category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.categoryService.createNewCategory(new Category('nowaCategoria', GeneralType.INCOME )).subscribe(
      category => {
        console.log(category);
      }
    );
  }

}
