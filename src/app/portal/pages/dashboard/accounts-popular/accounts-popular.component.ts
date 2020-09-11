import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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
  widthOfPopUp = 125;

  constructor() { }

  ngOnInit(): void {
    this.modeDisplayPopup = 'none';
    this.coordinates.push('0px');
    this.coordinates.push('0px');
  }

  getColor(): string{
    if (this.count < this.colorsArray.length){
      return this.colorsArray[this.count++];
    } else{
      this.count = 0;
      return this.colorsArray[this.count];
    }
  }

  displayPopup(event): void{
    const position = this.getPosition(event);
    this.coordinates[0] = position.offsetTop + 50 + 'px';
    this.coordinates[1] = position.offsetLeft - this.widthOfPopUp + 'px';
    if (this.modeDisplayPopup === 'none'){
      this.modeDisplayPopup = 'block';
    } else{
      this.modeDisplayPopup = 'none';
    }
  }

  getPosition(event): any{
    const el = event.target;
    const offsetLeft = el.offsetLeft;
    const offsetTop = el.offsetTop;
    return { offsetTop , offsetLeft };
  }

}
