import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  navigateTo(page: string): void {
    this.router.navigate([page]);
  }

  displayInfo(info = 'This option does not implement, yet!'): void {
    alert(info);
  }

}
