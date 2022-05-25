const { parseArgs } = require('../lib/parseArgs.js');

const extractFlag = (option) => option.slice(1, 2);

const readFileError = (fileName, message) => {
  return {
    name: 'readFileError',
    message: `tail: ${fileName}:${message}`,
    fileName
  };
};

const illegalOffsetError = (count) => {
  return {
    name: 'illegalOffsetError',
    message: `tail: illegal offset -- ${count}`
  };
};

const illegalOptionError = (count) => {
  const flag = extractFlag(count);
  return {
    name: 'illegalOption',
    message: `tail: illegal option -- ${flag}
usage: tail [-r] [-q] [-c # | -n #] [file ...]`
  };
};

const getOptionsAndParsers = () => {
  return [
    {
      flag: '-n',
      parser: parseLineOption,
      validator: offsetValidator
    },
    {
      flag: '-c',
      parser: parseCharOption,
      validator: offsetValidator
    },
    {
      flag: '+',
      parser: parsePlus,
      validator: legalOptionValidator
    },
    {
      flag: '-',
      parser: parseHyphen,
      validator: legalOptionValidator
    }
  ];
};

const offsetValidator = ({ count }) => {
  if (!isFinite(count)) {
    throw illegalOffsetError(count);
  }
};

const legalOptionValidator = ({ count }) => {
  if (!isFinite(count)) {
    throw illegalOptionError(count);
  }
};

const parseHyphen = (args) => {
  const currentArg = args.currentElement();
  return { flag: '-n', count: currentArg };
};

const parsePlus = (args) => {
  const currentArg = args.currentElement();
  return { flag: '-n', count: currentArg };
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

const parseCharOption = (args) => {
  const flag = '-c';
  const arg = args.currentElement();
  const count = arg.length > 2 ? extractCount(arg) : args.nextElement();
  return { flag, count };
};

const tailParse = (args) => {
  return parseArgs(args, getOptionsAndParsers());
};

exports.parseLineOption = parseLineOption;
exports.parseCharOption = parseCharOption;
exports.getOptionsAndParsers = getOptionsAndParsers;
exports.tailParse = tailParse;
exports.illegalOptionError = illegalOptionError;
exports.parseHyphen = parseHyphen;
exports.parsePlus = parsePlus;
exports.readFileError = readFileError;
exports.offsetValidator = offsetValidator;
exports.legalOptionValidator = legalOptionValidator;
