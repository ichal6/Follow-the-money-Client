import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../service/data.service';
import {Dashboard} from '../../../model/Dashboard';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit , OnDestroy{
  public dashboard = new Dashboard();
  private subscribe: Subscription;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscribe = this.dataService.getDashboard().subscribe(
      next => {
        this.dashboard = next;
      },
      error => {
        console.log('problem with server side', error);
      }
    );
  }

  logout(): void{
    this.dataService.logout().subscribe();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
