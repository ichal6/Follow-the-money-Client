import {Component, Input, OnInit} from '@angular/core';
import {Dashboard} from '../../../../model/Dashboard';

@Component({
  selector: 'app-accounts-popular',
  templateUrl: './accounts-popular.component.html',
  styleUrls: ['./accounts-popular.component.css']
})
export class AccountsPopularComponent implements OnInit {
  @Input()
  dashboard: Dashboard;

  constructor() { }

  ngOnInit(): void {
  }
}
