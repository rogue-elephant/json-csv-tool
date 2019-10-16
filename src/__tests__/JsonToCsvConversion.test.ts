import { JsonToCsvConversion } from '../conversion';
const testJson = {
  firstName: 'John',
  lastName: 'Smith',
  title: 'Mr',
  department: 'HR',
  job: 'HR Assistant'
};

test('Individual Object Conversion Column Names', () => {
  const jsonToCsvConversion = new JsonToCsvConversion(testJson);
  expect(jsonToCsvConversion.columnNames).toStrictEqual([
    'firstName',
    'lastName',
    'title',
    'department',
    'job'
  ]);
});

test('Individual Object Conversion Values', () => {
  const jsonToCsvConversion = new JsonToCsvConversion(testJson);
  expect(jsonToCsvConversion.values).toStrictEqual([
    'John',
    'Smith',
    'Mr',
    'HR',
    'HR Assistant'
  ]);
});