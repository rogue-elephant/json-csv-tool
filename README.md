# JSON-CSV-TOOL
## Description
Provides functions for converting JSON objects to and from CSVs.

# Usage
## Simple Example
``` typescript
import { JsonCsvConverter } from "json-csv-tool";

const dummyJson = {
    firstName: 'Tom',
    lastName: 'Smith',
    age: 32
}
const dummyJson2 = [
    {
        firstName: 'Tom',
        lastName: 'Smith',
        age: 32
    },
    {
        firstName: 'John',
        lastName: 'Locke',
        age: 63
    }
]
const converter = new JsonCsvConverter();
const json1 = converter.convertJsonToCsv(dummyJson);
// firstName,lastName,age
// Tom,Smith,32

const json2 = converter.convertJsonToCsv(dummyJson2);
// firstName,lastName,age
// Tom,Smith,32
// Jon, Locke, 63

const blJson = converter.convertJsonToCsv(dummyJson, {blackList: ['firstName', 'Age']}).csv;
// lastName
// Smith

const blJson2 = converter.convertJsonToCsv(dummyJson2, {blackList: ['firstName', 'Age']}).csv;
// lastName
// Smith
// Locke
```

## Contributing
- Clone the repo and run `npm install`.
- Create a new feature branch: `git checkout -b feature/your-feature-branch-name`.
- Write a test in the `__tests__` folder for your feature.
- Write the code to get the test passing, running `npm run test`.
- Push your branch up and submit a pull request.

Note: I have configured a launch.json for vscode that should allow for playing around with anything in index.ts and hitting f5 to debug.

## Publishing
- npm version patch
- npm publish