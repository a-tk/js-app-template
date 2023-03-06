const assert = require('assert');
const { describe, it } = require('mocha');
// const log4js = require('log4js'); // commented out to prevent lint errors

// const mockHostname = 'localhost'; // commented out to prevent lint errors

describe('test suite', () => {
  describe('test case', () => {
    it('should equal 0', () => {
      assert.equal(0, 0);
    });
  });
});
