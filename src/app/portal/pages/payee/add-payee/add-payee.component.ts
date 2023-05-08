import {Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Payee} from '../../../../model/Payee';
import {PayeeService} from '../../../../service/payee.service';

@Component({
  selector: 'app-add-payee',
  templateUrl: './add-payee.component.html',
  styleUrls: ['./add-payee.component.css']
})
export class AddPayeeComponent implements OnInit {

  newPayee: Payee;
  allPayees: Array<Payee>;
  message: string;

  dataChangedEvent = new EventEmitter();

  isNameValid = false;
  isVisible = false;

  constructor(private payeeService: PayeeService,
              private router: Router) { }

  ngOnInit(): void {
    this.newPayee = new Payee();
  }

  onSubmit(): void {
    this.message = 'Saving new payee...';
    this.saveCategory();
  }

  saveCategory(): void {
    this.payeeService.createNewPayee(this.newPayee).subscribe(
      (payee) => {
        this.dataChangedEvent.emit();
        this.redirectTo('payee');
      },
      (error) => {
        this.message = error.error;
        console.log(error);
      }
    );
  }

  checkIfNameIsValid(): void {
    if (this.newPayee.name) {
      this.isNameValid = this.newPayee.name.trim().length >= 3;
    } else {
      this.isNameValid = false;
    }
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
