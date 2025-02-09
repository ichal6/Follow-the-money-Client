import {Component, Input} from '@angular/core';
import {Dashboard} from '../../../../model/Dashboard';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  standalone: false
})
export class BalanceComponent {
  @Input()
  dashboard: Dashboard;
}
