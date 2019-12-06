import { JsonCsvConverter } from './converter';
import { DeeperPersonJson } from './_dummy-json/deeper-person';
import { trelloJson } from './_dummy-json/sensitive/trello';

export { Table } from './models/table';
export { IJsonToCsvConversionStrategy } from './models/json-to-csv-conversion-strategy';
export { JsonCsvConverter } from './converter';

const result = new JsonCsvConverter().convertJsonToCsv(trelloJson, {whiteList: ['options.value']});
const result2 = new JsonCsvConverter().convertJsonToCsv(trelloJson, {whiteList: ['customFields.options.value']});
const blah = result.csv;