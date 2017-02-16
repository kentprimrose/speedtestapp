const assert = require('assert');
const storage = require('../storage_calc');

describe('Calc Storage', function() {
  it('should directly return set of results', function() {
    storage.store({'d':1});
    storage.store({'d':2});
    storage.store({'d':3});

		let vals = storage.vals('d');

    assert.equal(vals.min, 1);
    assert.equal(vals.avg, 2);
    assert.equal(vals.max, 3);
  });

  it('should return set of results via callback', function() {
    storage.store({'e':1});
    storage.store({'e':2});
    storage.store({'e':3});

		let vals = storage.vals('e', function(result) {
				assert.equal(result.min, 1);
				assert.equal(result.avg, 2);
				assert.equal(result.max, 3);
		});
  });
});
