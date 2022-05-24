const { createIterator } = require('./createIterator.js');

const parseArgs = (args) => {
  const iterableArgs = createIterator(args);
  const files = iterableArgs.restOfElements();
  return { options: [], files };
};

exports.parseArgs = parseArgs;
