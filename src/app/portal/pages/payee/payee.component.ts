import { Component, OnInit } from '@angular/core';
import {FormChangeService} from '../../../service/form-change.service';

@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.css']
})
export class PayeeComponent implements OnInit {

  constructor(public formChangeService: FormChangeService) { }

  ngOnInit(): void {
  }

}
