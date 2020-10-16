import {Component, Input, OnInit} from '@angular/core';
import {Dashboard} from '../../../../model/Dashboard';
import {Router} from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input()
  dashboard: Dashboard;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectTo(uri: string): void {
    this.router.navigate([uri]);
  }
}
