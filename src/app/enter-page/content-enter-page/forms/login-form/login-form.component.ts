import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {

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
            this.route.navigate(['portal']);
          }
        }
        else {
          console.log('Log in has not been successfully');
          this.authService.tryLoginEvent.emit(true);
          this.message = 'Your username or password was not recognised - try again.';
        }
      }
    );
    this.authService.checkIfAlreadyAuthenticated();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  onSubmit(): void{
    this.authService.authenticate(this.email, this.password);
  }

  navigateTo(page: string): void {
    this.route.navigate([page]);
  }

  displayInfo(): void {
    alert('This option doesn\'t implement, yet!');
  }
}
