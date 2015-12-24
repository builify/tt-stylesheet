import expect from 'unexpected';
import jsdom from './browser';
import TPStylesheet from '../source';
import ChromeStyles from './ChromeStyles';

describe('TPStylesheet.js', function () {
  var Stylesheet;

  jsdom();

  before(function () {
    Stylesheet = new TPStylesheet({
      win: global.window
    });

    Stylesheet._CACHED_STYLES = ChromeStyles;
  });

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

      it('detects single node', function () {
        var div = document.createElement('div');

        expect(Stylesheet._isElement(div), 'to be true');
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

    describe('_isBoolean', function () {
      it('is a function', function () {
        expect(Stylesheet._isBoolean, 'to be a', 'function');
      });

      it('detects boolean', function () {
        expect(Stylesheet._isBoolean(true), 'to be true');
        expect(Stylesheet._isBoolean(false), 'to be true');
      });

      it('does not pass other types', function () {
        expect(Stylesheet._isBoolean(new Date()), 'to be false');
        expect(Stylesheet._isBoolean(/test/i), 'to be false');
        expect(Stylesheet._isBoolean(function () {}), 'to be false');
        expect(Stylesheet._isBoolean({}), 'to be false');
        expect(Stylesheet._isBoolean(''), 'to be false');
        expect(Stylesheet._isBoolean(123), 'to be false');
        expect(Stylesheet._isBoolean(undefined), 'to be false');
        expect(Stylesheet._isBoolean(null), 'to be false');
        expect(Stylesheet._isBoolean([]), 'to be false');
      });
    });

    describe('_initializeStyleElement', function () {
      it('is a function', function () {
        expect(Stylesheet._initializeStyleElement, 'to be a', 'function');
      });
    });

    describe('_getVendrorPrefix', function () {
      it('is a function', function () {
        expect(Stylesheet._getVendrorPrefix, 'to be a', 'function');
      });
    });

    describe('_normalizeProperty', function () {
      it('is a function', function () {
        expect(Stylesheet._normalizeProperty, 'to be a', 'function');
      });
    });

    describe('_parseStyles', function () {
      it('is a function', function () {
        expect(Stylesheet._parseStyles, 'to be a', 'function');
      });
    });

    describe('_insertRule', function () {
      it('is a function', function () {
        expect(Stylesheet._insertRule, 'to be a', 'function');
      });
    });

    describe('_insertArrayRules', function () {
      it('is a function', function () {
        expect(Stylesheet._insertArrayRules, 'to be a', 'function');
      });
    });

    describe('_insertObjectRules', function () {
      it('is a function', function () {
        expect(Stylesheet._insertObjectRules, 'to be a', 'function');
      });
    });

    describe('_insertStringAndObjectRules', function () {
      it('is a function', function () {
        expect(Stylesheet._insertStringAndObjectRules, 'to be a', 'function');
      });
    });

    describe('_getCSSText', function () {
      it('is a function', function () {
        expect(Stylesheet._getCSSText, 'to be a', 'function');
      });
    });

    describe('_disableStylesheet', function () {
      it('is a function', function () {
        expect(Stylesheet._disableStylesheet, 'to be a', 'function');
      });
    });

    describe('_enableStylesheet', function () {
      it('is a function', function () {
        expect(Stylesheet._enableStylesheet, 'to be a', 'function');
      });
    });
  });

  describe('Public methods', function () {
    describe('add', function () {
      it('is a function', function () {
        expect(Stylesheet.add, 'to be a', 'function');
      });
    });

    describe('disable', function () {
      it('is a function', function () {
        expect(Stylesheet.disable, 'to be a', 'function');
      });
    });

    describe('enable', function () {
      it('is a function', function () {
        expect(Stylesheet.enable, 'to be a', 'function');
      });
    });

    describe('CSSText', function () {
      it('is a function', function () {
        expect(Stylesheet.CSSText, 'to be a', 'function');
      });
    });
  });
});
