console.log('Using storage_mongolab');

const API_KEY = process.env.STA_API_KEY || 'TKVMJQX_MG2QTInjfPW6PJNw0oLuSbuP';
const DATABASE = process.env.STA_DATABASE || 'time-warner-speeds';
const COLLECTION = process.env.STA_COLLECTION || 'results';

const mLab = require('mongolab-data-api')(API_KEY);

module.exports = {
	store: (data) => {
		mLab.insertDocuments({
			database: DATABASE,
			collectionName: COLLECTION,
			documents: data
		}, (err, data) => {
			if (err) throw err;
			console.log(data);
		});
	},

	vals: (label, callback) => {
		mLab.listDocuments({
			database: DATABASE,
			collectionName: COLLECTION
		}, (err, data) => {
			let count = 0;
			let sum = 0;
			let max = 0;
			let min = 999;
			for (let item of data) {
				if (item[label]) {
					count += 1;
					sum += item[label];
					max = item[label] > max ? item[label] : max;
					min = item[label] < min ? item[label] : min;
				}
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
