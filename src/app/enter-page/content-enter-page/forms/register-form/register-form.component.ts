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
  name: string;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  onSubmit(): void {
    this.message = 'You provide incorrect data.';
  }
}
