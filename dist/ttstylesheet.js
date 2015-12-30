(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TTStylesheet"] = factory();
	else
		root["TTStylesheet"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TYPE_ARRAY = '[object Array]';
	var TYPE_STRING = '[object String]';
	var TYPE_OBJECT = '[object Object]';
	var TYPE_BOOLEAN = '[object Boolean]';
	var TYPE_NUMBER = '[object Number]';
	var PREFIXES = '-webkit-,-ms-,-moz-,-o-'.split(',');
	var PREFIXES_LEN = PREFIXES.length;
	var COMPUTED_STYLES = window.getComputedStyle(document.documentElement);
	var NON_UNIT_PROPERTIES = {
	  'animation-iteration-count': true,
	  'box-ordinal-group': true,
	  'column-count': true,
	  'fill-opacity': true,
	  'flex': true,
	  'flex-grow': true,
	  'flex-order': true,
	  'flex-shrink': true,
	  'font-weight': true,
	  'line-height': true,
	  'opacity': true,
	  'order': true,
	  'orphans': true,
	  'stop-opacity': true,
	  'tab-size': 1,
	  'widows': true,
	  'z-index': true,
	  'zoom': true
	};

	var _default = (function () {
	  function _default(target) {
	    _classCallCheck(this, _default);

	    this._styleSheetEnabled = false;
	    this._stylesheetElement = null;
	    this._stylesheet = this._initializeStyleElement(target);
	    this._CACHED_STYLES = {};
	    this._CACHED_PROPERTIES = {};
	    this._BROWSER_STYLES = [].slice.call(COMPUTED_STYLES);
	  }

	  _createClass(_default, [{
	    key: '_getType',
	    value: function _getType(type) {
	      return Object.prototype.toString.call(type);
	    }
	  }, {
	    key: '_isNumber',
	    value: function _isNumber(value) {
	      return !!(this._getType(value) === TYPE_NUMBER);
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
	      var style = document.createElement('style');

	      style.setAttribute('type', 'text/css');
	      style.setAttribute('data-ttstylesheet', 'true');
	      style.appendChild(document.createTextNode(''));

	      (!target && !this._isElement(target) ? document.head : target).appendChild(style);

	      this._styleSheetEnabled = true;
	      this._stylesheetElement = style;

	      return style.styleSheet || style.sheet;
	    }
	  }, {
	    key: '_dasherize',
	    value: function _dasherize(property) {
	      return property.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	    }
	  }, {
	    key: '_normalizeProperty',
	    value: function _normalizeProperty(property) {
	      if (this._CACHED_PROPERTIES.hasOwnProperty(property)) {
	        return this._CACHED_PROPERTIES[property];
	      }

	      var dasherizedProperty = this._dasherize(property);

	      if (this._BROWSER_STYLES.indexOf(dasherizedProperty) !== -1) {
	        this._CACHED_PROPERTIES[property] = dasherizedProperty;
	        return dasherizedProperty;
	      } else {
	        var i = PREFIXES_LEN - 1,
	            prefixed = null;

	        while (i >= 0) {
	          prefixed = '' + PREFIXES[i] + dasherizedProperty;

	          if (this._BROWSER_STYLES.indexOf(prefixed) !== -1) {
	            this._CACHED_PROPERTIES[property] = prefixed;
	            return prefixed;
	          }

	          i--;
	        }
	      }

	      this._CACHED_PROPERTIES[property] = dasherizedProperty;

	      return dasherizedProperty;
	    }
	  }, {
	    key: '_insertRule',
	    value: function _insertRule(selector, styles, index) {
	      var sheet = this._stylesheet;

	      styles = this._parseStyles(styles);

	      if (sheet.cssRules.length !== 0 && sheet.cssRules[index]) {
	        sheet.deleteRule(index);
	      }

	      sheet.insertRule(selector + ' { ' + styles + ' }', index);
	    }
	  }, {
	    key: '_isValidForUnit',
	    value: function _isValidForUnit(property) {
	      if (NON_UNIT_PROPERTIES.hasOwnProperty(property)) {
	        return false;
	      }

	      return true;
	    }
	  }, {
	    key: '_parseStyles',
	    value: function _parseStyles(styles) {
	      var _this = this;

	      var stylesToText = Object.keys(styles).map(function (key) {
	        var property = _this._normalizeProperty(key);
	        var value = styles[key];
	        var validForUnit = _this._isValidForUnit(property) && _this._isNumber(value);
	        var parsedValue = validForUnit ? value + 'px' : value;
	        var declaration = property + ': ' + parsedValue + ' !important';

	        return declaration;
	      }).join(';') + ';';

	      return stylesToText;
	    }
	  }, {
	    key: '_getKey',
	    value: function _getKey(key, replacer) {
	      if (key.indexOf('&') !== -1) {
	        key = key.replace('&', replacer);
	      } else {
	        key = replacer + ' ' + key;
	      }

	      return key;
	    }
	  }, {
	    key: '_flattenToOneLevel',
	    value: function _flattenToOneLevel(data) {
	      for (var key in data) {
	        var styles = data[key];

	        for (var _key in styles) {
	          if (this._isObject(styles[_key])) {
	            var oldKey = _key;

	            _key = this._getKey(_key, key);
	            data[_key] = styles[oldKey];

	            delete data[key][oldKey];
	          }
	        }
	      }

	      return data;
	    }
	  }, {
	    key: '_insertRules',
	    value: function _insertRules(selector, objectStyles) {
	      var cachedStyle = null;

	      if (this._CACHED_STYLES.hasOwnProperty(selector)) {
	        cachedStyle = this._CACHED_STYLES[selector];

	        var _cachedStyle = cachedStyle;
	        var _obj = _cachedStyle.obj;

	        this._CACHED_STYLES[selector] = Object.assign(cachedStyle, {
	          obj: Object.assign(_obj, objectStyles)
	        });
	      } else {
	        this._CACHED_STYLES[selector] = {
	          slctor: selector,
	          obj: objectStyles,
	          index: Object.keys(this._CACHED_STYLES).length
	        };

	        cachedStyle = this._CACHED_STYLES[selector];
	      }

	      var _cachedStyle2 = cachedStyle;
	      var slctor = _cachedStyle2.slctor;
	      var obj = _cachedStyle2.obj;
	      var index = _cachedStyle2.index;

	      this._insertRule(slctor, obj, index);
	    }
	  }, {
	    key: '_insertJSONRules',
	    value: function _insertJSONRules(rules) {
	      rules = this._flattenToOneLevel(rules);

	      for (var rule in rules) {
	        if (rules.hasOwnProperty(rule)) {
	          var selector = rule;
	          var selectorRules = rules[rule];
	          this._insertRules(selector, selectorRules);
	        }
	      }
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
	    value: function add(styles) {
	      if (styles && this._isObject(styles)) {
	        this._insertJSONRules(styles);
	      }

	      return this;
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      this._disableStylesheet();
	      return this;
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      this._enableStylesheet();
	      return this;
	    }
	  }, {
	    key: 'initCSS',
	    value: function initCSS() {
	      var cssRules = this._stylesheet.cssRules;

	      var len = cssRules.length;
	      var styleElem = this._stylesheetElement;

	      if (len === 0) {
	        return this;
	      }

	      styleElem.innerHTML = '';

	      for (var i = 0; i < len; i++) {
	        styleElem.appendChild(document.createTextNode('' + cssRules[i].cssText));
	      }
	    }
	  }]);

	  return _default;
	})();

	exports['default'] = _default;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;