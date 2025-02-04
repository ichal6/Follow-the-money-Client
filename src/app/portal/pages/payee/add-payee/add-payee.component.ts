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
  message: string;

  isNameValid = false;

  constructor(private payeeService: PayeeService,
              private router: Router) { }

  ngOnInit(): void {
    this.newPayee = new Payee();
  }

  onSubmit(): void {
    this.message = 'Saving new payee...';
    this.savePayee();
  }

  private savePayee(): void {
    this.payeeService.createNewPayee(this.newPayee).subscribe({
      next: () => {
        this.redirectTo('payee');
      },
      error: (err) => {
        this.message = err.error;
      }
    });
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
