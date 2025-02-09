import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormChangeService} from "../../../service/form-change.service";

@Component({
  selector: 'app-add-new-element',
  templateUrl: './add-new-element.component.html',
  styleUrls: ['./add-new-element.component.css'],
  standalone: false
})
export class AddNewElementComponent {
  formChangeService: FormChangeService;
  @Output() addNewElement = new EventEmitter<never>();
  @Input() height: number;
  @Input() width: number;
  isAdd: boolean;

  constructor(formChangeService: FormChangeService) {
    this.formChangeService = formChangeService;
    this.isAdd = true;
  }

  add() {
    this.addNewElement.emit();
    this.isAdd = this.isAdd !== true;
    this.scrollToTop();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
