import { Component, OnInit } from '@angular/core';
import {PopupService} from '../../../../service/popup.service';
import {CategoryService} from '../../../../service/category.service';
import {Category} from '../../../../model/Category';

@Component({
  selector: 'app-category-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  categories = new Array<Category>();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategoriesByIncome().subscribe(
      categoriesFromServer => {
        this.categories = categoriesFromServer;
        console.log(categoriesFromServer);
      },
      errors => {
        console.log('Problem with server side ', errors);
      }
    );
  }

}
