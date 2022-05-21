const isOption = (option) => {
  return option.startsWith('-');
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

const parseArgs = (args) => {
  assertArgumentsValidity(args);
  let index = 0;
  const optionsArray = [];
  while (index < args.length && isOption(args[index])) {
    const option = args[index];
    const count = +args[index + 1];
    optionsArray.push({ option, count });
    index += 2;
  }
  const files = args.slice(index);
  if (optionsArray.length === 0) {
    optionsArray.push({ option: '-n', count: 10 });
  }
  return { files, optionsArray };
};

exports.parseArgs = parseArgs;
