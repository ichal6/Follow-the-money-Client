import { Component, OnInit } from '@angular/core';
import {PopupService} from '../../../../service/popup.service';

@Component({
  selector: 'app-category-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  modeDisplayPopup: string;
  coordinates = [];

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
