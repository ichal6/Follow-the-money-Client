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
          console.log('Log in has been successfully');
          const url = this.activatedRoute.snapshot.queryParams.requested;
          if (url != null){
            console.log('To jest url - ', url);
            this.route.navigateByUrl(url);
          }else {
            console.log('nie ma url :-(');
            this.route.navigate(['dashboard']);
          }
        }
        else {
          console.log('Log in has not been successfully');
          this.message = 'Your username or password was not recognised - try again.';
        }
      }
    );
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  onSubmit(): void{
    this.authService.authenticate(this.email, this.password);
  }

}
