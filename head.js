const { headMain } = require('./src/headLib.js');
const { log } = require('console');
const fs = require('fs');

const main = () => {
  log(headMain(fs.readFileSync, process.argv[2]));
};

main();
