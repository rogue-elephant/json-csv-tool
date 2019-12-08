import { JsonCsvConverter } from './converter';
import { DeeperPersonJson } from './_dummy-json/deeper-person';
import { trelloJson } from './_dummy-json/sensitive/trello';

export { Table } from './models/table';
export { IJsonToCsvConversionStrategy } from './models/json-to-csv-conversion-strategy';
export { JsonCsvConverter } from './converter';

const result = new JsonCsvConverter().convertJsonToCsv(trelloJson, {whiteList: ['name', 'desc', 'cards.name', 'cards.desc']});
const foo = result.getMarkdown();
const blah = result.getCsv();
const poop = '';