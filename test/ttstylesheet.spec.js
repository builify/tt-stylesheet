import expect from 'unexpected';
import TTStylesheet from '../src/ttstylesheet.js';

describe('TTStylesheet', () => {
  var testStylesheet = new TTStylesheet();

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

  describe('Public methods', () => {
    describe('add', () => {
      it('is a function', () => {
        expect(testStylesheet.add, 'to be a', 'function');

        testStylesheet.add({
          '#cont': {
            width: 350,
            margin: '0 auto'
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
