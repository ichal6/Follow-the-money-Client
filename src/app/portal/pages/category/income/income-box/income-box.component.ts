import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../../../model/Category';
import {PopupService} from '../../../../../service/popup.service';
import {CategoryService} from '../../../../../service/category.service';

@Component({
  selector: 'app-income-box',
  templateUrl: './income-box.component.html',
  styleUrls: ['./income-box.component.css']
})
export class IncomeBoxComponent implements OnInit {
  modeDisplayPopup: string;
  coordinates = [];

  @Input()
  category = new Category();

  constructor(private popupService: PopupService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.modeDisplayPopup = 'none';
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
    deleteButton(id): void{
      this.categoryService.deleteCategory(id).subscribe(
        next => {
          console.log('Delete category');
        },
        error => {
          console.log('Problem with server side');
        }
      );
    }


}
