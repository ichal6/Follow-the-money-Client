import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../service/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = 'Please wait...';

  constructor(private dataService: DataService,
              private route: Router) { }

  ngOnInit(): void {
    this.dataService.getUser().subscribe(
      nextUser => {
        this.userName = nextUser.name;
      },
      error => {
        console.log('failed connection to server');
      }
    );
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
