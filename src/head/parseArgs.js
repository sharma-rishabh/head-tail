const isOption = (option) => {
  return option.startsWith('-');
};

const isSpecialOption = (flag) => {
  const hasAllDigits = /^-\d+$/;
  return hasAllDigits.test(flag);
};

const isOptionIntegrated = (flag) => {
  const endWithDigits = /\d$/;
  return endWithDigits.test(flag);
};

const parseOption = (option, probableCount) => {
  if (isSpecialOption(option)) {
    return {
      option: '-n',
      count: option.slice(1)
    };
  }
  if (isOptionIntegrated(option)) {
    return {
      option: extractOption(option),
      count: extractCount(option)
    };
  }
  return {
    option: option,
    count: probableCount
  };
};

const extractOption = (integratedOption) => integratedOption.slice(0, 2);
const extractCount = (integratedOption) => integratedOption.slice(2);

const parseArgs = (args) => {
  let index = 0;
  const optionsArray = [];

  while (index < args.length && isOption(args[index])) {
    const currentOption = parseOption(args[index], args[index + 1]);
    optionsArray.push(currentOption);
    index += isOptionIntegrated(args[index]) ? 1 : 2;
  }

  const files = args.slice(index);

  if (optionsArray.length === 0) {
    optionsArray.push({ option: '-n', count: '10' });
  }

  return { files, optionsArray };
};

exports.parseArgs = parseArgs;
exports.parseOption = parseOption;