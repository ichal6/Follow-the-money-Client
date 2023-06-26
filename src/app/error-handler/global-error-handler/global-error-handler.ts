import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorDialogService} from '../error-dialog-service/error-dialog-service';
import {AuthService} from '../../service/auth.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private errorDialogService: ErrorDialogService,
    private zone: NgZone,
    private authService: AuthService) {  }

  handleError(error) {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    if(error?.message == 'Email is not set') {
      this.zone.run( () =>
        this.authService.logout()
      );
    }
  }
}
