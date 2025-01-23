export class Payment {
  isInternal: boolean;
  id: number;
  value: number;
  date: Date;
  title: string;
  from: string;
  to: string;
  categoryName: string;
  subcategoryName: string;
  balanceAfter: number;

  static fromHttp(paymentJS: PaymentJS): Payment {
    const newPaymentTS = new Payment();
    newPaymentTS.isInternal = paymentJS.isInternal;
    newPaymentTS.id = paymentJS.id;
    newPaymentTS.value = paymentJS.value;
    newPaymentTS.date = new Date(paymentJS.date);
    newPaymentTS.title = paymentJS.title;
    newPaymentTS.from = paymentJS.from;
    newPaymentTS.to = paymentJS.to;
    newPaymentTS.categoryName = paymentJS.categoryName;
    newPaymentTS.subcategoryName = paymentJS.subcategoryName
    newPaymentTS.balanceAfter = paymentJS.balanceAfter;
    return newPaymentTS;
  }

  static copy(oldPayment: Payment): Payment {
    const newPayment = new Payment();
    newPayment.isInternal = oldPayment.isInternal;
    newPayment.id = oldPayment.id;
    newPayment.value = oldPayment.value;
    newPayment.date = new Date(oldPayment.date);
    newPayment.title = oldPayment.title;
    newPayment.from = oldPayment.from;
    newPayment.to = oldPayment.to;
    newPayment.categoryName = oldPayment.categoryName;
    newPayment.subcategoryName = oldPayment.subcategoryName
    newPayment.balanceAfter = oldPayment.balanceAfter;
    return newPayment;
  }
}

export interface PaymentJS {
  isInternal: boolean;
  id: number;
  value: number;
  date: Date;
  title: string;
  from: string;
  to: string;
  categoryName: string;
  subcategoryName: string;
  balanceAfter: number;
}

