import { Component } from '@angular/core';
import {FormChangeService} from '../../../../service/form-change.service';

@Component({
  selector: 'app-transaction-form-edit',
  templateUrl: './transaction-form-edit.component.html',
  styleUrls: ['./transaction-form-edit.component.css']
})
export class TransactionFormEditComponent {

  constructor(public formChangeService: FormChangeService) { }

}
