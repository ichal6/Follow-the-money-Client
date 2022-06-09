import { Component, OnInit } from '@angular/core';
import {FormChangeService} from '../../../service/form-change.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(public formChangeService: FormChangeService) { }

  ngOnInit(): void {
  }

}
