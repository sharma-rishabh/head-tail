const { differentOptions,
  invalidSwitch,
  illegalLineCount,
  noArgument
} = require('./throwFunctions.js');

const switchSameAsPrev = ({ prevFlag, sameAsPrev }, { flag }) => {
  return {
    sameAsPrev: prevFlag === flag && sameAsPrev,
    prevFlag: flag
  };
};

const areAllSwitchesSame = (options) => {
  const prevFlag = options[0].flag;
  const sameAsPrev = true;
  const result = options.reduce(switchSameAsPrev, { prevFlag, sameAsPrev });
  return result.sameAsPrev;
};

const assertSwitchesValidity = (options) => {
  const validFlags = ['-c', '-n'];
  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    if (!validFlags.includes(option.flag)) {
      throw invalidSwitch(option.flag);
    }
  }
};

const validateOptions = (options) => {
  assertSwitchesValidity(options);
  if (!areAllSwitchesSame(options)) {
    throw differentOptions();
  }
  return options;
};

const assertLineCountValidity = (option) => {
  const optionName = option.flag === '-n' ? 'line' : 'byte';
  if (option.count === undefined) {
    throw noArgument(option.flag);
  }
  if (option.count < 1 || isNaN(option.count)) {
    throw illegalLineCount(optionName, option.count);
  }
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
