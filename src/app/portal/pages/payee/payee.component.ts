import {Component, ViewChild} from '@angular/core';
import {FormChangeService} from '../../../service/form-change.service';
import {PayeeAllComponent} from "./payee-all/payee-all.component";

@Component({
  selector: 'app-payee',
  templateUrl: './payee.component.html',
  styleUrls: ['./payee.component.css'],
  standalone: false
})
export class PayeeComponent {
  @ViewChild(PayeeAllComponent)
  payeeAllComponent: PayeeAllComponent;

  constructor(public formChangeService: FormChangeService) { }

  handleSavedTry($event: boolean) {
    if ($event) {
      this.payeeAllComponent.ngOnInit()
    }
  }
}
