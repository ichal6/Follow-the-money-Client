import {Component, Input, OnInit} from '@angular/core';
import {Dashboard} from '../../../../model/Dashboard';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  @Input()
  dashboard: Dashboard;

  constructor() {
  }

  ngOnInit(): void {
  }

}
