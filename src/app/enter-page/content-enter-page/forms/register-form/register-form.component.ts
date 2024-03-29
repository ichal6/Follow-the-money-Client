import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../../../service/data.service';
import {User} from '../../../../model/User';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnDestroy {
  message = '';
  name: string;
  email: string;
  password: string;
  subscription: Subscription;

  constructor(private authService: AuthService,
              private dataService: DataService,
              private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnDestroy(): void{
    if (this.subscription != null){
      this.subscription.unsubscribe();
    }
  }

  onSubmit(): void{
    this.subscription = this.dataService.register(new User(this.name, this.email), this.password)
      .subscribe(
        result => {
          console.log(result);
          if (result) {
            console.log('Register has been successfully');
            const url = this.activatedRoute.snapshot.queryParams.requested;
            if (url != null) {
              // console.log('To jest url - ', url);
              this.route.navigateByUrl(url);
            } else {
              // console.log('nie ma url :-(');
              alert('Register has been successfully. Click ok to continue');
              this.route.navigate(['login']);
            }
          }
        }, error1 => {
          console.log('Register has not been successfully');
          this.message = 'Your username, email or password was not correct - try again.';
          this.authService.authenticationResultEvent.emit(false);
        }
      );
  }

  navigateTo(page: string): void {
    this.route.navigate([page]);
  }
}
