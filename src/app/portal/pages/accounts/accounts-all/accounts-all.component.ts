import {Component, Input, OnInit} from '@angular/core';
import {Account} from '../../../../model/Account';

@Component({
  selector: 'app-accounts-all',
  templateUrl: './accounts-all.component.html',
  styleUrls: ['./accounts-all.component.css']
})
export class AccountsAllComponent implements OnInit {

  @Input()
  accounts: Array<Account>;

  constructor() { }

  ngOnInit(): void {
  }
}
