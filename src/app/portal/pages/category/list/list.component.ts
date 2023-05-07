import { Component } from '@angular/core';
import {Category} from '../../../../model/Category';
import {CategoryService} from '../../../../service/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  categories = new Array<Category>();

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
       {
         next: (categoriesFromServer) => {this.categories = categoriesFromServer.sort((c1, c2) => {
           if (c1.subcategories.length > c2.subcategories.length) {
             return 1;
           }
           if (c1.subcategories.length < c2.subcategories.length) {
             return -1;
           }

           return 0;
         })},
         error: (e) => console.log('Problem with get data from server: ', e)
      });
  }

}
