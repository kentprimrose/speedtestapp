console.log('Using storage_mongolab');

const API_KEY = process.env.API_KEY || 'TKVMJQX_MG2QTInjfPW6PJNw0oLuSbuP';
const mLab = require('mongolab-data-api')(API_KEY);

const OPTIONS = {
  database: 'time-warner-speeds',
  collectionName: 'results'
};

module.exports = {
  store: (data) => {
		console.log('OPTIONS: %s', require('util').format(OPTIONS)); // DEBUG
		console.log('data: %s', require('util').format(data)); // DEBUG
    mLab.insertDocuments(OPTIONS, (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  },

	vals: (label, callback) => {
		mLab.listDocuments(OPTIONS, (err, data) => {
			let count = 0;
			let sum = 0;
			let max = 0;
			let min = 999;
			for (let item of data) {
				count += 1;
				sum += item[label];
				max = item[label] > max ? item[label] : max;
				min = item[label] < min ? item[label] : min;
			}
			let result = {
				avg: sum / count,
				max: max,
				min: min
			};
			if (callback) {
				callback(result);
			}
			return result;
		});
	}
};
