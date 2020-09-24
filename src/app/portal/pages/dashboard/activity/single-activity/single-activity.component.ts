import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../../../../model/Activity';

@Component({
  selector: 'app-single-activity',
  templateUrl: './single-activity.component.html',
  styleUrls: ['./single-activity.component.css']
})
export class SingleActivityComponent implements OnInit {

  @Input()
  border: string;
  @Input()
  backgroundColor: string;
  @Input()
  activity: Activity;
  constructor() { }

  ngOnInit(): void {
  }

}
