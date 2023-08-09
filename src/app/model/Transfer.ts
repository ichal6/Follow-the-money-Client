export class Transfer {
  id: number;
  title: string;
  value: number;
  accountIdFrom: number;
  accountIdTo: number;
  date: string;

  static fromHttp(transfer: Transfer): Transfer {
    const newTransfer = new Transfer();
    newTransfer.accountIdFrom = transfer.accountIdFrom;
    newTransfer.accountIdTo = transfer.accountIdTo;
    newTransfer.title = transfer.title;
    newTransfer.value = transfer.value;
    newTransfer.date = transfer.date.substring(0, 16);
    newTransfer.id = transfer.id;
    return newTransfer;
  }
}
