export class Payment {
  isInternal: boolean;
  id: number;
  value: number;
  date: Date;
  title: string;
  from: string;
  to: string;
  categoryName: string;
  balanceAfter: number;

  static fromHttp(payment: Payment): Payment {
    const newPayment = new Payment();
    newPayment.isInternal = payment.isInternal;
    newPayment.id = payment.id;
    newPayment.value = payment.value;
    newPayment.date = new Date(payment.date);
    newPayment.title = payment.title;
    newPayment.from = payment.from;
    newPayment.to = payment.to;
    newPayment.categoryName = payment.categoryName;
    newPayment.balanceAfter = payment.balanceAfter;
    return newPayment;
  }
}

