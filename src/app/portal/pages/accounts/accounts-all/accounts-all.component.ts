import { Component, OnInit } from '@angular/core';
import {PopupService} from '../../../../service/popup.service';

@Component({
  selector: 'app-accounts-all',
  templateUrl: './accounts-all.component.html',
  styleUrls: ['./accounts-all.component.css']
})
export class AccountsAllComponent implements OnInit {
  modeDisplayPopup: string;
  coordinates = [];

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
    this.modeDisplayPopup = 'none';
  }

  displayPopUp(event): void{
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
