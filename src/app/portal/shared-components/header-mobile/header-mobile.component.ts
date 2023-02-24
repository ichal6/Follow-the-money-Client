import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../service/data.service';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent {

  constructor(private dataService: DataService,
              private route: Router) { }

  navigateTo(page: string): void {
    this.route.navigate([page]);
  }
}
