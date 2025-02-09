import {Component, OnInit, Output, OutputEmitterRef} from '@angular/core';
import {Router} from '@angular/router';
import {Payee} from '../../../../model/Payee';
import {PayeeService} from '../../../../service/payee.service';

@Component({
  selector: 'app-add-payee',
  templateUrl: './add-payee.component.html',
  styleUrls: ['./add-payee.component.css'],
  standalone: false
})
export class AddPayeeComponent implements OnInit {
  newPayee: Payee;
  message: string;
  @Output() savedPayee: OutputEmitterRef<boolean>;

  isNameValid = false;

  constructor(private payeeService: PayeeService,
              private router: Router) {
    this.savedPayee = new OutputEmitterRef<boolean>();
  }

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
        //this.redirectTo('payee');
        this.savedPayee.emit(true);
        this.message = '';
      },
      error: (err) => {
        this.message = err.error;
        this.savedPayee.emit(false);
      }
    });
  }

  checkIfNameIsValid(): void {
    const name = this.newPayee.name?.trim();
    this.isNameValid = name ? name.length >= 3 : false;
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
