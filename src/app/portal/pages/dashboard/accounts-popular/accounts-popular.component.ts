import {Component, OnInit} from '@angular/core';
import {PopupService} from '../../../../service/popup.service';

@Component({
  selector: 'app-accounts-popular',
  templateUrl: './accounts-popular.component.html',
  styleUrls: ['./accounts-popular.component.css']
})
export class AccountsPopularComponent implements OnInit {
  count = 0;
  colorsArray = ['#F4BB4A', '#F31259', '#FF7D44', '#564193'];
  modeDisplayPopup: string;
  coordinates = [];

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
    this.modeDisplayPopup = 'none';
  }

  displayPopup(event): void{
    const coordinates = [];
    this.popupService.displayPopup(event, coordinates);
    this.coordinates = coordinates;
    if (this.modeDisplayPopup === 'none') {
      this.modeDisplayPopup = 'block';
    } else {
      this.modeDisplayPopup = 'none';
    }
  }

  getColor(): string {
    if (this.count < this.colorsArray.length) {
      return this.colorsArray[this.count++];
    } else {
      this.count = 0;
      return this.colorsArray[this.count];
    }
  }
}
