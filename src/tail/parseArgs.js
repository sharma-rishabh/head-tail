const { createIterator } = require('./createIterator.js');

const getLegalOptions = () => {
  return ['-n', '-c'];
};

const parseArgs = (args) => {
  const iterableArgs = createIterator(args);
  const files = iterableArgs.restOfElements();
  return { options: [], files };
};

exports.parseArgs = parseArgs;
exports.getLegalOptions = getLegalOptions;
