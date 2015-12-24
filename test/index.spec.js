import expect from 'unexpected';
import TPStylesheet from '../source';

describe('TPStylesheet.js', function () {
  const Stylesheet = new TPStylesheet();

  it('is a object', function () {
    expect(Stylesheet, 'to be a', 'object');
  });

  describe('Private methods', function () {
    describe('_isString', function () {
      it('is a function', function () {
        expect(Stylesheet._isString, 'to be a', 'function');
      });

      it('detects string', function () {
        expect(Stylesheet._isString(''), 'to be true');
        expect(Stylesheet._isString('test123'), 'to be true');
      });

      it('does not pass other types', function () {
        expect(Stylesheet._isString(new Date()), 'to be false');
        expect(Stylesheet._isString(/test/i), 'to be false');
        expect(Stylesheet._isString(function () {}), 'to be false');
        expect(Stylesheet._isString([]), 'to be false');
        expect(Stylesheet._isString({}), 'to be false');
        expect(Stylesheet._isString(123), 'to be false');
        expect(Stylesheet._isString(true), 'to be false');
        expect(Stylesheet._isString(undefined), 'to be false');
        expect(Stylesheet._isString(null), 'to be false');
      });
    });

    describe('_isObject', function () {
      it('is a function', function () {
        expect(Stylesheet._isObject, 'to be a', 'function');
      });

      it('detects object', function () {
        expect(Stylesheet._isObject({}), 'to be true');
        expect(Stylesheet._isObject({test: 123}), 'to be true');
      });

      it('does not pass other types', function () {
        expect(Stylesheet._isObject(new Date()), 'to be false');
        expect(Stylesheet._isObject(/test/i), 'to be false');
        expect(Stylesheet._isObject(function () {}), 'to be false');
        expect(Stylesheet._isObject([]), 'to be false');
        expect(Stylesheet._isObject(''), 'to be false');
        expect(Stylesheet._isObject(123), 'to be false');
        expect(Stylesheet._isObject(true), 'to be false');
        expect(Stylesheet._isObject(undefined), 'to be false');
        expect(Stylesheet._isObject(null), 'to be false');
      });
    });

    describe('_isArray', function () {
      it('is a function', function () {
        expect(Stylesheet._isArray, 'to be a', 'function');
      });

      it('detects array', function () {
        expect(Stylesheet._isArray([]), 'to be true');
        expect(Stylesheet._isArray(['test', 123]), 'to be true');
      });

      it('does not pass other types', function () {
        expect(Stylesheet._isArray(new Date()), 'to be false');
        expect(Stylesheet._isArray(/test/i), 'to be false');
        expect(Stylesheet._isArray(function () {}), 'to be false');
        expect(Stylesheet._isArray({}), 'to be false');
        expect(Stylesheet._isArray(''), 'to be false');
        expect(Stylesheet._isArray(123), 'to be false');
        expect(Stylesheet._isArray(true), 'to be false');
        expect(Stylesheet._isArray(undefined), 'to be false');
        expect(Stylesheet._isArray(null), 'to be false');
      });
    });

    describe('_isElement', function () {
      it('is a function', function () {
        expect(Stylesheet._isElement, 'to be a', 'function');
      });

      it('does not pass other types', function () {
        expect(Stylesheet._isElement(new Date()), 'to be false');
        expect(Stylesheet._isElement(/test/i), 'to be false');
        expect(Stylesheet._isElement(function () {}), 'to be false');
        expect(Stylesheet._isElement({}), 'to be false');
        expect(Stylesheet._isElement(''), 'to be false');
        expect(Stylesheet._isElement(123), 'to be false');
        expect(Stylesheet._isElement(true), 'to be false');
        expect(Stylesheet._isElement(undefined), 'to be false');
        expect(Stylesheet._isElement(null), 'to be false');
        expect(Stylesheet._isElement([]), 'to be false');
      });
    });
  });
});
