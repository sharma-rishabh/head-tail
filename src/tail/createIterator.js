const currentElement = function () {
  return this[this.index];
};

const restOfElements = function () {
  return this.slice(this.index);
};

const nextElement = function () {
  this.index++;
  return this.currentElement();
};

const createIterator = function (list) {
  list.index = 0;
  list.currentElement = currentElement.bind(list);
  list.nextElement = nextElement.bind(list);
  list.restOfElements = restOfElements.bind(list);
  return list;
};

exports.createIterator = createIterator;
