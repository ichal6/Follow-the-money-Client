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
              private dataService: DataService) { }

  ngOnInit(): void {
    this.isDisplay = false;
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
      }
    );

    this.dataService.tryRegisterEvent.subscribe(
      next => {
        console.log(next);
        this.isDisplay = next;
      },
      error => {
        console.log(error);
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
      }
    );
  }

}
