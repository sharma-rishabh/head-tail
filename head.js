const { headMain } = require('./src/head/headLib.js');
const { log, error } = require('console');
const fs = require('fs');

const main = () => {
  try {
    process.exitCode = headMain(
      fs.readFileSync,
      log,
      error,
      ...process.argv.slice(2)
    );
  } catch (err) {
    error(err.message);
    process.exitCode = 1;
  }
};

main();
