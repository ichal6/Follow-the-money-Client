import { Component, OnInit } from '@angular/core';
import {PopupService} from '../../../../../service/popup.service';

@Component({
  selector: 'app-account-box',
  templateUrl: './account-box.component.html',
  styleUrls: ['./account-box.component.css']
})
export class AccountBoxComponent implements OnInit {
  modeDisplayPopup: string;
  coordinates = [];
  count = 0;
  colorsArray = ['#F4BB4A', '#F31259', '#FF7D44', '#564193'];
  currentColor: string;

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
    this.modeDisplayPopup = 'none';
    this.currentColor = this.getRandomColor();
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

  getRandomColor(): string {
    return this.colorsArray[Math.floor(Math.random() * this.colorsArray.length)];
  }
}
