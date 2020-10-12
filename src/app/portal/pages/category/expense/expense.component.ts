import { Component, OnInit } from '@angular/core';
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
    this.categoryService.getCategoriesByExpense().subscribe(
      categoriesFromServer => {
        this.categories = categoriesFromServer;
      },
      errors => {
        console.log('Problem with server side ', errors);
      }
    );
  }

}

