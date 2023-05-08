export class Payee{
  id: number;
  name: string;

  static fromHttp(payee: Payee): Payee {
    const newPayee = new Payee();
    newPayee.name = payee.name;
    newPayee.id = payee.id;
    return newPayee;
  }
}
