const switchSameAsPrev = ({ prevOption, sameAsPrev }, { option }) => {
  return {
    sameAsPrev: prevOption === option && sameAsPrev,
    prevOption: option
  };
};

const areAllSwitchesSame = (options) => {
  const prevOption = options[0].option;
  const sameAsPrev = true;
  const result = options.reduce(switchSameAsPrev, { prevOption, sameAsPrev });
  return result.sameAsPrev;
};

const assertSwitchesValidity = (options) => {
  const validOptions = ['-c', '-n'];
  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    if (!validOptions.includes(option.option)) {
      throw {
        name: 'invalidSwitch',
        message: `head:illegal option -${option.option}
usage: head [-n lines | -c bytes] [file ...]`,
        option: option.option
      };
    }
  }
  return true;
};

const validateOptions = (options) => {
  assertSwitchesValidity(options);
  if (!areAllSwitchesSame(options)) {
    throw {
      name: 'differentOptions',
      message: 'head:can\'t combine line and byte counts'
    };
  }
  return options;
};

const assertLineCountValidity = (option) => {
  if (option.count < 1) {
    throw {
      name: 'illegalLineCount',
      message: `head: illegal line count -- ${option.count}`,
      count: option.count
    };
  }
  return true;
};

const extractValidOption = (options) => {
  validateOptions(options);
  const validOption = options[options.length - 1];
  assertLineCountValidity(validOption);
  return validOption;
};

exports.extractValidOption = extractValidOption;
exports.validateOptions = validateOptions;
exports.areAllSwitchesSame = areAllSwitchesSame;
exports.assertSwitchesValidity = assertSwitchesValidity;
exports.assertLineCountValidity = assertLineCountValidity;
