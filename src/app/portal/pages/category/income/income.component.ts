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
  modeDisplayPopup: string;
  coordinates = [];
  categories = new Array<Category>();

  constructor(private popupService: PopupService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.modeDisplayPopup = 'none';
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

  displayPopup(event): void {
    const coordinates = [];
    this.popupService.displayPopup(event, coordinates);
    this.coordinates = coordinates;
    if (this.modeDisplayPopup === 'none') {
      this.modeDisplayPopup = 'block';
    } else {
      this.modeDisplayPopup = 'none';
    }
  }

}
