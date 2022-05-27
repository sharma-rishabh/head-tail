const { tailMain } = require('./src/tail/tailLib.js');
const fs = require('fs');
const { log, error } = require('console');

const main = () => {
  try {
    process.exitCode = tailMain(
      fs.readFileSync,
      log,
      error,
      ...process.argv.slice(2)
    );
  } catch (err) {
    error(err.message);
    process.exitCode(1);
  }
};

main();
