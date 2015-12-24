import expect from 'unexpected';
import add from '../source';

describe('math.js', function () {
  describe('add', function () {
    it('is a function', function () {
      expect(add, 'to be a', 'function');
    });

    it('adds numbers', function () {
      expect(add(1, 3), 'to be', 4);
    });
  });
});
