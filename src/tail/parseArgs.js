const { createIterator } = require('./createIterator.js');

const getLegalOptions = () => {
  return ['-n', '-c'];
};

const extractCount = (flag) => {
  return flag.slice(2);
};

const parseLineOption = (args) => {
  const flag = '-n';
  const arg = args.currentElement();
  const count = arg.length > 2 ? extractCount(arg) : args.nextElement();
  return { flag, count };
};

const parseCountOption = (args) => {
  const flag = '-c';
  const arg = args.currentElement();
  const count = arg.length > 2 ? extractCount(arg) : args.nextElement();
  return { flag, count };
};

const parseArgs = (args) => {
  const iterableArgs = createIterator(args);
  const files = iterableArgs.restOfElements();
  return { options: [], files };
};

exports.parseArgs = parseArgs;
exports.getLegalOptions = getLegalOptions;
exports.parseLineOption = parseLineOption;
exports.parseCountOption = parseCountOption;
