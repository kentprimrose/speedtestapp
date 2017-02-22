console.log('Using storage_calc');

let items = {};

module.exports = {
	store: (data) => {
		for (let label in data) {
			if (!items[label]) {
				items[label] = {
					count: 0,
					sum: 0,
					min: 999,
					max: 0
				};
			}
			let item = items[label];
			item.count += 1;
			item.sum += data[label];
			item.min = data[label] < item.min ? data[label] : item.min;
			item.max = data[label] > item.max ? data[label] : item.max;
			items[label] = item;
		}
	},

	vals: (label, callback) => {
		let item = items[label];
		let result = {
			avg: item.sum / item.count,
			max: item.max,
			min: item.min
		};
		if (callback) {
			callback(result);
		} 
		return result;
	}
};
