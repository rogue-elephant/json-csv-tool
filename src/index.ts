import { JsonCsvConverter } from './converter';
import { trelloJson } from './_dummy-json/sensitive/trello';
import { DeeperPersonJson } from './_dummy-json/deeper-person';

export { ConvertedCsv } from './models/converted-csv';
export { IJsonToCsvConversionStrategy } from './models/json-to-csv-conversion-strategy';
export { JsonCsvConverter } from './converter';

const converter = new JsonCsvConverter();
const deeperInput = converter.convertJsonToCsv(DeeperPersonJson);
const output = deeperInput.csv;
const title = deeperInput.title;
const foo = 1;