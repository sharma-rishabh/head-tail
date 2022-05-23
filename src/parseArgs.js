const isOption = (option) => {
  return option.startsWith('-');
};

const isOptionIntegrated = (flag) => {
  const endWithDigits = /\d$/;
  return endWithDigits.test(flag);
};

const parseOption = (probableOption, probableCount) => {
  if (isOptionIntegrated(probableOption)) {
    return {
      option: extractOption(probableOption),
      count: extractCount(probableOption)
    };
  }
  return {
    option: probableOption,
    count: +probableCount
  };
};

const extractOption = (integratedOption) => integratedOption.slice(0, 2);
const extractCount = (integratedOption) => +integratedOption.slice(2);

const parseArgs = (args) => {
  let index = 0;
  const optionsArray = [];
  while (index < args.length && isOption(args[index])) {
    let option;
    let count;
    if (isOptionIntegrated(args[index])) {
      option = extractOption(args[index]);
      count = extractCount(args[index]);
    } else {
      option = args[index];
      count = +args[index + 1];
      index++;
    }
    optionsArray.push({ option, count });
    index++;
  }
  const files = args.slice(index);
  if (optionsArray.length === 0) {
    optionsArray.push({ option: '-n', count: 10 });
  }
  return { files, optionsArray };
};

exports.parseArgs = parseArgs;
exports.parseOption = parseOption;
