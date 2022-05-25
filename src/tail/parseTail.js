const { parseArgs } = require('../lib/parseArgs.js');

const extractFlag = (option) => option.slice(1, 2);

const readFileError = (fileName, message) => {
  return {
    name: 'readFileError',
    message: `tail: ${fileName}:${message}`,
    fileName
  };
};

const illegalOptionError = (option) => {
  const flag = extractFlag(option);
  return {
    name: 'illegalOption',
    message: `'tail: illegal option -- ${flag}
usage: tail [-r] [-q] [-c # | -n #] [file ...]`
  };
};

const getOptionsAndParsers = () => {
  return [
    {
      flag: '-n',
      parser: parseLineOption
    },
    {
      flag: '-c',
      parser: parseCharOption
    },
    {
      flag: '+',
      parser: parsePlus
    },
    {
      flag: '-',
      parser: parseHyphen
    }
  ];
};

const allAreNumbers = (option) => {
  const optionArg = option.slice(1);
  const areNumbers = /^\d+$/;
  return areNumbers.test(optionArg);
};

const parseHyphen = (args) => {
  const currentArg = args.currentElement();
  if (!allAreNumbers(currentArg)) {
    throw illegalOptionError(currentArg);
  }
  return { flag: '-n', count: currentArg };
};

const parsePlus = (args) => {
  const currentArg = args.currentElement();
  if (!allAreNumbers(currentArg)) {
    throw readFileError(currentArg, 'No such file or directory');
  }
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
  return parseArgs(args, getOptionsAndParsers(), illegalOptionError);
};

exports.parseLineOption = parseLineOption;
exports.parseCharOption = parseCharOption;
exports.getOptionsAndParsers = getOptionsAndParsers;
exports.tailParse = tailParse;
exports.illegalOptionError = illegalOptionError;
exports.parseHyphen = parseHyphen;
exports.parsePlus = parsePlus;
exports.readFileError = readFileError;
