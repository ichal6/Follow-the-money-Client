import { Component, OnInit } from '@angular/core';
import {FormChangeService} from '../../../../service/form-change.service';

@Component({
  selector: 'app-payment-type-select',
  templateUrl: './payment-type-select.component.html',
  styleUrls: ['./payment-type-select.component.css']
})
export class PaymentTypeSelectComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _defaultOption: string;

  constructor(private formChangeService: FormChangeService) { }

  ngOnInit(): void {
    this._defaultOption = this.formChangeService.formAction;
  }

  toTransfer(): void {
    this.formChangeService.changeFormToTransfer();
  }

  toTransaction(): void {
    this.formChangeService.changeFormToTransaction();
  }


  get defaultOption(): string {
    return this._defaultOption;
  }
}
