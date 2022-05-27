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

const parseOption = (flag, probableCount) => {
  if (isSpecialOption(flag)) {
    return {
      flag: '-n',
      count: flag.slice(1)
    };
  }
  if (isOptionIntegrated(flag)) {
    return {
      flag: extractOption(flag),
      count: extractCount(flag)
    };
  }
  return {
    flag: flag,
    count: probableCount
  };
};

const extractOption = (integratedOption) => integratedOption.slice(0, 2);
const extractCount = (integratedOption) => integratedOption.slice(2);

const parseArgs = (args) => {
  let index = 0;
  const options = [];

  while (index < args.length && isOption(args[index])) {
    const currentOption = parseOption(args[index], args[index + 1]);
    options.push(currentOption);
    index += isOptionIntegrated(args[index]) ? 1 : 2;
  }

  const files = args.slice(index);

  if (options.length === 0) {
    options.push({ flag: '-n', count: '10' });
  }

  return { files, options };
};

exports.parseArgs = parseArgs;
exports.parseOption = parseOption;
