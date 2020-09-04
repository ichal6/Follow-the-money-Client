import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  message = '';
  email: string;
  password: string;
  subscription: Subscription;

  constructor(private authService: AuthService,
              private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void{
    this.subscription = this.authService.authenticationResultEvent.subscribe(
      result => {
        if (result) {
          const url = this.activatedRoute.snapshot.queryParams['requested'];
          this.route.navigateByUrl(url);
        }
        else {
          console.log('test3');
          this.message = 'Your username or password was not recognised - try again.';
        }
      }
    );
    // this.authService.checkIfAlreadyAuthenticated();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  onSubmit(): void{
    console.log(this.email, this.password);
    this.authService.authenticate(this.email, this.password);
  }

}
