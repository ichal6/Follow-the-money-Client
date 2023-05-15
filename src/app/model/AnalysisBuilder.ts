import {AnalysisTableRow} from "./AnalysisTableRow";

export class AnalysisBuilder {
  private readonly _analysis: AnalysisTableRow;

  constructor() {
    this._analysis = new AnalysisTableRow();
  }

  name(name: string): AnalysisBuilder {
    this._analysis.name = name;
    return this;
  }

  value(valueAsString: string): AnalysisBuilder {
    const value = Number.parseFloat(valueAsString);
    this._analysis.expense = value;
    this._analysis.income = value;
    return this;
  }

  build(): AnalysisTableRow {
    return this._analysis;
  }
}
