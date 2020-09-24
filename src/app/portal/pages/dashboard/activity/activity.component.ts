import {Component, Input, OnInit} from '@angular/core';
import {Dashboard} from '../../../../model/Dashboard';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input()
  dashboard: Dashboard;

  constructor() {
  }

  ngOnInit(): void {
  }
}
