import {Component, Input, OnInit} from '@angular/core';
import {PopupService} from '../../../../../service/popup.service';

@Component({
  selector: 'app-single-account',
  templateUrl: './single-account.component.html',
  styleUrls: ['./single-account.component.css']
})
export class SingleAccountComponent implements OnInit {
  modeDisplayPopup: string;
  coordinates = [];
  @Input()
  backgroundColor: string;

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

}
