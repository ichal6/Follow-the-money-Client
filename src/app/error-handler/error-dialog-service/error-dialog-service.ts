import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  openDialog(param: string, status?: number) {
    console.error({message: param});
    console.error({errorStatus: status});
  }
}
