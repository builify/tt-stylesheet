import expect from 'unexpected';
import TTStylesheet from '../src/ttstylesheet.js';

describe('TTStylesheet', () => {
  var testStylesheet = new TTStylesheet();

  // For debug window of karma runner.
  document.body.innerHTML = `
  <div id='cont'>
    <h1>Test</h1>
    <hr>
    <h2>This is just a test</h2>
  </div>
  `;

  describe('Core', () => {
    it('should be defined', () => {
      expect(testStylesheet, 'to be defined');
    });

    it('is a object', () => {
      expect(testStylesheet, 'to be a', 'object');
    });
  });

  describe('Private methods', function () {
    describe('_isString', function () {
      it('is a function', function () {
        expect(testStylesheet._isString, 'to be a', 'function');
      });

      it('detects string', function () {
        expect(testStylesheet._isString(''), 'to be true');
        expect(testStylesheet._isString('test123'), 'to be true');
      });

      it('does not pass other types', function () {
        expect(testStylesheet._isString(new Date()), 'to be false');
        expect(testStylesheet._isString(/test/i), 'to be false');
        expect(testStylesheet._isString(function () {}), 'to be false');
        expect(testStylesheet._isString([]), 'to be false');
        expect(testStylesheet._isString({}), 'to be false');
        expect(testStylesheet._isString(123), 'to be false');
        expect(testStylesheet._isString(true), 'to be false');
        expect(testStylesheet._isString(undefined), 'to be false');
        expect(testStylesheet._isString(null), 'to be false');
      });
    });

    describe('_isObject', function () {
      it('is a function', function () {
        expect(testStylesheet._isObject, 'to be a', 'function');
      });

      it('detects object', function () {
        expect(testStylesheet._isObject({}), 'to be true');
        expect(testStylesheet._isObject({ test: 123 }), 'to be true');
      });

      it('does not pass other types', function () {
        expect(testStylesheet._isObject(new Date()), 'to be false');
        expect(testStylesheet._isObject(/test/i), 'to be false');
        expect(testStylesheet._isObject(function () {}), 'to be false');
        expect(testStylesheet._isObject([]), 'to be false');
        expect(testStylesheet._isObject(''), 'to be false');
        expect(testStylesheet._isObject(123), 'to be false');
        expect(testStylesheet._isObject(true), 'to be false');
        expect(testStylesheet._isObject(undefined), 'to be false');
        expect(testStylesheet._isObject(null), 'to be false');
      });
    });

    describe('_isArray', function () {
      it('is a function', function () {
        expect(testStylesheet._isArray, 'to be a', 'function');
      });

      it('detects array', function () {
        expect(testStylesheet._isArray([]), 'to be true');
        expect(testStylesheet._isArray(['test', 123]), 'to be true');
      });

      it('does not pass other types', function () {
        expect(testStylesheet._isArray(new Date()), 'to be false');
        expect(testStylesheet._isArray(/test/i), 'to be false');
        expect(testStylesheet._isArray(function () {}), 'to be false');
        expect(testStylesheet._isArray({}), 'to be false');
        expect(testStylesheet._isArray(''), 'to be false');
        expect(testStylesheet._isArray(123), 'to be false');
        expect(testStylesheet._isArray(true), 'to be false');
        expect(testStylesheet._isArray(undefined), 'to be false');
        expect(testStylesheet._isArray(null), 'to be false');
      });
    });

    describe('_isElement', function () {
      it('is a function', function () {
        expect(testStylesheet._isElement, 'to be a', 'function');
      });

      it('detects single node', function () {
        const div = document.createElement('div');
        const h1Elem = document.querySelector('h1');
        const liElems = document.querySelectorAll('li');

        expect(testStylesheet._isElement(div), 'to be true');
        expect(testStylesheet._isElement(h1Elem), 'to be true');
        expect(testStylesheet._isElement(liElems), 'to be false');
      });

      it('does not pass other types', function () {
        expect(testStylesheet._isElement(new Date()), 'to be false');
        expect(testStylesheet._isElement(/test/i), 'to be false');
        expect(testStylesheet._isElement(function () {}), 'to be false');
        expect(testStylesheet._isElement({}), 'to be false');
        expect(testStylesheet._isElement(''), 'to be false');
        expect(testStylesheet._isElement(123), 'to be false');
        expect(testStylesheet._isElement(true), 'to be false');
        expect(testStylesheet._isElement(undefined), 'to be false');
        expect(testStylesheet._isElement(null), 'to be false');
        expect(testStylesheet._isElement([]), 'to be false');
      });
    });

    describe('_isBoolean', function () {
      it('is a function', function () {
        expect(testStylesheet._isBoolean, 'to be a', 'function');
      });

      it('detects boolean', function () {
        expect(testStylesheet._isBoolean(true), 'to be true');
        expect(testStylesheet._isBoolean(false), 'to be true');
      });

      it('does not pass other types', function () {
        expect(testStylesheet._isBoolean(new Date()), 'to be false');
        expect(testStylesheet._isBoolean(/test/i), 'to be false');
        expect(testStylesheet._isBoolean(function () {}), 'to be false');
        expect(testStylesheet._isBoolean({}), 'to be false');
        expect(testStylesheet._isBoolean(''), 'to be false');
        expect(testStylesheet._isBoolean(123), 'to be false');
        expect(testStylesheet._isBoolean(undefined), 'to be false');
        expect(testStylesheet._isBoolean(null), 'to be false');
        expect(testStylesheet._isBoolean([]), 'to be false');
      });
    });

    describe('_initializeStyleElement', function () {
      it('is a function', function () {
        expect(testStylesheet._initializeStyleElement, 'to be a', 'function');
      });
    });

    describe('_dasherize', function () {
      it('is a function', function () {
        expect(testStylesheet._dasherize, 'to be a', 'function');
      });

      it('should return correct properties', function () {
        expect(testStylesheet._dasherize('userSelect'), 'to be', 'user-select');
        expect(testStylesheet._dasherize('backgroundColor'), 'to be', 'background-color');
        expect(testStylesheet._dasherize('backfaceVisibility'), 'to be', 'backface-visibility');
        expect(testStylesheet._dasherize('backfaceVisibility'), 'to be', 'backface-visibility');
        expect(testStylesheet._dasherize('listStyleImage'), 'to be', 'list-style-image');
        expect(testStylesheet._dasherize('mozBorderTopColors'), 'to be', 'moz-border-top-colors');
      });
    });

    describe('_normalizeProperty', function () {
      it('is a function', function () {
        expect(testStylesheet._normalizeProperty, 'to be a', 'function');
      });

      it('should return correct properties', function () {
        // Meant for Chrome testing.
        expect(testStylesheet._normalizeProperty('userSelect'), 'to contain', 'user-select');
        expect(testStylesheet._normalizeProperty('backgroundColor'), 'to be', 'background-color');
        expect(testStylesheet._normalizeProperty('backfaceVisibility'), 'to contain',
        'backface-visibility');
        expect(testStylesheet._normalizeProperty('listStyleImage'), 'to be', 'list-style-image');
      });
    });

    describe('_parseStyles', function () {
      it('is a function', function () {
        expect(testStylesheet._parseStyles, 'to be a', 'function');
      });

      it('should return correct styles', function () {
        expect(testStylesheet._parseStyles({
          color: '#333',
          fontSize: '16px'
        }), 'to be', 'color: #333 !important;font-size: 16px !important;');
        expect(testStylesheet._parseStyles({
          userSelect: 'none',
          color: '#333',
          fontSize: '16px'
        }), 'to be',
        '-webkit-user-select: none !important;color: #333 !important;font-size: 16px !important;');
      });
    });

    describe('_insertRule', function () {
      it('is a function', function () {
        expect(testStylesheet._insertRule, 'to be a', 'function');
      });
    });

    describe('_insertJSONRules', function () {
      it('is a function', function () {
        expect(testStylesheet._insertJSONRules, 'to be a', 'function');
      });
    });

    describe('_disableStylesheet', function () {
      it('is a function', function () {
        expect(testStylesheet._disableStylesheet, 'to be a', 'function');
      });

      it('should disable stylesheet', function () {
        testStylesheet._disableStylesheet();
        expect(testStylesheet._styleSheetEnabled, 'to be false');
      });
    });

    describe('_enableStylesheet', function () {
      it('is a function', function () {
        expect(testStylesheet._enableStylesheet, 'to be a', 'function');
      });

      it('should enable stylesheet', function () {
        testStylesheet._enableStylesheet();
        expect(testStylesheet._styleSheetEnabled, 'to be true');
      });
    });
  });

  describe('Public methods', () => {
    describe('add', () => {
      it('is a function', () => {
        expect(testStylesheet.add, 'to be a', 'function');

        testStylesheet.add({
          '#cont': {
            width: 350,
            margin: '0 auto',
            zIndex: 10
          },
          h1: {
            zIndex: 10,
            '&:hover': {
              background: 'red'
            }
          },
          h2: {
            height: 1,
            border: 0,
            borderTop: '1px solid #eee'
          }
        });

        testStylesheet.add({
          hr: {
            height: 0,
            width: 500
          }
        });
      });
    });

    describe('disable', () => {
      it('is a function', () => {
        expect(testStylesheet.disable, 'to be a', 'function');
      });

      it('should disable testStylesheet', () => {
        testStylesheet.disable();
        expect(testStylesheet._styleSheetEnabled, 'to be false');
      });
    });

    describe('enable', () => {
      it('is a function', () => {
        expect(testStylesheet.enable, 'to be a', 'function');
      });

      it('should enable testStylesheet', () => {
        testStylesheet.enable();
        expect(testStylesheet._styleSheetEnabled, 'to be true');
      });
    });
  });
});
