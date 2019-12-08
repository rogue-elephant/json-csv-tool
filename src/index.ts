import { RelationalJson, IRowValue } from './models/relational-json';
import { Converter } from './converter';
import { DeeperPersonJson } from './_dummy-json/deeper-person';
import { OutputGenerator } from './models/output-generator';

export { RelationalJson, IRowValue } from './models/relational-json';
export { IConversionStrategy } from './models/conversion-strategy';
export { Converter } from './converter';
export { OutputGenerator, TableLevelCallback, RowLevelCallbackDelegate } from './models/output-generator';

const relationalJson: RelationalJson = new Converter().convertJson(DeeperPersonJson, {});
const csv = new OutputGenerator(relationalJson).generateCsv();
const markdown = new OutputGenerator(relationalJson).generateMarkdown();
const html = new OutputGenerator(relationalJson).generateOutput({
  columnSeperator: '',
  tableLevelCallback: (output: string, table: RelationalJson) =>
    output + `<h1>${table.title || 'JSON Conversion'}</h1>` + '<table><tr>' + table.columnNames.map(x => `<th>${x}</th>`).join('') + '</tr>',
  rowLevelCallback: (rowCol: IRowValue) => `<td>${rowCol.value}</td>`,
  rowStartOutput: '<tr>',
  rowEndOutput: '</tr>',
  tableEndOutput: '</table>',
  tableSpacing: '<br>',
});

const foo = '';
