// lib/greenhouse-check.js
'use strict';

const fs = require('fs')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(fs.readFile)


exports.checkUrl = async (url) => {
  let command = `npx lighthouse-ci https://${url} --plugins=lighthouse-plugin-greenhouse --report output`
  const { stdout, stderr } = await exec(command);
  const report = await readFile("output/report.html", 'utf8')

  console.log('stdout:', stdout);
  console.log('stderr:', stderr);

  return [report, stdout, stderr]
};
