const differentOptions = () => {
  return {
    name: 'differentOptions',
    message: 'head:can\'t combine line and byte counts'
  };
};

const invalidSwitch = (flag) => {
  const name = flag.slice(1);
  return {
    name: 'invalidSwitch',
    message: `head:illegal option -- ${name}
usage: head [-n lines | -c bytes] [file ...]`,
    flag
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

const noArgument = (option) => {
  const name = option.slice(1);
  return {
    name: 'needArgument',
    message: `head: option requires an argument -- ${name}
usage: head[-n lines | -c bytes][file ...]`
  };
};

exports.differentOptions = differentOptions;
exports.invalidSwitch = invalidSwitch;
exports.illegalLineCount = illegalLineCount;
exports.noFile = noFile;
exports.fileReadError = fileReadError;
exports.noArgument = noArgument;
