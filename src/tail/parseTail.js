const { parseArgs } = require('../lib/parseArgs.js');

const extractFlag = (option) => option.slice(1, 2);

const illegalOptionError = (option) => {
  const flag = extractFlag(option);
  return {
    name: 'illegalOption',
    message: `'tail: illegal option -- ${flag}
usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`
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
    }
  ];
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
