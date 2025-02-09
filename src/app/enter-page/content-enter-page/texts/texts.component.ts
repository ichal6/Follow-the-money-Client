import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.css'],
  standalone: false
})
export class TextsComponent {

  constructor(private router: Router) { }

  getUrl(): string{
    return this.router.url;
  }

}
