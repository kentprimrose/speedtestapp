const assert = require('assert');
const storage = require('../storage_mongolab');

describe('Mongo Storage', function() {
	it('should retrieve results via callback', function() {

		storage.vals('download', function(vals) {
			assert(vals.min > 0);
			assert(vals.avg > 0);
			assert(vals.max > 0);
		});
	});
});
