const { headMain } = require('./src/headLib.js');
const { log } = require('console');
const fs = require('fs');

const main = () => {
  try {
    log(headMain(fs.readFileSync, process.argv[2]));
  } catch (error) {
    log('usage: head [-n lines | -c bytes] [file ...]');
  }
};

main();
