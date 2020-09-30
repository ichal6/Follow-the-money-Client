import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetAccountFormEvent = new EventEmitter<Account>();
  constructor() { }
}
