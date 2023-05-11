import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select-time-period',
  templateUrl: './select-time-period.component.html',
  styleUrls: ['./select-time-period.component.css']
})
export class SelectTimePeriodComponent implements OnInit{
  public periodInDays: string;
  public type: string;

  @Output()
  updateData: EventEmitter<{ period: number, type: string }> = new EventEmitter();

  ngOnInit(): void {
    this.periodInDays = "0";
    this.type = "accounts";
  }

  requestData(): void {
    console.log(Number(this.periodInDays));
    this.updateData.emit({period: Number(this.periodInDays), type: this.type});
  }

}
