const assert = require('assert');
const storage = require('../storage_memory.js');

describe('In Memory Storage', function() {
	it('Should store and calculate avg/min/max', function() {
		storage.store({'a':1});
		storage.store({'a':2});
		storage.store({'a':3});

		assert.equal(storage.min('a'), 1);
		assert.equal(storage.avg('a'), 2);
		assert.equal(storage.max('a'), 3);
	});
});
