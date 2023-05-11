export class AnalysisTableRow {
  name: string;
  expense: number;
  income: number;
  balance: number;

  static fromHttp(dataAsJSObject): AnalysisTableRow {
    const analysisTableRow = new AnalysisTableRow();
    analysisTableRow.name = dataAsJSObject.name;
    analysisTableRow.income = dataAsJSObject.income;
    analysisTableRow.expense = dataAsJSObject.expense;
    analysisTableRow.balance = dataAsJSObject.balance;
    return analysisTableRow;
  }
}

