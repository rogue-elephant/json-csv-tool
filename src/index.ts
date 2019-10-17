import { SimplePersonJson } from './_dummy-json/simple-person';
import { JsonCsvConverter } from './converter';

const result = new JsonCsvConverter().convertJsonToCsv(SimplePersonJson);
const csvOutput = result.csv;
