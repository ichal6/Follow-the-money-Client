import { Component } from '@angular/core';
import {FormChangeService} from '../../../service/form-change.service';

@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.css'],
  standalone: false
})
export class PayeeComponent {

  constructor(public formChangeService: FormChangeService) { }

}
