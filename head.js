const { headMain } = require('./src/headLib.js');
const { log, error } = require('console');
const fs = require('fs');

const main = () => {
  try {
    log(headMain(fs.readFileSync, ...process.argv.slice(2)));
  } catch (err) {
    error(err.message);
  }
};

main();
