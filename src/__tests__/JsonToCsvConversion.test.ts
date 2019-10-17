import { JsonCsvConverter } from '../converter';
import { simplePersonJson } from '../_dummy-json/simple-person';

test('Individual Object Conversion Column Names', () => {
  const jsonToCsvConversion = new JsonCsvConverter().ConvertJsonToCsv(simplePersonJson);
  expect(jsonToCsvConversion.columnNames).toStrictEqual(['firstName', 'lastName', 'title', 'department', 'job']);
});

test('Individual Object Conversion Values', () => {
  const jsonToCsvConversion = new JsonCsvConverter().ConvertJsonToCsv(simplePersonJson);
  expect(jsonToCsvConversion.values).toStrictEqual(['John', 'Smith', 'Mr', 'HR', 'HR Assistant']);
});

test('Individual Object WhiteList', () => {
  const jsonToCsvConversion = new JsonCsvConverter().ConvertJsonToCsv(simplePersonJson, {whiteList: ['firstName', 'lastName']});
  expect(jsonToCsvConversion.values).toStrictEqual(['John', 'Smith']);
});

test('Individual Object BlackList', () => {
  const jsonToCsvConversion = new JsonCsvConverter().ConvertJsonToCsv(simplePersonJson, {blackList: ['firstName', 'lastName']});
  expect(jsonToCsvConversion.values).toStrictEqual(['Mr', 'HR', 'HR Assistant']);
});
