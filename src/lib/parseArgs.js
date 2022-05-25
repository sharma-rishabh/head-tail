const { createIterator } = require('../tail/createIterator.js');

const isOption = (option) => {
  const hasAllDigits = /^\+\d+$/;
  return option.startsWith('-') || hasAllDigits.test(option);
};

const doesOptionContainFlag = (flagAndParser, currentOption) => {
  return currentOption.startsWith(flagAndParser.flag);
};

const getParserAndValidator = (option, allFlags) => {
  const validOption = allFlags.find(
    (flag) => doesOptionContainFlag(flag, option)
  );
  return { parser: validOption.parser, validator: validOption.validator };
};

const parseArgs = (args, allFlags) => {
  const iterableArgs = createIterator(args);
  let currentArg = iterableArgs.currentElement();
  const options = [];

  while (isOption(currentArg)) {
    const { parser, validator } = getParserAndValidator(currentArg, allFlags);
    const option = parser(iterableArgs);
    validator(option);
    options.push(option);
    currentArg = iterableArgs.nextElement();
  }

  const files = iterableArgs.restOfElements();
  return { options, files };
};

exports.parseArgs = parseArgs;
exports.getParserAndValidator = getParserAndValidator;
