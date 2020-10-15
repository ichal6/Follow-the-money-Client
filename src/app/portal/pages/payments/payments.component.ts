import { Component, OnInit } from '@angular/core';
import {FormChangeService} from '../../../service/form-change.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(public formChangeService: FormChangeService) { }

  ngOnInit(): void {
    this.formChangeService.formAction = 'transaction';
  }
}
