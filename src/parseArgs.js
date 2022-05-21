const isOption = (option) => {
  const options = ['-n', '-c'];
  return options.includes(option);
};

const getOption = (args) => isOption(args[0]) ? args[0] : '-n';

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
