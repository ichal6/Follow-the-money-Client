import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../service/data.service';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  constructor(private dataService: DataService,
              private route: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  navigateTo(page: string): void {
    this.route.navigate([page]);
  }

  displayInfo(): void {
    alert('User menu isn\'t implement, yet!');
  }

  logout(): void{
    this.authService.logout();
    this.route.navigate(['login']);
  }

}
