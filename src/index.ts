import { Converter } from './converter';
import { DeeperPersonJson } from './_dummy-json/deeper-person';
import { RelationalJson, IRowValue, RowLevelCallbackDelegate, TopLevelCallbackDelegate } from './models/relational-json';

export { RelationalJson, IRowValue, RowLevelCallbackDelegate, TopLevelCallbackDelegate } from './models/relational-json';
export { IConversionStrategy } from './models/conversion-strategy';
export { Converter } from './converter';

const relationalJson: RelationalJson = new Converter().convertJson(DeeperPersonJson, {});
const csv = relationalJson.generateCsv();
const markdown = relationalJson.generateMarkdown();
const html = relationalJson.generateOutput(
  '',
  (output: string, table: RelationalJson) =>
    output + `<h1>${table.title}</h1>` + '<table><tr>' + table.columnNames.map(x => `<th>${x}</th>`).join('') + '</tr>',
  (rowCol: IRowValue) => `<td>${rowCol.value}</td>`,
  undefined,
  '</tr>',
  '<tr>',
  '</table><br><br>'
);

const foo = '';
