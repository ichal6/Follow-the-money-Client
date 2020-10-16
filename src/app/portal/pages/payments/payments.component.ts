import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormChangeService} from '../../../service/form-change.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  constructor(public formChangeService: FormChangeService) { }

  ngOnInit(): void {
    this.formChangeService.formAction = 'transaction';
  }

  ngOnDestroy(): void {
    this.formChangeService.formAction = 'add';
  }
}
