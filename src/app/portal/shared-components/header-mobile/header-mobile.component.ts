import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../service/data.service';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  constructor(private dataService: DataService,
              private route: Router) { }

  ngOnInit(): void {
  }

  navigateTo(page: string): void {
    this.route.navigate([page]);
  }

  logout(): void{
    this.dataService.logout().subscribe(
      next => {
        console.log('Logout successfully');
      },
      error => {
        console.log('Problem with logout');
      }
    );
    this.route.navigate(['login']);
  }

}
