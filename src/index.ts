import { JsonCsvConverter } from './converter';
import { trelloJson } from './_dummy-json/sensitive/trello';

export { ConvertedCsv } from './models/converted-csv';
export { IJsonToCsvConversionStrategy } from './models/json-to-csv-conversion-strategy';
export { JsonCsvConverter } from './converter';

const converter = new JsonCsvConverter();
const trelloInput = converter.convertJsonToCsv(trelloJson, {whiteList: ['id', 'cards']});
const output = trelloInput.csv;
const foo = 1;