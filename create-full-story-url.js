#!/usr/bin/env node
const argv = require("optimist").argv;
const fs = require("fs");
const parse = require("csv-parse/lib/sync");

const csvPath = argv.csv;
const rawCsvTxt = fs.readFileSync(csvPath, "utf-8");

const accountRecords = parse(rawCsvTxt);

const quotedAndCommaDelimitted = accountRecords.reduce((acc, accountRecord) => {
  if (acc.length) {
    return `${acc},"${accountRecord}"`;
  } else {
    return `"${accountRecord}"`;
  }
}, "");

const urlFormatted = encodeURIComponent(`[${quotedAndCommaDelimitted}]`);

const url = `https://app.fullstory.com/ui/1G7V8/segments/everyone/people:search:(:((user_accountId_str:==${urlFormatted})):():():():)/0`;

console.log(url);
