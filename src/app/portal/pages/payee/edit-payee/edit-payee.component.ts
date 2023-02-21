import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormChangeService} from '../../../../service/form-change.service';
import {Payee} from '../../../../model/Payee';
import {PayeeService} from '../../../../service/payee.service';

@Component({
  selector: 'app-edit-payee',
  templateUrl: './edit-payee.component.html',
  styleUrls: ['./edit-payee.component.css']
})
export class EditPayeeComponent implements OnInit {

  @Input()
  public updatePayee: Payee;

  updatedPayeeForm;

  message: string;

  isNameValid = false;

  constructor(private payeeService: PayeeService,
              private router: Router,
              private formChangeService: FormChangeService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.updatedPayeeForm = Object.assign({}, this.updatePayee);

    this.checkIfNameIsValid();
  }

  onSubmit(): void {
    this.message = 'Saving new payee...';
    this.savePayee();
  }

  savePayee(): void {
    this.payeeService.updatePayee(this.updatedPayeeForm).subscribe(
      (payee) => {
        this.formChangeService.formAction = 'add';
        this.formChangeService.payee = new Payee();
        this.redirectTo('payee');
      },
      (error) => {
        this.message = error.error;
        console.log(error);
      }
    );
  }

  checkIfNameIsValid(): void {
    if (this.updatedPayeeForm.name) {
      this.isNameValid = this.updatedPayeeForm.name.trim().length >= 3;
    } else {
      this.isNameValid = false;
    }
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
