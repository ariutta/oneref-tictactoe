var assert = require('assert');
var request = require('request');

describe('Server', function() {
  describe('get', function() {
    it('should return a page without error', function(done) {
      request('http://localhost:8080/', function(err, response, body) {
        if (err) {
          throw err;
        }
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });
});
