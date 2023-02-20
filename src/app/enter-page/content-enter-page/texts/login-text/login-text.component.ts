import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-text',
  templateUrl: './login-text.component.html',
  styleUrls: ['./login-text.component.css']
})
export class LoginTextComponent {

  constructor(private router: Router) { }

  navigateTo(page: string): void {
    this.router.navigate([page]);
  }
}
