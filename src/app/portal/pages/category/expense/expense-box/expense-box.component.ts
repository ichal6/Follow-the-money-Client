import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../../../model/Category';
import {PopupService} from '../../../../../service/popup.service';

@Component({
  selector: 'app-expense-box',
  templateUrl: './expense-box.component.html',
  styleUrls: ['./expense-box.component.css']
})
export class ExpenseBoxComponent implements OnInit {
  modeDisplayPopup: string;
  coordinates = [];

  @Input()
  category = new Category();

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
