import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.css']
})
export class TextsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getUrl(): string{
    return this.router.url;
  }

}
