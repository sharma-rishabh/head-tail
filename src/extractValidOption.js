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

const extractValidOption = (options) => options[options.length - 1];
const validateOptions = (options) => options;

exports.extractValidOption = extractValidOption;
exports.validateOptions = validateOptions;
exports.areAllSwitchesSame = areAllSwitchesSame;
