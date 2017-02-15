const Storage = function() {};

storage = [];

Storage.prototype.store = function(data) {
  storage.push(data);
};

Storage.prototype.avg = function(val) {
  // TODO: naively assumes all data items are numbers
  return storage.reduce((acc, x) => acc+x[val], 0) / storage.length;
};

Storage.prototype.max =function(val) {
  // TODO: naively assumes all data items are numbers
  return storage.reduce((max, x) => x[val] > max ? x[val] : max, 0);
};

Storage.prototype.min =function(val) {
  // TODO: naively assumes all data items are numbers
  return storage.reduce((min, x) => x[val] < min ? x[val] : min, 999);
};

module.exports = new Storage();
