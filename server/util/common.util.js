module.exports.sum = (...items) => items.reduce((acc, curr) => acc + curr, 0);

module.exports.average = (...items) =>
  module.exports.sum(...items) / items.length;
