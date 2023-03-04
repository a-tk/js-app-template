
var assert = require('assert');
var log4js = require('log4js');

var mockHostname = 'localhost';

describe('test', function () {
  var server = require('../../backend/server.js')();
  describe('#test', function () {
    it('should test', function (){
      assert.equal(0, 0);
    });
  });
});
