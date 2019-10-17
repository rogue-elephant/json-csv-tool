import { JsonCsvConverter } from './converter';
import { SimplePersonJson } from './_dummy-json/simple-person';

const result = new JsonCsvConverter().convertJsonToCsv(SimplePersonJson);
const csvOutput = result.csv;
console.log(csvOutput);
