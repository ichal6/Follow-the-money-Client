import {AnalysisTableRow} from "./AnalysisTableRow";
import {AnalysisBuilder} from "./AnalysisBuilder";

describe('AnalysisBuilder', () => {
  it('should build AnalysisTableRow with name and value', () => {
    // given
    const name = 'Example';
    const value = '12';
    const valueAsNumber = 12;

    // when
    const analysisRow = new AnalysisBuilder()
      .name(name)
      .value(value)
      .build();

    // then
    expect(analysisRow.name).toBe(name);
    expect(analysisRow.income).toBe(valueAsNumber);
    expect(analysisRow.expense).toBe(valueAsNumber)
    expect(analysisRow.balance).toBeUndefined();
  });
} );
