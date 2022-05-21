const isOption = (option) => {
  return option.startsWith('-');
};

const getOption = (args) => isOption(args[0]) ? args[0] : '-n';

const getCount = (args) => isOption(args[0]) ? +args[1] : 10;

const getFiles = (args) => {
  const optionOrValue = /^-|^[0-9]*$/;
  return args.filter((arg) => !optionOrValue.test(arg));
};

const parseArgs = (args) => {
  let index = 0;
  const optionsArray = [];
  while (index < args.length && isOption(args[index])) {
    const option = args[index];
    const count = +args[index + 1];
    optionsArray.push({ option, count });
    index += 2;
  }
  const files = args.slice(index);
  const options = optionsArray.length === 0 ? { option: '-n', count: 10 } : optionsArray[optionsArray.length - 1];
  return { files, options };
};

exports.parseArgs = parseArgs;
exports.getFiles = getFiles;
