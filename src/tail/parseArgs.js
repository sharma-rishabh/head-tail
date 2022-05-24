const { createIterator } = require('./createIterator.js');

const extractFlag = (option) => option.slice(1, 2);

const illegalOptionError = (option) => {
  const flag = extractFlag(option);
  return {
    name: 'illegalOption',
    message: `'tail: illegal option -- ${flag}
usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`
  };
};

const isOption = (option) => option.startsWith('-');

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

const isOptionLegal = (option, allFlags) => {
  const legalOption = allFlags.map((option) => option.flag);
  return legalOption.some((flag) => option.includes(flag));
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

const doesOptionContainFlag = (flagAndParser, currentOption) => {
  return currentOption.startsWith(flagAndParser.flag);
};

const getParser = (option, allFlags) => {
  const validOption = allFlags.find(
    (flag) => doesOptionContainFlag(flag, option)
  );
  return validOption.parser;
};

const parseArgs = (args, allFlags) => {
  const iterableArgs = createIterator(args);
  let currentArg = iterableArgs.currentElement();
  const options = [];

  while (isOption(currentArg)) {
    if (!isOptionLegal(currentArg, allFlags)) {
      throw illegalOptionError(currentArg);
    }
    const parser = getParser(currentArg, allFlags);
    options.push(parser(iterableArgs));
    currentArg = iterableArgs.nextElement();
  }

  const files = iterableArgs.restOfElements();
  return { options, files };
};

exports.parseArgs = parseArgs;
exports.parseLineOption = parseLineOption;
exports.parseCharOption = parseCharOption;
exports.getOptionsAndParsers = getOptionsAndParsers;
exports.getParser = getParser;
exports.isOptionLegal = isOptionLegal;
