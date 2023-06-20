export class Transfer {
  id: number;
  title: string;
  value: number;
  accountFromId: number;
  accountToId: number;
  date: string;

  static fromHttp(transfer: Transfer): Transfer {
    const newTransfer = new Transfer();
    newTransfer.accountFromId = transfer.accountFromId;
    newTransfer.accountToId = transfer.accountToId;
    newTransfer.title = transfer.title;
    newTransfer.value = transfer.value;
    newTransfer.date = transfer.date;
    return newTransfer;
  }
}
