import {Component, Input, OnInit} from '@angular/core';
import {Dashboard} from '../../../../model/Dashboard';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accounts-popular',
  templateUrl: './accounts-popular.component.html',
  styleUrls: ['./accounts-popular.component.css']
})
export class AccountsPopularComponent implements OnInit {
  @Input()
  dashboard: Dashboard;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectTo(uri: string): void {
    this.router.navigate([uri]);
  }
}
