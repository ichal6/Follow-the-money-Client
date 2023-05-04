import {PaymentType} from './PaymentType';

export class Payee{
  id: number;
  name: string;
  type: PaymentType;

  static fromHttp(payee: Payee): Payee {
    const newPayee = new Payee();
    newPayee.name = payee.name;
    newPayee.id = payee.id;
    newPayee.type = (payee.type === PaymentType.INCOME) ? PaymentType.INCOME : PaymentType.EXPENSE;
    return newPayee;
  }
}
