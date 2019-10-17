<<<<<<< HEAD
import { JsonCsvConverter } from '../converter';
import { SimplePersonJson } from '../_dummy-json/simple-person';

test('Individual Object Conversion Column Names', () => {
  const jsonToCsvConversion = new JsonCsvConverter().convertJsonToCsv(SimplePersonJson[0]);
=======
import { JsonToCsvConversion } from '../conversion';
const testJson = {
  firstName: 'John',
  lastName: 'Smith',
  title: 'Mr',
  department: 'HR',
  job: 'HR Assistant',
};

test('Individual Object Conversion Column Names', () => {
  const jsonToCsvConversion = new JsonToCsvConversion(testJson);
>>>>>>> bce7ecb225039b913f875ca56232fb2b4ce690f6
  expect(jsonToCsvConversion.columnNames).toStrictEqual(['firstName', 'lastName', 'title', 'department', 'job']);
});

test('Individual Object Conversion Values', () => {
<<<<<<< HEAD
  const jsonToCsvConversion = new JsonCsvConverter().convertJsonToCsv(SimplePersonJson[0]);
  expect(jsonToCsvConversion.values).toStrictEqual([['John', 'Smith', 'Mr', 'HR', 'HR Assistant']]);
});

test('Individual Object WhiteList', () => {
  const jsonToCsvConversion = new JsonCsvConverter().convertJsonToCsv(SimplePersonJson[0], {
    whiteList: ['firstName', 'lastName'],
  });
  expect(jsonToCsvConversion.values).toStrictEqual([['John', 'Smith']]);
});

test('Individual Object BlackList', () => {
  const jsonToCsvConversion = new JsonCsvConverter().convertJsonToCsv(SimplePersonJson[0], {
    blackList: ['firstName', 'lastName'],
  });
  expect(jsonToCsvConversion.values).toStrictEqual([['Mr', 'HR', 'HR Assistant']]);
=======
  const jsonToCsvConversion = new JsonToCsvConversion(testJson);
  expect(jsonToCsvConversion.values).toStrictEqual(['John', 'Smith', 'Mr', 'HR', 'HR Assistant']);
>>>>>>> bce7ecb225039b913f875ca56232fb2b4ce690f6
});
