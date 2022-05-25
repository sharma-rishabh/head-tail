const { createIterator } = require('../tail/createIterator.js');

const isOptionLegal = (option, allFlags) => {
  const legalOption = allFlags.map((option) => option.flag);
  return legalOption.some((flag) => option.includes(flag));
};

const isOption = (option) => {
  const hasAllDigits = /^\+\d+$/;
  return option.startsWith('-') || hasAllDigits.test(option);
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
    const parser = getParser(currentArg, allFlags);
    options.push(parser(iterableArgs));
    currentArg = iterableArgs.nextElement();
  }

  const files = iterableArgs.restOfElements();
  return { options, files };
};

exports.parseArgs = parseArgs;
exports.getParser = getParser;
exports.isOptionLegal = isOptionLegal;
