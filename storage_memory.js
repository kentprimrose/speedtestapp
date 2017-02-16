console.log('Using storage_memory');

storage = [];

let avg = (label, callback) => {
	let items = storage.filter(item => item.hasOwnProperty(label));
	let result = items.reduce((acc, x) => acc + (x[label] || 0), 0) / items.length;
	if (callback) {
		callback(result);
	} 
	return result;
};

let max = (label, callback) => {
	let result = storage.reduce((max, x) => x[label] > max ? x[label] : max, 0);
	if (callback) {
		callback(result);
	} 
	return result;
};

let min = (label, callback) => {
	let result = storage.reduce((min, x) => x[label] < min ? x[label] : min, 999);
	if (callback) {
		callback(result);
	} 
	return result;
};

module.exports = {
	store: (data) => {
		storage.push(data);
	},

	vals: (label, callback) => {
		let result = {
			avg: avg(label),
			max: max(label),
			min: min(label)
		};
		if (callback) {
			callback(result);
		} 
		return result;
	}
};
