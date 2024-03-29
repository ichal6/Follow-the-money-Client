import { Injectable } from '@angular/core';
import { TransactionType } from '../../model/Transaction';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  public checkIfTitleIsValid(title: string): boolean {
    return title !== undefined && title !== null && title.trim().length >= 3;
  }

  public checkIfDateIsValid(date: string): boolean {
    const isoDateTimeRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[0-1])T([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;
    if(date != null && isoDateTimeRegex.test(date))
    {
      try {
        const dateObject = new Date(date);
        // Check if the date object is valid
        if (isNaN(dateObject.getTime())) {
          return false;
        }

        // Construct the ISO-like string manually
        const containsSecondsRegex = /(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[0-1])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)/;
        const isoString = this.constructISOString(dateObject, containsSecondsRegex.test(date));

        // Check if the date matches the input string exactly to ensure no additional characters.
        return date === isoString;
      } catch (error) {
        return false; // Parsing error, not a valid date.
      }
    }
    return false;
  }

  checkIfTypeIsValid(type: string): boolean {
    if(type == null) {
      return false;
    }
    return ( type.toUpperCase() === TransactionType.INCOME
      || type.toUpperCase() === TransactionType.EXPENSE);
  }

  checkIfValueIsValid(value: number): boolean {
    return (value != null) &&
      (value.toString() !== '') &&
      (!isNaN(Number(value.toString()))) &&
      (Number(value.toString()) > 0);
  }

  checkIfAccountIsDifferent(accountFromId: number, accountToId: number): boolean {
    return accountFromId != null && accountToId != null && accountFromId !== accountToId;
  }

  private constructISOString(date: Date, withSeconds: boolean): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    let result =`${year}-${month}-${day}T${hour}:${minute}`;
    if (withSeconds) {
      result = result.concat(`:${second}`);
    }
    return result;
  }
}
