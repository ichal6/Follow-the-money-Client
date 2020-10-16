import {GeneralType} from './Category';

export class Payee{
  id: number;
  name: string;
  type: GeneralType;

  static fromHttp(payee: Payee): Payee {
    const newPayee = new Payee();
    newPayee.name = payee.name;
    newPayee.id = payee.id;
    newPayee.type = (payee.type === GeneralType.INCOME) ? GeneralType.INCOME : GeneralType.EXPENSE;
    return newPayee;
  }
}
