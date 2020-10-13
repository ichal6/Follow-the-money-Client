import {Component, Input, OnInit} from '@angular/core';
import {Payee} from '../../../../model/Payee';

@Component({
  selector: 'app-single-box-payee',
  templateUrl: './single-box-payee.component.html',
  styleUrls: ['./single-box-payee.component.css']
})
export class SingleBoxPayeeComponent implements OnInit {

  @Input()
  public payee: Payee;
  constructor() { }

  ngOnInit(): void {
  }

}
