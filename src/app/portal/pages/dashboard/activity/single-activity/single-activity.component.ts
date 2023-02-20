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
  @Input()
  first: any;
  @Input()
  last: any;
  @Input()
  even: any;

  ngOnInit(): void {
    if (this.first){
      this.border = '10px 10px 0 0';
    } else if (this.last){
      this.border = '0 0 10px 10px';
    }

    if (this.even){
      this.backgroundColor = '#F6F6F6';
    }
  }

}
