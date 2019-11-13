# JSON-CSV-TOOL
## Description
Provides functions for converting JSON objects to and from CSVs.

## Try me out
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#snapshot/370f4828-27b2-4ffb-bb8e-c79175380463)

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
const json1 = converter.convertJsonToCsv(dummyJson).csv;
// firstName,lastName,age
// Tom,Smith,32

const json2 = converter.convertJsonToCsv(dummyJson2).csv;
// firstName,lastName,age
// Tom,Smith,32
// Jon,Locke,63

const blJson = converter.convertJsonToCsv(dummyJson, {blackList: ['firstName', 'Age']}).csv;
// lastName
// Smith

const blJson2 = converter.convertJsonToCsv(dummyJson2, {blackList: ['firstName', 'Age']}).csv;
// lastName
// Smith
// Locke
```

## Deeper example
``` typescript
const deeperPersonJson = [
    {
        id: 1,
        personalInfo: {
            firstName: 'John',
            lastName: 'Smith',
            title: 'Mr'
        },
        jobInfo: {
            department: 'HR',
            title: 'HR Assistant',
        },
        Awards: [
            {
                year: 2016,
                title: 'Best at Everything'
            }
        ]
    },
    {
        id: 2,
        personalInfo: {
            firstName: 'Jane',
            lastName: 'Doe',
            title: 'Mrs'
        },
        jobInfo: {
            department: 'Sales',
            title: 'Sales Executive',
        }
    },
    {
        id: 3,
        personalInfo: {
            firstName: 'John',
            lastName: 'Doe',
            title: 'Mr'
        },
        jobInfo: {
            department: 'R&D',
            title: 'Data Scientist',
        },
        warnings: [
            {
                year: 2016,
                reason: 'Farted in the coffee machine'
            }
        ]
    },
];

converter.convertJsonToCsv(deeperPersonJson).csv;
/*
id,personalInfo_firstName,personalInfo_lastName,personalInfo_title,jobInfo_department,jobInfo_title,Awards_0_year,Awards_0_title,warnings_0_year,warnings_0_reason
1,John,Smith,Mr,HR,HR Assistant,2016,Best at Everything,,
2,Jane,Doe,Mrs,Sales,Sales Executive,,,,
3,John,Doe,Mr,R&D,Data Scientist,,,2016,Farted in the coffee machine
*/
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