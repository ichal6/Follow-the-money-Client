import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../../service/data.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName = 'Please wait...';
  private subscription: Subscription;

  constructor(private dataService: DataService,
              private route: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.getUser().subscribe(
      nextUser => {
        this.userName = nextUser.name;
      },
      error => {
        console.log('failed connection to server');
      }
    );
  }

  displayInfo(): void {
    alert('User menu isn\'t implement, yet!');
  }

  logout(): void{
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
