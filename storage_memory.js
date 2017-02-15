// TODO: naively assumes all data items are numbers

storage = [];

module.exports = {

  store: (data) => {
    storage.push(data);
  },

  avg: (val, callback) => {
    let vals = storage.filter(item => item.hasOwnProperty(val));
    let result = vals.reduce((acc, x) => acc + (x[val] || 0), 0) / vals.length;
    if (callback) {
      callback(result);
    } 
    return result;
  },

  max: (val, callback) => {
    let result = storage.reduce((max, x) => x[val] > max ? x[val] : max, 0);
    if (callback) {
      callback(result);
    } 
    return result;
  },

  min: (val, callback) => {
    let result = storage.reduce((min, x) => x[val] < min ? x[val] : min, 999);
    if (callback) {
      callback(result);
    } 
    return result;
  }

};
