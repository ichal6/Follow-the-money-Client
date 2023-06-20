import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {DataService} from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './enter-page.component.html',
  styleUrls: ['./enter-page.component.css']
})
export class EnterPageComponent implements OnInit{
  isDisplay: boolean;

  constructor(private authService: AuthService,
              private dataService: DataService) {
    this.isDisplay = false;
  }

  ngOnInit(): void {
    this.displayPopup();
    this.hidePopup();
  }

  displayPopup(): void {
    this.authService.tryLoginEvent.subscribe(
      next => {
        console.log(next);
        this.isDisplay = next;
      },
      error => {
        console.log(error);
        this.isDisplay = false;
      }
    );

    this.dataService.tryRegisterEvent.subscribe(
      next => {
        console.log(next);
        this.isDisplay = next;
      },
      error => {
        console.log(error);
        this.isDisplay = false;
      }
    );
  }

  hidePopup(): void {
    this.authService.authenticationResultEvent.subscribe(
      next => {
        console.log(next);
        this.isDisplay = next;
      },
      error => {
        console.log(error);
        this.isDisplay = false;
      }
    );
  }
}
