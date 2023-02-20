import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {

  constructor(private router: Router) { }

  getUrl(): string{
    return this.router.url;
  }

}
