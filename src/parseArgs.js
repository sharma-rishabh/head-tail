const isOption = (option) => {
  return option.startsWith('-');
};

const isOptionIntegrated = (flag) => {
  const endWithDigits = /\d$/;
  return endWithDigits.test(flag);
};

const assertArgumentsValidity = (args) => {
  if (args.length === 0) {
    throw {
      name: 'noArguments',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
  return true;
};

const extractOption = (integratedOption) => integratedOption.slice(0, 2);
const extractCount = (integratedOption) => +integratedOption.slice(2);

const parseArgs = (args) => {
  assertArgumentsValidity(args);
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
