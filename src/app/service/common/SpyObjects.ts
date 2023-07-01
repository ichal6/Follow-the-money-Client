import {DataService} from '../data.service';

export function spyDataServiceGetEmail() {
  const email = "example@company.com";
  spyOn(DataService.prototype, 'getEmail').and.returnValue(email);
}
