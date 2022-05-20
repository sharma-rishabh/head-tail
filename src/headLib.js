const splitBy = (content) => content.split('\n');

const joinBy = (array) => array.join('\n');

const extractData = (array) => array.slice(0, 10);

const head = (content) => content;

exports.extractData = extractData;
exports.splitBy = splitBy;
exports.joinBy = joinBy;
exports.head = head;
