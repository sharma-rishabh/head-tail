const { headMain } = require('./src/head/headLib.js');
const { log, error } = require('console');
const fs = require('fs');

const main = () => {
  try {
    headMain(fs.readFileSync, log, error, ...process.argv.slice(2));
  } catch (err) {
    error(err.message);
    process.exit(1);
  }
};

main();
