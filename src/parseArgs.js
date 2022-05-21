const isOption = (option) => {
  return option.startsWith('-');
};

const getOption = (args) => isOption(args[0]) ? args[0] : '-n';

const getOptions = (args) => {
  let index = 0;
  const options = [];
  while (index < args.length && isOption(args[index])) {
    const option = args[index];
    const count = args[index + 1];
    options.push({ option, count });
    index += 2;
  }
  return options;
};

const getCount = (args) => isOption(args[0]) ? +args[1] : 10;

const getFiles = (args) => {
  const optionOrValue = /^-|^[0-9]*$/;
  return args.filter((arg) => !optionOrValue.test(arg));
};

const parseArgs = (args) => {
  const files = getFiles(args);
  const option = getOption(args);
  const count = getCount(args);

  const options = { option, count };
  return { files, options };
};

exports.parseArgs = parseArgs;
exports.getFiles = getFiles;
exports.getOptions = getOptions;
