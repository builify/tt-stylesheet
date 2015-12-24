const TPStylesheet = (function () {
	const TYPE_ARRAY = '[object Array]';
	const TYPE_STRING = '[object String]';
	const TYPE_OBJECT = '[object Object]';
	const TYPE_DATE = '[object Date]';
	const TYPE_NUMBER = '[object Number]';
	const TYPE_FUNCTION = '[object Function]';
	const TYPE_REGEXP = '[object RegExp]';
	const TYPE_BOOLEAN = '[object Boolean]';
	const TYPE_NULL = '[object Null]';
	const TYPE_UNDEFINED = '[object Undefined]';

  class CTPStylesheet {
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

    _isElement (node) {
      return !!(node && (node.nodeName || (node.prop && node.attr && node.find)));
    }
  }

  return CTPStylesheet;
})();

export default TPStylesheet;
