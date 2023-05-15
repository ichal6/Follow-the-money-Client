import { Component } from '@angular/core';
import {PaymentType} from "../../../model/PaymentType";

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent {

  protected readonly PaymentType = PaymentType;
}
