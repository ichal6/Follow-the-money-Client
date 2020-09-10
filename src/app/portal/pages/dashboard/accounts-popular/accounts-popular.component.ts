import { Component, OnInit } from '@angular/core';

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

  getColor(): string{
    if (this.count < this.colorsArray.length){
      return this.colorsArray[this.count++];
    } else{
      this.count = 0;
      return this.colorsArray[this.count];
    }
  }

}
