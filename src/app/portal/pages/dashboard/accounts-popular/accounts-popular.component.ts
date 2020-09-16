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

  constructor() { }

  ngOnInit(): void {
  }
}
