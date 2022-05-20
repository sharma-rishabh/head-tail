const isKey = (object, keyInQuestion) => {
  return Object.keys(object).some((key) => keyInQuestion === key);
};

const parseArgs = (args) => {
  const fileName = args[args.length - 1];
  const clOption = args[0];
  const count = +args[1];

  const relatedSeparator = { '-n': '\n', '-c': '' };
  const options = { separator: '\n', count: 10 };

  if (isKey(relatedSeparator, clOption)) {
    options.separator = relatedSeparator[clOption];
    options.count = count;
  }
  return { fileName, options };
};

exports.parseArgs = parseArgs;
