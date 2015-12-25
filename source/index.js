const TPStylesheet = (function () {
	const TYPE_ARRAY = '[object Array]';
	const TYPE_STRING = '[object String]';
	const TYPE_OBJECT = '[object Object]';
	const TYPE_BOOLEAN = '[object Boolean]';
	const PREFIXES = '-webkit-,-ms-,-moz-,-o-'.split(',');
	const PREFIXES_LEN = PREFIXES.length;
  
	class CTPStylesheet {
		constructor (obj) {
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
			this._CACHED_STYLES = {};
			this._BROWSER_STYLES= [].slice.call(this._win.getComputedStyle(this._doc.documentElement));
		}

		_getType (type) {
			return Object.prototype.toString.call(type);
		}

		_isString (value) {
			return !!(this._getType(value) === TYPE_STRING);
		}

		_isObject (value) {
			return !!(this._getType(value) === TYPE_OBJECT);
		}

		_isArray (value) {
			return !!(this._getType(value) === TYPE_ARRAY);
		}

		_isBoolean (value) {
			return !!(this._getType(value) === TYPE_BOOLEAN);
		}

		_isElement (node) {
			return !!(node && (node.nodeName || (node.prop && node.attr && node.find)));
		}

		_initializeStyleElement (target) {
      let style = this._doc.createElement('style');
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

		_dasherize (property) {
			return property.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
		}

		_normalizeProperty (property) {
			if (this._CACHED_STYLES.hasOwnProperty(property)) {
		    return this._CACHED_STYLES[property];
		  }

		  let dasherizedProperty = this._dasherize(property);

			if (this._BROWSER_STYLES.indexOf(dasherizedProperty) !== -1) {
		    this._CACHED_STYLES[property] = dasherizedProperty;
		    return dasherizedProperty;
		  } else {
		    let i = PREFIXES_LEN - 1,
		        prefixed = null;

		    while(i >= 0) {
		      prefixed = `${PREFIXES[i]}${dasherizedProperty}`;

		      if (this._BROWSER_STYLES.indexOf(prefixed) !== -1) {
		        this._CACHED_STYLES[property] = prefixed;
		        return prefixed;
		      }

		      i--;
		    }
		  }

			this._CACHED_STYLES[property] = dasherizedProperty;

			return dasherizedProperty;
		}

    _parseStyles (styles) {
      if (this._isString(styles)) {
        return styles;
      } else if (!styles && !this._isObject(styles)) {
        return '';
			}

			const stylesToText = Object.keys(styles).map((key) => {
        const property = this._normalizeProperty(key);
        const value = styles[key];
        const declaration = `${property}:${value}`;

        return declaration;
      }).join(';');

			return `${stylesToText};`;
    }

    _insertRule (selector, styles, isImportant) {
      const sheet = this._stylesheet;
      const len = sheet.cssRules.length;
      const styleRule = `${selector} { ${styles} ${isImportant ? '!important' : ''}}`;

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

    _insertObjectRules (rules) {
      for (let rule in rules) {
        if (rules.hasOwnProperty(rule)) {
          const selector = rule;
          const selectorStyles = rules[rule];
          const parsedStyle = this._parseStyles(selectorStyles);

          this._insertRule(selector, parsedStyle);
        }
      }
    }

    _insertStringAndObjectRules (selector, rules, isImportant = false) {
      const parsedStyle = this._parseStyles(rules);

      this._insertRule(selector, parsedStyle, isImportant);
    }

    _getCSSText () {
      const style = this._stylesheet;
      const { cssRules } = style;
      const rulesLen = cssRules.length;
      let cssText = [];

      if (rulesLen === 0) {
        return '';
      }

      for (let i = 0; i < rulesLen; i++) {
        cssText.push(cssRules[i].cssText);
      }

      return cssText.join('\n');
    }

    _disableStylesheet () {
      if (this._styleSheetEnabled) {
        const sheet = this._stylesheet;

        sheet.disabled = true;
        this._styleSheetEnabled = false;
      }
    }

    _enableStylesheet () {
      if (!this._styleSheetEnabled) {
        const sheet = this._stylesheet;

        sheet.disabled = false;
        this._styleSheetEnabled = true;
      }
    }

    add () {
      const args = arguments;
      const argsLen = args.length;
      const fArg = args[0];
      const sArg = args[1];
      const tArg = args[2];

      switch (argsLen) {
        case 1: {
          if (this._isObject(fArg)) {
            this._insertObjectRules(fArg);
          }

          break;
        }

        case 2: {
          if (this._isString(fArg) && this._isObject(sArg)) {
            this._insertStringAndObjectRules(fArg, sArg);
          } else if (this._isString(fArg) && this._isString(sArg)) {
						this._insertRule(fArg, sArg);
					}

					break;
        }

        case 3: {
          if (this._isString(fArg) && this._isObject(sArg) && this._isBoolean(tArg)) {
            this._insertStringAndObjectRules(fArg, sArg, tArg);
          }

					break;
        }
      }

			return this;
    }

    disable () {
      this._disableStylesheet();
			return this;
    }

    enable () {
      this._enableStylesheet();
			return this;
    }

    CSSText () {
      return this._getCSSText();
    }
	}

	return CTPStylesheet;
}());

export default TPStylesheet;
