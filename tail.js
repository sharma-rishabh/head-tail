const { tailMain } = require('./src/tail/tailLib.js');
const fs = require('fs');
const { log, error } = require('console');

try {
  log(tailMain(fs.readFileSync, process.argv[2]));
} catch (err) {
  error('usage: tail [-c # | -n #] [file ...]');
}

