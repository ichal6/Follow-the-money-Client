import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  message = '';
  email: string;
  password: string;
  subscription: Subscription;
  name: string;

  constructor(private authService: AuthService,
              private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void{
    this.subscription = this.authService.register().subscribe(
      result => {
        if (result) {
          console.log('Register has been successfully');
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
          console.log('Register has not been successfully');
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
}
