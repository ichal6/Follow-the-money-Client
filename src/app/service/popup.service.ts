import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  widthOfPopUp = 125;
  lengthFromTop = 50;

  constructor() {
  }

  displayPopup(event, coordinates): void {
    const position = this.getPosition(event);
    coordinates.push(position.offsetTop + this.lengthFromTop + 'px');
    coordinates.push(position.offsetLeft - this.widthOfPopUp + 'px');
  }

  getPosition(event): any {
    const el = event.target;
    const offsetLeft = el.offsetLeft;
    const offsetTop = el.offsetTop;
    return {offsetTop, offsetLeft};
  }
}
