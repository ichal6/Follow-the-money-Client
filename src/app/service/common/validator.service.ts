import { Injectable } from '@angular/core';
import {GeneralType} from '../../model/Transaction';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  public checkIfTitleIsValid(title: string): boolean {
    return title !== undefined && title !== null && title.trim().length >= 3;
  }

  public checkIfDateIsValid(date: string): boolean {
    const isoDateTimeRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[0-1])T([01]\d|2[0-3]):([0-5]\d)$/;
    if(date != null && isoDateTimeRegex.test(date))
    {
      try {
        const dateObject = new Date(date);
        // Check if the date object is valid
        if (isNaN(dateObject.getTime())) {
          return false;
        }

        // Construct the ISO-like string manually
        const isoString = this.constructISOString(dateObject);

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
    return ( type.toUpperCase() === GeneralType.INCOME
      || type.toUpperCase() === GeneralType.EXPENSE);
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

  private constructISOString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }
}
