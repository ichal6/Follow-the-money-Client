import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.dataService.logout().subscribe();
    this.router.navigate(['']);
  }
}
