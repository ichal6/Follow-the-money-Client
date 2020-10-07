import { Component, OnInit } from '@angular/core';
import {PopupService} from '../../../../service/popup.service';
import {Category} from '../../../../model/Category';
import {CategoryService} from '../../../../service/category.service';

@Component({
  selector: 'app-category-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
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

