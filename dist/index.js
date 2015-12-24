'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TPStylesheet = (function () {
  var TYPE_ARRAY = '[object Array]';
  var TYPE_STRING = '[object String]';
  var TYPE_OBJECT = '[object Object]';
  var TYPE_DATE = '[object Date]';
  var TYPE_NUMBER = '[object Number]';
  var TYPE_FUNCTION = '[object Function]';
  var TYPE_REGEXP = '[object RegExp]';
  var TYPE_BOOLEAN = '[object Boolean]';
  var TYPE_NULL = '[object Null]';
  var TYPE_UNDEFINED = '[object Undefined]';
  var PREFIXES = 'O ms Moz webkit'.split(' ');
  var PREFIXES_LEN = PREFIXES.length;

  var CTPStylesheet = (function () {
    function CTPStylesheet(obj) {
      _classCallCheck(this, CTPStylesheet);

      this._defaults = {
        target: null,
        win: window
      };

      obj = Object.assign({}, this._defaults, obj);

      this._win = obj.win;
      this._doc = this._win.document;
      this._styleSheetEnabled = false;
      this._stylesheet = this._initializeStyleElement(obj.target);
      this._rules = [];
      this._CACHED_STYLES = this._win.getComputedStyle(this._doc.documentElement);
    }

    _createClass(CTPStylesheet, [{
      key: '_getType',
      value: function _getType(type) {
        return Object.prototype.toString.call(type);
      }
    }, {
      key: '_isString',
      value: function _isString(value) {
        return !!(this._getType(value) === TYPE_STRING);
      }
    }, {
      key: '_isObject',
      value: function _isObject(value) {
        return !!(this._getType(value) === TYPE_OBJECT);
      }
    }, {
      key: '_isArray',
      value: function _isArray(value) {
        return !!(this._getType(value) === TYPE_ARRAY);
      }
    }, {
      key: '_isBoolean',
      value: function _isBoolean(value) {
        return !!(this._getType(value) === TYPE_BOOLEAN);
      }
    }, {
      key: '_isElement',
      value: function _isElement(node) {
        return !!(node && (node.nodeName || node.prop && node.attr && node.find));
      }
    }, {
      key: '_initializeStyleElement',
      value: function _initializeStyleElement(target) {
        var style = this._doc.createElement('style');
        style.type = 'text/css';
        style.appendChild(this._doc.createTextNode(''));

        if (!target && !this._isElement(target)) {
          this._doc.head.appendChild(style);
        } else {
          target.appendChild(style);
        }

        this._styleSheetEnabled = true;

        return style.sheet ? style.sheet : style.styleSheet;
      }
    }, {
      key: '_getVendrorPrefix',
      value: function _getVendrorPrefix(property) {
        if (this._CACHED_STYLES.hasOwnProperty(property)) {
          return property;
        } else {
          var prefixed = property;

          for (var i = 0; i < PREFIXES_LEN; i++) {
            prefixed = '' + PREFIXES[i] + property;

            if (this._CACHED_STYLES.hasOwnProperty(prefixed)) {
              return prefixed;
            }
          }
        }

        return property;
      }
    }, {
      key: '_dasherize',
      value: function _dasherize(property) {
        return property.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      }
    }, {
      key: '_normalizeProperty',
      value: function _normalizeProperty(property) {
        return this._getVendrorPrefix(this._dasherize(property));
      }
    }, {
      key: '_parseStyles',
      value: function _parseStyles(styles) {
        var _this = this;

        if (this._isString(styles)) {
          return styles;
        } else if (!styles && !this._isObject(styles)) {
          return '';
        }

        return Object.keys(styles).map(function (key) {
          var property = _this._normalizeProperty(key);
          var value = styles[key];
          var declaration = property + ':' + value;

          return declaration;
        }).join(';');
      }
    }, {
      key: '_insertRule',
      value: function _insertRule(selector, styles, isImportant) {
        var sheet = this._stylesheet;
        var len = sheet.cssRules.length;
        var styleRule = selector + ' { ' + styles + ' ' + (isImportant ? '!important' : '') + '}';

        this._rules.push({
          index: len,
          selector: selector,
          styles: styles,
          isImportant: isImportant
        });

        if (sheet.insertRule) {
          sheet.insertRule(styleRule, len);
        } else if (sheet.addRule) {
          sheet.addRule(selector, styles, len);
        }
      }
    }, {
      key: '_insertArrayRules',
      value: function _insertArrayRules(rules) {
        for (var i = 0, rl = rules.length; i < rl; i++) {
          var j = 1,
              rule = rules[i],
              selector = rules[i][0],
              propStr = '',
              ruleItem,
              value,
              declaration,
              isImportant;

          if (this._isArray(rule[1][0])) {
            rule = rule[1];
            j = 0;
          }

          for (var srl = rule.length; j < srl; j++) {
            ruleItem = rule[j];
            value = this._normalizeProperty(ruleItem[0]);
            declaration = ruleItem[1];
            isImportant = ruleItem[2] ? true : false;

            propStr += value + ':' + declaration + (isImportant ? ' !important' : '') + ';\n';
          }

          this._insertRule(selector, propStr);
        }
      }
    }, {
      key: '_insertObjectRules',
      value: function _insertObjectRules(rules) {
        for (var rule in rules) {
          if (rules.hasOwnProperty(rule)) {
            var selector = rule;
            var selectorStyles = rules[rule];
            var parsedStyle = this._parseStyles(selectorStyles);

            this._insertRule(selector, parsedStyle);
          }
        }
      }
    }, {
      key: '_insertStringAndObjectRules',
      value: function _insertStringAndObjectRules(selector, rules) {
        var isImportant = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

        var parsedStyle = this._parseStyles(rules);

        this._insertRule(selector, parsedStyle, isImportant);
      }
    }, {
      key: '_getCSSText',
      value: function _getCSSText() {
        var style = this._stylesheet;
        var cssRules = style.cssRules;

        var rulesLen = cssRules.length;
        var cssText = [];

        if (rulesLen === 0) {
          return '';
        }

        for (var i = 0; i < rulesLen; i++) {
          cssText.push(cssRules[i].cssText);
        }

        return cssText.join('\n');
      }
    }, {
      key: '_disableStylesheet',
      value: function _disableStylesheet() {
        if (this._styleSheetEnabled) {
          var sheet = this._stylesheet;

          sheet.disabled = true;
          this._styleSheetEnabled = false;
        }
      }
    }, {
      key: '_enableStylesheet',
      value: function _enableStylesheet() {
        if (!this._styleSheetEnabled) {
          var sheet = this._stylesheet;

          sheet.disabled = false;
          this._styleSheetEnabled = true;
        }
      }
    }, {
      key: 'add',
      value: function add() {
        var args = arguments;
        var argsLen = args.length;
        var fArg = args[0];
        var sArg = args[1];
        var tArg = args[2];

        switch (argsLen) {
          case 1:
            {
              if (this._isArray(fArg)) {
                this._insertArrayRules(fArg);
              } else if (this._isObject(fArg)) {
                this._insertObjectRules(fArg);
              }

              break;
            }

          case 2:
            {
              if (this._isString(fArg) && this._isObject(sArg)) {
                this._insertStringAndObjectRules(fArg, sArg);
              } else if (this._isString(fArg) && this._isString(sArg)) {
                this._insertRule(fArg, sArg);
              }

              break;
            }

          case 3:
            {
              if (this._isString(fArg) && this._isObject(sArg) && typeof tArg === 'boolean') {
                this._insertStringAndObjectRules(fArg, sArg, tArg);
              }

              break;
            }
        }

        return true;
      }
    }, {
      key: 'disable',
      value: function disable() {
        this._disableStylesheet();

        return true;
      }
    }, {
      key: 'enable',
      value: function enable() {
        this._enableStylesheet();

        return true;
      }
    }, {
      key: 'CSSText',
      value: function CSSText() {
        return this._getCSSText();
      }
    }]);

    return CTPStylesheet;
  })();

  return CTPStylesheet;
})();

exports.default = TPStylesheet;