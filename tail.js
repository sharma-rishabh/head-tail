const { tailMain } = require('./src/tail/tailLib.js');
const fs = require('fs');
const { log, error } = require('console');

const main = () => {
  try {
    log(tailMain(fs.readFileSync, ...process.argv.slice(2)));
  } catch (err) {
    error('usage: tail [-c # | -n #] [file ...]');
    process.exit(1);
  }
};

main();
