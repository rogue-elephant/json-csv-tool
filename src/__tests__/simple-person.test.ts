import { Converter } from '../converter';
import { OutputGenerator } from '../models/output-generator'
import { SimplePersonJson } from '../_dummy-json/simple-person';

//INDIVIDUAL OBJECT TESTS
//-------------------------------------
test('Individual Object Conversion Column Names', () => {
  const jsonToCsvConversion = new Converter().convertJson(SimplePersonJson[0]);
  expect(jsonToCsvConversion.columnNames).toStrictEqual(['firstName', 'lastName', 'title', 'department', 'job']);
});

test('Individual Object Conversion Values', () => {
  const jsonToCsvConversion = new Converter().convertJson(SimplePersonJson[0]);
  expect(jsonToCsvConversion.rows).toStrictEqual([
    [
      { columnName: 'firstName', value: 'John' },
      { columnName: 'lastName', value: 'Smith' },
      { columnName: 'title', value: 'Mr' },
      { columnName: 'department', value: 'HR' },
      { columnName: 'job', value: 'HR Assistant' },
    ],
  ]);
});

test('Individual Object WhiteList', () => {
  const jsonToCsvConversion = new Converter().convertJson(SimplePersonJson[0], {
    whiteList: ['firstName', 'lastName'],
  });
  expect(jsonToCsvConversion.rows).toStrictEqual([
    [{ columnName: 'firstName', value: 'John' }, { columnName: 'lastName', value: 'Smith' }],
  ]);
});

test('Individual Object BlackList', () => {
  const jsonToCsvConversion = new Converter().convertJson(SimplePersonJson[0], {
    blackList: ['firstName', 'lastName'],
  });
  expect(jsonToCsvConversion.rows).toStrictEqual([
    [
      { columnName: 'title', value: 'Mr' },
      { columnName: 'department', value: 'HR' },
      { columnName: 'job', value: 'HR Assistant' },
    ],
  ]);
});

//MULTIPLE OBJECT TESTS
//-------------------------------------
test('Multiple Object Conversion Column Names', () => {
  const jsonToCsvConversion = new Converter().convertJson(SimplePersonJson);
  expect(jsonToCsvConversion.columnNames).toStrictEqual(['firstName', 'lastName', 'title', 'department', 'job']);
});

test('Multiple Object Conversion Values', () => {
  const jsonToCsvConversion = new Converter().convertJson(SimplePersonJson);
  expect(jsonToCsvConversion.rows).toStrictEqual([
    [
      { columnName: 'firstName', value: 'John' },
      { columnName: 'lastName', value: 'Smith' },
      { columnName: 'title', value: 'Mr' },
      { columnName: 'department', value: 'HR' },
      { columnName: 'job', value: 'HR Assistant' },
    ],
    [
      { columnName: 'firstName', value: 'Jane' },
      { columnName: 'lastName', value: 'Doe' },
      { columnName: 'title', value: 'Mrs' },
      { columnName: 'department', value: 'HR' },
      { columnName: 'job', value: 'HR Assistant' },
    ],
    [
      { columnName: 'firstName', value: 'Jack' },
      { columnName: 'lastName', value: 'Doe' },
      { columnName: 'title', value: 'Mr' },
      { columnName: 'department', value: 'R&D' },
      { columnName: 'job', value: 'Project Manager' },
    ],
  ]);
});

test('Multiple Object WhiteList', () => {
  const jsonToCsvConversion = new Converter().convertJson(SimplePersonJson, {
    whiteList: ['firstName', 'lastName'],
  });
  expect(jsonToCsvConversion.rows).toStrictEqual([
    [{ columnName: 'firstName', value: 'John' }, { columnName: 'lastName', value: 'Smith' }],
    [{ columnName: 'firstName', value: 'Jane' }, { columnName: 'lastName', value: 'Doe' }],
    [{ columnName: 'firstName', value: 'Jack' }, { columnName: 'lastName', value: 'Doe' }],
  ]);
});

test('Multiple Object BlackList', () => {
  const jsonToCsvConversion = new Converter().convertJson(SimplePersonJson, {
    blackList: ['firstName', 'lastName'],
  });
  expect(jsonToCsvConversion.rows).toStrictEqual([
    [
      { columnName: 'title', value: 'Mr' },
      { columnName: 'department', value: 'HR' },
      { columnName: 'job', value: 'HR Assistant' },
    ],
    [
      { columnName: 'title', value: 'Mrs' },
      { columnName: 'department', value: 'HR' },
      { columnName: 'job', value: 'HR Assistant' },
    ],
    [
      { columnName: 'title', value: 'Mr' },
      { columnName: 'department', value: 'R&D' },
      { columnName: 'job', value: 'Project Manager' },
    ],
  ]);
});

//CSV OUTPUT TESTS
//-------------------------------------
test('CSV output Conversion Values', () => {
  const jsonToCsvConversion = new Converter().convertJson(SimplePersonJson);
  expect(new OutputGenerator(jsonToCsvConversion).generateCsv()).toEqual(
    'firstName,lastName,title,department,job\r\n' +
      'John,Smith,Mr,HR,HR Assistant\r\n' +
      'Jane,Doe,Mrs,HR,HR Assistant\r\n' +
      'Jack,Doe,Mr,R&D,Project Manager',
  );
});

test('CSV output WhiteList', () => {
  const jsonToCsvConversion = new Converter().convertJson(SimplePersonJson, {
    whiteList: ['firstName', 'lastName'],
  });
  expect(new OutputGenerator(jsonToCsvConversion).generateCsv()).toEqual('firstName,lastName\r\n' + 'John,Smith\r\n' + 'Jane,Doe\r\n' + 'Jack,Doe');
});

test('CSV output BlackList', () => {
  const jsonToCsvConversion = new Converter().convertJson(SimplePersonJson, {
    blackList: ['firstName', 'lastName'],
  });
  expect(new OutputGenerator(jsonToCsvConversion).generateCsv()).toEqual(
    'title,department,job\r\n' + 'Mr,HR,HR Assistant\r\n' + 'Mrs,HR,HR Assistant\r\n' + 'Mr,R&D,Project Manager',
  );
});
