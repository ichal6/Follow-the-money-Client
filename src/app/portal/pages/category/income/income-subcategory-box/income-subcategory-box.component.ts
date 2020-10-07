import {Component, Input, OnInit} from '@angular/core';
import {Category, Subcategory} from '../../../../../model/Category';
import {PopupService} from '../../../../../service/popup.service';

@Component({
  selector: 'app-income-subcategory-box',
  templateUrl: './income-subcategory-box.component.html',
  styleUrls: ['./income-subcategory-box.component.css']
})
export class IncomeSubcategoryBoxComponent implements OnInit {
  modeDisplayPopup: string;
  coordinates = [];

  @Input()
  subcategory = new Subcategory();

  constructor(private popupService: PopupService) {
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

}
