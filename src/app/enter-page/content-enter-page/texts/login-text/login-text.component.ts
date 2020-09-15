import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-text',
  templateUrl: './login-text.component.html',
  styleUrls: ['./login-text.component.css']
})
export class LoginTextComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(page: string): void {
    this.router.navigate([page]);
  }
}
