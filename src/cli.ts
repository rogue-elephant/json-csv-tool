#!/usr/bin/env node
import chalk = require('chalk');
import figlet = require('figlet');
import program = require('commander');
import fs = require('fs');
import { JsonCsvConverter } from './converter';

console.log(chalk.red(figlet.textSync('json-csv-tool', { horizontalLayout: 'full' })));

program
  .version('1.1.8')
  .description('CLI tool for converting JSON to CSV')
  .option('-i, --input <path>', 'The location of the JSON input file')
  .option('-w, --whitelist <string>', 'Whitelisted properties')
  .option('-b, --blacklist <string>', 'Blacklisted properties')
  .parse(process.argv);

console.log(`Processing ${program.input}. CSV Output:`);

if (program.input) {
  const file = JSON.parse(fs.readFileSync(program.input, 'utf8'));
  const converter = new JsonCsvConverter();
  console.log(converter.convertJsonToCsv(file, { blackList: program.blacklist, whiteList: program.whitelist }).csv);
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
