import {EventEmitter, Injectable } from '@angular/core';
import {DataService} from './data.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();

  constructor(private dataService: DataService) { }

  authenticate(name: string, password: string): void {
    this.dataService.validateUser(name, password).subscribe(
      next => {
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
        this.dataService.setEmailFromCookie();
      },
      error => {
        console.log(error);
        this.isAuthenticated = false;
        this.authenticationResultEvent.emit(false);
      }
    );
  }

  checkIfAlreadyAuthenticated(): void {
    this.dataService.isLogin().subscribe(
      next => {
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      }
    );
  }

  logout(): void {
    this.dataService.logout().subscribe();
    this.isAuthenticated = false;
    this.authenticationResultEvent.emit(false);
  }

  register(): Observable<any>{
    return this.dataService.register();
  }
}
