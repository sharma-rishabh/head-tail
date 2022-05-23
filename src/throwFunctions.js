const differentOptions = () => {
  return {
    name: 'differentOptions',
    message: 'head:can\'t combine line and byte counts'
  };
};

const invalidSwitch = (option) => {
  return {
    name: 'invalidSwitch',
    message: `head:illegal option -${option}
usage: head [-n lines | -c bytes] [file ...]`,
    option: option
  };
};

const illegalLineCount = (name, count) => {
  return {
    name: `illegal${name}Count`,
    message: `head: illegal ${name} count -- ${count}`,
    count: count
  };
};

const noFile = () => {
  return {
    name: 'noFile',
    message: 'usage: head [-n lines | -c bytes] [file ...]'
  };
};

const fileReadError = (fileName) => {
  return {
    name: 'fileReadError',
    message: `head: ${fileName}: No such file or directory`,
    fileName
  };
};

exports.differentOptions = differentOptions;
exports.invalidSwitch = invalidSwitch;
exports.illegalLineCount = illegalLineCount;
exports.noFile = noFile;
exports.fileReadError = fileReadError;
