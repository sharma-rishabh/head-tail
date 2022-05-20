const splitBy = (content) => content.split('\n');

const joinBy = (array) => array.join('\n');

const extractData = (array) => array.slice(0, 10);

const head = (content) => {
  const splitContent = splitBy(content);
  const requiredContent = extractData(splitContent);
  return joinBy(requiredContent);
};

exports.extractData = extractData;
exports.splitBy = splitBy;
exports.joinBy = joinBy;
exports.head = head;
