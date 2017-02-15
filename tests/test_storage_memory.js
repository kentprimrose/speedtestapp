const assert = require('assert');
const storage = require('../storage_memory.js');

describe('In Memory Storage', function() {
  it('should directly return results', function() {
    storage.store({'a':1});
    storage.store({'a':2});
    storage.store({'a':3});

    assert.equal(storage.min('a'), 1);
    assert.equal(storage.avg('a'), 2);
    assert.equal(storage.max('a'), 3);
  });

  it('should directly return parallel results', function() {
    storage.store({'b':1});
    storage.store({'b':2});
    storage.store({'b':3});

    assert.equal(storage.min('b'), 1);
    assert.equal(storage.avg('b'), 2);
    assert.equal(storage.max('b'), 3);
  });

  it('should return callback results', function() {
    storage.store({'c':1});
    storage.store({'c':2});
    storage.store({'c':3});

    storage.min('c',function(result) {
      assert.equal(result, 1);
    });
    storage.avg('c',function(result) {
      assert.equal(result, 2);
    });
    storage.max('c',function(result) {
      assert.equal(result, 3);
    });
  });
});
