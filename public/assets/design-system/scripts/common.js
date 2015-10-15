webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(216);
	__webpack_require__(221);
	__webpack_require__(325);
	__webpack_require__(337);
	__webpack_require__(219);
	__webpack_require__(220);
	__webpack_require__(213);
	__webpack_require__(215);
	__webpack_require__(217);
	module.exports = __webpack_require__(184);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _extends = __webpack_require__(11)['default'];

	var _Object$assign = __webpack_require__(12)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(173);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _app_modulesUiUtilComponent = __webpack_require__(174);

	var _app_modulesSiteUtilLocalytics = __webpack_require__(184);

	var _reactRouter = __webpack_require__(185);

	var _lodash = __webpack_require__(179);

	var _app_modulesSiteNavigationSitemap = __webpack_require__(213);

	var _app_modulesSiteNavigationSitemap2 = _interopRequireDefault(_app_modulesSiteNavigationSitemap);

	var CTALink = (function (_React$Component) {
	  function CTALink() {
	    _classCallCheck(this, CTALink);

	    if (_React$Component != null) {
	      _React$Component.apply(this, arguments);
	    }
	  }

	  _inherits(CTALink, _React$Component);

	  _createClass(CTALink, [{
	    key: 'onClick',
	    value: function onClick() {
	      (0, _app_modulesSiteUtilLocalytics.logCTAEvent)(this.props.ctaEventName, this.props.ctaExtraValues);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var click = (0, _app_modulesUiUtilComponent.createChainedFunction)(this.props.onClick, this.onClick.bind(this));
	      var props = _Object$assign({}, this.props, { onClick: click });
	      var hasRoute = _app_modulesSiteNavigationSitemap2['default'].getRouteByPath(props.href);
	      if (hasRoute) {
	        return _react2['default'].createElement(
	          _reactRouter.Link,
	          _extends({ to: props.href }, props),
	          this.props.children
	        );
	      } else {
	        return _react2['default'].createElement(
	          'a',
	          props,
	          this.props.children
	        );
	      }
	    }
	  }]);

	  return CTALink;
	})(_react2['default'].Component);

	CTALink.displayName = 'CTALink';
	CTALink.propTypes = {
	  ctaEventName: _react2['default'].PropTypes.string,
	  ctaExtraValues: _react2['default'].PropTypes.object
	};

	module.exports = CTALink;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$create = __webpack_require__(3)["default"];

	exports["default"] = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = _Object$create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) subClass.__proto__ = superClass;
	};

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}

	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}

	var $ = module.exports = __webpack_require__(6)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(8)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(9), __esModule: true };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(12)["default"];

	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(13), __esModule: true };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(14);
	module.exports = __webpack_require__(5).core.Object.assign;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(15);
	$def($def.S, 'Object', {assign: __webpack_require__(16)});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(5)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction;
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp.prototype = C.prototype;
	    }(out);
	    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(5)
	  , enumKeys = __webpack_require__(17);
	// 19.1.2.1 Object.assign(target, source, ...)
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = Object($.assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = $.ES5Object(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getDesc    = $.getDesc
	    , getSymbols = $.getSymbols;
	  if(getSymbols)$.each.call(getSymbols(it), function(key){
	    if(getDesc(it, key).enumerable)keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _Object$keys = __webpack_require__(175)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(173);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _createChainedFunction = __webpack_require__(181);

	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

	var _app_modulesGlobal = __webpack_require__(182);

	var _app_modulesGlobal2 = _interopRequireDefault(_app_modulesGlobal);

	var _generatedWhitelist = __webpack_require__(183);

	var _generatedWhitelist2 = _interopRequireDefault(_generatedWhitelist);

	/**
	 * Traverse all children
	 */
	function flatMapChildren(children, f) {
	  var result = [];
	  function go(xs, f) {
	    return _react2['default'].Children.map(xs, function (c) {
	      result.push(f(c));
	      if (c.type) go(c.props.children, f);
	    });
	  }
	  go(children, f);
	  return result;
	}

	/**
	 * Perhaps there's a more pragmatic way to do this. Eventually, I suspect we'll have some utils to help find children.
	 */
	function hasChild(children, name) {
	  var flag = false;
	  flatMapChildren(children, function (c) {
	    flag = flag || c.type && c.type.name === name;
	  });
	  return flag;
	}

	// findDOMNode complains so filter out strings from virtual dom
	function textContent(children) {
	  return flatMapChildren(children, function (c) {
	    if (typeof c === 'string') return c;
	  }).join(' ');
	}

	var installMethods = {
	  /**
	   * Return a string with the provided className string
	   * combined with this.props.className
	   *
	   * @return {string}
	   */
	  getClassName: function getClassName() {
	    var args = Array.prototype.slice.call(arguments);
	    args = args.concat(this.props.className);
	    return _classnames2['default'].apply(null, args);
	  },

	  /**
	   * Return a string with the provided classNameBase with a flavor modifier
	   * combined with this.props.className
	   *
	   * @param {string} classNameBase
	   * @return {string}
	   */
	  getClassNameWithFlavor: function getClassNameWithFlavor(classNameBase) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    if (typeof classNameBase !== 'string') {
	      throw new Error('"classNameBase" must be a string');
	    }
	    options = _lodash2['default'].assign({}, {
	      // The key from this.props to extract the flavors
	      prop: 'flavor',
	      // Include this.props.className in the returned value
	      includeClassName: true,
	      // Any additional classes to be addeed in the returned value
	      additionalClassName: false
	    }, options);
	    var flavor = this.props[options.prop];
	    var className = options.includeClassName ? this.props.className : '';
	    var flavors = flavor ? flavor.split(',').map(function (f) {
	      return '' + classNameBase + '--' + f;
	    }) : '';
	    return (0, _classnames2['default'])(classNameBase, flavors, className, options.additionalClassName);
	  },

	  getClassNameWithVisiblity: function getClassNameWithVisiblity(ns) {
	    var vis = this.props.visible || true;
	    return this.$getClassName(ns, vis ? 'is-visible' : 'is-hidden');
	  },

	  /**
	   * Return a copy of this.props without the specified keys
	   *
	   * @prop {...String} keys
	   * @returns {Object}
	   */
	  propsWithoutKeys: function propsWithoutKeys() {
	    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	      keys[_key] = arguments[_key];
	    }

	    var target = {};
	    for (var i in this.props) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(this.props, i)) continue;
	      target[i] = this.props[i];
	    }
	    return target;
	  }
	};

	/**
	 * Install helper methods on the provided context
	 *
	 * @param {object} context - The object to install the methods
	 * @param {array} [methods] - By default, all methods will be installed,
	 *  unless an array of methods is provided
	 *
	 * class Component extends React.Component {
	 *   constructor(props) {
	 *     super(props);
	 *     // Install all methods
	 *     componentUtil.install(this);
	 *     // Or only install select methods
	 *     //componentUtil.install(this, ['getClassName']);
	 *   }
	 * }
	 *
	 */
	function install(context, methods) {
	  if (typeof context !== 'object') {
	    throw new Error('"context" must be an object');
	  }
	  if (typeof methods === 'undefined') {
	    methods = _Object$keys(installMethods);
	  }
	  if (!Array.isArray(methods)) {
	    throw new Error('"methods" must be an array');
	  }
	  methods.forEach(function (method) {
	    var hastMethod = installMethods.hasOwnProperty(method);
	    var isFunction = typeof installMethods[method] === 'function';
	    if (!hastMethod || !isFunction) {
	      throw new Error('"' + method + '" is not a valid util method');
	    }
	    // Add the method prefixed with a "$" and bind it to the context
	    context['$' + method] = installMethods[method].bind(context);
	  });
	}

	/**
	 * Prefixes all classes in className with globals.cssPrefix.
	 */
	function prefix(className) {
	  return typeof className === 'string' ? className.split(/\s+/).map(function (c) {
	    // XXX: Leaving this debug utility here to dump out classes for a bit!
	    //
	    // if (whitelist.indexOf(`.${c}`) >= 0) {
	    //   console.log('DEBUG:', c, '=>', `${globals.cssPrefix}${c}`);
	    // } else if (c.indexOf(globals.cssPrefix) === 0) {
	    //   console.log('DEBUG:', c, '(already done)');
	    // } else {
	    //   console.log('DEBUG:', c, '!!! undefined !!!');
	    // }
	    return _generatedWhitelist2['default'].indexOf('.' + c) >= 0 ? '' + _app_modulesGlobal2['default'].cssPrefix + '' + c : c;
	  }).join(' ') : className;
	}

	var PropTypes = {

	  /**
	   * Verify that a component has valid flavors
	   *
	   * @param {...string} flavor
	   * @returns {function}
	   *
	   * @example
	   * Component.propTypes = {
	   *   flavor: componentUtil.PropTypes.flavor(
	   *      'brand', 'inverse', 'stateful', 'hint', 'small'
	   *   )
	   * };
	   *
	   * <Button flavor="brand" />
	   * <Button flavor="brand,small" />
	   */
	  flavor: function flavor() {
	    var validFlavors = Array.prototype.slice.call(arguments);
	    return function (props, propName, componentName) {
	      var flavor = props[propName];
	      if (typeof flavor !== 'undefined' && typeof flavor !== 'string') {
	        return new Error('"' + propName + '" must be a string"');
	      }
	      if (typeof flavor === 'string') {
	        var flavors = flavor.split(',');
	        var invalidFlavors = flavors.filter(function (f) {
	          return validFlavors.indexOf(f) === -1;
	        });
	        if (invalidFlavors.length > 0) {
	          return new Error('\n            "' + invalidFlavors[0] + '" is not a valid ' + componentName + ' flavor.\n          ');
	        }
	      }
	    };
	  }
	};

	exports['default'] = {
	  install: install,
	  PropTypes: PropTypes,
	  createChainedFunction: _createChainedFunction2['default'],
	  flatMapChildren: flatMapChildren,
	  hasChild: hasChild,
	  prefix: prefix,
	  textContent: textContent
	};
	module.exports = exports['default'];

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(176), __esModule: true };

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(177);
	module.exports = __webpack_require__(5).core.Object.keys;

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(5)
	  , $def     = __webpack_require__(15)
	  , isObject = $.isObject
	  , toObject = $.toObject;
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
	  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
	, function(KEY, ID){
	  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
	    , forced = 0
	    , method = {};
	  method[KEY] = ID == 0 ? function freeze(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it){
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it){
	    return fn(Object($.assertDefined(it)));
	  } : ID == 8 ? function keys(it){
	    return fn(toObject(it));
	  } : __webpack_require__(178).get;
	  try {
	    fn('z');
	  } catch(e){
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var $ = __webpack_require__(5)
	  , toString = {}.toString
	  , getNames = $.getNames;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	function getWindowNames(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	}

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames($.toObject(it));
	};

/***/ },
/* 179 */,
/* 180 */,
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	

	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @param {function} one
	 * @param {function} two
	 * @returns {function|null}
	 */
	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	function createChainedFunction(one, two) {
	  var hasOne = typeof one === 'function';
	  var hasTwo = typeof two === 'function';

	  if (!hasOne && !hasTwo) {
	    return null;
	  }
	  if (!hasOne) {
	    return two;
	  }
	  if (!hasTwo) {
	    return one;
	  }

	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	exports['default'] = createChainedFunction;
	module.exports = exports['default'];

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = {
	  abbreviatedName: 'SLDS',
	  cssPrefix: 'slds-',
	  displayName: 'Lightning Design System',
	  displayNameShort: 'Design System',
	  filenamePrefix: 'slds',
	  localyticsHostWhitelist: ['getslds.com', 'www.getslds.com', 'lightningdesignsystem.com', 'www.lightningdesignsystem.com', 'lightning-design-system.herokuapp.com', 'salesforce.com', 'www.salesforce.com'],
	  managedPackageUrl: 'https://login.salesforce.com/packaging/installPackage.apexp?p0=04t61000000DVio',
	  moduleName: 'salesforce-lightning-design-system',
	  resetWrappingClass: '.slds',
	  zipName: function zipName(version) {
	    return this.moduleName + '-' + version + '.zip';
	  },
	  downloadPath: function downloadPath(version) {
	    return '/assets/downloads/' + this.zipName(version);
	  },

	  /**
	   * Determines internal/external user based on cookie.
	   *
	   * @returns {string|false} 'internal' or 'external'
	   */
	  userType: function userType(cookie) {
	    var matches = cookie.match(/usertype=(\w+)/);
	    return matches && matches[1];
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(8)["default"];

	_Object$defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = [".active", ".align-bottom", ".align-content-center", ".align-middle", ".align-top", ".assistive-text", ".avatar", ".avatar--circle", ".avatar--large", ".avatar--medium", ".avatar--small", ".avatar--x-small", ".badge", ".box", ".box--small", ".box--x-small", ".breadcrumb", ".button", ".button--brand", ".button--hint", ".button--icon-bare", ".button--icon-border", ".button--icon-border-filled", ".button--icon-border-small", ".button--icon-container", ".button--icon-inverse", ".button--icon-more", ".button--icon-small", ".button--inverse", ".button--last", ".button--neutral", ".button--small", ".button-group", ".button-space-left", ".button__icon", ".button__icon--hint", ".button__icon--inverse", ".button__icon--large", ".button__icon--left", ".button__icon--right", ".button__icon--small", ".button__icon--stateful", ".button__icon--x-small", ".card", ".card--empty", ".card__body", ".card__footer", ".card__header", ".cell-shrink", ".cell-wrap", ".checkbox", ".checkbox--faux", ".clear", ".clearfix", ".col", ".col--padded", ".col--padded-large", ".col--padded-medium", ".col-rule--bottom", ".col-rule--left", ".col-rule--right", ".col-rule--top", ".collapsed", ".container--center", ".container--fluid", ".container--large", ".container--left", ".container--medium", ".container--right", ".container--small", ".datepicker", ".datepicker--time", ".datepicker--time__list", ".datepicker__filter", ".datepicker__filter--month", ".day", ".disabled-text", ".dl--horizontal__detail", ".dl--horizontal__label", ".dl--inline", ".dl--inline__detail", ".dl--inline__label", ".dropdown", ".dropdown--actions", ".dropdown--large", ".dropdown--left", ".dropdown--medium", ".dropdown--nubbin-top", ".dropdown--right", ".dropdown--small", ".dropdown-trigger", ".dropdown__header", ".dropdown__item", ".expanded", ".fade-in-open", ".fall-into-ground", ".float--left", ".float--right", ".form--compound", ".form--compound--horizontal", ".form--horizontal", ".form--inline", ".form--stacked", ".form-element", ".form-element__control", ".form-element__help", ".form-element__helper", ".form-element__label", ".form-element__label--top", ".form-element__row", ".form-element__static", ".grid", ".grid--align-center", ".grid--align-space", ".grid--align-spread", ".grid--frame", ".grid--overflow", ".grid--pull-padded", ".grid--pull-padded-large", ".grid--pull-padded-medium", ".grid--vertical", ".grow", ".grow-none", ".has-alert", ".has-block-links", ".has-cards", ".has-divider", ".has-dividers", ".has-error", ".has-flexi-truncate", ".has-icon", ".has-icon--left", ".has-icon--left-right", ".has-icon--right", ".has-multi-row-selection", ".has-selection", ".hidden", ".hide", ".hint-parent", ".icon", ".icon--large", ".icon--left", ".icon--right", ".icon--small", ".icon--x-small", ".icon-action-announcement", ".icon-action-apex", ".icon-action-approval", ".icon-action-back", ".icon-action-call", ".icon-action-canvasapp", ".icon-action-clone", ".icon-action-close", ".icon-action-concur", ".icon-action-default-custom-object", ".icon-action-defer", ".icon-action-delete", ".icon-action-description", ".icon-action-dial-in", ".icon-action-docusign", ".icon-action-dropbox", ".icon-action-edit", ".icon-action-edit-group", ".icon-action-email", ".icon-action-evernote", ".icon-action-fallback", ".icon-action-filter", ".icon-action-flow", ".icon-action-follow", ".icon-action-following", ".icon-action-goal", ".icon-action-google-news", ".icon-action-join-group", ".icon-action-lead-convert", ".icon-action-leave-group", ".icon-action-log-a-call", ".icon-action-log-this-event", ".icon-action-map", ".icon-action-more", ".icon-action-new", ".icon-action-new-account", ".icon-action-new-campaign", ".icon-action-new-case", ".icon-action-new-child-case", ".icon-action-new-contact", ".icon-action-new-custom-1", ".icon-action-new-custom-10", ".icon-action-new-custom-100", ".icon-action-new-custom-11", ".icon-action-new-custom-12", ".icon-action-new-custom-13", ".icon-action-new-custom-14", ".icon-action-new-custom-15", ".icon-action-new-custom-16", ".icon-action-new-custom-17", ".icon-action-new-custom-18", ".icon-action-new-custom-19", ".icon-action-new-custom-2", ".icon-action-new-custom-20", ".icon-action-new-custom-21", ".icon-action-new-custom-22", ".icon-action-new-custom-23", ".icon-action-new-custom-24", ".icon-action-new-custom-25", ".icon-action-new-custom-26", ".icon-action-new-custom-27", ".icon-action-new-custom-28", ".icon-action-new-custom-29", ".icon-action-new-custom-3", ".icon-action-new-custom-30", ".icon-action-new-custom-31", ".icon-action-new-custom-32", ".icon-action-new-custom-33", ".icon-action-new-custom-34", ".icon-action-new-custom-35", ".icon-action-new-custom-36", ".icon-action-new-custom-37", ".icon-action-new-custom-38", ".icon-action-new-custom-39", ".icon-action-new-custom-4", ".icon-action-new-custom-40", ".icon-action-new-custom-41", ".icon-action-new-custom-42", ".icon-action-new-custom-43", ".icon-action-new-custom-44", ".icon-action-new-custom-45", ".icon-action-new-custom-46", ".icon-action-new-custom-47", ".icon-action-new-custom-48", ".icon-action-new-custom-49", ".icon-action-new-custom-5", ".icon-action-new-custom-50", ".icon-action-new-custom-51", ".icon-action-new-custom-52", ".icon-action-new-custom-53", ".icon-action-new-custom-54", ".icon-action-new-custom-55", ".icon-action-new-custom-56", ".icon-action-new-custom-57", ".icon-action-new-custom-58", ".icon-action-new-custom-59", ".icon-action-new-custom-6", ".icon-action-new-custom-60", ".icon-action-new-custom-61", ".icon-action-new-custom-62", ".icon-action-new-custom-63", ".icon-action-new-custom-64", ".icon-action-new-custom-65", ".icon-action-new-custom-66", ".icon-action-new-custom-67", ".icon-action-new-custom-68", ".icon-action-new-custom-69", ".icon-action-new-custom-7", ".icon-action-new-custom-70", ".icon-action-new-custom-71", ".icon-action-new-custom-72", ".icon-action-new-custom-73", ".icon-action-new-custom-74", ".icon-action-new-custom-75", ".icon-action-new-custom-76", ".icon-action-new-custom-77", ".icon-action-new-custom-78", ".icon-action-new-custom-79", ".icon-action-new-custom-8", ".icon-action-new-custom-80", ".icon-action-new-custom-81", ".icon-action-new-custom-82", ".icon-action-new-custom-83", ".icon-action-new-custom-84", ".icon-action-new-custom-85", ".icon-action-new-custom-86", ".icon-action-new-custom-87", ".icon-action-new-custom-88", ".icon-action-new-custom-89", ".icon-action-new-custom-9", ".icon-action-new-custom-90", ".icon-action-new-custom-91", ".icon-action-new-custom-92", ".icon-action-new-custom-93", ".icon-action-new-custom-94", ".icon-action-new-custom-95", ".icon-action-new-custom-96", ".icon-action-new-custom-97", ".icon-action-new-custom-98", ".icon-action-new-custom-99", ".icon-action-new-custom-object", ".icon-action-new-event", ".icon-action-new-group", ".icon-action-new-lead", ".icon-action-new-note", ".icon-action-new-opportunity", ".icon-action-new-task", ".icon-action-notebook", ".icon-action-office-365", ".icon-action-opportunity-competitor", ".icon-action-opportunity-line-item", ".icon-action-opportunity-team-member", ".icon-action-preview", ".icon-action-priority", ".icon-action-question-post-action", ".icon-action-quote", ".icon-action-record", ".icon-action-reject", ".icon-action-search", ".icon-action-share-file", ".icon-action-share-link", ".icon-action-share-poll", ".icon-action-share-post", ".icon-action-share-thanks", ".icon-action-social-post", ".icon-action-sort", ".icon-action-submit-for-approval", ".icon-action-update", ".icon-action-update-status", ".icon-action-web-link", ".icon-custom-1", ".icon-custom-10", ".icon-custom-100", ".icon-custom-11", ".icon-custom-12", ".icon-custom-13", ".icon-custom-14", ".icon-custom-15", ".icon-custom-16", ".icon-custom-17", ".icon-custom-18", ".icon-custom-19", ".icon-custom-2", ".icon-custom-20", ".icon-custom-21", ".icon-custom-22", ".icon-custom-23", ".icon-custom-24", ".icon-custom-25", ".icon-custom-26", ".icon-custom-27", ".icon-custom-28", ".icon-custom-29", ".icon-custom-3", ".icon-custom-30", ".icon-custom-31", ".icon-custom-32", ".icon-custom-33", ".icon-custom-34", ".icon-custom-35", ".icon-custom-36", ".icon-custom-37", ".icon-custom-38", ".icon-custom-39", ".icon-custom-4", ".icon-custom-40", ".icon-custom-41", ".icon-custom-42", ".icon-custom-43", ".icon-custom-44", ".icon-custom-45", ".icon-custom-46", ".icon-custom-47", ".icon-custom-48", ".icon-custom-49", ".icon-custom-5", ".icon-custom-50", ".icon-custom-51", ".icon-custom-52", ".icon-custom-53", ".icon-custom-54", ".icon-custom-55", ".icon-custom-56", ".icon-custom-57", ".icon-custom-58", ".icon-custom-59", ".icon-custom-6", ".icon-custom-60", ".icon-custom-61", ".icon-custom-62", ".icon-custom-63", ".icon-custom-64", ".icon-custom-65", ".icon-custom-66", ".icon-custom-67", ".icon-custom-68", ".icon-custom-69", ".icon-custom-7", ".icon-custom-70", ".icon-custom-71", ".icon-custom-72", ".icon-custom-73", ".icon-custom-74", ".icon-custom-75", ".icon-custom-76", ".icon-custom-77", ".icon-custom-78", ".icon-custom-79", ".icon-custom-8", ".icon-custom-80", ".icon-custom-81", ".icon-custom-82", ".icon-custom-83", ".icon-custom-84", ".icon-custom-85", ".icon-custom-86", ".icon-custom-87", ".icon-custom-88", ".icon-custom-89", ".icon-custom-9", ".icon-custom-90", ".icon-custom-91", ".icon-custom-92", ".icon-custom-93", ".icon-custom-94", ".icon-custom-95", ".icon-custom-96", ".icon-custom-97", ".icon-custom-98", ".icon-custom-99", ".icon-standard-account", ".icon-standard-answer-best", ".icon-standard-answer-private", ".icon-standard-answer-public", ".icon-standard-approval", ".icon-standard-apps", ".icon-standard-article", ".icon-standard-avatar", ".icon-standard-avatar-loading", ".icon-standard-calibration", ".icon-standard-campaign", ".icon-standard-campaign-members", ".icon-standard-canvas", ".icon-standard-case", ".icon-standard-case-change-status", ".icon-standard-case-comment", ".icon-standard-case-transcript", ".icon-standard-coaching", ".icon-standard-concur", ".icon-standard-connected-apps-admins", ".icon-standard-contact", ".icon-standard-contract", ".icon-standard-custom", ".icon-standard-dashboard", ".icon-standard-default", ".icon-standard-drafts", ".icon-standard-dropbox", ".icon-standard-email", ".icon-standard-email-chatter", ".icon-standard-empty", ".icon-standard-endorsement", ".icon-standard-event", ".icon-standard-evernote", ".icon-standard-feed", ".icon-standard-feedback", ".icon-standard-file", ".icon-standard-generic-loading", ".icon-standard-goals", ".icon-standard-group-loading", ".icon-standard-groups", ".icon-standard-insights", ".icon-standard-lead", ".icon-standard-link", ".icon-standard-log-a-call", ".icon-standard-log-a-call-chatter", ".icon-standard-marketing-actions", ".icon-standard-marketing-resources", ".icon-standard-metrics", ".icon-standard-note", ".icon-standard-opportunity", ".icon-standard-orders", ".icon-standard-people", ".icon-standard-performance", ".icon-standard-photo", ".icon-standard-poll", ".icon-standard-portal", ".icon-standard-post", ".icon-standard-product", ".icon-standard-question-best", ".icon-standard-question-feed", ".icon-standard-quotes", ".icon-standard-recent", ".icon-standard-record", ".icon-standard-related-list", ".icon-standard-report", ".icon-standard-scan-card", ".icon-standard-skill-entity", ".icon-standard-social-post", ".icon-standard-solution", ".icon-standard-task", ".icon-standard-team-member", ".icon-standard-thanks", ".icon-standard-thanks-loading", ".icon-standard-today", ".icon-standard-topic", ".icon-standard-unmatched", ".icon-standard-user", ".icon-text-default", ".icon-text-warning", ".icon__container", ".icon__container--circle", ".input", ".input--bare", ".input--big", ".input--small", ".input-has-icon", ".input-has-icon--left", ".input-has-icon--right", ".input__icon", ".is-focused", ".is-hovered", ".is-interactive", ".is-nested", ".is-open", ".is-required", ".is-selected", ".is-selected-multi", ".is-sortable", ".is-today", ".large-order--1", ".large-order--10", ".large-order--11", ".large-order--12", ".large-order--2", ".large-order--3", ".large-order--4", ".large-order--5", ".large-order--6", ".large-order--7", ".large-order--8", ".large-order--9", ".large-show", ".large-show--inline", ".large-show--inline-block", ".large-size--1-of-1", ".large-size--1-of-12", ".large-size--1-of-2", ".large-size--1-of-3", ".large-size--1-of-4", ".large-size--1-of-5", ".large-size--1-of-6", ".large-size--10-of-12", ".large-size--11-of-12", ".large-size--12-of-12", ".large-size--2-of-12", ".large-size--2-of-2", ".large-size--2-of-3", ".large-size--2-of-4", ".large-size--2-of-5", ".large-size--2-of-6", ".large-size--3-of-12", ".large-size--3-of-3", ".large-size--3-of-4", ".large-size--3-of-5", ".large-size--3-of-6", ".large-size--4-of-12", ".large-size--4-of-4", ".large-size--4-of-5", ".large-size--4-of-6", ".large-size--5-of-12", ".large-size--5-of-5", ".large-size--5-of-6", ".large-size--6-of-12", ".large-size--6-of-6", ".large-size--7-of-12", ".large-size--8-of-12", ".large-size--9-of-12", ".list--dotted", ".list--horizontal", ".list--horizontal-large", ".list--ordered", ".list--vertical", ".list__item", ".lookup", ".lookup__control", ".lookup__item", ".lookup__list", ".lookup__menu", ".m-around--large", ".m-around--medium", ".m-around--small", ".m-around--x-large", ".m-around--x-small", ".m-around--xx-large", ".m-around--xx-small", ".m-around--xxx-small", ".m-bottom--large", ".m-bottom--medium", ".m-bottom--small", ".m-bottom--x-large", ".m-bottom--x-small", ".m-bottom--xx-large", ".m-bottom--xx-small", ".m-bottom--xxx-small", ".m-horizontal--large", ".m-horizontal--medium", ".m-horizontal--small", ".m-horizontal--x-large", ".m-horizontal--x-small", ".m-horizontal--xx-large", ".m-horizontal--xx-small", ".m-horizontal--xxx-small", ".m-left--large", ".m-left--medium", ".m-left--small", ".m-left--x-large", ".m-left--x-small", ".m-left--xx-large", ".m-left--xx-small", ".m-left--xxx-small", ".m-right--large", ".m-right--medium", ".m-right--small", ".m-right--x-large", ".m-right--x-small", ".m-right--xx-large", ".m-right--xx-small", ".m-right--xxx-small", ".m-top--large", ".m-top--medium", ".m-top--small", ".m-top--x-large", ".m-top--x-small", ".m-top--xx-large", ".m-top--xx-small", ".m-top--xxx-small", ".m-vertical--large", ".m-vertical--medium", ".m-vertical--small", ".m-vertical--x-large", ".m-vertical--x-small", ".m-vertical--xx-large", ".m-vertical--xx-small", ".m-vertical--xxx-small", ".max-medium-hide", ".max-medium-table--stacked", ".max-medium-table--stacked-horizontal", ".max-small-hide", ".max-x-small-hide", ".media", ".media--center", ".media--double", ".media--large", ".media--responsive", ".media--reverse", ".media--small", ".media--timeline", ".media__body", ".media__figure", ".media__figure--reverse", ".medium-order--1", ".medium-order--2", ".medium-order--3", ".medium-order--4", ".medium-order--5", ".medium-order--6", ".medium-show", ".medium-show--inline", ".medium-show--inline-block", ".medium-show-only", ".medium-show-only--inline", ".medium-show-only--inline-block", ".medium-size--1-of-1", ".medium-size--1-of-2", ".medium-size--1-of-3", ".medium-size--1-of-4", ".medium-size--1-of-5", ".medium-size--1-of-6", ".medium-size--2-of-2", ".medium-size--2-of-3", ".medium-size--2-of-4", ".medium-size--2-of-5", ".medium-size--2-of-6", ".medium-size--3-of-3", ".medium-size--3-of-4", ".medium-size--3-of-5", ".medium-size--3-of-6", ".medium-size--4-of-4", ".medium-size--4-of-5", ".medium-size--4-of-6", ".medium-size--5-of-5", ".medium-size--5-of-6", ".medium-size--6-of-6", ".modal", ".modal--large", ".modal-backdrop", ".modal-backdrop--open", ".modal__close", ".modal__container", ".modal__container-reset", ".modal__content", ".modal__footer", ".modal__footer--directional", ".modal__header", ".nested", ".no-flex", ".no-row-hover", ".no-space", ".not-selected", ".notify", ".notify--alert", ".notify--toast", ".notify-container", ".notify__close", ".nowrap", ".nowrap--large", ".nowrap--medium", ".nowrap--small", ".nubbin--bottom", ".nubbin--left", ".nubbin--right", ".nubbin--top", ".order--1", ".order--10", ".order--11", ".order--2", ".order--3", ".order--4", ".order--5", ".order--6", ".order--7", ".order--8", ".order--9", ".p-around--large", ".p-around--medium", ".p-around--small", ".p-around--x-large", ".p-around--x-small", ".p-around--xx-large", ".p-around--xx-small", ".p-around--xxx-small", ".p-bottom--large", ".p-bottom--medium", ".p-bottom--small", ".p-bottom--x-large", ".p-bottom--x-small", ".p-bottom--xx-large", ".p-bottom--xx-small", ".p-bottom--xxx-small", ".p-horizontal--large", ".p-horizontal--medium", ".p-horizontal--small", ".p-horizontal--x-large", ".p-horizontal--x-small", ".p-horizontal--xx-large", ".p-horizontal--xx-small", ".p-horizontal--xxx-small", ".p-left--large", ".p-left--medium", ".p-left--small", ".p-left--x-large", ".p-left--x-small", ".p-left--xx-large", ".p-left--xx-small", ".p-left--xxx-small", ".p-right--large", ".p-right--medium", ".p-right--small", ".p-right--x-large", ".p-right--x-small", ".p-right--xx-large", ".p-right--xx-small", ".p-right--xxx-small", ".p-top--large", ".p-top--medium", ".p-top--small", ".p-top--x-large", ".p-top--x-small", ".p-top--xx-large", ".p-top--xx-small", ".p-top--xxx-small", ".p-vertical--large", ".p-vertical--medium", ".p-vertical--small", ".p-vertical--x-large", ".p-vertical--x-small", ".p-vertical--xx-large", ".p-vertical--xx-small", ".p-vertical--xxx-small", ".page-header", ".page-header__detail-row", ".picklist", ".picklist--draggable", ".picklist__item", ".picklist__label", ".picklist__options", ".pill", ".pill--bare", ".pill__label", ".popover", ".popover__body", ".popover__content", ".popover__header", ".radio", ".radio--faux", ".rise-from-ground", ".row-action", ".row-select", ".scrollable--x", ".scrollable--y", ".section-group--is-closed", ".section-title", ".select", ".show", ".show--inline", ".show--inline-block", ".shrink", ".shrink-none", ".size--1-of-1", ".size--1-of-12", ".size--1-of-2", ".size--1-of-3", ".size--1-of-4", ".size--1-of-5", ".size--1-of-6", ".size--10-of-12", ".size--11-of-12", ".size--12-of-12", ".size--2-of-12", ".size--2-of-2", ".size--2-of-3", ".size--2-of-4", ".size--2-of-5", ".size--2-of-6", ".size--3-of-12", ".size--3-of-3", ".size--3-of-4", ".size--3-of-5", ".size--3-of-6", ".size--4-of-12", ".size--4-of-4", ".size--4-of-5", ".size--4-of-6", ".size--5-of-12", ".size--5-of-5", ".size--5-of-6", ".size--6-of-12", ".size--6-of-6", ".size--7-of-12", ".size--8-of-12", ".size--9-of-12", ".slide-down-cancel", ".slide-from-bottom-to-top", ".slide-from-left-to-right", ".slide-from-right-to-left", ".slide-from-top-to-bottom", ".slide-up-open", ".slide-up-saving", ".small-order--1", ".small-order--2", ".small-show", ".small-show--inline", ".small-show--inline-block", ".small-show-only", ".small-show-only--inline", ".small-show-only--inline-block", ".small-size--1-of-1", ".small-size--1-of-2", ".small-size--1-of-3", ".small-size--1-of-4", ".small-size--1-of-5", ".small-size--1-of-6", ".small-size--2-of-2", ".small-size--2-of-3", ".small-size--2-of-4", ".small-size--2-of-5", ".small-size--2-of-6", ".small-size--3-of-3", ".small-size--3-of-4", ".small-size--3-of-5", ".small-size--3-of-6", ".small-size--4-of-4", ".small-size--4-of-5", ".small-size--4-of-6", ".small-size--5-of-5", ".small-size--5-of-6", ".small-size--6-of-6", ".spinner--large", ".spinner--medium", ".spinner--small", ".table", ".table--bordered", ".table--striped", ".tabs--default", ".tabs--default__nav", ".tabs--scoped", ".tabs--scoped__nav", ".tabs__content", ".tabs__item", ".text-align--center", ".text-align--left", ".text-align--right", ".text-body--regular", ".text-body--small", ".text-center", ".text-heading--label", ".text-heading--large", ".text-heading--medium", ".text-heading--small", ".text-longform", ".text-not-selected", ".text-right", ".text-selected", ".text-selected-focus", ".textarea", ".theme--alert-texture", ".theme--alt-inverse", ".theme--default", ".theme--error", ".theme--inverse", ".theme--inverse-text", ".theme--offline", ".theme--shade", ".theme--success", ".theme--warning", ".tile", ".tile--board", ".tile--board__icon", ".tile__detail", ".tile__meta", ".tile__title", ".timeline", ".timeline__actions", ".timeline__date", ".timeline__icon", ".timeline__item", ".timeline__media--call", ".timeline__media--email", ".timeline__media--event", ".timeline__media--task", ".tooltip", ".tooltip__body", ".tooltip__content", ".transition-hide", ".transition-show", ".tree", ".tree-container", ".tree__branch", ".tree__group", ".tree__item", ".truncate", ".type-focus", ".visible", ".wrap", ".x-small-order--1", ".x-small-order--2", ".x-small-show", ".x-small-show--inline", ".x-small-show--inline-block", ".x-small-show-only", ".x-small-show-only--inline", ".x-small-show-only--inline-block", ".x-small-size--1-of-1", ".x-small-size--1-of-2", ".x-small-size--1-of-3", ".x-small-size--1-of-4", ".x-small-size--1-of-5", ".x-small-size--1-of-6", ".x-small-size--2-of-2", ".x-small-size--2-of-3", ".x-small-size--2-of-4", ".x-small-size--2-of-5", ".x-small-size--2-of-6", ".x-small-size--3-of-3", ".x-small-size--3-of-4", ".x-small-size--3-of-5", ".x-small-size--3-of-6", ".x-small-size--4-of-4", ".x-small-size--4-of-5", ".x-small-size--4-of-6", ".x-small-size--5-of-5", ".x-small-size--5-of-6", ".x-small-size--6-of-6"];
	module.exports = exports["default"];

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _Object$assign = __webpack_require__(12)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _app_modulesGlobal = __webpack_require__(182);

	var _app_modulesGlobal2 = _interopRequireDefault(_app_modulesGlobal);

	/**
	 * Only allows production-level logging.
	 */
	function canLogEvent() {
	  return _app_modulesGlobal2['default'].userType(document.cookie) && window.ll && window.location && _app_modulesGlobal2['default'].localyticsHostWhitelist.indexOf(window.location.host) >= 0;
	}

	/**
	 * Normalizes pathname
	 */
	function normalizedLocationPathname() {
	  return (window.location.pathname || '').replace(/\/$/, '');
	}

	/**
	 * Records a page visit + screen flow.
	 */
	function logCurrentPageVisit() {
	  if (canLogEvent()) {
	    window.ll('tagScreen', normalizedLocationPathname());
	  }
	}

	/**
	 * Records a CTA event.
	 *
	 * @param {string} type - Which CTA was interacted with?
	 * @param {object} extraValues - Optional extra tracking parameters
	 */
	function logCTAEvent(type, extraValues) {
	  if (canLogEvent()) {
	    var values = _Object$assign({ 'path': normalizedLocationPathname(), 'type': type, 'usertype': _app_modulesGlobal2['default'].userType(document.cookie) }, extraValues);
	    window.ll('tagEvent', 'CTA', values);
	  }
	}

	/**
	 * Records an input event.
	 *
	 * @param {string} type - Which CTA was interacted with?
	 * @param {object} extraValues - Optional extra tracking parameters
	 */
	function logInputEvent(type, extraValues) {
	  if (canLogEvent()) {
	    var values = _Object$assign({ 'path': normalizedLocationPathname(), 'type': type, 'usertype': _app_modulesGlobal2['default'].userType(document.cookie) }, extraValues);
	    window.ll('tagEvent', 'Input', values);
	  }
	}

	/**
	 * Records a download event.
	 *
	 * @param {string} type - Which file was downloaded?
	 */
	function logDownloadEvent(type) {
	  if (canLogEvent()) {
	    window.ll('tagEvent', 'Download', { 'path': normalizedLocationPathname(), 'type': type, 'usertype': _app_modulesGlobal2['default'].userType(document.cookie) });
	  }
	}

	exports['default'] = {
	  logCurrentPageVisit: logCurrentPageVisit,
	  logCTAEvent: logCTAEvent,
	  logDownloadEvent: logDownloadEvent,
	  logInputEvent: logInputEvent
	};
	module.exports = exports['default'];

/***/ },
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _generatedUi = __webpack_require__(214);

	var _generatedUi2 = _interopRequireDefault(_generatedUi);

	var _sitemapUtils = __webpack_require__(215);

	exports['default'] = new _sitemapUtils.Router().map(function () {

	  this.route('home', { path: '/' });

	  this.resource('getting-started', function () {
	    this.route('visualforce');
	    this.route('lightning');
	    this.route('getting-started-node-js');
	  });

	  this.resource('design', function () {
	    this.route('layout');
	    this.route('loading');
	    this.route('navigation');
	    this.route('motion');
	  });

	  this.resource('components', function () {
	    var _this = this;

	    _lodash2['default'].find(_generatedUi2['default'], { id: 'components' }).components.forEach(function (component) {
	      _this.route(component.id, {
	        component: component
	      });
	    });
	    this.resource('utilities', function () {
	      var _this2 = this;

	      _lodash2['default'].find(_generatedUi2['default'], { id: 'utilities' }).components.forEach(function (component) {
	        _this2.route(component.id, {
	          component: component
	        });
	      });
	    });
	  });

	  this.resource('resources', function () {
	    this.route('downloads');
	    this.route('icons');
	    this.route('tokens');
	    this.route('branding');
	    this.route('lightning-svg-icon-component-helper');
	  });

	  this.resource('native', function () {
	    this.route('ios');
	    this.route('android');
	  });

	  this.route('faq');
	  this.route('release-notes');
	});
	module.exports = exports['default'];

/***/ },
/* 214 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [{
	  "id": "components",
	  "title": "Components",
	  "path": "components",
	  "components": [{
	    "id": "activity-timeline",
	    "title": "Activity Timeline",
	    "path": "components/activity-timeline",
	    "status": "prototype",
	    "classBase": "timeline",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/activity-timeline/flavors/base",
	      "status": "prototype",
	      "dependencies": ["core/grid-system", "core/forms/checkbox", "core/media-objects", "core/icons", "utilities/layout", "utilities/themes", "utilities/truncation", "utilities/sizing"],
	      "showFormFactors": ["large"],
	      "uid": "components-activity-timeline-base",
	      "classBase": "timeline",
	      "examplePath": "components/activity-timeline/flavors/base/index.react.example.jsx"
	    }],
	    "dependencies": ["core/media-objects", "core/icons"],
	    "uid": "components-activity-timeline"
	  }, {
	    "id": "badges",
	    "title": "Badges",
	    "path": "components/badges",
	    "status": "dev-ready",
	    "classBase": "badge",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/badges/flavors/base",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "components-badges-base",
	      "classBase": "badge",
	      "examplePath": "components/badges/flavors/base/index.react.example.jsx"
	    }],
	    "uid": "components-badges"
	  }, {
	    "id": "breadcrumbs",
	    "title": "Breadcrumbs",
	    "path": "components/breadcrumbs",
	    "classBase": "breadcrumb",
	    "status": "dev-ready",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/breadcrumbs/flavors/base",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "components-breadcrumbs-base",
	      "classBase": "breadcrumb",
	      "examplePath": "components/breadcrumbs/flavors/base/index.react.example.jsx"
	    }],
	    "uid": "components-breadcrumbs"
	  }, {
	    "id": "buttons",
	    "title": "Buttons",
	    "path": "components/buttons",
	    "status": "dev-ready",
	    "classBase": "button",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/buttons/flavors/base",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-base",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "neutral",
	      "title": "Neutral",
	      "path": "components/buttons/flavors/neutral",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons"],
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-neutral",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/neutral/index.react.example.jsx"
	    }, {
	      "id": "neutral-icon",
	      "title": "Neutral Icon",
	      "path": "components/buttons/flavors/neutral-icon",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons", "components/buttons/flavors/neutral", "components/buttons/flavors/icon", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-neutral-icon",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/neutral-icon/index.react.example.jsx"
	    }, {
	      "id": "brand",
	      "title": "Brand",
	      "path": "components/buttons/flavors/brand",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons"],
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-brand",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/brand/index.react.example.jsx"
	    }, {
	      "id": "inverse",
	      "title": "Inverse",
	      "path": "components/buttons/flavors/inverse",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons"],
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-inverse",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/inverse/index.react.example.jsx"
	    }, {
	      "id": "stateful",
	      "title": "Stateful",
	      "path": "components/buttons/flavors/stateful",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons", "components/buttons/flavors/neutral", "components/buttons/flavors/icon", "components/buttons/flavors/neutral-icon", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-stateful",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/stateful/index.react.example.jsx"
	    }, {
	      "id": "stateful-inverse",
	      "title": "Stateful Inverse",
	      "path": "components/buttons/flavors/stateful-inverse",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons", "components/buttons/flavors/inverse", "components/buttons/flavors/icon", "core/icons", "helpers/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-stateful-inverse",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/stateful-inverse/index.react.example.jsx"
	    }, {
	      "id": "icon",
	      "title": "Icon",
	      "path": "components/buttons/flavors/icon",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons", "core/icons", "helpers/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-icon",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/icon/index.react.example.jsx"
	    }, {
	      "id": "icon-sizing",
	      "title": "Icon Sizing",
	      "path": "components/buttons/flavors/icon-sizing",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons", "components/buttons/flavors/icon", "core/icons", "helpers/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-icon-sizing",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/icon-sizing/index.react.example.jsx"
	    }, {
	      "id": "icon-more",
	      "title": "Icon More",
	      "path": "components/buttons/flavors/icon-more",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons", "components/buttons/flavors/neutral", "components/buttons/flavors/icon", "core/icons", "helpers/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-icon-more",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/icon-more/index.react.example.jsx"
	    }, {
	      "id": "icon-stateful",
	      "title": "Icon Stateful",
	      "path": "components/buttons/flavors/icon-stateful",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons", "components/buttons/flavors/icon", "core/icons", "helpers/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-icon-stateful",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/icon-stateful/index.react.example.jsx"
	    }, {
	      "id": "icon-inverse",
	      "title": "Icon Inverse",
	      "path": "components/buttons/flavors/icon-inverse",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons", "components/buttons/flavors/icon", "core/icons", "helpers/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-icon-inverse",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/icon-inverse/index.react.example.jsx"
	    }, {
	      "id": "hint",
	      "title": "Hint",
	      "path": "components/buttons/flavors/hint",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons", "components/buttons/flavors/icon", "core/icons", "helpers/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-buttons-hint",
	      "classBase": "button",
	      "examplePath": "components/buttons/flavors/hint/index.react.example.jsx"
	    }],
	    "dependencies": ["core/icons", "helpers/visibility"],
	    "uid": "components-buttons"
	  }, {
	    "id": "button-groups",
	    "title": "Button Groups",
	    "path": "components/button-groups",
	    "status": "dev-ready",
	    "classBase": "button-group",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/button-groups/flavors/base",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons", "components/buttons/flavors/neutral", "core/icons", "helpers/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-button-groups-base",
	      "classBase": "button-group",
	      "examplePath": "components/button-groups/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "inverse",
	      "title": "Inverse",
	      "path": "components/button-groups/flavors/inverse",
	      "status": "dev-ready",
	      "dependencies": ["components/buttons", "components/buttons/flavors/inverse", "components/buttons/flavors/icons", "components/button-group", "core/icons", "helpers/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-button-groups-inverse",
	      "classBase": "button-group",
	      "examplePath": "components/button-groups/flavors/inverse/index.react.example.jsx"
	    }, {
	      "id": "icon-group",
	      "title": "Icon Group",
	      "path": "components/button-groups/flavors/icon-group",
	      "status": "prototype",
	      "dependencies": ["components/buttons", "components/buttons/flavors/icons", "components/button-group", "core/icons", "helpers/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-button-groups-icon-group",
	      "classBase": "button-group",
	      "examplePath": "components/button-groups/flavors/icon-group/index.react.example.jsx"
	    }],
	    "dependencies": ["components/buttons", "components/buttons/flavors/neutral", "core/icons", "helpers/visibility"],
	    "uid": "components-button-groups"
	  }, {
	    "id": "cards",
	    "title": "Cards",
	    "path": "components/cards",
	    "status": "prototype",
	    "classBase": "card",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/cards/flavors/base",
	      "status": "prototype",
	      "dependencies": ["core/text", "core/grid-system/index", "core/grid-system/index/flex-spread", "components/button-group", "components/tables"],
	      "showFormFactors": ["large"],
	      "uid": "components-cards-base",
	      "classBase": "card",
	      "examplePath": "components/cards/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "compact",
	      "title": "Compact",
	      "path": "components/cards/flavors/compact",
	      "status": "prototype",
	      "dependencies": ["components/card/*"],
	      "showFormFactors": ["large"],
	      "uid": "components-cards-compact",
	      "classBase": "card",
	      "examplePath": "components/cards/flavors/compact/index.react.example.jsx"
	    }, {
	      "id": "empty",
	      "title": "Empty",
	      "path": "components/cards/flavors/empty",
	      "status": "prototype",
	      "dependencies": ["components/card/*"],
	      "showFormFactors": ["large"],
	      "uid": "components-cards-empty",
	      "classBase": "card",
	      "examplePath": "components/cards/flavors/empty/index.react.example.jsx"
	    }],
	    "dependencies": ["core/text", "core/grid-system/index", "core/grid-system/index/flex-spread", "components/button-group", "components/tables"],
	    "uid": "components-cards"
	  }, {
	    "id": "data-tables",
	    "title": "Data Tables",
	    "path": "components/data-tables",
	    "status": "prototype",
	    "classBase": "table",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/data-tables/flavors/base",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-data-tables-base",
	      "classBase": "table",
	      "examplePath": "components/data-tables/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "responsive-overflow",
	      "title": "Responsive Overflow",
	      "path": "components/data-tables/flavors/responsive-overflow",
	      "status": "prototype",
	      "showFormFactors": ["small", "large"],
	      "uid": "components-data-tables-responsive-overflow",
	      "classBase": "table",
	      "examplePath": "components/data-tables/flavors/responsive-overflow/index.react.example.jsx"
	    }, {
	      "id": "responsive-stacked",
	      "title": "Responsive Stacked",
	      "path": "components/data-tables/flavors/responsive-stacked",
	      "status": "prototype",
	      "showFormFactors": ["small", "large"],
	      "uid": "components-data-tables-responsive-stacked",
	      "classBase": "table",
	      "examplePath": "components/data-tables/flavors/responsive-stacked/index.react.example.jsx"
	    }, {
	      "id": "responsive-stacked-horizontal",
	      "title": "Responsive Stacked Horizontal",
	      "path": "components/data-tables/flavors/responsive-stacked-horizontal",
	      "status": "prototype",
	      "showFormFactors": ["small", "large"],
	      "uid": "components-data-tables-responsive-stacked-horizontal",
	      "classBase": "table",
	      "examplePath": "components/data-tables/flavors/responsive-stacked-horizontal/index.react.example.jsx"
	    }],
	    "dependencies": ["helpers/sizing", "components/tables"],
	    "uid": "components-data-tables"
	  }, {
	    "id": "datepickers",
	    "title": "Datepickers",
	    "path": "components/datepickers",
	    "status": "prototype",
	    "classBase": "datepicker",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/datepickers/flavors/base",
	      "status": "prototype",
	      "className": "datepicker",
	      "showFormFactors": ["large"],
	      "dependencies": ["ui/components/dropdowns"],
	      "uid": "components-datepickers-base",
	      "classBase": "datepicker",
	      "examplePath": "components/datepickers/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "single-select",
	      "title": "Single Select",
	      "path": "components/datepickers/flavors/single-select",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-datepickers-single-select",
	      "classBase": "datepicker",
	      "examplePath": "components/datepickers/flavors/single-select/index.react.example.jsx"
	    }, {
	      "id": "multi-select",
	      "title": "Multi Select",
	      "path": "components/datepickers/flavors/multi-select",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-datepickers-multi-select",
	      "classBase": "datepicker",
	      "examplePath": "components/datepickers/flavors/multi-select/index.react.example.jsx"
	    }, {
	      "id": "time",
	      "title": "Time",
	      "path": "components/datepickers/flavors/time",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-datepickers-time",
	      "classBase": "datepicker",
	      "examplePath": "components/datepickers/flavors/time/index.react.example.jsx"
	    }],
	    "uid": "components-datepickers"
	  }, {
	    "id": "dropdowns",
	    "title": "Dropdowns",
	    "path": "components/dropdowns",
	    "classBase": "dropdown",
	    "status": "prototype",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/dropdowns/flavors/base",
	      "status": "prototype",
	      "dependencies": ["helpers/text", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-dropdowns-base",
	      "classBase": "dropdown",
	      "examplePath": "components/dropdowns/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "menu",
	      "title": "Menu",
	      "path": "components/dropdowns/flavors/menu",
	      "status": "prototype",
	      "dependencies": ["helpers/text", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-dropdowns-menu",
	      "classBase": "dropdown",
	      "examplePath": "components/dropdowns/flavors/menu/index.react.example.jsx"
	    }, {
	      "id": "menu-with-icons",
	      "title": "Menu With Icons",
	      "path": "components/dropdowns/flavors/menu-with-icons",
	      "status": "prototype",
	      "dependencies": ["helpers/text", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-dropdowns-menu-with-icons",
	      "classBase": "dropdown",
	      "examplePath": "components/dropdowns/flavors/menu-with-icons/index.react.example.jsx"
	    }, {
	      "id": "action-overflow",
	      "title": "Action Overflow",
	      "path": "components/dropdowns/flavors/action-overflow",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-dropdowns-action-overflow",
	      "classBase": "dropdown",
	      "examplePath": "components/dropdowns/flavors/action-overflow/index.react.example.jsx"
	    }, {
	      "id": "search-overflow",
	      "title": "Search Overflow",
	      "path": "components/dropdowns/flavors/search-overflow",
	      "status": "prototype",
	      "dependencies": ["menu/index"],
	      "showFormFactors": ["large"],
	      "uid": "components-dropdowns-search-overflow",
	      "classBase": "dropdown",
	      "examplePath": "components/dropdowns/flavors/search-overflow/index.react.example.jsx"
	    }, {
	      "id": "positioning",
	      "title": "Positioning",
	      "path": "components/dropdowns/flavors/positioning",
	      "status": "prototype",
	      "dependencies": ["menu/index"],
	      "showFormFactors": ["large"],
	      "uid": "components-dropdowns-positioning",
	      "classBase": "dropdown",
	      "examplePath": "components/dropdowns/flavors/positioning/index.react.example.jsx"
	    }],
	    "dependencies": ["helpers/text", "core/icons"],
	    "uid": "components-dropdowns"
	  }, {
	    "id": "forms",
	    "title": "Forms",
	    "path": "components/forms",
	    "flavors": [{
	      "id": "input",
	      "title": "Input",
	      "path": "components/forms/flavors/input",
	      "status": "dev-ready",
	      "className": "input",
	      "showFormFactors": ["large"],
	      "uid": "components-forms-input",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/input/index.react.example.jsx"
	    }, {
	      "id": "textarea",
	      "title": "Textarea",
	      "path": "components/forms/flavors/textarea",
	      "status": "dev-ready",
	      "className": "textarea",
	      "showFormFactors": ["large"],
	      "uid": "components-forms-textarea",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/textarea/index.react.example.jsx"
	    }, {
	      "id": "radio",
	      "title": "Radio",
	      "path": "components/forms/flavors/radio",
	      "status": "dev-ready",
	      "className": "radio",
	      "showFormFactors": ["large"],
	      "uid": "components-forms-radio",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/radio/index.react.example.jsx"
	    }, {
	      "id": "checkbox",
	      "title": "Checkbox",
	      "path": "components/forms/flavors/checkbox",
	      "status": "dev-ready",
	      "className": "checkbox",
	      "showFormFactors": ["large"],
	      "uid": "components-forms-checkbox",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/checkbox/index.react.example.jsx"
	    }, {
	      "id": "select",
	      "title": "Select",
	      "path": "components/forms/flavors/select",
	      "status": "dev-ready",
	      "className": "select",
	      "showFormFactors": ["large"],
	      "uid": "components-forms-select",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/select/index.react.example.jsx"
	    }, {
	      "id": "horizontal-form",
	      "title": "Horizontal Form",
	      "path": "components/forms/flavors/horizontal-form",
	      "status": "dev-ready",
	      "className": "form--horizontal",
	      "showFormFactors": ["small", "large"],
	      "uid": "components-forms-horizontal-form",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/horizontal-form/index.react.example.jsx"
	    }, {
	      "id": "stacked-form",
	      "title": "Stacked Form",
	      "path": "components/forms/flavors/stacked-form",
	      "status": "dev-ready",
	      "className": "form--stacked",
	      "showFormFactors": ["large"],
	      "uid": "components-forms-stacked-form",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/stacked-form/index.react.example.jsx"
	    }, {
	      "id": "inline-form",
	      "title": "Inline Form",
	      "path": "components/forms/flavors/inline-form",
	      "status": "dev-ready",
	      "className": "form--inline",
	      "showFormFactors": ["large"],
	      "uid": "components-forms-inline-form",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/inline-form/index.react.example.jsx"
	    }, {
	      "id": "compound-form",
	      "title": "Compound Form",
	      "path": "components/forms/flavors/compound-form",
	      "status": "prototype",
	      "className": "form--compound",
	      "dependencies": ["utilities/sizing"],
	      "showFormFactors": ["large"],
	      "uid": "components-forms-compound-form",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/compound-form/index.react.example.jsx"
	    }, {
	      "id": "read-only-state",
	      "title": "Read Only State",
	      "path": "components/forms/flavors/read-only-state",
	      "status": "dev-ready",
	      "className": "form-element__static",
	      "showFormFactors": ["large"],
	      "uid": "components-forms-read-only-state",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/read-only-state/index.react.example.jsx"
	    }, {
	      "id": "validation-state",
	      "title": "Validation State",
	      "path": "components/forms/flavors/validation-state",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-forms-validation-state",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/validation-state/index.react.example.jsx"
	    }, {
	      "id": "sizing",
	      "title": "Sizing",
	      "path": "components/forms/flavors/sizing",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "components-forms-sizing",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/sizing/index.react.example.jsx"
	    }, {
	      "id": "field-level-help",
	      "title": "Field Level Help",
	      "path": "components/forms/flavors/field-level-help",
	      "status": "prototype",
	      "dependencies": ["core/icons", "components/buttons/icon", "components/tooltips"],
	      "showFormFactors": ["large"],
	      "uid": "components-forms-field-level-help",
	      "classBase": "forms",
	      "examplePath": "components/forms/flavors/field-level-help/index.react.example.jsx"
	    }],
	    "uid": "components-forms",
	    "classBase": "forms",
	    "status": "dev-ready"
	  }, {
	    "id": "grid-system",
	    "title": "Grid System",
	    "path": "components/grid-system",
	    "status": "dev-ready",
	    "flavors": [{
	      "id": "automatic-sizing",
	      "title": "Automatic Sizing",
	      "path": "components/grid-system/flavors/automatic-sizing",
	      "status": "dev-ready",
	      "showFormFactors": ["small", "medium", "large"],
	      "uid": "components-grid-system-automatic-sizing",
	      "classBase": "grid-system",
	      "examplePath": "components/grid-system/flavors/automatic-sizing/index.react.example.jsx"
	    }, {
	      "id": "manual-sizing",
	      "title": "Manual Sizing",
	      "path": "components/grid-system/flavors/manual-sizing",
	      "status": "dev-ready",
	      "showFormFactors": ["small", "medium", "large"],
	      "uid": "components-grid-system-manual-sizing",
	      "classBase": "grid-system",
	      "examplePath": "components/grid-system/flavors/manual-sizing/index.react.example.jsx"
	    }, {
	      "id": "containers",
	      "title": "Containers",
	      "path": "components/grid-system/flavors/containers",
	      "status": "dev-ready",
	      "showFormFactors": ["small", "medium", "large"],
	      "uid": "components-grid-system-containers",
	      "classBase": "grid-system",
	      "examplePath": "components/grid-system/flavors/containers/index.react.example.jsx"
	    }, {
	      "id": "horizontal-alignment-center",
	      "title": "Horizontal Alignment Center",
	      "path": "components/grid-system/flavors/horizontal-alignment-center",
	      "status": "dev-ready",
	      "showFormFactors": ["small", "medium", "large"],
	      "uid": "components-grid-system-horizontal-alignment-center",
	      "classBase": "grid-system",
	      "examplePath": "components/grid-system/flavors/horizontal-alignment-center/index.react.example.jsx"
	    }, {
	      "id": "horizontal-alignment-space",
	      "title": "Horizontal Alignment Space",
	      "path": "components/grid-system/flavors/horizontal-alignment-space",
	      "status": "dev-ready",
	      "showFormFactors": ["small", "medium", "large"],
	      "uid": "components-grid-system-horizontal-alignment-space",
	      "classBase": "grid-system",
	      "examplePath": "components/grid-system/flavors/horizontal-alignment-space/index.react.example.jsx"
	    }, {
	      "id": "horizontal-alignment-spread",
	      "title": "Horizontal Alignment Spread",
	      "path": "components/grid-system/flavors/horizontal-alignment-spread",
	      "status": "dev-ready",
	      "showFormFactors": ["small", "medium", "large"],
	      "uid": "components-grid-system-horizontal-alignment-spread",
	      "classBase": "grid-system",
	      "examplePath": "components/grid-system/flavors/horizontal-alignment-spread/index.react.example.jsx"
	    }, {
	      "id": "vertical-alignment",
	      "title": "Vertical Alignment",
	      "path": "components/grid-system/flavors/vertical-alignment",
	      "status": "dev-ready",
	      "showFormFactors": ["small", "medium", "large"],
	      "uid": "components-grid-system-vertical-alignment",
	      "classBase": "grid-system",
	      "examplePath": "components/grid-system/flavors/vertical-alignment/index.react.example.jsx"
	    }, {
	      "id": "order",
	      "title": "Order",
	      "path": "components/grid-system/flavors/order",
	      "status": "dev-ready",
	      "showFormFactors": ["small", "medium", "large"],
	      "uid": "components-grid-system-order",
	      "classBase": "grid-system",
	      "examplePath": "components/grid-system/flavors/order/index.react.example.jsx"
	    }],
	    "dependencies": ["helpers/sizing"],
	    "uid": "components-grid-system",
	    "classBase": "grid-system"
	  }, {
	    "id": "icons",
	    "title": "Icons",
	    "path": "components/icons",
	    "classBase": "icon",
	    "status": "prototype",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/icons/flavors/base",
	      "status": "prototype",
	      "dependencies": ["component/icons", "core/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-icons-base",
	      "classBase": "icon",
	      "examplePath": "components/icons/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "colors",
	      "title": "Colors",
	      "path": "components/icons/flavors/colors",
	      "status": "prototype",
	      "dependencies": ["component/icons", "core/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-icons-colors",
	      "classBase": "icon",
	      "examplePath": "components/icons/flavors/colors/index.react.example.jsx"
	    }, {
	      "id": "sizes",
	      "title": "Sizes",
	      "path": "components/icons/flavors/sizes",
	      "status": "prototype",
	      "dependencies": ["component/icons", "core/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-icons-sizes",
	      "classBase": "icon",
	      "examplePath": "components/icons/flavors/sizes/index.react.example.jsx"
	    }],
	    "uid": "components-icons"
	  }, {
	    "id": "images",
	    "title": "Images",
	    "path": "components/images",
	    "status": "dev-ready",
	    "flavors": [{
	      "id": "avatars",
	      "title": "Avatars",
	      "path": "components/images/flavors/avatars",
	      "status": "dev-ready",
	      "classBase": "avatar",
	      "showFormFactors": ["large"],
	      "uid": "components-images-avatars",
	      "examplePath": "components/images/flavors/avatars/index.react.example.jsx"
	    }],
	    "uid": "components-images",
	    "classBase": "images"
	  }, {
	    "id": "lookups",
	    "title": "Lookups",
	    "path": "components/lookups",
	    "status": "prototype",
	    "classBase": "lookup",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/lookups/flavors/base",
	      "status": "prototype",
	      "dependencies": ["core/forms", "core/forms/flavors/input", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-lookups-base",
	      "classBase": "lookup",
	      "examplePath": "components/lookups/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "single-select",
	      "title": "Single Select",
	      "path": "components/lookups/flavors/single-select",
	      "status": "prototype",
	      "dependencies": ["core/forms", "core/forms/flavors/input", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-lookups-single-select",
	      "classBase": "lookup",
	      "examplePath": "components/lookups/flavors/single-select/index.react.example.jsx"
	    }, {
	      "id": "multi-select",
	      "title": "Multi Select",
	      "path": "components/lookups/flavors/multi-select",
	      "status": "prototype",
	      "dependencies": ["core/forms", "core/forms/flavors/input", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-lookups-multi-select",
	      "classBase": "lookup",
	      "examplePath": "components/lookups/flavors/multi-select/index.react.example.jsx"
	    }, {
	      "id": "single-scope",
	      "title": "Single Scope",
	      "path": "components/lookups/flavors/single-scope",
	      "status": "prototype",
	      "dependencies": ["core/forms", "core/forms/flavors/input", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-lookups-single-scope",
	      "classBase": "lookup",
	      "examplePath": "components/lookups/flavors/single-scope/index.react.example.jsx"
	    }, {
	      "id": "multi-scope",
	      "title": "Multi Scope",
	      "path": "components/lookups/flavors/multi-scope",
	      "status": "prototype",
	      "dependencies": ["core/forms", "core/forms/flavors/input", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-lookups-multi-scope",
	      "classBase": "lookup",
	      "examplePath": "components/lookups/flavors/multi-scope/index.react.example.jsx"
	    }, {
	      "id": "advanced-modal",
	      "title": "Advanced Modal",
	      "path": "components/lookups/flavors/advanced-modal",
	      "status": "prototype",
	      "dependencies": ["core/forms", "core/forms/flavors/input", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-lookups-advanced-modal",
	      "classBase": "lookup",
	      "examplePath": "components/lookups/flavors/advanced-modal/index.react.example.jsx"
	    }],
	    "dependencies": ["core/forms", "core/forms/flavors/input", "core/icons"],
	    "uid": "components-lookups"
	  }, {
	    "id": "media-objects",
	    "title": "Media Objects",
	    "path": "components/media-objects",
	    "status": "dev-ready",
	    "classBase": "media",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/media-objects/flavors/base",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "components-media-objects-base",
	      "classBase": "media",
	      "examplePath": "components/media-objects/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "center",
	      "title": "Center",
	      "path": "components/media-objects/flavors/center",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "components-media-objects-center",
	      "classBase": "media",
	      "examplePath": "components/media-objects/flavors/center/index.react.example.jsx"
	    }, {
	      "id": "reverse",
	      "title": "Reverse",
	      "path": "components/media-objects/flavors/reverse",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "components-media-objects-reverse",
	      "classBase": "media",
	      "examplePath": "components/media-objects/flavors/reverse/index.react.example.jsx"
	    }, {
	      "id": "double",
	      "title": "Double",
	      "path": "components/media-objects/flavors/double",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "components-media-objects-double",
	      "classBase": "media",
	      "examplePath": "components/media-objects/flavors/double/index.react.example.jsx"
	    }, {
	      "id": "responsive",
	      "title": "Responsive",
	      "path": "components/media-objects/flavors/responsive",
	      "status": "prototype",
	      "showFormFactors": ["small", "large"],
	      "uid": "components-media-objects-responsive",
	      "classBase": "media",
	      "examplePath": "components/media-objects/flavors/responsive/index.react.example.jsx"
	    }],
	    "uid": "components-media-objects"
	  }, {
	    "id": "modals",
	    "title": "Modals",
	    "path": "components/modals",
	    "status": "prototype",
	    "classBase": "modal",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/modals/flavors/base",
	      "status": "prototype",
	      "dependencies": ["core/icons", "components/buttons"],
	      "showFormFactors": ["large"],
	      "uid": "components-modals-base",
	      "classBase": "modal",
	      "examplePath": "components/modals/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "taglines",
	      "title": "Taglines",
	      "path": "components/modals/flavors/taglines",
	      "status": "prototype",
	      "dependencies": ["components/modals", "core/icons", "components/buttons"],
	      "showFormFactors": ["large"],
	      "uid": "components-modals-taglines",
	      "classBase": "modal",
	      "examplePath": "components/modals/flavors/taglines/index.react.example.jsx"
	    }, {
	      "id": "large",
	      "title": "Large",
	      "path": "components/modals/flavors/large",
	      "status": "prototype",
	      "dependencies": ["components/modals", "core/icons", "components/buttons"],
	      "showFormFactors": ["large"],
	      "uid": "components-modals-large",
	      "classBase": "modal",
	      "examplePath": "components/modals/flavors/large/index.react.example.jsx"
	    }, {
	      "id": "directional",
	      "title": "Directional",
	      "path": "components/modals/flavors/directional",
	      "status": "prototype",
	      "dependencies": ["components/modals", "core/icons", "components/buttons"],
	      "showFormFactors": ["large"],
	      "uid": "components-modals-directional",
	      "classBase": "modal",
	      "examplePath": "components/modals/flavors/directional/index.react.example.jsx"
	    }],
	    "dependencies": ["core/icons", "components/buttons"],
	    "uid": "components-modals"
	  }, {
	    "id": "notifications",
	    "title": "Notifications",
	    "path": "components/notifications",
	    "classBase": "notify",
	    "status": "prototype",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/notifications/flavors/base",
	      "status": "prototype",
	      "dependencies": ["components/buttons", "components/buttons/flavors/icon", "core/text", "core/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-notifications-base",
	      "classBase": "notify",
	      "examplePath": "components/notifications/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "alert",
	      "title": "Alert",
	      "path": "components/notifications/flavors/alert",
	      "status": "prototype",
	      "dependencies": ["components/buttons", "components/buttons/flavors/icon", "core/text"],
	      "showFormFactors": ["large"],
	      "uid": "components-notifications-alert",
	      "classBase": "notify",
	      "examplePath": "components/notifications/flavors/alert/index.react.example.jsx"
	    }, {
	      "id": "toast",
	      "title": "Toast",
	      "path": "components/notifications/flavors/toast",
	      "status": "prototype",
	      "dependencies": ["components/buttons", "components/buttons/flavors/icon", "core/text", "core/visibility"],
	      "showFormFactors": ["large"],
	      "uid": "components-notifications-toast",
	      "classBase": "notify",
	      "examplePath": "components/notifications/flavors/toast/index.react.example.jsx"
	    }],
	    "dependencies": ["components/buttons", "components/buttons/flavors/icon", "core/text", "core/visibility"],
	    "uid": "components-notifications"
	  }, {
	    "id": "page-headers",
	    "title": "Page Headers",
	    "path": "components/page-headers",
	    "status": "prototype",
	    "flavors": [{
	      "id": "record-home",
	      "title": "Record Home",
	      "path": "components/page-headers/flavors/record-home",
	      "status": "prototype",
	      "dependencies": ["components/buttons", "components/buttons/flavors/neutral", "components/buttons/flavors/stateful", "components/buttons/flavors/icon", "core/media-objects", "core/icons", "core/lists/flavors/description-list", "components/button-group", "utilities/truncation"],
	      "showFormFactors": ["large"],
	      "uid": "components-page-headers-record-home",
	      "classBase": "page-headers",
	      "examplePath": "components/page-headers/flavors/record-home/index.react.example.jsx"
	    }, {
	      "id": "object-home",
	      "title": "Object Home",
	      "path": "components/page-headers/flavors/object-home",
	      "status": "prototype",
	      "dependencies": ["components/buttons", "components/buttons/flavors/neutral", "components/buttons/flavors/icon", "components/buttons/flavors/icon-more", "core/media-objects", "core/icons", "components/button-group", "components/button-group/flavors/icon-group", "components/dropdowns/flavors/base", "components/dropdowns/flavors/menu-with-icons", "components/dropdowns/flavors/menu-with-search", "utilities/truncation"],
	      "showFormFactors": ["large"],
	      "uid": "components-page-headers-object-home",
	      "classBase": "page-headers",
	      "examplePath": "components/page-headers/flavors/object-home/index.react.example.jsx"
	    }, {
	      "id": "related-list",
	      "title": "Related List",
	      "path": "components/page-headers/flavors/related-list",
	      "status": "prototype",
	      "dependencies": ["components/buttons", "components/buttons/flavors/neutral", "components/buttons/flavors/icon", "components/buttons/flavors/icon-more", "components/button-group", "components/button-group/flavors/icon-group", "core/icons", "components/dropdowns/flavors/menu-with-icons", "utilities/truncation"],
	      "showFormFactors": ["large"],
	      "uid": "components-page-headers-related-list",
	      "classBase": "page-headers",
	      "examplePath": "components/page-headers/flavors/related-list/index.react.example.jsx"
	    }],
	    "dependencies": ["core/icons", "components/buttons", "components/button-group"],
	    "uid": "components-page-headers",
	    "classBase": "page-headers"
	  }, {
	    "id": "picklists",
	    "title": "Picklists",
	    "path": "components/picklists",
	    "status": "prototype",
	    "classBase": "picklist",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/picklists/flavors/base",
	      "status": "prototype",
	      "dependencies": ["core/forms", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-picklists-base",
	      "classBase": "picklist",
	      "examplePath": "components/picklists/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "multi-select",
	      "title": "Multi Select",
	      "path": "components/picklists/flavors/multi-select",
	      "status": "prototype",
	      "dependencies": ["helpers/grid", "forms/index", "forms/picklist/index"],
	      "showFormFactors": ["large"],
	      "uid": "components-picklists-multi-select",
	      "classBase": "picklist",
	      "examplePath": "components/picklists/flavors/multi-select/index.react.example.jsx"
	    }, {
	      "id": "quickfind",
	      "title": "Quickfind",
	      "path": "components/picklists/flavors/quickfind",
	      "status": "prototype",
	      "dependencies": ["components/picklists", "core/forms", "core/forms/input", "components/dropdowns/flavors/menu/index", "components/dropdowns/flavors/menu-with-search/index"],
	      "showFormFactors": ["large"],
	      "uid": "components-picklists-quickfind",
	      "classBase": "picklist",
	      "examplePath": "components/picklists/flavors/quickfind/index.react.example.jsx"
	    }],
	    "dependencies": ["core/forms", "core/icons"],
	    "uid": "components-picklists"
	  }, {
	    "id": "pills",
	    "title": "Pills",
	    "path": "components/pills",
	    "classBase": "pill",
	    "status": "dev-ready",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/pills/flavors/base",
	      "status": "dev-ready",
	      "dependencies": ["core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-pills-base",
	      "classBase": "pill",
	      "examplePath": "components/pills/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "unlink",
	      "title": "Unlink",
	      "path": "components/pills/flavors/unlink",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "components-pills-unlink",
	      "classBase": "pill",
	      "examplePath": "components/pills/flavors/unlink/index.react.example.jsx"
	    }, {
	      "id": "icon",
	      "title": "Icon",
	      "path": "components/pills/flavors/icon",
	      "status": "dev-ready",
	      "dependencies": ["helpers/images", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-pills-icon",
	      "classBase": "pill",
	      "examplePath": "components/pills/flavors/icon/index.react.example.jsx"
	    }, {
	      "id": "portrait",
	      "title": "Portrait",
	      "path": "components/pills/flavors/portrait",
	      "status": "dev-ready",
	      "dependencies": ["helpers/images", "core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "components-pills-portrait",
	      "classBase": "pill",
	      "examplePath": "components/pills/flavors/portrait/index.react.example.jsx"
	    }],
	    "dependencies": ["helpers/images", "core/icons"],
	    "uid": "components-pills"
	  }, {
	    "id": "popovers",
	    "title": "Popovers",
	    "path": "components/popovers",
	    "status": "prototype",
	    "classBase": "popover",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/popovers/flavors/base",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-popovers-base",
	      "classBase": "popover",
	      "examplePath": "components/popovers/flavors/base/index.react.example.jsx"
	    }],
	    "uid": "components-popovers"
	  }, {
	    "id": "spinners",
	    "title": "Spinners",
	    "path": "components/spinners",
	    "status": "prototype",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/spinners/flavors/base",
	      "status": "prototype",
	      "classBase": "spinner--small",
	      "showFormFactors": ["large"],
	      "uid": "components-spinners-base",
	      "examplePath": "components/spinners/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "medium",
	      "title": "Medium",
	      "path": "components/spinners/flavors/medium",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-spinners-medium",
	      "classBase": "spinners",
	      "examplePath": "components/spinners/flavors/medium/index.react.example.jsx"
	    }, {
	      "id": "large",
	      "title": "Large",
	      "path": "components/spinners/flavors/large",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-spinners-large",
	      "classBase": "spinners",
	      "examplePath": "components/spinners/flavors/large/index.react.example.jsx"
	    }, {
	      "id": "brand-small",
	      "title": "Brand Small",
	      "path": "components/spinners/flavors/brand-small",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-spinners-brand-small",
	      "classBase": "spinners",
	      "examplePath": "components/spinners/flavors/brand-small/index.react.example.jsx"
	    }, {
	      "id": "brand-medium",
	      "title": "Brand Medium",
	      "path": "components/spinners/flavors/brand-medium",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-spinners-brand-medium",
	      "classBase": "spinners",
	      "examplePath": "components/spinners/flavors/brand-medium/index.react.example.jsx"
	    }, {
	      "id": "brand-large",
	      "title": "Brand Large",
	      "path": "components/spinners/flavors/brand-large",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-spinners-brand-large",
	      "classBase": "spinners",
	      "examplePath": "components/spinners/flavors/brand-large/index.react.example.jsx"
	    }, {
	      "id": "inverse-small",
	      "title": "Inverse Small",
	      "path": "components/spinners/flavors/inverse-small",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-spinners-inverse-small",
	      "classBase": "spinners",
	      "examplePath": "components/spinners/flavors/inverse-small/index.react.example.jsx"
	    }, {
	      "id": "inverse-medium",
	      "title": "Inverse Medium",
	      "path": "components/spinners/flavors/inverse-medium",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-spinners-inverse-medium",
	      "classBase": "spinners",
	      "examplePath": "components/spinners/flavors/inverse-medium/index.react.example.jsx"
	    }, {
	      "id": "inverse-large",
	      "title": "Inverse Large",
	      "path": "components/spinners/flavors/inverse-large",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-spinners-inverse-large",
	      "classBase": "spinners",
	      "examplePath": "components/spinners/flavors/inverse-large/index.react.example.jsx"
	    }],
	    "uid": "components-spinners",
	    "classBase": "spinners"
	  }, {
	    "id": "tabs",
	    "title": "Tabs",
	    "path": "components/tabs",
	    "status": "prototype",
	    "flavors": [{
	      "id": "default",
	      "title": "Default",
	      "path": "components/tabs/flavors/default",
	      "status": "prototype",
	      "classBase": "tabs--default",
	      "showFormFactors": ["large"],
	      "uid": "components-tabs-default",
	      "examplePath": "components/tabs/flavors/default/index.react.example.jsx"
	    }, {
	      "id": "scoped",
	      "title": "Scoped",
	      "path": "components/tabs/flavors/scoped",
	      "status": "prototype",
	      "classBase": "tabs--scoped",
	      "showFormFactors": ["large"],
	      "uid": "components-tabs-scoped",
	      "examplePath": "components/tabs/flavors/scoped/index.react.example.jsx"
	    }],
	    "uid": "components-tabs",
	    "classBase": "tabs"
	  }, {
	    "id": "tiles",
	    "title": "Tiles",
	    "path": "components/tiles",
	    "status": "prototype",
	    "classBase": "tile",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/tiles/flavors/base",
	      "status": "prototype",
	      "dependencies": ["utilities/truncation", "utilities/text"],
	      "showFormFactors": ["large"],
	      "uid": "components-tiles-base",
	      "classBase": "tile",
	      "examplePath": "components/tiles/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "with-icon",
	      "title": "With Icon",
	      "path": "components/tiles/flavors/with-icon",
	      "status": "prototype",
	      "dependencies": ["components/media-objects", "components/icons", "components/images", "utilities/truncation", "utilities/text"],
	      "showFormFactors": ["large"],
	      "uid": "components-tiles-with-icon",
	      "classBase": "tile",
	      "examplePath": "components/tiles/flavors/with-icon/index.react.example.jsx"
	    }, {
	      "id": "with-actions",
	      "title": "With Actions",
	      "path": "components/tiles/flavors/with-actions",
	      "status": "prototype",
	      "dependencies": ["components/buttons", "components/media-objects", "components/icons", "components/images", "utilities/truncation", "utilities/text"],
	      "showFormFactors": ["large"],
	      "uid": "components-tiles-with-actions",
	      "classBase": "tile",
	      "examplePath": "components/tiles/flavors/with-actions/index.react.example.jsx"
	    }, {
	      "id": "with-badge",
	      "title": "With Badge",
	      "path": "components/tiles/flavors/with-badge",
	      "status": "prototype",
	      "dependencies": ["components/buttons", "components/labels", "components/media-objects", "components/icons", "components/images", "utilities/truncation", "utilities/text"],
	      "showFormFactors": ["large"],
	      "uid": "components-tiles-with-badge",
	      "classBase": "tile",
	      "examplePath": "components/tiles/flavors/with-badge/index.react.example.jsx"
	    }, {
	      "id": "list",
	      "title": "List",
	      "path": "components/tiles/flavors/list",
	      "status": "prototype",
	      "dependencies": ["components/media-objects", "components/labels", "components/icons", "utilities/themes", "utilities/truncation", "utilities/text"],
	      "showFormFactors": ["large"],
	      "uid": "components-tiles-list",
	      "classBase": "tile",
	      "examplePath": "components/tiles/flavors/list/index.react.example.jsx"
	    }, {
	      "id": "board",
	      "title": "Board",
	      "path": "components/tiles/flavors/board",
	      "status": "prototype",
	      "dependencies": ["components/forms/checkbox", "components/media-objects", "components/labels", "components/icons", "utilities/themes", "utilities/truncation", "utilities/text"],
	      "showFormFactors": ["large"],
	      "uid": "components-tiles-board",
	      "classBase": "tile",
	      "examplePath": "components/tiles/flavors/board/index.react.example.jsx"
	    }, {
	      "id": "generic",
	      "title": "Generic",
	      "path": "components/tiles/flavors/generic",
	      "status": "prototype",
	      "dependencies": ["components/media-objects", "components/labels", "components/lists", "components/icons", "components/images", "utilities/truncation", "utilities/sizing"],
	      "showFormFactors": ["large"],
	      "uid": "components-tiles-generic",
	      "classBase": "tile",
	      "examplePath": "components/tiles/flavors/generic/index.react.example.jsx"
	    }, {
	      "id": "task",
	      "title": "Task",
	      "path": "components/tiles/flavors/task",
	      "status": "prototype",
	      "dependencies": ["components/forms/checkbox", "components/media-objects", "components/labels", "components/icons", "utilities/layout", "utilities/themes", "utilities/truncation", "utilities/text"],
	      "showFormFactors": ["large"],
	      "uid": "components-tiles-task",
	      "classBase": "tile",
	      "examplePath": "components/tiles/flavors/task/index.react.example.jsx"
	    }, {
	      "id": "author",
	      "title": "Author",
	      "path": "components/tiles/flavors/author",
	      "status": "prototype",
	      "dependencies": ["core/grid-system", "core/forms/checkbox", "core/media-objects", "core/media-objects/center", "core/labels", "core/icons", "utilities/layout", "utilities/themes", "utilities/truncation", "utilities/sizing"],
	      "showFormFactors": ["large"],
	      "uid": "components-tiles-author",
	      "classBase": "tile",
	      "examplePath": "components/tiles/flavors/author/index.react.example.jsx"
	    }],
	    "uid": "components-tiles"
	  }, {
	    "id": "tooltips",
	    "title": "Tooltips",
	    "path": "components/tooltips",
	    "status": "prototype",
	    "classBase": "tooltip",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/tooltips/flavors/base",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-tooltips-base",
	      "classBase": "tooltip",
	      "examplePath": "components/tooltips/flavors/base/index.react.example.jsx"
	    }],
	    "uid": "components-tooltips"
	  }, {
	    "id": "trees",
	    "title": "Trees",
	    "path": "components/trees",
	    "status": "prototype",
	    "classBase": "tree",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "components/trees/flavors/base",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "components-trees-base",
	      "classBase": "tree",
	      "examplePath": "components/trees/flavors/base/index.react.example.jsx"
	    }],
	    "uid": "components-trees"
	  }]
	}, {
	  "id": "utilities",
	  "title": "Utilities",
	  "path": "utilities",
	  "components": [{
	    "id": "floats",
	    "title": "Floats",
	    "path": "utilities/floats",
	    "status": "dev-ready",
	    "flavors": [{
	      "id": "float-left",
	      "title": "Float Left",
	      "path": "utilities/floats/flavors/float-left",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-floats-float-left",
	      "classBase": "floats",
	      "examplePath": "utilities/floats/flavors/float-left/index.react.example.jsx"
	    }, {
	      "id": "float-right",
	      "title": "Float Right",
	      "path": "utilities/floats/flavors/float-right",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-floats-float-right",
	      "classBase": "floats",
	      "examplePath": "utilities/floats/flavors/float-right/index.react.example.jsx"
	    }, {
	      "id": "clearfix",
	      "title": "Clearfix",
	      "path": "utilities/floats/flavors/clearfix",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-floats-clearfix",
	      "classBase": "floats",
	      "examplePath": "utilities/floats/flavors/clearfix/index.react.example.jsx"
	    }],
	    "uid": "utilities-floats",
	    "classBase": "floats"
	  }, {
	    "id": "lists",
	    "title": "Lists",
	    "path": "utilities/lists",
	    "status": "dev-ready",
	    "flavors": [{
	      "id": "dotted",
	      "title": "Dotted",
	      "path": "utilities/lists/flavors/dotted",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-lists-dotted",
	      "classBase": "lists",
	      "examplePath": "utilities/lists/flavors/dotted/index.react.example.jsx"
	    }, {
	      "id": "ordered",
	      "title": "Ordered",
	      "path": "utilities/lists/flavors/ordered",
	      "status": "dev-ready",
	      "showFormFactors": ["small", "large"],
	      "uid": "utilities-lists-ordered",
	      "classBase": "lists",
	      "examplePath": "utilities/lists/flavors/ordered/index.react.example.jsx"
	    }, {
	      "id": "vertical",
	      "title": "Vertical",
	      "path": "utilities/lists/flavors/vertical",
	      "status": "dev-ready",
	      "classBase": "has-block-links",
	      "showFormFactors": ["large"],
	      "uid": "utilities-lists-vertical",
	      "examplePath": "utilities/lists/flavors/vertical/index.react.example.jsx"
	    }, {
	      "id": "has-divider",
	      "title": "Has Divider",
	      "path": "utilities/lists/flavors/has-divider",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "utilities-lists-has-divider",
	      "classBase": "lists",
	      "examplePath": "utilities/lists/flavors/has-divider/index.react.example.jsx"
	    }, {
	      "id": "vertical-with-dividers",
	      "title": "Vertical With Dividers",
	      "path": "utilities/lists/flavors/vertical-with-dividers",
	      "showFormFactors": ["large"],
	      "uid": "utilities-lists-vertical-with-dividers",
	      "classBase": "lists",
	      "examplePath": "utilities/lists/flavors/vertical-with-dividers/index.react.example.jsx"
	    }, {
	      "id": "vertical-with-cards",
	      "title": "Vertical With Cards",
	      "path": "utilities/lists/flavors/vertical-with-cards",
	      "showFormFactors": ["large"],
	      "uid": "utilities-lists-vertical-with-cards",
	      "classBase": "lists",
	      "examplePath": "utilities/lists/flavors/vertical-with-cards/index.react.example.jsx"
	    }, {
	      "id": "horizontal",
	      "title": "Horizontal",
	      "path": "utilities/lists/flavors/horizontal",
	      "status": "dev-ready",
	      "classBase": "list--horizontal",
	      "showFormFactors": ["small", "large"],
	      "uid": "utilities-lists-horizontal",
	      "examplePath": "utilities/lists/flavors/horizontal/index.react.example.jsx"
	    }, {
	      "id": "horizontal-with-dividers",
	      "title": "Horizontal With Dividers",
	      "path": "utilities/lists/flavors/horizontal-with-dividers",
	      "showFormFactors": ["small", "large"],
	      "uid": "utilities-lists-horizontal-with-dividers",
	      "classBase": "lists",
	      "examplePath": "utilities/lists/flavors/horizontal-with-dividers/index.react.example.jsx"
	    }, {
	      "id": "description-inline",
	      "title": "Description Inline",
	      "path": "utilities/lists/flavors/description-inline",
	      "status": "prototype",
	      "showFormFactors": ["small", "large"],
	      "uid": "utilities-lists-description-inline",
	      "classBase": "lists",
	      "examplePath": "utilities/lists/flavors/description-inline/index.react.example.jsx"
	    }, {
	      "id": "description-horizontal",
	      "title": "Description Horizontal",
	      "path": "utilities/lists/flavors/description-horizontal",
	      "status": "prototype",
	      "showFormFactors": ["small", "large"],
	      "uid": "utilities-lists-description-horizontal",
	      "classBase": "lists",
	      "examplePath": "utilities/lists/flavors/description-horizontal/index.react.example.jsx"
	    }],
	    "uid": "utilities-lists",
	    "classBase": "lists"
	  }, {
	    "id": "scrollable",
	    "title": "Scrollable",
	    "path": "utilities/scrollable",
	    "status": "dev-ready",
	    "flavors": [{
	      "id": "vertical",
	      "title": "Vertical",
	      "path": "utilities/scrollable/flavors/vertical",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-scrollable-vertical",
	      "classBase": "scrollable",
	      "examplePath": "utilities/scrollable/flavors/vertical/index.react.example.jsx"
	    }, {
	      "id": "horizontal",
	      "title": "Horizontal",
	      "path": "utilities/scrollable/flavors/horizontal",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-scrollable-horizontal",
	      "classBase": "scrollable",
	      "examplePath": "utilities/scrollable/flavors/horizontal/index.react.example.jsx"
	    }],
	    "uid": "utilities-scrollable",
	    "classBase": "scrollable"
	  }, {
	    "id": "sizing",
	    "title": "Sizing",
	    "path": "utilities/sizing",
	    "status": "dev-ready",
	    "flavors": [{
	      "id": "widths",
	      "title": "Widths",
	      "path": "utilities/sizing/flavors/widths",
	      "status": "dev-ready",
	      "showFormFactors": ["small", "medium", "large"],
	      "uid": "utilities-sizing-widths",
	      "classBase": "sizing",
	      "examplePath": "utilities/sizing/flavors/widths/index.react.example.jsx"
	    }],
	    "uid": "utilities-sizing",
	    "classBase": "sizing"
	  }, {
	    "id": "spacing",
	    "title": "Spacing",
	    "path": "utilities/spacing",
	    "status": "dev-ready",
	    "flavors": [{
	      "id": "margin",
	      "title": "Margin",
	      "path": "utilities/spacing/flavors/margin",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-spacing-margin",
	      "classBase": "spacing",
	      "examplePath": "utilities/spacing/flavors/margin/index.react.example.jsx"
	    }, {
	      "id": "padding",
	      "title": "Padding",
	      "path": "utilities/spacing/flavors/padding",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-spacing-padding",
	      "classBase": "spacing",
	      "examplePath": "utilities/spacing/flavors/padding/index.react.example.jsx"
	    }],
	    "uid": "utilities-spacing",
	    "classBase": "spacing"
	  }, {
	    "id": "text",
	    "title": "Text",
	    "path": "utilities/text",
	    "status": "dev-ready",
	    "flavors": [{
	      "id": "base",
	      "title": "Base",
	      "path": "utilities/text/flavors/base",
	      "showFormFactors": ["large"],
	      "uid": "utilities-text-base",
	      "classBase": "text",
	      "examplePath": "utilities/text/flavors/base/index.react.example.jsx"
	    }, {
	      "id": "body-small",
	      "title": "Body Small",
	      "path": "utilities/text/flavors/body-small",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-text-body-small",
	      "classBase": "text",
	      "examplePath": "utilities/text/flavors/body-small/index.react.example.jsx"
	    }, {
	      "id": "heading-large",
	      "title": "Heading Large",
	      "path": "utilities/text/flavors/heading-large",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-text-heading-large",
	      "classBase": "text",
	      "examplePath": "utilities/text/flavors/heading-large/index.react.example.jsx"
	    }, {
	      "id": "heading-medium",
	      "title": "Heading Medium",
	      "path": "utilities/text/flavors/heading-medium",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-text-heading-medium",
	      "classBase": "text",
	      "examplePath": "utilities/text/flavors/heading-medium/index.react.example.jsx"
	    }, {
	      "id": "heading-small",
	      "title": "Heading Small",
	      "path": "utilities/text/flavors/heading-small",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-text-heading-small",
	      "classBase": "text",
	      "examplePath": "utilities/text/flavors/heading-small/index.react.example.jsx"
	    }, {
	      "id": "heading-label",
	      "title": "Heading Label",
	      "path": "utilities/text/flavors/heading-label",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-text-heading-label",
	      "classBase": "text",
	      "examplePath": "utilities/text/flavors/heading-label/index.react.example.jsx"
	    }, {
	      "id": "alignment",
	      "title": "Alignment",
	      "path": "utilities/text/flavors/alignment",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-text-alignment",
	      "classBase": "text",
	      "examplePath": "utilities/text/flavors/alignment/index.react.example.jsx"
	    }, {
	      "id": "longform",
	      "title": "Longform",
	      "path": "utilities/text/flavors/longform",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-text-longform",
	      "classBase": "text",
	      "examplePath": "utilities/text/flavors/longform/index.react.example.jsx"
	    }, {
	      "id": "section-title",
	      "title": "Section Title",
	      "path": "utilities/text/flavors/section-title",
	      "status": "prototype",
	      "dependencies": ["core/icons"],
	      "showFormFactors": ["large"],
	      "uid": "utilities-text-section-title",
	      "classBase": "text",
	      "examplePath": "utilities/text/flavors/section-title/index.react.example.jsx"
	    }, {
	      "id": "faux-links",
	      "title": "Faux Links",
	      "path": "utilities/text/flavors/faux-links",
	      "status": "dev-ready",
	      "classBase": "type-focus",
	      "showFormFactors": ["large"],
	      "uid": "utilities-text-faux-links",
	      "examplePath": "utilities/text/flavors/faux-links/index.react.example.jsx"
	    }],
	    "uid": "utilities-text",
	    "classBase": "text"
	  }, {
	    "id": "themes",
	    "title": "Themes",
	    "path": "utilities/themes",
	    "status": "dev-ready",
	    "flavors": [{
	      "id": "box",
	      "title": "Box",
	      "path": "utilities/themes/flavors/box",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-themes-box",
	      "classBase": "themes",
	      "examplePath": "utilities/themes/flavors/box/index.react.example.jsx"
	    }, {
	      "id": "color",
	      "title": "Color",
	      "path": "utilities/themes/flavors/color",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-themes-color",
	      "classBase": "themes",
	      "examplePath": "utilities/themes/flavors/color/index.react.example.jsx"
	    }, {
	      "id": "page-header",
	      "title": "Page Header",
	      "path": "utilities/themes/flavors/page-header",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-themes-page-header",
	      "classBase": "themes",
	      "examplePath": "utilities/themes/flavors/page-header/index.react.example.jsx"
	    }],
	    "uid": "utilities-themes",
	    "classBase": "themes"
	  }, {
	    "id": "truncation",
	    "title": "Truncation",
	    "path": "utilities/truncation",
	    "status": "prototype",
	    "flavors": [{
	      "id": "single-line",
	      "title": "Single Line",
	      "path": "utilities/truncation/flavors/single-line",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "utilities-truncation-single-line",
	      "classBase": "truncation",
	      "examplePath": "utilities/truncation/flavors/single-line/index.react.example.jsx"
	    }],
	    "uid": "utilities-truncation",
	    "classBase": "truncation"
	  }, {
	    "id": "visibility",
	    "title": "Visibility",
	    "path": "utilities/visibility",
	    "status": "dev-ready",
	    "flavors": [{
	      "id": "hide-show",
	      "title": "Hide Show",
	      "path": "utilities/visibility/flavors/hide-show",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-visibility-hide-show",
	      "classBase": "visibility",
	      "examplePath": "utilities/visibility/flavors/hide-show/index.react.example.jsx"
	    }, {
	      "id": "hidden-visible",
	      "title": "Hidden Visible",
	      "path": "utilities/visibility/flavors/hidden-visible",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-visibility-hidden-visible",
	      "classBase": "visibility",
	      "examplePath": "utilities/visibility/flavors/hidden-visible/index.react.example.jsx"
	    }, {
	      "id": "transition-hide-show",
	      "title": "Transition Hide Show",
	      "path": "utilities/visibility/flavors/transition-hide-show",
	      "status": "prototype",
	      "showFormFactors": ["large"],
	      "uid": "utilities-visibility-transition-hide-show",
	      "classBase": "visibility",
	      "examplePath": "utilities/visibility/flavors/transition-hide-show/index.react.example.jsx"
	    }, {
	      "id": "collapsed-expanded",
	      "title": "Collapsed Expanded",
	      "path": "utilities/visibility/flavors/collapsed-expanded",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-visibility-collapsed-expanded",
	      "classBase": "visibility",
	      "examplePath": "utilities/visibility/flavors/collapsed-expanded/index.react.example.jsx"
	    }, {
	      "id": "assistive-text",
	      "title": "Assistive Text",
	      "path": "utilities/visibility/flavors/assistive-text",
	      "status": "dev-ready",
	      "showFormFactors": ["large"],
	      "uid": "utilities-visibility-assistive-text",
	      "classBase": "visibility",
	      "examplePath": "utilities/visibility/flavors/assistive-text/index.react.example.jsx"
	    }, {
	      "id": "responsive",
	      "title": "Responsive",
	      "path": "utilities/visibility/flavors/responsive",
	      "status": "dev-ready",
	      "showFormFactors": ["small", "medium", "large"],
	      "uid": "utilities-visibility-responsive",
	      "classBase": "visibility",
	      "examplePath": "utilities/visibility/flavors/responsive/index.react.example.jsx"
	    }],
	    "uid": "utilities-visibility",
	    "classBase": "visibility"
	  }]
	}];

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	/**
	 * Return the path for the rotue
	 *
	 * @param {string} routePath
	 * @param {Route} [parent]
	 * @returns {string}
	 */
	function getPath(routePath, parent) {
	  // Remove trailing "/"
	  routePath = _lodash2['default'].trimRight(routePath, '/');
	  // If the path begins with "/", return the path
	  if (/^\//.test(routePath)) {
	    return routePath;
	  }
	  // If route has a parent, concat the paths
	  if (parent) {
	    var parentPath = _lodash2['default'].trimRight(parent.path, '/');
	    return '' + parentPath + '/' + routePath;
	  }
	  // Otherwise just return a root path
	  return '/' + routePath;
	}

	/**
	 * Remove leading and trailing slashes from a path
	 *
	 * @param {string} str
	 * @returns {string}
	 */
	function _trimSlashes(str) {
	  return _lodash2['default'].trim(str, '/');
	}

	var Route = (function () {
	  /**
	   * Create a new route
	   *
	   * @param {string} name
	   * @param {object} [options]
	   * @param {Route} [parent]
	   */

	  function Route(name, options, parent) {
	    _classCallCheck(this, Route);

	    options = _lodash2['default'].defaults({}, options, {
	      path: name
	    });
	    parent = parent && parent.isRoot ? null : parent;
	    _lodash2['default'].assign(this, options, {
	      name: name,
	      uid: parent ? '' + parent.uid + ':' + name : name,
	      path: getPath(options.path, parent),
	      routes: []
	    });
	    this.modulePath = this.getModulePath();
	  }

	  _createClass(Route, [{
	    key: 'trimSlashes',

	    /**
	     * Remove leading and trailing slashes from a path
	     *
	     * @param {string} p
	     * @returns {string}
	     */
	    value: function trimSlashes(p) {
	      return _trimSlashes(p);
	    }
	  }, {
	    key: 'getIndexPath',

	    /**
	     * Return a path that that appends index.jsx and trims slashes
	     *
	     * "/foo" => "foo/index.jsx"
	     *
	     * @param {string} basePath
	     * @returns {string}
	     */
	    value: function getIndexPath(basePath) {
	      return _trimSlashes('' + _trimSlashes(basePath) + '/index.jsx');
	    }
	  }, {
	    key: 'getModulePath',

	    /**
	      * Return an index path that represents the location of the module
	      *
	      * @returns {string}
	      */
	    value: function getModulePath() {
	      return this.getIndexPath(this.path);
	    }
	  }, {
	    key: 'resource',

	    /**
	     * Create a new route that can have nested routes
	     *
	     * @param {string} name
	     * @param {object} [options]
	     * @param {function} [callback]
	     */
	    value: function resource(name, options, callback) {
	      if (_lodash2['default'].isFunction(options)) callback = options;
	      var route = new Route(name, options, this);
	      if (_lodash2['default'].isFunction(callback)) {
	        callback.call(route);
	      }
	      this.routes.push(route);
	    }
	  }, {
	    key: 'route',

	    /**
	     * Create a new route
	     *
	     * @param {string} name
	     * @param {object} [options]
	     */
	    value: function route(name, options) {
	      this.routes.push(new Route(name, options, this));
	    }
	  }, {
	    key: 'flattenRoutes',

	    /**
	     * Return an array that contains the current route and all the
	     * nested rotues
	     *
	     * @returns {Route[]}
	     */
	    value: function flattenRoutes() {
	      var routes = [this].concat(this.routes.map(function (route) {
	        return route.flattenRoutes();
	      }));
	      return _lodash2['default'].flatten(routes);
	    }
	  }]);

	  return Route;
	})();

	var Router = (function () {
	  /**
	   * Create a new Router
	   */

	  function Router() {
	    var _this = this;

	    _classCallCheck(this, Router);

	    this.__route = new Route('root', { isRoot: true });
	    ['getFlattenedRoutes', 'getRoute', 'getRouteByPath'].forEach(function (method) {
	      _this[method] = _lodash2['default'].memoize(_this[method].bind(_this));
	    });
	  }

	  _createClass(Router, [{
	    key: 'map',

	    /**
	     * Define URL mappings for the router
	     *
	     * @returns {Router}
	     */
	    value: function map(callback) {
	      callback.call(this.__route);
	      return this;
	    }
	  }, {
	    key: 'getRoutes',

	    /**
	     * Return the current route tree
	     *
	     * @returns {Route[]}
	     */
	    value: function getRoutes() {
	      return this.__route.routes;
	    }
	  }, {
	    key: 'getFlattenedRoutes',

	    /**
	     * Return a flattened version of the route tree
	     *
	     * @returns {Route[]}
	     */
	    value: function getFlattenedRoutes() {
	      var routes = this.__route.routes.map(function (route) {
	        return route.flattenRoutes();
	      });
	      return _lodash2['default'].flatten(routes);
	    }
	  }, {
	    key: 'getRoute',

	    /**
	     * Return a single route by uid
	     *
	     * @param {string} uid
	     * @returns {Route|Undefined}
	     */
	    value: function getRoute(uid) {
	      return _lodash2['default'].find(this.getFlattenedRoutes(), { uid: uid });
	    }
	  }, {
	    key: 'getRouteByPath',

	    /**
	     * Return a single route by path
	     *
	     * @param {string} path
	     * @returns {Route|Undefined}
	     */
	    value: function getRouteByPath(path) {
	      return _lodash2['default'].find(this.getFlattenedRoutes(), { path: path });
	    }
	  }]);

	  return Router;
	})();

	exports.Router = Router;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _app_modulesSiteShared = __webpack_require__(217);

	var _app_modulesSiteShared2 = _interopRequireDefault(_app_modulesSiteShared);

	var _app_modulesSiteComponentsCtaLink = __webpack_require__(1);

	var _app_modulesSiteComponentsCtaLink2 = _interopRequireDefault(_app_modulesSiteComponentsCtaLink);

	var _classnames = __webpack_require__(173);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _app_modulesSiteUtilLocalytics = __webpack_require__(184);

	var _app_modulesUiUtilComponent = __webpack_require__(174);

	var _app_modulesUiUtilComponent2 = _interopRequireDefault(_app_modulesUiUtilComponent);

	var _app_modulesSiteNavigationNavigation = __webpack_require__(219);

	var _app_modulesSiteNavigationNavigation2 = _interopRequireDefault(_app_modulesSiteNavigationNavigation);

	var _app_modulesSiteNavigationNavigationUtils = __webpack_require__(220);

	var Anchor = (function (_React$Component) {
	  function Anchor() {
	    _classCallCheck(this, Anchor);

	    if (_React$Component != null) {
	      _React$Component.apply(this, arguments);
	    }
	  }

	  _inherits(Anchor, _React$Component);

	  _createClass(Anchor, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'header',
	        { className: (0, _app_modulesUiUtilComponent.prefix)('site-masthead grid') },
	        _react2['default'].createElement(
	          'div',
	          { className: (0, _app_modulesUiUtilComponent.prefix)('site-masthead-title col has-flexi-truncate align-middle') },
	          _react2['default'].createElement(
	            'div',
	            { className: (0, _app_modulesUiUtilComponent.prefix)('media media--center media--responsive') },
	            _react2['default'].createElement(
	              'span',
	              { className: (0, _app_modulesUiUtilComponent.prefix)('media__figure') },
	              _react2['default'].createElement('img', { src: '/assets/images/header-' + this.rootNavName() + '.svg', alt: '' })
	            ),
	            _react2['default'].createElement(
	              'div',
	              { className: (0, _app_modulesUiUtilComponent.prefix)('media__body') },
	              this.renderBreadcrumbs(),
	              _react2['default'].createElement(
	                'div',
	                { className: (0, _app_modulesUiUtilComponent.prefix)('grid') },
	                _react2['default'].createElement(
	                  'h1',
	                  { title: this.props.title },
	                  this.props.title
	                )
	              )
	            )
	          )
	        ),
	        this.props.actions
	      );
	    }
	  }, {
	    key: 'getNavItems',
	    value: function getNavItems() {
	      var url = _app_modulesSiteShared2['default'].store.get('url');
	      if (!url) return [];
	      return (0, _app_modulesSiteNavigationNavigationUtils.getActiveNavItems)(_app_modulesSiteNavigationNavigation2['default'], url);
	    }
	  }, {
	    key: 'rootNavName',
	    value: function rootNavName() {
	      return this.getNavItems().map(function (item) {
	        return item.id;
	      })[0] || 'resources'; // pick a fallback that will hopefully stay around.
	    }
	  }, {
	    key: 'renderBreadcrumbs',
	    value: function renderBreadcrumbs() {
	      var childNavItems = _lodash2['default'].dropRight(this.getNavItems());
	      // If we're at the top level, don't show any breadcrumbs
	      if (!childNavItems.length) return null;
	      var breadcrumbs = childNavItems.map(function (item) {
	        return _react2['default'].createElement(
	          'li',
	          { className: (0, _app_modulesUiUtilComponent.prefix)('list__item'), key: item.id },
	          _react2['default'].createElement(
	            _app_modulesSiteComponentsCtaLink2['default'],
	            {
	              href: item.path,
	              ctaEventName: 'anchor-breadcumb' },
	            item.label
	          )
	        );
	      });
	      return _react2['default'].createElement(
	        'nav',
	        null,
	        _react2['default'].createElement(
	          'p',
	          { id: 'masthead-bread-crumb-label', className: (0, _app_modulesUiUtilComponent.prefix)('assistive-text') },
	          'You are here:'
	        ),
	        _react2['default'].createElement(
	          'ol',
	          {
	            className: (0, _app_modulesUiUtilComponent.prefix)('breadcrumb list--horizontal'),
	            'aria-labelledby': 'masthead-bread-crumb-label' },
	          breadcrumbs
	        )
	      );
	    }
	  }, {
	    key: 'renderBadge',
	    value: function renderBadge() {
	      if (!this.props.badge) return null;
	      return _react2['default'].createElement(
	        'span',
	        { className: (0, _app_modulesUiUtilComponent.prefix)('badge m-left--medium shrink-none align-middle') },
	        this.props.badge
	      );
	    }
	  }]);

	  return Anchor;
	})(_react2['default'].Component);

	Anchor.propTypes = {
	  title: _react2['default'].PropTypes.string,
	  badge: _react2['default'].PropTypes.string,
	  actions: _react2['default'].PropTypes.node
	};

	exports['default'] = Anchor;
	module.exports = exports['default'];

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _immutable = __webpack_require__(218);

	var _immutable2 = _interopRequireDefault(_immutable);

	exports['default'] = {
	  store: _immutable2['default'].Map()
	};
	module.exports = exports['default'];

/***/ },
/* 218 */,
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _sitemap = __webpack_require__(213);

	var _sitemap2 = _interopRequireDefault(_sitemap);

	var _navigationUtils = __webpack_require__(220);

	exports['default'] = [{
	  route: 'getting-started',
	  label: 'Getting Started',
	  aura: false,
	  children: [{
	    route: 'getting-started:visualforce',
	    label: 'Visualforce'
	  }, {
	    route: 'getting-started:lightning',
	    label: 'Lightning'
	  }]
	}, {
	  route: 'design',
	  label: 'Design',
	  children: [{
	    route: 'design:layout',
	    label: 'Layout'
	  }, {
	    route: 'design:loading',
	    label: 'Loading'
	  }, {
	    route: 'design:navigation',
	    label: 'Navigation'
	  }, {
	    route: 'design:motion',
	    label: 'Motion'
	  }]
	}, {
	  route: 'components',
	  label: 'Components',
	  children: _sitemap2['default'].getRoute('components').routes.filter(function (route) {
	    return route.component;
	  }).map(_navigationUtils.createNavItem).concat([{
	    route: 'components:utilities',
	    label: 'Utilities',
	    separator: true,
	    children: _sitemap2['default'].getRoute('components:utilities').routes.filter(function (route) {
	      return route.component;
	    }).map(_navigationUtils.createNavItem)
	  }])
	}, {
	  route: 'native',
	  label: 'Native',
	  aura: false,
	  internal: true,
	  children: [{
	    route: 'native:ios',
	    label: 'iOS',
	    aura: false,
	    internal: true
	  }]
	}, {
	  route: 'resources',
	  label: 'Resources',
	  children: [{
	    route: 'resources:downloads',
	    label: 'Downloads',
	    aura: false
	  }, {
	    route: 'resources:icons',
	    label: 'Icons'
	  }, {
	    route: 'resources:tokens',
	    label: 'Design Tokens'
	  }]
	}, {
	  route: 'faq',
	  label: 'FAQ',
	  abbrTitle: 'Frequently Asked Questions'
	}, {
	  label: 'Settings',
	  settings: true,
	  separator: true,
	  internal: true
	}, {
	  label: 'Give Feedback',
	  url: 'https://salesforce.az1.qualtrics.com/SE/?SID=SV_9Ae8M28m6cNf0rP',
	  internal: false
	}, {
	  label: 'Give Feedback',
	  url: '/feedback',
	  internal: true
	}, {
	  label: 'Log a bug',
	  url: '/bugs',
	  internal: true
	}].map(_navigationUtils.formatNavItem);
	module.exports = exports['default'];

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	exports.createNavItem = createNavItem;
	exports.formatNavItem = formatNavItem;
	exports.flattenNavItems = flattenNavItems;
	exports.getActiveNavItems = getActiveNavItems;

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _sitemap = __webpack_require__(213);

	var _sitemap2 = _interopRequireDefault(_sitemap);

	/**
	 * Return a nav item representation of a route
	 *
	 * @param {Route} route
	 * @returns {object}
	 */

	function createNavItem(route) {
	  return {
	    route: route.uid,
	    label: route.component.title,
	    status: route.component.status,
	    children: route.routes.map(createNavItem)
	  };
	}

	/**
	 * Add additional fields to a nav item
	 *
	 * @param {NavItem} item
	 * @returns {NavItem}
	 */

	function formatNavItem(item) {
	  item.id = item.id || _lodash2['default'].kebabCase(item.label);
	  if (item.route) {
	    var route = _sitemap2['default'].getRoute(item.route);
	    if (route) {
	      item.path = route.path;
	    }
	  }
	  if (item.children) {
	    item.children.forEach(function (child) {
	      child.parent = item;
	      formatNavItem(child);
	    });
	  }
	  return item;
	}

	/**
	 * Return a recursivley flattened array representing a nav item and it's children
	 */

	function flattenNavItems(navItems) {
	  return _lodash2['default'].flattenDeep([navItems].concat(navItems.filter(function (item) {
	    return item.children;
	  }).map(function (item) {
	    return flattenNavItems(item.children);
	  })));
	}

	/**
	 * Return an array of active nav items based on a url path
	 *
	 * @param {NavItems[]} navItems
	 * @param {string} path
	 * @return {array}
	 */

	function getActiveNavItems(navItems, path) {
	  var activeItems = [];
	  var items = flattenNavItems(navItems).filter(function (item) {
	    return item.path;
	  });
	  var item = _lodash2['default'].find(items, { path: path });
	  if (item) {
	    activeItems.unshift(item);
	    var _parent = item.parent;
	    while (_parent) {
	      activeItems.unshift(_parent);
	      _parent = _parent.parent;
	    }
	  }
	  return activeItems;
	}

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _toConsumableArray = __webpack_require__(222)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _app_modulesSiteComponentsPageAnchor = __webpack_require__(216);

	var _app_modulesSiteComponentsPageAnchor2 = _interopRequireDefault(_app_modulesSiteComponentsPageAnchor);

	var _app_modulesSiteComponentsPageSettings = __webpack_require__(239);

	var _app_modulesSiteComponentsPageSettings2 = _interopRequireDefault(_app_modulesSiteComponentsPageSettings);

	var _content = __webpack_require__(315);

	var _content2 = _interopRequireDefault(_content);

	var _app_modulesUiSvgIcon = __webpack_require__(309);

	var _app_modulesUiSvgIcon2 = _interopRequireDefault(_app_modulesUiSvgIcon);

	var _classnames = __webpack_require__(173);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _app_modulesSiteShared = __webpack_require__(217);

	var _app_modulesSiteShared2 = _interopRequireDefault(_app_modulesSiteShared);

	var _generatedSiteVersion = __webpack_require__(316);

	var _generatedSiteVersion2 = _interopRequireDefault(_generatedSiteVersion);

	var _immutable = __webpack_require__(218);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _events = __webpack_require__(246);

	var _app_modulesSitePreferences = __webpack_require__(245);

	var _app_modulesSitePreferences2 = _interopRequireDefault(_app_modulesSitePreferences);

	var _app_modulesSitePreferencesComponent = __webpack_require__(317);

	var _app_modulesSitePreferencesComponent2 = _interopRequireDefault(_app_modulesSitePreferencesComponent);

	var _app_modulesSitePreferencesMixin = __webpack_require__(306);

	var _app_modulesSitePreferencesMixin2 = _interopRequireDefault(_app_modulesSitePreferencesMixin);

	var _app_modulesSiteUtilComponentStatus = __webpack_require__(307);

	var _app_modulesSiteUtilComponentStatus2 = _interopRequireDefault(_app_modulesSiteUtilComponentStatus);

	var _reactRouter = __webpack_require__(185);

	var _app_modulesSiteComponentsCtaLink = __webpack_require__(1);

	var _app_modulesSiteComponentsCtaLink2 = _interopRequireDefault(_app_modulesSiteComponentsCtaLink);

	var _app_modulesSiteUtilLocalytics = __webpack_require__(184);

	var _app_modulesUiUtilComponent = __webpack_require__(174);

	var _app_modulesUiUtilComponent2 = _interopRequireDefault(_app_modulesUiUtilComponent);

	var _app_modulesSiteNavigationNavigation = __webpack_require__(219);

	var _app_modulesSiteNavigationNavigation2 = _interopRequireDefault(_app_modulesSiteNavigationNavigation);

	var _app_modulesSiteNavigationNavigationUtils = __webpack_require__(220);

	var _reactAddonsCssTransitionGroup = __webpack_require__(318);

	var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

	/**
	 * Add extra meta data to the nav items
	 *
	 * @param {array} items
	 * @param {array} activeItems
	 * @param {array} keyPath
	 */
	function transformNavItems(items, activeItems) {
	  var keyPath = arguments[2] === undefined ? [] : arguments[2];

	  items.forEach(function (item, index) {
	    // Prevent stack overflow from circular dependency
	    delete item.parent;
	    item.keyPath = keyPath.concat(index);
	    item.hasChildren = item.children && item.children.length;
	    item.isSelected = _lodash2['default'].includes(activeItems, item);
	    item.isOpen = item.hasChildren && item.isSelected;
	    item.isActive = item === _lodash2['default'].last(activeItems);
	    if (item.hasChildren) {
	      transformNavItems(item.children, activeItems, item.keyPath.concat('children'));
	    } else {
	      delete item.children;
	    }
	  });
	}

	/**
	 * Recursively iterate over each navItem
	 *
	 * @param {Immutable.List} items
	 * @param {function} fn
	 */
	function eachNavItem(items, fn) {
	  items.forEach(function (item) {
	    fn(item);
	    if (item.has('children')) {
	      eachNavItem(item.get('children'), fn);
	    }
	  });
	}

	/**
	 * Recursively flatten the nav items
	 *
	 * @param {Immutable.List} items
	 * @returns {Immutable.List}
	 */
	function flattenNavItems(items) {
	  var flattenedItems = _immutable2['default'].List();
	  eachNavItem(items, function (item) {
	    flattenedItems = flattenedItems.push(item);
	  });
	  return flattenedItems;
	}

	exports['default'] = _react2['default'].createClass({
	  displayName: 'index',

	  mixins: [_app_modulesSitePreferencesMixin2['default']],

	  propTypes: {
	    url: _react2['default'].PropTypes.string,
	    anchor: _react2['default'].PropTypes.node,
	    anchorTitle: _react2['default'].PropTypes.string,
	    header: _react2['default'].PropTypes.node,
	    contentClassName: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.bool])
	  },

	  getInitialState: function getInitialState() {
	    // Store
	    _app_modulesSiteShared2['default'].store = _app_modulesSiteShared2['default'].store.set('url', this.props.url);
	    // Nav
	    var navItems = _lodash2['default'].cloneDeep(_app_modulesSiteNavigationNavigation2['default']);
	    var navItemsActive = (0, _app_modulesSiteNavigationNavigationUtils.getActiveNavItems)(navItems, this.props.url);
	    transformNavItems(navItems, navItemsActive);
	    return {
	      navItems: _immutable2['default'].fromJS(navItems),
	      showingSettings: false,
	      isExternal: true
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    // Events
	    if (typeof window !== 'undefined') {
	      window.__events = new _events.EventEmitter();
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    // Some events (from iframes) might have been triggered before
	    // the EventEmitter was created — so emit events for queued items
	    // and then drain the queue
	    if (_lodash2['default'].isArray(window.__eventsQueue)) {
	      window.__eventsQueue.filter(function (event) {
	        return _lodash2['default'].isObject(event) && _lodash2['default'].has(event, 'name');
	      }).forEach(function (event) {
	        var _window$__events;

	        var args = _lodash2['default'].isArray(event.args) ? event.args : [];
	        (_window$__events = window.__events).emit.apply(_window$__events, [event.name].concat(_toConsumableArray(args)));
	      });
	      window.__eventsQueue.length = 0;
	    }
	    var slds = window.LIGHTNING_DESIGN_SYSTEM;
	    this.setState({
	      showingSettings: !(_app_modulesSitePreferences2['default'].hasBeenViewed() || slds.isExternalUser() || slds.isMobile()),
	      isExternal: slds.isExternalUser()
	    });
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    // Store
	    _app_modulesSiteShared2['default'].store = _app_modulesSiteShared2['default'].store.set('url', nextProps.url);
	    // Nav
	    var nextNavItem = flattenNavItems(this.state.navItems).find(function (item) {
	      return item.get('path') === nextProps.url;
	    });
	    if (nextNavItem) {
	      this.onSelectNavItem(nextNavItem);
	    } else {
	      this.setState({
	        navItems: this.resetNavItems(this.state.navItems)
	      });
	    }
	  },

	  resetNavItems: function resetNavItems(navItems) {
	    eachNavItem(navItems, function (item) {
	      var keyPath = item.get('keyPath');
	      navItems = navItems.setIn(keyPath.push('isActive'), false);
	      navItems = navItems.setIn(keyPath.push('isSelected'), false);
	    });
	    return navItems;
	  },

	  onToggleNavItem: function onToggleNavItem(item, e) {
	    e.preventDefault();
	    var isOpen = item.get('isOpen');
	    var keyPath = item.get('keyPath').push('isOpen');
	    this.setState({
	      navItems: this.state.navItems.setIn(keyPath, !isOpen)
	    });
	  },

	  onSelectNavItem: function onSelectNavItem(item) {
	    var keyPath = item.get('keyPath');
	    var navItems = this.resetNavItems(this.state.navItems);
	    // Active
	    navItems = navItems.setIn(keyPath.push('isActive'), true);
	    // Selected
	    while (keyPath.size > 0) {
	      // If the last key is a number, we have a nav item
	      if (_lodash2['default'].isNumber(keyPath.last())) {
	        // If the nav item has children, open it
	        if (navItems.hasIn(keyPath.push('children'))) {
	          navItems = navItems.setIn(keyPath.push('isOpen'), true);
	        }
	        // Select the item
	        navItems = navItems.setIn(keyPath.push('isSelected'), true);
	      }
	      // Keep selecting/opening the ancestors
	      keyPath = keyPath.pop();
	    }
	    this.setState({
	      navItems: navItems
	    });
	  },

	  shouldShowToUserType: function shouldShowToUserType(item) {
	    if (!item.has('internal')) return true;
	    var isExternal = this.state.isExternal;
	    var isInternal = !isExternal;
	    return _lodash2['default'].some([isExternal && !item.get('internal'), isInternal && item.get('internal')]);
	  },

	  shouldShowToRole: function shouldShowToRole(item) {
	    if (!item.has('aura')) return true;
	    var hasRegular = this.hasPreference('role', 'regular');
	    var hasAura = this.hasPreference('role', 'aura');
	    return _lodash2['default'].some([hasRegular && !item.get('aura'), hasAura && item.get('aura')]);
	  },

	  shouldShowNavItem: function shouldShowNavItem(item) {
	    return _lodash2['default'].every([this.shouldShowToRole(item), this.shouldShowToUserType(item), _app_modulesSiteUtilComponentStatus2['default'].shouldDisplay(this.state.status, item.get('status'))]);
	  },

	  showSettings: function showSettings(e) {
	    e.preventDefault();
	    if (this.state.isExternal) {
	      return;
	    }
	    this.setState({ showingSettings: true });
	  },

	  closeSettings: function closeSettings() {
	    this.setState({ showingSettings: false });
	    _app_modulesSitePreferences2['default'].storeViewed();
	  },

	  render: function render() {
	    var contentClassName = this.props.contentClassName;

	    if (contentClassName === false) {
	      contentClassName = '';
	    } else {
	      contentClassName = (0, _classnames2['default'])((0, _app_modulesUiUtilComponent.prefix)('site-content p-around--xx-large'), contentClassName);
	    }
	    return _react2['default'].createElement(
	      'div',
	      null,
	      this.renderBanner(),
	      _react2['default'].createElement(
	        'main',
	        { className: (0, _app_modulesUiUtilComponent.prefix)('site-main'), role: 'main' },
	        this.renderAnchor(),
	        this.props.header,
	        _react2['default'].createElement(
	          _content2['default'],
	          { role: this.state.role, className: contentClassName },
	          this.props.children
	        )
	      ),
	      this.renderNav(),
	      this.renderFooter(),
	      _react2['default'].createElement(_app_modulesSiteComponentsPageSettings2['default'], { isOpen: this.state.showingSettings, onClose: this.closeSettings })
	    );
	  },

	  renderAnchor: function renderAnchor() {
	    if (this.props.anchor) return this.props.anchor;
	    if (this.props.anchorTitle) {
	      return _react2['default'].createElement(_app_modulesSiteComponentsPageAnchor2['default'], { title: this.props.anchorTitle });
	    }
	    return null;
	  },

	  renderBanner: function renderBanner(banner) {
	    return _react2['default'].createElement(
	      'header',
	      { className: (0, _app_modulesUiUtilComponent.prefix)('site-banner'), role: 'banner' },
	      _react2['default'].createElement(
	        _reactRouter.Link,
	        { to: '/' },
	        _react2['default'].createElement(
	          'span',
	          { className: (0, _app_modulesUiUtilComponent.prefix)('site-logo') },
	          'Salesforce'
	        ),
	        'Design System'
	      ),
	      _react2['default'].createElement(
	        'div',
	        { className: (0, _app_modulesUiUtilComponent.prefix)('site-skip-content') },
	        _react2['default'].createElement(
	          'a',
	          { href: '#navigation' },
	          'Skip to Navigation'
	        )
	      )
	    );
	  },

	  renderNav: function renderNav(nav) {
	    return _react2['default'].createElement(
	      'nav',
	      { id: 'navigation', className: (0, _app_modulesUiUtilComponent.prefix)('site-navigation'), role: 'navigation' },
	      this.renderNavItems(this.state.navItems)
	    );
	  },

	  renderLink: function renderLink(item) {
	    var label = this.renderLinkLabel(item);
	    var handler = this.getNavItemHandler(item);
	    if (!item.has('url') && !item.has('path')) {
	      return _react2['default'].createElement(
	        'a',
	        { href: '#', onClick: handler },
	        label
	      );
	    }
	    if (item.has('url')) {
	      return _react2['default'].createElement(
	        'a',
	        { href: item.get('url'), onClick: handler },
	        label
	      );
	    }
	    var content = _react2['default'].createElement(
	      'span',
	      { className: (0, _app_modulesUiUtilComponent.prefix)('media media--center media--reverse') },
	      this.renderNavItemIcons(item),
	      _react2['default'].createElement(
	        'span',
	        { className: (0, _app_modulesUiUtilComponent.prefix)('media__body') },
	        label
	      )
	    );
	    if (item.has('children')) {
	      return _react2['default'].createElement(
	        'a',
	        { href: '#', onClick: handler },
	        content
	      );
	    }
	    return _react2['default'].createElement(
	      _reactRouter.Link,
	      { to: item.get('path'), onClick: handler },
	      content
	    );
	  },

	  renderLinkLabel: function renderLinkLabel(item) {
	    if (item.get('abbrTitle')) {
	      return _react2['default'].createElement(
	        'abbr',
	        { title: item.get('abbrTitle') },
	        item.get('label')
	      );
	    }
	    return item.get('label');
	  },

	  getNavItemHandler: function getNavItemHandler(item) {
	    switch (item.get('id')) {
	      case 'settings':
	        return this.showSettings;
	    }
	    if (item.get('hasChildren')) {
	      return this.onToggleNavItem.bind(this, item);
	    }
	    return function () {};
	  },

	  renderNavItems: function renderNavItems(items, level) {
	    var _this = this;

	    level = level ? level : 0;
	    items = items.filter(this.shouldShowNavItem, this).map(function (item) {
	      var listItemClass = item.get('separator') ? 'list__item has-divider' : 'list__item';
	      var className = (0, _classnames2['default'])(listItemClass, {
	        'is-open': item.get('isOpen'),
	        'is-selected': item.get('isSelected'),
	        'is-active': item.get('isActive'),
	        'is-closed': !item.get('isOpen') && item.get('hasChildren')
	      });
	      return _react2['default'].createElement(
	        'li',
	        { className: (0, _app_modulesUiUtilComponent.prefix)(className), key: item.get('id') },
	        _this.renderLink(item),
	        item.get('hasChildren') && item.get('isOpen') ? _this.renderNavItems(item.get('children'), level + 1) : null
	      );
	    });
	    var classnames = (0, _classnames2['default'])('list--vertical has-block-links', {
	      'is-nested': level > 0
	    });
	    return _react2['default'].createElement(
	      'ul',
	      { className: (0, _app_modulesUiUtilComponent.prefix)(classnames) },
	      _react2['default'].createElement(
	        _reactAddonsCssTransitionGroup2['default'],
	        { transitionName: 'site-fade-transition' },
	        items.toArray()
	      )
	    );
	  },

	  renderNavItemIcons: function renderNavItemIcons(item) {
	    if (!item.get('hasChildren')) return null;
	    var direction = item.get('isOpen') ? 'down' : 'right';
	    return _react2['default'].createElement(
	      'span',
	      { className: (0, _app_modulesUiUtilComponent.prefix)('media__figure') },
	      _react2['default'].createElement(_app_modulesUiSvgIcon2['default'], { sprite: 'utility', symbol: direction, className: 'icon icon__svg icon-utility-' + direction + ' icon--small icon-text-default' })
	    );
	  },

	  renderFooter: function renderFooter(footer) {
	    var versionDateBuildString = undefined;
	    if (_generatedSiteVersion2['default'].travisJobNumber && _generatedSiteVersion2['default'].travisJobNumber !== 'NOT_SET') {
	      versionDateBuildString = 'Version ' + _generatedSiteVersion2['default'].sldsVersion + '. Last Updated on ' + _generatedSiteVersion2['default'].dateNow + '. Travis build ' + _generatedSiteVersion2['default'].travisJobNumber + '.';
	    } else {
	      versionDateBuildString = 'Version ' + _generatedSiteVersion2['default'].sldsVersion + '. Last Updated on ' + _generatedSiteVersion2['default'].dateNow + '.';
	    }
	    return _react2['default'].createElement(
	      'footer',
	      { className: (0, _app_modulesUiUtilComponent.prefix)('site-contentinfo grid wrap site-text-longform text-body--small'), role: 'contentinfo' },
	      _react2['default'].createElement(
	        'p',
	        { className: (0, _app_modulesUiUtilComponent.prefix)('col--padded size--1-of-1 shrink-none large-size--1-of-2') },
	        'Copyright © 2015 ',
	        _react2['default'].createElement(
	          'span',
	          { className: (0, _app_modulesUiUtilComponent.prefix)('site-name') },
	          'Sales',
	          _react2['default'].createElement(
	            'i',
	            null,
	            'f'
	          ),
	          'orce'
	        ),
	        '. ',
	        _react2['default'].createElement(
	          _app_modulesSiteComponentsCtaLink2['default'],
	          { href: 'http://salesforce.com/company/legal/intellectual.jsp', ctaEventName: 'copyright' },
	          'All rights reserved'
	        ),
	        '.'
	      ),
	      _react2['default'].createElement(
	        'p',
	        { className: (0, _app_modulesUiUtilComponent.prefix)('col--padded size--1-of-1 shrink-none large-size--1-of-2') },
	        versionDateBuildString
	      )
	    );
	  }

	});
	module.exports = exports['default'];

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Array$from = __webpack_require__(223)["default"];

	exports["default"] = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return _Array$from(arr);
	  }
	};

	exports.__esModule = true;

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(224), __esModule: true };

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(225);
	__webpack_require__(235);
	module.exports = __webpack_require__(5).core.Array.from;

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(5).set
	  , $at   = __webpack_require__(226)(true)
	  , ITER  = __webpack_require__(227).safe('iter')
	  , $iter = __webpack_require__(228)
	  , step  = $iter.step;

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(233)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(5);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
	}
	uid.safe = __webpack_require__(5).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(5)
	  , cof               = __webpack_require__(229)
	  , classof           = cof.classof
	  , assert            = __webpack_require__(232)
	  , assertObject      = assert.obj
	  , SYMBOL_ITERATOR   = __webpack_require__(230)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = __webpack_require__(231)('iterators')
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}

	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol;
	    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
	      || SYMBOL_ITERATOR in O
	      || $.has(Iterators, classof(O));
	  },
	  get: function(it){
	    var Symbol = $.g.Symbol
	      , getIter;
	    if(it != undefined){
	      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
	        || it[SYMBOL_ITERATOR]
	        || Iterators[classof(it)];
	    }
	    assert($.isFunction(getIter), it, ' is not iterable!');
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(5)
	  , TAG      = __webpack_require__(230)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5).g
	  , store  = __webpack_require__(231)('wks');
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(227).safe('Symbol.' + name));
	};

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var $      = __webpack_require__(5)
	  , SHARED = '__core-js_shared__'
	  , store  = $.g[SHARED] || ($.g[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(15)
	  , $redef          = __webpack_require__(234)
	  , $               = __webpack_require__(5)
	  , cof             = __webpack_require__(229)
	  , $iter           = __webpack_require__(228)
	  , SYMBOL_ITERATOR = __webpack_require__(230)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW || FORCE)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5).hide;

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var $     = __webpack_require__(5)
	  , ctx   = __webpack_require__(236)
	  , $def  = __webpack_require__(15)
	  , $iter = __webpack_require__(228)
	  , call  = __webpack_require__(237);
	$def($def.S + $def.F * !__webpack_require__(238)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = Object($.assertDefined(arrayLike))
	      , mapfn   = arguments[1]
	      , mapping = mapfn !== undefined
	      , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
	      , index   = 0
	      , length, result, step, iterator;
	    if($iter.is(O)){
	      iterator = $iter.get(O);
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      result   = new (typeof this == 'function' ? this : Array);
	      for(; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
	      }
	    } else {
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
	      for(; length > index; index++){
	        result[index] = mapping ? f(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(232).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	var assertObject = __webpack_require__(232).obj;
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)assertObject(ret.call(iterator));
	}
	function call(iterator, fn, value, entries){
	  try {
	    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	}
	call.close = close;
	module.exports = call;

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(230)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(244);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _app_modulesSitePreferences = __webpack_require__(245);

	var _app_modulesSitePreferences2 = _interopRequireDefault(_app_modulesSitePreferences);

	var _app_modulesSitePreferencesMixin = __webpack_require__(306);

	var _app_modulesSitePreferencesMixin2 = _interopRequireDefault(_app_modulesSitePreferencesMixin);

	var _app_modulesSiteUtilComponentStatus = __webpack_require__(307);

	var _app_modulesSiteUtilComponentStatus2 = _interopRequireDefault(_app_modulesSiteUtilComponentStatus);

	var _uiComponentsButtonsIndexReact = __webpack_require__(240);

	var _uiComponentsButtonsIndexReact2 = _interopRequireDefault(_uiComponentsButtonsIndexReact);

	var _uiComponentsButtonsFlavorsIconIndexReact = __webpack_require__(308);

	var _uiComponentsButtonsFlavorsIconIndexReact2 = _interopRequireDefault(_uiComponentsButtonsFlavorsIconIndexReact);

	var _uiComponentsFormsFlavorsRadioIndexReact = __webpack_require__(310);

	var _uiComponentsFormsFlavorsRadioIndexReact2 = _interopRequireDefault(_uiComponentsFormsFlavorsRadioIndexReact);

	var _uiComponentsModalsIndexReact = __webpack_require__(311);

	var _uiComponentsModalsIndexReact2 = _interopRequireDefault(_uiComponentsModalsIndexReact);

	var _app_modulesSiteComponentsCtaLink = __webpack_require__(1);

	var _app_modulesSiteComponentsCtaLink2 = _interopRequireDefault(_app_modulesSiteComponentsCtaLink);

	var _classnames = __webpack_require__(173);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _app_modulesSiteUtilLocalytics = __webpack_require__(184);

	var _app_modulesUiUtilComponent = __webpack_require__(174);

	var _app_modulesUiUtilComponent2 = _interopRequireDefault(_app_modulesUiUtilComponent);

	var Settings = _react2['default'].createClass({
	  displayName: 'Settings',

	  mixins: [_app_modulesSitePreferencesMixin2['default']],

	  componentDidMount: function componentDidMount() {
	    this.originalPrefs = _app_modulesSitePreferences2['default'].getDefaults()[window.LIGHTNING_DESIGN_SYSTEM.userType()];
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var _this = this;

	    if (nextProps.isOpen) {
	      (function () {
	        var radio = _reactDom2['default'].findDOMNode(_this.refs.firstOption);
	        setTimeout(function () {
	          return radio.focus();
	        }, 100);
	      })();
	    }
	  },

	  roleChanged: function roleChanged(e) {
	    var val = e.currentTarget.value;
	    _app_modulesSitePreferences2['default'].set('role', val);

	    (0, _app_modulesSiteUtilLocalytics.logCTAEvent)('role-selector', { value: val });
	  },

	  statusChanged: function statusChanged(e) {
	    var val = e.currentTarget.value;
	    _app_modulesSitePreferences2['default'].set('status', val);

	    (0, _app_modulesSiteUtilLocalytics.logCTAEvent)('status-selector', { value: val });
	  },

	  revertChangesAndClose: function revertChangesAndClose() {
	    _app_modulesSitePreferences2['default'].setAll(this.originalPrefs);
	    this.props.onClose();
	  },

	  shouldCheckStatus: function shouldCheckStatus(status) {
	    return this.hasPreference('status', status.id);
	  },

	  renderStatusRadio: function renderStatusRadio(status) {
	    return _react2['default'].createElement(
	      'div',
	      { key: status.id },
	      _react2['default'].createElement(_uiComponentsFormsFlavorsRadioIndexReact2['default'], {
	        name: 'type',
	        label: status.desc,
	        assistiveText: status.name, value: status.id,
	        checked: this.shouldCheckStatus(status),
	        onChange: this.statusChanged
	      })
	    );
	  },

	  render: function render() {
	    var _this2 = this;

	    return _react2['default'].createElement(
	      _uiComponentsModalsIndexReact2['default'],
	      { isOpen: this.props.isOpen,
	        onRequestClose: this.props.onClose,
	        className: 'site-settings'
	      },
	      _react2['default'].createElement(
	        _uiComponentsModalsIndexReact2['default'].Header,
	        null,
	        _react2['default'].createElement(
	          'h2',
	          { className: 'site-text-heading--large' },
	          'Settings'
	        )
	      ),
	      _react2['default'].createElement(
	        _uiComponentsModalsIndexReact2['default'].Body,
	        null,
	        _react2['default'].createElement(
	          'div',
	          { className: (0, _app_modulesUiUtilComponent.prefix)('p-horizontal--small p-vertical--medium') },
	          _react2['default'].createElement(
	            'fieldset',
	            { className: (0, _app_modulesUiUtilComponent.prefix)('p-horizontal--large form-element') },
	            _react2['default'].createElement(
	              'legend',
	              { className: (0, _app_modulesUiUtilComponent.prefix)('form-element__label site-text-heading--medium') },
	              'Are you an Aura developer?'
	            ),
	            _react2['default'].createElement(
	              'div',
	              { className: (0, _app_modulesUiUtilComponent.prefix)('form-element__control') },
	              _react2['default'].createElement(_uiComponentsFormsFlavorsRadioIndexReact2['default'], {
	                ref: 'firstOption',
	                tabIndex: '0',
	                label: 'Yes',
	                name: 'aura',
	                assistiveText: 'aura',
	                value: 'aura',
	                checked: this.state.role === 'aura',
	                onChange: this.roleChanged
	              }),
	              _react2['default'].createElement(_uiComponentsFormsFlavorsRadioIndexReact2['default'], {
	                label: 'No',
	                name: 'aura',
	                assistiveText: 'regular',
	                value: 'regular',
	                checked: this.state.role === 'regular',
	                onChange: this.roleChanged
	              })
	            )
	          ),
	          _react2['default'].createElement('hr', null),
	          _react2['default'].createElement(
	            'fieldset',
	            { className: (0, _app_modulesUiUtilComponent.prefix)('p-horizontal--large form-element') },
	            _react2['default'].createElement(
	              'legend',
	              { className: (0, _app_modulesUiUtilComponent.prefix)('form-element__label site-text-heading--medium') },
	              'Which components would you like to see?'
	            ),
	            _react2['default'].createElement(
	              'div',
	              { className: (0, _app_modulesUiUtilComponent.prefix)('form-element__control') },
	              _app_modulesSitePreferences2['default'].statuses.map(function (s) {
	                return _this2.renderStatusRadio(s);
	              })
	            )
	          )
	        )
	      ),
	      _react2['default'].createElement(
	        _uiComponentsModalsIndexReact2['default'].Footer,
	        null,
	        _react2['default'].createElement(
	          _uiComponentsButtonsIndexReact2['default'],
	          { flavor: 'neutral', onClick: this.revertChangesAndClose },
	          'Cancel'
	        ),
	        _react2['default'].createElement(
	          _uiComponentsButtonsIndexReact2['default'],
	          { flavor: 'neutral,brand', onClick: this.props.onClose },
	          'Save'
	        )
	      )
	    );
	  }
	});

	exports['default'] = Settings;
	module.exports = exports['default'];

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _extends = __webpack_require__(11)['default'];

	var _Object$assign = __webpack_require__(12)['default'];

	var React = __webpack_require__(19);
	var componentUtil = __webpack_require__(174);
	var pf = componentUtil.prefix;
	var createChainedFunction = componentUtil.createChainedFunction;

	var Button = (function (_React$Component) {
	  function Button(props) {
	    _classCallCheck(this, Button);

	    _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).call(this, props);
	    componentUtil.install(this);
	    this.state = {};
	  }

	  _inherits(Button, _React$Component);

	  _createClass(Button, [{
	    key: 'onClick',
	    value: function onClick(e) {
	      this.setState({ active: !this.state.active });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var className = this.$getClassNameWithFlavor(pf('button'));
	      var click = createChainedFunction(this.props.onClick, this.onClick.bind(this));
	      var props = _Object$assign(this.$propsWithoutKeys('className', 'flavor'), { onClick: click });
	      return React.createElement(
	        'button',
	        _extends({ className: className }, props),
	        this.props.children
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      flavor: componentUtil.PropTypes.flavor('neutral', 'brand', 'inverse', 'neutral-selected', 'inverse-selected', 'hint', 'small', 'more', 'icon-more')
	    },
	    enumerable: true
	  }]);

	  return Button;
	})(React.Component);

	module.exports = Button;

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$getOwnPropertyDescriptor = __webpack_require__(242)["default"];

	exports["default"] = function get(_x, _x2, _x3) {
	  var _again = true;

	  _function: while (_again) {
	    var object = _x,
	        property = _x2,
	        receiver = _x3;
	    desc = parent = getter = undefined;
	    _again = false;

	    var desc = _Object$getOwnPropertyDescriptor(object, property);

	    if (desc === undefined) {
	      var parent = Object.getPrototypeOf(object);

	      if (parent === null) {
	        return undefined;
	      } else {
	        _x = parent;
	        _x2 = property;
	        _x3 = receiver;
	        _again = true;
	        continue _function;
	      }
	    } else if ("value" in desc) {
	      return desc.value;
	    } else {
	      var getter = desc.get;

	      if (getter === undefined) {
	        return undefined;
	      }

	      return getter.call(receiver);
	    }
	  }
	};

	exports.__esModule = true;

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(243), __esModule: true };

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	__webpack_require__(177);
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $.getDesc(it, key);
	};

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22);


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _events = __webpack_require__(246);

	var _strategies = __webpack_require__(247);

	var _defaults = __webpack_require__(305);

	var _defaults2 = _interopRequireDefault(_defaults);

	var emitter = new _events.EventEmitter();
	emitter.setMaxListeners(20);

	var roles = ['aura', 'regular'];
	roles.aura = roles[0];
	roles.regular = roles[1];

	// little weird, but we only want to allow devReady or all in prefs vs all the possible status states (e.g. prototype)
	var statuses = [{
	  id: 'all',
	  name: 'All',
	  desc: 'All components, including those in progress'
	}, {
	  id: 'dev-ready',
	  name: 'Dev ready',
	  desc: 'Stable, complete components only'
	}];

	/**
	 * Default set of preferences before the browser loads
	 */
	var prefs = _defaults2['default'].internal;

	/**
	 * Default strategy before the browser loads
	 */
	var strategies = [(0, _strategies.DefaultsStrategy)()];

	/**
	 * Update the storage strategy
	 *
	 * @param {PrefsStrategy} newStrategy
	 */
	function setStrategies(newStrategies) {
	  strategies = newStrategies;
	  setAll(strategies.reduce(function (ps, s) {
	    return _lodash2['default'].extend(ps, s.getInitialPrefs(ps));
	  }, prefs));
	}

	/**
	 * Force the strategy to update and emit an event
	 */
	function sync() {
	  var emit = arguments[0] === undefined ? true : arguments[0];

	  var newPrefs = all();
	  strategies.forEach(function (s) {
	    return s.update(newPrefs);
	  });
	  if (emit) {
	    emitter.emit('preferences.updated', newPrefs);
	  }
	}

	/**
	 * Return a copy of the current prefs
	 *
	 * @returns {object}
	 */
	function all() {
	  return _lodash2['default'].clone(prefs);
	}

	/**
	 * Overwrite the prefs and sync
	 *
	 * @param {object} newPrefs
	 */
	function setAll(newPrefs) {
	  var emit = arguments[1] === undefined ? true : arguments[1];

	  prefs = newPrefs;
	  sync(emit);
	}

	/**
	 * Update a single key/value in the prefs and sync
	 *
	 * @param {string} key
	 * @param {any} value
	 */
	function set(key, value) {
	  prefs[key] = value;
	  sync();
	}

	/**
	 * Return a single value from the prefs
	 *
	 * @param {string} key
	 */
	function get(key) {
	  return prefs[key];
	}

	/**
	 * Listen
	 *
	 * @param {function} listener
	 */
	function listen(listener) {
	  emitter.on('preferences.updated', listener);
	}

	/**
	 * Unlisten
	 *
	 * @param {function} listener
	 */
	function unlisten(listener) {
	  emitter.removeListener('preferences.updated', listener);
	}

	/**
	 *
	 */
	function storeViewed() {
	  window.localStorage.setItem('hasBeenViewed', 'true');
	}

	/**
	 *
	 */
	function hasBeenViewed() {
	  return window.localStorage.getItem('hasBeenViewed');
	}

	exports['default'] = {

	  setStrategies: setStrategies,
	  sync: sync,
	  all: all,
	  setAll: setAll,
	  get: get,
	  set: set,
	  listen: listen,
	  unlisten: unlisten,
	  storeViewed: storeViewed,
	  hasBeenViewed: hasBeenViewed,

	  getDefaults: function getDefaults() {
	    return _lodash2['default'].clone(_defaults2['default']);
	  },

	  roles: roles,
	  statuses: statuses

	};
	module.exports = exports['default'];

/***/ },
/* 246 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _defineProperty = __webpack_require__(248)['default'];

	var _slicedToArray = __webpack_require__(249)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _Object$keys = __webpack_require__(175)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _stampit = __webpack_require__(258);

	var _stampit2 = _interopRequireDefault(_stampit);

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var DefaultsStrategy = (0, _stampit2['default'])().methods({
	  getInitialPrefs: function getInitialPrefs(currentPrefs) {
	    return currentPrefs;
	  },

	  load: function load() {},

	  update: function update(prefs) {}
	});

	exports.DefaultsStrategy = DefaultsStrategy;
	var LocalStorageStrategy = (0, _stampit2['default'])().methods({
	  getInitialPrefs: function getInitialPrefs(currentPrefs) {
	    return this.load() || currentPrefs;
	  },

	  load: function load() {
	    var prefs = localStorage.getItem('prefs');
	    return prefs && JSON.parse(prefs);
	  },

	  update: function update(prefs) {
	    localStorage.setItem('prefs', JSON.stringify(prefs));
	  }
	});

	exports.LocalStorageStrategy = LocalStorageStrategy;
	var UrlPrefsStrategy = (0, _stampit2['default'])().methods({
	  /**
	   * Called from Prefs.setStrategy()
	   *
	   * @param {object} currentPrefs
	   * @returns {object}
	   */
	  getInitialPrefs: function getInitialPrefs(currentPrefs) {
	    return this.load() || currentPrefs;
	  },
	  /**
	   * Get preferences from window.location.hash
	   *
	   * @private
	   * @returns {object}
	   */
	  load: function load() {
	    var hash = window.location.hash.slice(1);
	    if (hash === '') return false;
	    return hash.split('&').reduce(function (acc, xs) {
	      var _xs$split = xs.split('=');

	      var _xs$split2 = _slicedToArray(_xs$split, 2);

	      var key = _xs$split2[0];
	      var val = _xs$split2[1];

	      if (!val) return acc;
	      return _lodash2['default'].extend(acc, _defineProperty({}, decodeURIComponent(key), decodeURIComponent(val)));
	    }, {});
	  },
	  /**
	   * Called whenever preferences are updated
	   *
	   * @param {object} prefs - the updated prefs
	   */
	  update: function update(prefs) {
	    var hash = window.location.hash.replace(/(&)?\w+=\S+/ig, '').replace('#', '');
	    // unshift current hash onto the full preferences url: e.g. #button&status=dev-ready
	    var prefHash = _lodash2['default'].compact([hash].concat(_Object$keys(prefs).filter(function (x) {
	      return prefs[x];
	    }).map(function (x) {
	      return '' + x + '=' + encodeURIComponent(prefs[x]);
	    }))).join('&');
	    window.history.replaceState({}, '', '#' + prefHash);
	    window.location.hash = prefHash;
	  }
	});
	exports.UrlPrefsStrategy = UrlPrefsStrategy;

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(8)["default"];

	exports["default"] = function (obj, key, value) {
	  return _Object$defineProperty(obj, key, {
	    value: value,
	    enumerable: true,
	    configurable: true,
	    writable: true
	  });
	};

	exports.__esModule = true;

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _isIterable = __webpack_require__(250)["default"];

	var _getIterator = __webpack_require__(256)["default"];

	exports["default"] = function (arr, i) {
	  if (Array.isArray(arr)) {
	    return arr;
	  } else if (_isIterable(Object(arr))) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  } else {
	    throw new TypeError("Invalid attempt to destructure non-iterable instance");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(251), __esModule: true };

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(252);
	__webpack_require__(225);
	__webpack_require__(255);
	module.exports = __webpack_require__(5).core.isIterable;

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(253);
	var $           = __webpack_require__(5)
	  , Iterators   = __webpack_require__(228).Iterators
	  , ITERATOR    = __webpack_require__(230)('iterator')
	  , ArrayValues = Iterators.Array
	  , NL          = $.g.NodeList
	  , HTC         = $.g.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype;
	if($.FW){
	  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
	  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(5)
	  , setUnscope = __webpack_require__(254)
	  , ITER       = __webpack_require__(227).safe('iter')
	  , $iter      = __webpack_require__(228)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(233)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 254 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(5).core
	  , $iter = __webpack_require__(228);
	core.isIterable  = $iter.is;
	core.getIterator = $iter.get;

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(257), __esModule: true };

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(252);
	__webpack_require__(225);
	__webpack_require__(255);
	module.exports = __webpack_require__(5).core.getIterator;

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Stampit
	 **
	 * Create objects from reusable, composable behaviors.
	 **
	 * Copyright (c) 2013 Eric Elliott
	 * http://opensource.org/licenses/MIT
	 **/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodashCollectionForEach = __webpack_require__(259);

	var _lodashCollectionForEach2 = _interopRequireDefault(_lodashCollectionForEach);

	var _lodashLangIsFunction = __webpack_require__(286);

	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

	var _lodashLangIsObject = __webpack_require__(266);

	var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

	var _supermixer = __webpack_require__(288);

	var create = Object.create;
	function isThenable(value) {
	  return value && (0, _lodashLangIsFunction2['default'])(value.then);
	}

	function extractFunctions() {
	  var result = [];

	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if ((0, _lodashLangIsFunction2['default'])(args[0])) {
	    (0, _lodashCollectionForEach2['default'])(args, function (fn) {
	      // assuming all the arguments are functions
	      if ((0, _lodashLangIsFunction2['default'])(fn)) {
	        result.push(fn);
	      }
	    });
	  } else if ((0, _lodashLangIsObject2['default'])(args[0])) {
	    (0, _lodashCollectionForEach2['default'])(args, function (obj) {
	      (0, _lodashCollectionForEach2['default'])(obj, function (fn) {
	        if ((0, _lodashLangIsFunction2['default'])(fn)) {
	          result.push(fn);
	        }
	      });
	    });
	  }
	  return result;
	}

	function addMethods(fixed) {
	  for (var _len2 = arguments.length, methods = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    methods[_key2 - 1] = arguments[_key2];
	  }

	  return _supermixer.mixinFunctions.apply(undefined, [fixed.methods].concat(methods));
	}
	function addRefs(fixed) {
	  for (var _len3 = arguments.length, refs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    refs[_key3 - 1] = arguments[_key3];
	  }

	  fixed.refs = fixed.state = _supermixer.mixin.apply(undefined, [fixed.refs].concat(refs));
	  return fixed.refs;
	}
	function addInit(fixed) {
	  for (var _len4 = arguments.length, inits = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    inits[_key4 - 1] = arguments[_key4];
	  }

	  var extractedInits = extractFunctions.apply(undefined, inits);
	  fixed.init = fixed.enclose = fixed.init.concat(extractedInits);
	  return fixed.init;
	}
	function addProps(fixed) {
	  for (var _len5 = arguments.length, propses = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	    propses[_key5 - 1] = arguments[_key5];
	  }

	  return _supermixer.merge.apply(undefined, [fixed.props].concat(propses));
	}
	function addStatic(fixed) {
	  for (var _len6 = arguments.length, statics = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
	    statics[_key6 - 1] = arguments[_key6];
	  }

	  return _supermixer.mixin.apply(undefined, [fixed['static']].concat(statics));
	}

	function cloneAndExtend(fixed, extensionFunction) {
	  var stamp = stampit(fixed);

	  for (var _len7 = arguments.length, args = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
	    args[_key7 - 2] = arguments[_key7];
	  }

	  extensionFunction.apply(undefined, [stamp.fixed].concat(args));
	  return stamp;
	}

	function _compose() {
	  var result = stampit();

	  for (var _len8 = arguments.length, factories = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	    factories[_key8] = arguments[_key8];
	  }

	  (0, _lodashCollectionForEach2['default'])(factories, function (source) {
	    if (source && source.fixed) {
	      addMethods(result.fixed, source.fixed.methods);
	      // We might end up having two different stampit modules loaded and used in conjunction.
	      // These || operators ensure that old stamps could be combined with the current version stamps.
	      // 'state' is the old name for 'refs'
	      addRefs(result.fixed, source.fixed.refs || source.fixed.state);
	      // 'enclose' is the old name for 'init'
	      addInit(result.fixed, source.fixed.init || source.fixed.enclose);
	      addProps(result.fixed, source.fixed.props);
	      addStatic(result.fixed, source.fixed['static']);
	    }
	  });
	  return (0, _supermixer.mixin)(result, result.fixed['static']);
	}

	/**
	 * Return a factory function that will produce new objects using the
	 * components that are passed in or composed.
	 *
	 * @param  {Object} [options] Options to build stamp from: `{ methods, refs, init, props }`
	 * @param  {Object} [options.methods] A map of method names and bodies for delegation.
	 * @param  {Object} [options.refs] A map of property names and values to be mixed into each new object.
	 * @param  {Object} [options.init] A closure (function) used to create private data and privileged methods.
	 * @param  {Object} [options.props] An object to be deeply cloned into each newly stamped object.
	 * @param  {Object} [options.static] An object to be mixed into each `this` and derived stamps (not objects!).
	 * @return {Function(refs)} factory A factory to produce objects.
	 * @return {Function(refs)} factory.create Just like calling the factory function.
	 * @return {Object} factory.fixed An object map containing the stamp components.
	 * @return {Function(methods)} factory.methods Add methods to the stamp. Chainable.
	 * @return {Function(refs)} factory.refs Add references to the stamp. Chainable.
	 * @return {Function(Function(context))} factory.init Add a closure which called on object instantiation. Chainable.
	 * @return {Function(props)} factory.props Add deeply cloned properties to the produced objects. Chainable.
	 * @return {Function(stamps)} factory.compose Combine several stamps into single. Chainable.
	 * @return {Function(statics)} factory.static Add properties to the stamp (not objects!). Chainable.
	 */
	var stampit = function stampit(options) {
	  var fixed = { methods: {}, refs: {}, init: [], props: {}, 'static': {} };
	  fixed.state = fixed.refs; // Backward compatibility. 'state' is the old name for 'refs'.
	  fixed.enclose = fixed.init; // Backward compatibility. 'enclose' is the old name for 'init'.
	  if (options) {
	    addMethods(fixed, options.methods);
	    addRefs(fixed, options.refs);
	    addInit(fixed, options.init);
	    addProps(fixed, options.props);
	    addStatic(fixed, options['static']);
	  }

	  var factory = function Factory(refs) {
	    for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
	      args[_key9 - 1] = arguments[_key9];
	    }

	    var instance = (0, _supermixer.mixin)(create(fixed.methods), fixed.refs, refs);
	    (0, _supermixer.mergeUnique)(instance, fixed.props); // props are safely merged into refs

	    var nextPromise = null;
	    if (fixed.init.length > 0) {
	      (0, _lodashCollectionForEach2['default'])(fixed.init, function (fn) {
	        if (!(0, _lodashLangIsFunction2['default'])(fn)) {
	          return; // not a function, do nothing.
	        }

	        // Check if we are in the async mode.
	        if (!nextPromise) {
	          // Call the init().
	          var callResult = fn.call(instance, { args: args, instance: instance, stamp: factory });
	          if (!callResult) {
	            return; // The init() returned nothing. Proceed to the next init().
	          }

	          // Returned value is meaningful.
	          // It will replace the stampit-created object.
	          if (!isThenable(callResult)) {
	            instance = callResult; // stamp is synchronous so far.
	            return;
	          }

	          // This is the sync->async conversion point.
	          // Since now our factory will return a promise, not an object.
	          nextPromise = callResult;
	        } else {
	          // As long as one of the init() functions returned a promise,
	          // now our factory will 100% return promise too.
	          // Linking the init() functions into the promise chain.
	          nextPromise = nextPromise.then(function (newInstance) {
	            // The previous promise might want to return a value,
	            // which we should take as a new object instance.
	            instance = newInstance || instance;

	            // Calling the following init().
	            // NOTE, than `fn` is wrapped to a closure within the forEach loop.
	            var callResult = fn.call(instance, { args: args, instance: instance, stamp: factory });
	            // Check if call result is truthy.
	            if (!callResult) {
	              // The init() returned nothing. Thus using the previous object instance.
	              return instance;
	            }

	            if (!isThenable(callResult)) {
	              // This init() was synchronous and returned a meaningful value.
	              instance = callResult;
	              // Resolve the instance for the next `then()`.
	              return instance;
	            }

	            // The init() returned another promise. It is becoming our nextPromise.
	            return callResult;
	          });
	        }
	      });
	    }

	    // At the end we should resolve the last promise and
	    // return the resolved value (as a promise too).
	    return nextPromise ? nextPromise.then(function (newInstance) {
	      return newInstance || instance;
	    }) : instance;
	  };

	  var refsMethod = cloneAndExtend.bind(null, fixed, addRefs);
	  var initMethod = cloneAndExtend.bind(null, fixed, addInit);
	  return (0, _supermixer.mixin)(factory, {
	    /**
	     * Creates a new object instance form the stamp.
	     */
	    create: factory,

	    /**
	     * The stamp components.
	     */
	    fixed: fixed,

	    /**
	     * Take n objects and add them to the methods list of a new stamp. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    methods: cloneAndExtend.bind(null, fixed, addMethods),

	    /**
	     * Take n objects and add them to the references list of a new stamp. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    refs: refsMethod,

	    /**
	     * Alias to refs(). Deprecated.
	     * @return {Function} A new stamp (factory object).
	     */
	    state: refsMethod,

	    /**
	     * Take n functions, an array of functions, or n objects and add
	     * the functions to the initializers list of a new stamp. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    init: initMethod,

	    /**
	     * Alias to init(). Deprecated.
	     * @return {Function} A new stamp (factory object).
	     */
	    enclose: initMethod,

	    /**
	     * Take n objects and deep merge them to the properties. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    props: cloneAndExtend.bind(null, fixed, addProps),

	    /**
	     * Take n objects and add all props to the factory object. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    'static': function _static() {
	      for (var _len10 = arguments.length, statics = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	        statics[_key10] = arguments[_key10];
	      }

	      var newStamp = cloneAndExtend.apply(undefined, [factory.fixed, addStatic].concat(statics));
	      return (0, _supermixer.mixin)(newStamp, newStamp.fixed['static']);
	    },

	    /**
	     * Take one or more factories produced from stampit() and
	     * combine them with `this` to produce and return a new factory.
	     * Combining overrides properties with last-in priority.
	     * @param {[Function]|...Function} factories Stampit factories.
	     * @return {Function} A new stampit factory composed from arguments.
	     */
	    compose: function compose() {
	      for (var _len11 = arguments.length, factories = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
	        factories[_key11] = arguments[_key11];
	      }

	      return _compose.apply(undefined, [factory].concat(factories));
	    }
	  }, fixed['static']);
	};

	// Static methods

	function isStamp(obj) {
	  return (0, _lodashLangIsFunction2['default'])(obj) && (0, _lodashLangIsFunction2['default'])(obj.methods) && ((0, _lodashLangIsFunction2['default'])(obj.refs) || (0, _lodashLangIsFunction2['default'])(obj.state)) && ((0, _lodashLangIsFunction2['default'])(obj.init) || (0, _lodashLangIsFunction2['default'])(obj.enclose)) && (0, _lodashLangIsFunction2['default'])(obj.props) && (0, _lodashLangIsFunction2['default'])(obj['static']) && (0, _lodashLangIsObject2['default'])(obj.fixed);
	}

	function convertConstructor(Constructor) {
	  var stamp = stampit();
	  stamp.fixed.refs = stamp.fixed.state = (0, _supermixer.mergeChainNonFunctions)(stamp.fixed.refs, Constructor.prototype);
	  (0, _supermixer.mixin)(stamp, (0, _supermixer.mixin)(stamp.fixed['static'], Constructor));

	  (0, _supermixer.mixinChainFunctions)(stamp.fixed.methods, Constructor.prototype);
	  addInit(stamp.fixed, function (_ref) {
	    var instance = _ref.instance;
	    var args = _ref.args;
	    return Constructor.apply(instance, args);
	  });

	  return stamp;
	}

	function shortcutMethod(extensionFunction) {
	  var stamp = stampit();

	  for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
	    args[_key12 - 1] = arguments[_key12];
	  }

	  extensionFunction.apply(undefined, [stamp.fixed].concat(args));

	  return stamp;
	}

	exports['default'] = (0, _supermixer.mixin)(stampit, {

	  /**
	   * Take n objects and add them to the methods list of a new stamp. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  methods: shortcutMethod.bind(null, addMethods),

	  /**
	   * Take n objects and add them to the references list of a new stamp. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  refs: shortcutMethod.bind(null, addRefs),

	  /**
	   * Take n functions, an array of functions, or n objects and add
	   * the functions to the initializers list of a new stamp. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  init: shortcutMethod.bind(null, addInit),

	  /**
	   * Take n objects and deep merge them to the properties. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  props: shortcutMethod.bind(null, addProps),

	  /**
	   * Take n objects and add all props to the factory object. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  'static': function _static() {
	    for (var _len13 = arguments.length, statics = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
	      statics[_key13] = arguments[_key13];
	    }

	    var newStamp = shortcutMethod.apply(undefined, [addStatic].concat(statics));
	    return (0, _supermixer.mixin)(newStamp, newStamp.fixed['static']);
	  },

	  /**
	   * Take two or more factories produced from stampit() and
	   * combine them to produce a new factory.
	   * Combining overrides properties with last-in priority.
	   * @param {[Function]|...Function} factories Stamps produced by stampit().
	   * @return {Function} A new stampit factory composed from arguments.
	   */
	  compose: _compose,

	  /**
	   * Take a destination object followed by one or more source objects,
	   * and copy the source object properties to the destination object,
	   * with last in priority overrides.
	   * @param {Object} destination An object to copy properties to.
	   * @param {...Object} source An object to copy properties from.
	   * @returns {Object}
	   */
	  mixin: _supermixer.mixin,
	  extend: _supermixer.mixin,
	  mixIn: _supermixer.mixin,
	  assign: _supermixer.mixin,

	  /**
	   * Check if an object is a stamp.
	   * @param {Object} obj An object to check.
	   * @returns {Boolean}
	   */
	  isStamp: isStamp,

	  /**
	   * Take an old-fashioned JS constructor and return a stampit stamp
	   * that you can freely compose with other stamps.
	   * @param  {Function} Constructor
	   * @return {Function} A composable stampit factory (aka stamp).
	   */
	  convertConstructor: convertConstructor
	});
	module.exports = exports['default'];

	// isStamp can be called for old stampit factory object.
	// We should check old names (state and enclose) too.

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(260),
	    baseEach = __webpack_require__(261),
	    createForEach = __webpack_require__(283);

	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection). Iteratee functions may exit iteration early
	 * by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	 * may be used for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array|Object|string} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(n) {
	 *   console.log(n);
	 * }).value();
	 * // => logs each value from left to right and returns the array
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	 *   console.log(n, key);
	 * });
	 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	 */
	var forEach = createForEach(arrayEach, baseEach);

	module.exports = forEach;


/***/ },
/* 260 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(262),
	    createBaseEach = __webpack_require__(282);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(263),
	    keys = __webpack_require__(267);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(264);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(265);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(266);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 266 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(268),
	    isArrayLike = __webpack_require__(273),
	    isObject = __webpack_require__(266),
	    shimKeys = __webpack_require__(277);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? null : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(269);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	var escapeRegExp = __webpack_require__(270),
	    isObjectLike = __webpack_require__(272);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  escapeRegExp(fnToString.call(hasOwnProperty))
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (objToString.call(value) == funcTag) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(271);

	/**
	 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
	 * In addition to special characters the forward slash is escaped to allow for
	 * easier `eval` use and `Function` compilation.
	 */
	var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
	    reHasRegExpChars = RegExp(reRegExpChars.source);

	/**
	 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
	 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escapeRegExp('[lodash](https://lodash.com/)');
	 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
	 */
	function escapeRegExp(string) {
	  string = baseToString(string);
	  return (string && reHasRegExpChars.test(string))
	    ? string.replace(reRegExpChars, '\\$&')
	    : string;
	}

	module.exports = escapeRegExp;


/***/ },
/* 271 */
/***/ function(module, exports) {

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  if (typeof value == 'string') {
	    return value;
	  }
	  return value == null ? '' : (value + '');
	}

	module.exports = baseToString;


/***/ },
/* 272 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(274),
	    isLength = __webpack_require__(276);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(275);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 275 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 276 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(278),
	    isArray = __webpack_require__(279),
	    isIndex = __webpack_require__(280),
	    isLength = __webpack_require__(276),
	    keysIn = __webpack_require__(281);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(273),
	    isObjectLike = __webpack_require__(272);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
	}

	module.exports = isArguments;


/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(268),
	    isLength = __webpack_require__(276),
	    isObjectLike = __webpack_require__(272);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 280 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(278),
	    isArray = __webpack_require__(279),
	    isIndex = __webpack_require__(280),
	    isLength = __webpack_require__(276),
	    isObject = __webpack_require__(266);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(274),
	    isLength = __webpack_require__(276),
	    toObject = __webpack_require__(265);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(284),
	    isArray = __webpack_require__(279);

	/**
	 * Creates a function for `_.forEach` or `_.forEachRight`.
	 *
	 * @private
	 * @param {Function} arrayFunc The function to iterate over an array.
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @returns {Function} Returns the new each function.
	 */
	function createForEach(arrayFunc, eachFunc) {
	  return function(collection, iteratee, thisArg) {
	    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	      ? arrayFunc(collection, iteratee)
	      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	  };
	}

	module.exports = createForEach;


/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(285);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 285 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var baseIsFunction = __webpack_require__(287),
	    getNative = __webpack_require__(268);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Native method references. */
	var Uint8Array = getNative(global, 'Uint8Array');

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return objToString.call(value) == funcTag;
	};

	module.exports = isFunction;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 287 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isFunction` without support for environments
	 * with incorrect `typeof` results.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 */
	function baseIsFunction(value) {
	  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
	  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
	  return typeof value == 'function' || false;
	}

	module.exports = baseIsFunction;


/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mixer = __webpack_require__(289);

	var _mixer2 = _interopRequireDefault(_mixer);

	var _lodashLangIsFunction = __webpack_require__(286);

	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

	var isNotFunction = function isNotFunction(val) {
	  return !(0, _lodashLangIsFunction2['default'])(val);
	};

	/**
	 * Regular mixin function.
	 */
	var mixin = (0, _mixer2['default'])();

	/**
	 * Mixin functions only.
	 */
	var mixinFunctions = (0, _mixer2['default'])({
	  filter: _lodashLangIsFunction2['default']
	});

	/**
	 * Mixin functions including prototype chain.
	 */
	var mixinChainFunctions = (0, _mixer2['default'])({
	  filter: _lodashLangIsFunction2['default'],
	  chain: true
	});

	/**
	 * Regular object merge function. Ignores functions.
	 */
	var merge = (0, _mixer2['default'])({
	  deep: true
	});

	/**
	 * Regular object merge function. Ignores functions.
	 */
	var mergeUnique = (0, _mixer2['default'])({
	  deep: true,
	  noOverwrite: true
	});

	/**
	 * Merge objects including prototype chain properties.
	 */
	var mergeChainNonFunctions = (0, _mixer2['default'])({
	  filter: isNotFunction,
	  deep: true,
	  chain: true
	});

	exports['default'] = _mixer2['default'];
	exports.mixin = mixin;
	exports.mixinFunctions = mixinFunctions;
	exports.mixinChainFunctions = mixinChainFunctions;
	exports.merge = merge;
	exports.mergeUnique = mergeUnique;
	exports.mergeChainNonFunctions = mergeChainNonFunctions;

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = mixer;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodashObjectForOwn = __webpack_require__(290);

	var _lodashObjectForOwn2 = _interopRequireDefault(_lodashObjectForOwn);

	var _lodashObjectForIn = __webpack_require__(292);

	var _lodashObjectForIn2 = _interopRequireDefault(_lodashObjectForIn);

	var _lodashLangCloneDeep = __webpack_require__(294);

	var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);

	var _lodashLangIsObject = __webpack_require__(266);

	var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

	var _lodashLangIsUndefined = __webpack_require__(304);

	var _lodashLangIsUndefined2 = _interopRequireDefault(_lodashLangIsUndefined);

	/**
	 * Factory for creating mixin functions of all kinds.
	 *
	 * @param {Object} opts
	 * @param {Function} opts.filter Function which filters value and key.
	 * @param {Function} opts.transform Function which transforms each value.
	 * @param {Boolean} opts.chain Loop through prototype properties too.
	 * @param {Boolean} opts.deep Deep looping through the nested properties.
	 * @param {Boolean} opts.noOverwrite Do not overwrite any existing data (aka first one wins).
	 * @return {Function} A new mix function.
	 */

	function mixer() {
	  var opts = arguments[0] === undefined ? {} : arguments[0];

	  // We will be recursively calling the exact same function when walking deeper.
	  if (opts.deep && !opts._innerMixer) {
	    opts._innerMixer = true; // avoiding infinite recursion.
	    opts._innerMixer = mixer(opts); // create same mixer for recursion purpose.
	  }

	  /**
	   * Combine properties from the passed objects into target. This method mutates target,
	   * if you want to create a new Object pass an empty object as first param.
	   *
	   * @param {Object} target Target Object
	   * @param {...Object} objects Objects to be combined (0...n objects).
	   * @return {Object} The mixed object.
	   */
	  return function mix(target) {
	    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      sources[_key - 1] = arguments[_key];
	    }

	    // Check if it's us who called the function. See recursion calls are below.
	    if ((0, _lodashLangIsUndefined2['default'])(target) || !opts.noOverwrite && !(0, _lodashLangIsObject2['default'])(target)) {
	      if (sources.length > 1) {
	        // Weird, but someone (not us!) called this mixer with an incorrect first argument.
	        return opts._innerMixer.apply(opts, [{}].concat(sources));
	      }
	      return (0, _lodashLangCloneDeep2['default'])(sources[0]);
	    }

	    if (opts.noOverwrite) {
	      if (!(0, _lodashLangIsObject2['default'])(target) || !(0, _lodashLangIsObject2['default'])(sources[0])) {
	        return target;
	      }
	    }

	    function iteratee(sourceValue, key) {
	      var targetValue = target[key];
	      if (opts.filter && !opts.filter(sourceValue, targetValue, key)) {
	        return;
	      }

	      var result = opts.deep ? opts._innerMixer(targetValue, sourceValue) : sourceValue;
	      target[key] = opts.transform ? opts.transform(result, targetValue, key) : result;
	    }

	    var loop = opts.chain ? _lodashObjectForIn2['default'] : _lodashObjectForOwn2['default'];
	    sources.forEach(function (obj) {
	      loop(obj, iteratee);
	    });

	    return target;
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(262),
	    createForOwn = __webpack_require__(291);

	/**
	 * Iterates over own enumerable properties of an object invoking `iteratee`
	 * for each property. The `iteratee` is bound to `thisArg` and invoked with
	 * three arguments: (value, key, object). Iteratee functions may exit iteration
	 * early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forOwn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' and 'b' (iteration order is not guaranteed)
	 */
	var forOwn = createForOwn(baseForOwn);

	module.exports = forOwn;


/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(284);

	/**
	 * Creates a function for `_.forOwn` or `_.forOwnRight`.
	 *
	 * @private
	 * @param {Function} objectFunc The function to iterate over an object.
	 * @returns {Function} Returns the new each function.
	 */
	function createForOwn(objectFunc) {
	  return function(object, iteratee, thisArg) {
	    if (typeof iteratee != 'function' || thisArg !== undefined) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	    }
	    return objectFunc(object, iteratee);
	  };
	}

	module.exports = createForOwn;


/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(263),
	    createForIn = __webpack_require__(293);

	/**
	 * Iterates over own and inherited enumerable properties of an object invoking
	 * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
	 * with three arguments: (value, key, object). Iteratee functions may exit
	 * iteration early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forIn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
	 */
	var forIn = createForIn(baseFor);

	module.exports = forIn;


/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(284),
	    keysIn = __webpack_require__(281);

	/**
	 * Creates a function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {Function} objectFunc The function to iterate over an object.
	 * @returns {Function} Returns the new each function.
	 */
	function createForIn(objectFunc) {
	  return function(object, iteratee, thisArg) {
	    if (typeof iteratee != 'function' || thisArg !== undefined) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	    }
	    return objectFunc(object, iteratee, keysIn);
	  };
	}

	module.exports = createForIn;


/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(295),
	    bindCallback = __webpack_require__(284);

	/**
	 * Creates a deep clone of `value`. If `customizer` is provided it is invoked
	 * to produce the cloned values. If `customizer` returns `undefined` cloning
	 * is handled by the method instead. The `customizer` is bound to `thisArg`
	 * and invoked with two argument; (value [, index|key, object]).
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	 * The enumerable properties of `arguments` objects and objects created by
	 * constructors other than `Object` are cloned to plain `Object` objects. An
	 * empty object is returned for uncloneable values such as functions, DOM nodes,
	 * Maps, Sets, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {*} Returns the deep cloned value.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * var deep = _.cloneDeep(users);
	 * deep[0] === users[0];
	 * // => false
	 *
	 * // using a customizer callback
	 * var el = _.cloneDeep(document.body, function(value) {
	 *   if (_.isElement(value)) {
	 *     return value.cloneNode(true);
	 *   }
	 * });
	 *
	 * el === document.body
	 * // => false
	 * el.nodeName
	 * // => BODY
	 * el.childNodes.length;
	 * // => 20
	 */
	function cloneDeep(value, customizer, thisArg) {
	  return typeof customizer == 'function'
	    ? baseClone(value, true, bindCallback(customizer, thisArg, 1))
	    : baseClone(value, true);
	}

	module.exports = cloneDeep;


/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(296),
	    arrayEach = __webpack_require__(260),
	    baseAssign = __webpack_require__(297),
	    baseForOwn = __webpack_require__(262),
	    initCloneArray = __webpack_require__(299),
	    initCloneByTag = __webpack_require__(300),
	    initCloneObject = __webpack_require__(303),
	    isArray = __webpack_require__(279),
	    isObject = __webpack_require__(266);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	cloneableTags[dateTag] = cloneableTags[float32Tag] =
	cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[stringTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[mapTag] = cloneableTags[setTag] =
	cloneableTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * The base implementation of `_.clone` without support for argument juggling
	 * and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The object `value` belongs to.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates clones with source counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return arrayCopy(value, result);
	    }
	  } else {
	    var tag = objToString.call(value),
	        isFunc = tag == funcTag;

	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return baseAssign(result, value);
	      }
	    } else {
	      return cloneableTags[tag]
	        ? initCloneByTag(value, tag, isDeep)
	        : (object ? value : {});
	    }
	  }
	  // Check for circular references and return corresponding clone.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == value) {
	      return stackB[length];
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate it with its clone.
	  stackA.push(value);
	  stackB.push(result);

	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	  });
	  return result;
	}

	module.exports = baseClone;


/***/ },
/* 296 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;


/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(298),
	    keys = __webpack_require__(267);

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 298 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 299 */
/***/ function(module, exports) {

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add array properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	var bufferClone = __webpack_require__(301);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return bufferClone(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      var buffer = object.buffer;
	      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      var result = new Ctor(object.source, reFlags.exec(object));
	      result.lastIndex = object.lastIndex;
	  }
	  return result;
	}

	module.exports = initCloneByTag;


/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var constant = __webpack_require__(302),
	    getNative = __webpack_require__(268);

	/** Native method references. */
	var ArrayBuffer = getNative(global, 'ArrayBuffer'),
	    bufferSlice = getNative(ArrayBuffer && new ArrayBuffer(0), 'slice'),
	    floor = Math.floor,
	    Uint8Array = getNative(global, 'Uint8Array');

	/** Used to clone array buffers. */
	var Float64Array = (function() {
	  // Safari 5 errors when using an array buffer to initialize a typed array
	  // where the array buffer's `byteLength` is not a multiple of the typed
	  // array's `BYTES_PER_ELEMENT`.
	  try {
	    var func = getNative(global, 'Float64Array'),
	        result = new func(new ArrayBuffer(10), 0, 1) && func;
	  } catch(e) {}
	  return result || null;
	}());

	/** Used as the size, in bytes, of each `Float64Array` element. */
	var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

	/**
	 * Creates a clone of the given array buffer.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function bufferClone(buffer) {
	  return bufferSlice.call(buffer, 0);
	}
	if (!bufferSlice) {
	  // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
	  bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
	    var byteLength = buffer.byteLength,
	        floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
	        offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
	        result = new ArrayBuffer(byteLength);

	    if (floatLength) {
	      var view = new Float64Array(result, 0, floatLength);
	      view.set(new Float64Array(buffer, 0, floatLength));
	    }
	    if (byteLength != offset) {
	      view = new Uint8Array(result, offset);
	      view.set(new Uint8Array(buffer, offset));
	    }
	    return result;
	  };
	}

	module.exports = bufferClone;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 302 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var getter = _.constant(object);
	 *
	 * getter() === object;
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 303 */
/***/ function(module, exports) {

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  var Ctor = object.constructor;
	  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	    Ctor = Object;
	  }
	  return new Ctor;
	}

	module.exports = initCloneObject;


/***/ },
/* 304 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}

	module.exports = isUndefined;


/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	/**
	 * Defaults that will be merged in to both user types
	 */
	var defaults = {};

	exports['default'] = {
	  dev: _lodash2['default'].defaults({
	    role: 'aura',
	    status: 'all'
	  }, defaults),

	  internal: _lodash2['default'].defaults({
	    role: 'aura',
	    status: 'dev-ready'
	  }, defaults),

	  external: _lodash2['default'].defaults({
	    role: 'regular',
	    status: 'all'
	  }, defaults)

	};
	module.exports = exports['default'];

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _Object$keys = __webpack_require__(175)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _2 = __webpack_require__(245);

	var _3 = _interopRequireDefault(_2);

	exports['default'] = {

	  getInitialState: _3['default'].all,

	  prefsChanged: function prefsChanged(prefs) {
	    var statePrefs = _lodash2['default'].pick(this.state, _Object$keys(prefs));
	    if (!_lodash2['default'].isEqual(statePrefs, prefs)) {
	      this.setState(prefs);
	    }
	  },

	  componentDidMount: function componentDidMount() {
	    this.setState(_3['default'].all());
	    _3['default'].listen(this.prefsChanged);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    _3['default'].unlisten(this.prefsChanged);
	  },

	  hasPreference: function hasPreference(name, value) {
	    return this.state[name] === value;
	  }

	};
	module.exports = exports['default'];

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var foldMap = function foldMap(monoid) {
	  return function (xs) {
	    return xs.reduce(function (acc, x) {
	      return acc.concat(monoid(x));
	    }, monoid.empty()).value;
	  };
	};

	var states = { devReady: 'dev-ready', prototype: 'prototype' };

	var _Or = (function () {
	  function _Or(x) {
	    _classCallCheck(this, _Or);

	    this.value = x;
	  }

	  _createClass(_Or, [{
	    key: 'concat',
	    value: function concat(other) {
	      return this.value === states.devReady || other.value === states.devReady ? _Or.of(states.devReady) : _Or.of(states.prototype);
	    }
	  }], [{
	    key: 'of',
	    value: function (x) {
	      return new _Or(x);
	    },
	    enumerable: true
	  }]);

	  return _Or;
	})();

	var Or = _Or.of;
	Or.empty = function () {
	  return Or(states.prototype);
	};

	var _And = (function () {
	  function _And(x) {
	    _classCallCheck(this, _And);

	    this.value = x;
	  }

	  _createClass(_And, [{
	    key: 'concat',
	    value: function concat(other) {
	      return other.value === states.devReady && this.value === states.devReady ? _And.of(states.devReady) : _And.of(states.prototype);
	    }
	  }], [{
	    key: 'of',
	    value: function (x) {
	      return new _And(x);
	    },
	    enumerable: true
	  }]);

	  return _And;
	})();

	var And = _And.of;
	And.empty = function () {
	  return And(states.devReady);
	};

	var shouldDisplay = function shouldDisplay(pref, status) {
	  var showAll = !pref || pref === 'all';
	  var missingStatusSoSkipForNow = !status;
	  var isActuallyDevReady = status === states.devReady;
	  return showAll || missingStatusSoSkipForNow || isActuallyDevReady;
	};

	exports['default'] = { and: foldMap(And), or: foldMap(Or), shouldDisplay: shouldDisplay, states: states };
	module.exports = exports['default'];

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _extends = __webpack_require__(11)['default'];

	var React = __webpack_require__(19);
	var SvgIcon = __webpack_require__(309);
	var componentUtil = __webpack_require__(174);
	var pf = componentUtil.prefix;

	var Component = (function (_React$Component) {
	  function Component(props) {
	    _classCallCheck(this, Component);

	    _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).call(this, props);
	    componentUtil.install(this);
	  }

	  _inherits(Component, _React$Component);

	  _createClass(Component, [{
	    key: 'render',
	    value: function render() {
	      var className = this.$getClassNameWithFlavor('button');
	      var iconClassName = this.$getClassNameWithFlavor('button__icon', {
	        prop: 'iconFlavor',
	        includeClassName: false
	      });
	      var _props = this.props;
	      var sprite = _props.sprite;
	      var symbol = _props.symbol;

	      var props = this.$propsWithoutKeys('className', 'sprite', 'symbol');
	      return React.createElement(
	        'button',
	        _extends({ className: pf(className) }, props),
	        React.createElement(SvgIcon, { className: pf(iconClassName), sprite: sprite, symbol: symbol }),
	        this.renderAssistiveText()
	      );
	    }
	  }, {
	    key: 'renderAssistiveText',
	    value: function renderAssistiveText() {
	      if (!this.props.assistiveText) return null;
	      return React.createElement(
	        'span',
	        { className: pf('assistive-text') },
	        this.props.assistiveText
	      );
	    }
	  }]);

	  return Component;
	})(React.Component);

	Component.displayName = 'ButtonIcon';
	Component.propTypes = {
	  flavor: componentUtil.PropTypes.flavor('icon-container', 'icon-border', 'icon-small', 'icon-bare', 'icon-inverse', 'icon-border-filled', 'icon-border-small'),
	  iconFlavor: componentUtil.PropTypes.flavor('inverse', 'hint', 'small', 'x-small', 'large'),
	  sprite: React.PropTypes.string.isRequired,
	  symbol: React.PropTypes.string.isRequired,
	  assistiveText: React.PropTypes.string
	};

	module.exports = Component;

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _extends = __webpack_require__(11)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _app_modulesUiUtilComponent = __webpack_require__(174);

	var _app_modulesUiUtilComponent2 = _interopRequireDefault(_app_modulesUiUtilComponent);

	var pf = _app_modulesUiUtilComponent2['default'].prefix;

	var SvgIcon = (function (_React$Component) {
	  function SvgIcon(props) {
	    _classCallCheck(this, SvgIcon);

	    _get(Object.getPrototypeOf(SvgIcon.prototype), 'constructor', this).call(this, props);
	    _app_modulesUiUtilComponent2['default'].install(this);
	  }

	  _inherits(SvgIcon, _React$Component);

	  _createClass(SvgIcon, [{
	    key: 'render',
	    value: function render() {
	      var className = this.$getClassName();
	      var props = this.$propsWithoutKeys('className', 'sprite', 'symbol');
	      return _react2['default'].createElement('svg', _extends({}, props, {
	        'aria-hidden': true,
	        className: pf(className),
	        dangerouslySetInnerHTML: { __html: this.getUse() } }));
	    }
	  }, {
	    key: 'getUse',
	    value: function getUse() {
	      var _props = this.props;
	      var sprite = _props.sprite;
	      var symbol = _props.symbol;

	      var href = '/assets/icons/' + sprite + '-sprite/svg/symbols.svg#' + symbol;
	      return '<use xlink:href="' + href + '"></use>';
	    }
	  }]);

	  return SvgIcon;
	})(_react2['default'].Component);

	SvgIcon.propTypes = {
	  className: _react2['default'].PropTypes.string,
	  sprite: _react2['default'].PropTypes.string.isRequired,
	  symbol: _react2['default'].PropTypes.string.isRequired
	};

	exports['default'] = SvgIcon;
	module.exports = exports['default'];

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _extends = __webpack_require__(11)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _app_modulesUiUtilComponent = __webpack_require__(174);

	var _app_modulesUiUtilComponent2 = _interopRequireDefault(_app_modulesUiUtilComponent);

	var pf = _app_modulesUiUtilComponent2['default'].prefix;

	var Component = (function (_React$Component) {
	  function Component(props) {
	    _classCallCheck(this, Component);

	    _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).call(this, props);
	    _app_modulesUiUtilComponent2['default'].install(this);
	  }

	  _inherits(Component, _React$Component);

	  _createClass(Component, [{
	    key: 'render',
	    value: function render() {
	      var className = this.$getClassName(pf('radio'));
	      var inputProps = _lodash2['default'].pick(this.props, ['onChange', 'value', 'checked', 'name']);
	      return _react2['default'].createElement(
	        'label',
	        { className: className, htmlFor: this.props.assistiveText.replace(' ', '-') },
	        _react2['default'].createElement('input', _extends({ type: 'radio' }, inputProps, { id: this.props.assistiveText.replace(' ', '-') })),
	        _react2['default'].createElement('span', { className: pf('radio--faux') }),
	        _react2['default'].createElement(
	          'span',
	          { className: pf('form-element__label') },
	          this.props.label
	        )
	      );
	    }
	  }]);

	  return Component;
	})(_react2['default'].Component);

	Component.displayName = 'Radio';
	Component.propTypes = {
	  label: _react2['default'].PropTypes.node.isRequired,
	  assistiveText: _react2['default'].PropTypes.string.isRequired,
	  name: _react2['default'].PropTypes.string.isRequired
	};
	Component.defaultProps = {
	  name: 'radio'
	};

	module.exports = Component;

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _defineProperty = __webpack_require__(248)['default'];

	var _extends = __webpack_require__(11)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	var _uiComponentsLibClassnameTransitionGroupReact = __webpack_require__(312);

	var _uiComponentsLibClassnameTransitionGroupReact2 = _interopRequireDefault(_uiComponentsLibClassnameTransitionGroupReact);

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(244);
	var PT = React.PropTypes;

	var ButtonIcon = __webpack_require__(308);
	var AccessibleDialogContainer = __webpack_require__(313);
	var globals = __webpack_require__(182);
	var cssPrefix = globals.cssPrefix;

	var classNames = __webpack_require__(173);
	var componentUtil = __webpack_require__(174);
	var pf = componentUtil.prefix;

	var ModalFooter = (function (_React$Component) {
	  function ModalFooter(props) {
	    _classCallCheck(this, ModalFooter);

	    _get(Object.getPrototypeOf(ModalFooter.prototype), 'constructor', this).call(this, props);
	    componentUtil.install(this);
	  }

	  _inherits(ModalFooter, _React$Component);

	  _createClass(ModalFooter, [{
	    key: 'render',
	    value: function render() {
	      var className = this.$getClassNameWithFlavor(pf('modal__footer'));
	      var props = this.$propsWithoutKeys('className', 'flavor');
	      return React.createElement(
	        'div',
	        _extends({}, props, { className: className }),
	        this.props.children
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      flavor: componentUtil.PropTypes.flavor('directional')
	    },
	    enumerable: true
	  }]);

	  return ModalFooter;
	})(React.Component);

	var ModalBody = (function (_React$Component2) {
	  function ModalBody(props) {
	    _classCallCheck(this, ModalBody);

	    _get(Object.getPrototypeOf(ModalBody.prototype), 'constructor', this).call(this, props);
	    componentUtil.install(this);
	  }

	  _inherits(ModalBody, _React$Component2);

	  _createClass(ModalBody, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        _extends({}, this.props, { className: this.$getClassName(pf('modal__content')) }),
	        this.props.children
	      );
	    }
	  }]);

	  return ModalBody;
	})(React.Component);

	var ModalHeader = (function (_React$Component3) {
	  function ModalHeader(props) {
	    _classCallCheck(this, ModalHeader);

	    _get(Object.getPrototypeOf(ModalHeader.prototype), 'constructor', this).call(this, props);
	    componentUtil.install(this);
	  }

	  _inherits(ModalHeader, _React$Component3);

	  _createClass(ModalHeader, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        _extends({}, this.props, { className: this.$getClassName(pf('modal__header')) }),
	        this.props.children,
	        this.props.closeButton ? React.createElement(ButtonIcon, {
	          onClick: this.context.onRequestClose,
	          iconFlavor: 'inverse,large',
	          className: pf('modal__close'),
	          sprite: 'action',
	          symbol: 'close',
	          assistiveText: 'Close' }) : null
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: { closeButton: PT.bool },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: { closeButton: true },
	    enumerable: true
	  }, {
	    key: 'contextTypes',
	    value: { onRequestClose: PT.func },
	    enumerable: true
	  }]);

	  return ModalHeader;
	})(React.Component);

	var Modal = (function (_React$Component4) {
	  function Modal(props) {
	    _classCallCheck(this, Modal);

	    _get(Object.getPrototypeOf(Modal.prototype), 'constructor', this).call(this, props);
	    componentUtil.install(this);
	  }

	  _inherits(Modal, _React$Component4);

	  _createClass(Modal, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return { onRequestClose: this.onClick.bind(this) };
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick() {
	      if (this.props.onRequestClose) {
	        this.props.onRequestClose();
	      }
	    }
	  }, {
	    key: 'onContentClick',
	    value: function onContentClick(e) {
	      e.stopPropagation();
	    }
	  }, {
	    key: 'isModalChild',
	    value: function isModalChild(t) {
	      var container = ReactDOM.findDOMNode(this);
	      var node = t.parentNode;
	      while (node !== null) {
	        if (node === container) {
	          return true;
	        }
	        node = node.parentNode;
	      }
	      return false;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _classNames, _$getClassName;

	      var flavorName = this.$getClassNameWithFlavor(pf('modal'));
	      var className = classNames(flavorName, (_classNames = {}, _defineProperty(_classNames, '' + cssPrefix + 'fade-in-open', this.props.isOpen && !this.props.edit), _defineProperty(_classNames, '' + cssPrefix + 'slide-up-open', this.props.isOpen && this.props.edit), _classNames));
	      var classNameModalContainer = this.$getClassName(pf('modal__container'), (_$getClassName = {}, _defineProperty(_$getClassName, '' + cssPrefix + 'slide-up-saving', this.props.saving), _defineProperty(_$getClassName, '' + cssPrefix + 'slide-down-cancel', this.props.edit && !(this.props.isOpen && this.props.edit) && !(this.props.isOpen && !this.props.edit) && !this.props.saving), _$getClassName));
	      var classNameModalBackdrop = classNames(pf('modal-backdrop'), _defineProperty({}, '' + cssPrefix + 'modal-backdrop--open', this.props.isOpen));
	      return React.createElement(
	        AccessibleDialogContainer,
	        { onEsc: this.onClick.bind(this) },
	        React.createElement(
	          'div',
	          { 'aria-hidden': !this.props.isOpen, role: 'dialog', className: className, onClick: this.onClick.bind(this) },
	          React.createElement(
	            _uiComponentsLibClassnameTransitionGroupReact2['default'],
	            { transitionName: pf('modal__container'), timeout: 100 },
	            React.createElement(
	              'div',
	              { className: classNameModalContainer, onClick: this.onContentClick.bind(this), key: 'content' },
	              this.props.children
	            )
	          )
	        ),
	        React.createElement('div', { className: classNameModalBackdrop })
	      );
	    }
	  }], [{
	    key: 'childContextTypes',
	    value: { onRequestClose: PT.func },
	    enumerable: true
	  }]);

	  return Modal;
	})(React.Component);

	var ModalWrapper = (function (_React$Component5) {
	  function ModalWrapper(props) {
	    _classCallCheck(this, ModalWrapper);

	    _get(Object.getPrototypeOf(ModalWrapper.prototype), 'constructor', this).call(this, props);
	  }

	  _inherits(ModalWrapper, _React$Component5);

	  _createClass(ModalWrapper, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var renderInline = this.props.renderInline;

	      var hasDOM = document && document.createElement;
	      if (!renderInline && hasDOM) {
	        this.__node = document.createElement('div');
	        document.body.appendChild(this.__node);
	        this.renderModal(this.props);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.__node) {
	        ReactDOM.unmountComponentAtNode(this.__node);
	        document.body.removeChild(this.__node);
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.renderModal(nextProps);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var renderInline = this.props.renderInline;

	      return renderInline ? React.createElement(Modal, _extends({}, this.props, { tabindex: '-1' })) : null;
	    }
	  }, {
	    key: 'renderModal',
	    value: function renderModal(props) {
	      if (this.__node) {
	        this.__modal = ReactDOM.render(React.createElement(Modal, props), this.__node);
	      }
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      isOpen: React.PropTypes.bool.isRequired,
	      onRequestClose: React.PropTypes.func,
	      renderInline: React.PropTypes.bool
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: { renderInline: false },
	    enumerable: true
	  }]);

	  return ModalWrapper;
	})(React.Component);

	ModalWrapper.displayName = 'Modal';

	ModalWrapper.Header = ModalHeader;
	ModalWrapper.Body = ModalBody;
	ModalWrapper.Footer = ModalFooter;

	module.exports = ModalWrapper;

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(244);
	var PT = React.PropTypes;
	var componentUtil = __webpack_require__(174);

	function addClass(element, className) {
	  if (element.classList) {
	    element.classList.add(className);
	  } else if (!hasClass(element, className)) {
	    element.className = element.className + ' ' + className;
	  }
	  return element;
	}
	function removeClass(element, className) {
	  if (hasClass(className)) {
	    if (element.classList) {
	      element.classList.remove(className);
	    } else {
	      element.className = (' ' + element.className + ' ').replace(' ' + className + ' ', ' ').trim();
	    }
	  }
	  return element;
	}
	function hasClass(element, className) {
	  if (element.classList) {
	    return element.classList.contains(className);
	  } else {
	    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	  }
	}

	// CSS Transition group will keep DOM elements around while they are inserted and removed.
	// This does a similar thing with classnames, but no removal/insertion is necessary. It's based
	// on lifecycle.

	var ClassNameTransitionGroup = (function (_React$Component) {
	  function ClassNameTransitionGroup(props) {
	    _classCallCheck(this, ClassNameTransitionGroup);

	    _get(Object.getPrototypeOf(ClassNameTransitionGroup.prototype), 'constructor', this).call(this, props);
	    componentUtil.install(this);
	  }

	  _inherits(ClassNameTransitionGroup, _React$Component);

	  _createClass(ClassNameTransitionGroup, [{
	    key: 'getClass',
	    value: function getClass(name) {
	      return this.props.transitionName + '-' + name;
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      var node = ReactDOM.findDOMNode(this);
	      var cls = this.getClass('reset');
	      addClass(node, cls);
	      setTimeout(function () {
	        return removeClass(node, cls);
	      }, this.props.timeout);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.props.children;
	    }
	  }], [{
	    key: 'propTypes',
	    value: { transitionName: PT.string, timeout: PT.number },
	    enumerable: true
	  }]);

	  return ClassNameTransitionGroup;
	})(React.Component);

	exports['default'] = ClassNameTransitionGroup;
	module.exports = exports['default'];

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	var _uiComponentsLibDomHelpers = __webpack_require__(314);

	var _uiComponentsLibDomHelpers2 = _interopRequireDefault(_uiComponentsLibDomHelpers);

	var React = __webpack_require__(19);

	var ReactDOM = __webpack_require__(244);

	var AccessibleDialogContainer = (function (_React$Component) {
	  function AccessibleDialogContainer(props) {
	    _classCallCheck(this, AccessibleDialogContainer);

	    _get(Object.getPrototypeOf(AccessibleDialogContainer.prototype), 'constructor', this).call(this, props);
	    this.state = { currentIndex: 0 };
	    this.tabbables = [];
	    this.keyup = this.escKeyHide.bind(this);
	  }

	  _inherits(AccessibleDialogContainer, _React$Component);

	  _createClass(AccessibleDialogContainer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;

	      var node = ReactDOM.findDOMNode(this);
	      this.tabbables = [].slice.call(node.querySelectorAll('*')).filter(_uiComponentsLibDomHelpers2['default'].tabbable);
	      this.tabbables.forEach(function (t) {
	        return t.onkeydown = _this.tabFocus.bind(_this);
	      });
	      this.componentWillReceiveProps();
	      var doc = ReactDOM.findDOMNode(this).ownerDocument || document;
	      doc.addEventListener('keyup', this.keyup);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.tabbables.forEach(function (t) {
	        return t.onkeydown = undefined;
	      });
	      var doc = ReactDOM.findDOMNode(this).ownerDocument || document;
	      doc.removeEventListener('keyup', this.keyup);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      var node = ReactDOM.findDOMNode(this);
	      if (node) {
	        node.focus();
	      }
	    }
	  }, {
	    key: 'escKeyHide',
	    value: function escKeyHide(e) {
	      if (e.keyCode === _uiComponentsLibDomHelpers2['default'].keys.esc) {
	        this.props.onEsc();
	      }
	    }
	  }, {
	    key: 'tabFocus',
	    value: function tabFocus(e) {
	      if (e.keyCode !== _uiComponentsLibDomHelpers2['default'].keys.tab) {
	        return true;
	      }
	      var currentIdx = this.state.currentIndex;
	      var newIdx = e.shiftKey ? currentIdx - 1 : currentIdx + 1;
	      this.setState({ currentIndex: newIdx });

	      if (!this.tabbables[newIdx]) {
	        var backTo = e.shiftKey ? this.tabbables.length - 1 : 0;
	        this.setState({ currentIndex: backTo });
	        this.tabbables[backTo].focus();
	        _uiComponentsLibDomHelpers2['default'].stopEvent(e);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement('div', this.props);
	    }
	  }]);

	  return AccessibleDialogContainer;
	})(React.Component);

	module.exports = AccessibleDialogContainer;

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var Helper = {
	  focusable: function focusable(element) {
	    var nodeName = element.nodeName.toLowerCase(),
	        hasTabIndex = element.tabIndex >= 0;
	    return /input|select|textarea|button|object/.test(nodeName) ? !element.disabled : nodeName === 'a' || nodeName === 'area' ? element.href || hasTabIndex : hasTabIndex;
	  },

	  tabbable: function tabbable(element) {
	    return element.tabIndex >= 0 || Helper.focusable(element);
	  },

	  keys: {
	    space: 32,
	    esc: 27,
	    tab: 9,
	    directions: { '37': 'left', '38': 'up', '39': 'right', '40': 'down' }
	  },

	  stopEvent: function stopEvent(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    return true;
	  },

	  click: function click(target) {
	    var event = new MouseEvent('click', { 'view': window, 'bubbles': true, 'cancelable': true });
	    target.dispatchEvent(event);
	  }

	};

	exports['default'] = Helper;
	module.exports = exports['default'];

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var BodyContent = (function (_React$Component) {
	  function BodyContent() {
	    _classCallCheck(this, BodyContent);

	    if (_React$Component != null) {
	      _React$Component.apply(this, arguments);
	    }
	  }

	  _inherits(BodyContent, _React$Component);

	  _createClass(BodyContent, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { className: this.props.className },
	        this.props.children
	      );
	    }
	  }]);

	  return BodyContent;
	})(_react2['default'].Component);

	exports['default'] = BodyContent;
	module.exports = exports['default'];

/***/ },
/* 316 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  "sldsVersion": "v0.8.0",
	  "travisJobNumber": "NOT_SET",
	  "dateNow": "August 25th 2015, 12:45 pm"
	};

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _Object$keys = __webpack_require__(175)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _mixin = __webpack_require__(306);

	var _mixin2 = _interopRequireDefault(_mixin);

	exports['default'] = _react2['default'].createClass({
	  displayName: 'component',

	  mixins: [_mixin2['default']],

	  shouldShowIt: function shouldShowIt() {
	    var _this = this;

	    var props = _lodash2['default'].omit(this.props, 'children');
	    return _lodash2['default'].all(_Object$keys(props).map(function (k) {
	      return _this.hasPreference(k, props[k]);
	    }));
	  },

	  render: function render() {
	    return this.shouldShowIt() ? this.props.children : null;
	  }

	});
	module.exports = exports['default'];

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(319);

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * @providesModule ReactCSSTransitionGroup
	 */

	'use strict';

	var React = __webpack_require__(21);

	var assign = __webpack_require__(29);

	var ReactTransitionGroup = React.createFactory(__webpack_require__(320));
	var ReactCSSTransitionGroupChild = React.createFactory(__webpack_require__(322));

	var ReactCSSTransitionGroup = React.createClass({
	  displayName: 'ReactCSSTransitionGroup',

	  propTypes: {
	    transitionName: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.shape({
	      enter: React.PropTypes.string,
	      leave: React.PropTypes.string,
	      active: React.PropTypes.string
	    }), React.PropTypes.shape({
	      enter: React.PropTypes.string,
	      enterActive: React.PropTypes.string,
	      leave: React.PropTypes.string,
	      leaveActive: React.PropTypes.string,
	      appear: React.PropTypes.string,
	      appearActive: React.PropTypes.string
	    })]).isRequired,
	    transitionAppear: React.PropTypes.bool,
	    transitionEnter: React.PropTypes.bool,
	    transitionLeave: React.PropTypes.bool
	  },

	  getDefaultProps: function () {
	    return {
	      transitionAppear: false,
	      transitionEnter: true,
	      transitionLeave: true
	    };
	  },

	  _wrapChild: function (child) {
	    // We need to provide this childFactory so that
	    // ReactCSSTransitionGroupChild can receive updates to name, enter, and
	    // leave while it is leaving.
	    return ReactCSSTransitionGroupChild({
	      name: this.props.transitionName,
	      appear: this.props.transitionAppear,
	      enter: this.props.transitionEnter,
	      leave: this.props.transitionLeave
	    }, child);
	  },

	  render: function () {
	    return ReactTransitionGroup(assign({}, this.props, { childFactory: this._wrapChild }));
	  }
	});

	module.exports = ReactCSSTransitionGroup;

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactTransitionGroup
	 */

	'use strict';

	var React = __webpack_require__(21);
	var ReactTransitionChildMapping = __webpack_require__(321);

	var assign = __webpack_require__(29);
	var emptyFunction = __webpack_require__(35);

	var ReactTransitionGroup = React.createClass({
	  displayName: 'ReactTransitionGroup',

	  propTypes: {
	    component: React.PropTypes.any,
	    childFactory: React.PropTypes.func
	  },

	  getDefaultProps: function () {
	    return {
	      component: 'span',
	      childFactory: emptyFunction.thatReturnsArgument
	    };
	  },

	  getInitialState: function () {
	    return {
	      children: ReactTransitionChildMapping.getChildMapping(this.props.children)
	    };
	  },

	  componentWillMount: function () {
	    this.currentlyTransitioningKeys = {};
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	  },

	  componentDidMount: function () {
	    var initialChildMapping = this.state.children;
	    for (var key in initialChildMapping) {
	      if (initialChildMapping[key]) {
	        this.performAppear(key);
	      }
	    }
	  },

	  componentWillReceiveProps: function (nextProps) {
	    var nextChildMapping = ReactTransitionChildMapping.getChildMapping(nextProps.children);
	    var prevChildMapping = this.state.children;

	    this.setState({
	      children: ReactTransitionChildMapping.mergeChildMappings(prevChildMapping, nextChildMapping)
	    });

	    var key;

	    for (key in nextChildMapping) {
	      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
	      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
	        this.keysToEnter.push(key);
	      }
	    }

	    for (key in prevChildMapping) {
	      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
	      if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
	        this.keysToLeave.push(key);
	      }
	    }

	    // If we want to someday check for reordering, we could do it here.
	  },

	  componentDidUpdate: function () {
	    var keysToEnter = this.keysToEnter;
	    this.keysToEnter = [];
	    keysToEnter.forEach(this.performEnter);

	    var keysToLeave = this.keysToLeave;
	    this.keysToLeave = [];
	    keysToLeave.forEach(this.performLeave);
	  },

	  performAppear: function (key) {
	    this.currentlyTransitioningKeys[key] = true;

	    var component = this.refs[key];

	    if (component.componentWillAppear) {
	      component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
	    } else {
	      this._handleDoneAppearing(key);
	    }
	  },

	  _handleDoneAppearing: function (key) {
	    var component = this.refs[key];
	    if (component.componentDidAppear) {
	      component.componentDidAppear();
	    }

	    delete this.currentlyTransitioningKeys[key];

	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);

	    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
	      // This was removed before it had fully appeared. Remove it.
	      this.performLeave(key);
	    }
	  },

	  performEnter: function (key) {
	    this.currentlyTransitioningKeys[key] = true;

	    var component = this.refs[key];

	    if (component.componentWillEnter) {
	      component.componentWillEnter(this._handleDoneEntering.bind(this, key));
	    } else {
	      this._handleDoneEntering(key);
	    }
	  },

	  _handleDoneEntering: function (key) {
	    var component = this.refs[key];
	    if (component.componentDidEnter) {
	      component.componentDidEnter();
	    }

	    delete this.currentlyTransitioningKeys[key];

	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);

	    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
	      // This was removed before it had fully entered. Remove it.
	      this.performLeave(key);
	    }
	  },

	  performLeave: function (key) {
	    this.currentlyTransitioningKeys[key] = true;

	    var component = this.refs[key];
	    if (component.componentWillLeave) {
	      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
	    } else {
	      // Note that this is somewhat dangerous b/c it calls setState()
	      // again, effectively mutating the component before all the work
	      // is done.
	      this._handleDoneLeaving(key);
	    }
	  },

	  _handleDoneLeaving: function (key) {
	    var component = this.refs[key];

	    if (component.componentDidLeave) {
	      component.componentDidLeave();
	    }

	    delete this.currentlyTransitioningKeys[key];

	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);

	    if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
	      // This entered again before it fully left. Add it again.
	      this.performEnter(key);
	    } else {
	      this.setState(function (state) {
	        var newChildren = assign({}, state.children);
	        delete newChildren[key];
	        return { children: newChildren };
	      });
	    }
	  },

	  render: function () {
	    // TODO: we could get rid of the need for the wrapper node
	    // by cloning a single child
	    var childrenToRender = [];
	    for (var key in this.state.children) {
	      var child = this.state.children[key];
	      if (child) {
	        // You may need to apply reactive updates to a child as it is leaving.
	        // The normal React way to do it won't work since the child will have
	        // already been removed. In case you need this behavior you can provide
	        // a childFactory function to wrap every child, even the ones that are
	        // leaving.
	        childrenToRender.push(React.cloneElement(this.props.childFactory(child), { ref: key, key: key }));
	      }
	    }
	    return React.createElement(this.props.component, this.props, childrenToRender);
	  }
	});

	module.exports = ReactTransitionGroup;

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 * @providesModule ReactTransitionChildMapping
	 */

	'use strict';

	var ReactChildren = __webpack_require__(104);
	var ReactFragment = __webpack_require__(101);

	var ReactTransitionChildMapping = {
	  /**
	   * Given `this.props.children`, return an object mapping key to child. Just
	   * simple syntactic sugar around ReactChildren.map().
	   *
	   * @param {*} children `this.props.children`
	   * @return {object} Mapping of key to child
	   */
	  getChildMapping: function (children) {
	    if (!children) {
	      return children;
	    }
	    return ReactFragment.extract(ReactChildren.map(children, function (child) {
	      return child;
	    }));
	  },

	  /**
	   * When you're adding or removing children some may be added or removed in the
	   * same render pass. We want to show *both* since we want to simultaneously
	   * animate elements in and out. This function takes a previous set of keys
	   * and a new set of keys and merges them with its best guess of the correct
	   * ordering. In the future we may expose some of the utilities in
	   * ReactMultiChild to make this easy, but for now React itself does not
	   * directly have this concept of the union of prevChildren and nextChildren
	   * so we implement it here.
	   *
	   * @param {object} prev prev children as returned from
	   * `ReactTransitionChildMapping.getChildMapping()`.
	   * @param {object} next next children as returned from
	   * `ReactTransitionChildMapping.getChildMapping()`.
	   * @return {object} a key set that contains all keys in `prev` and all keys
	   * in `next` in a reasonable order.
	   */
	  mergeChildMappings: function (prev, next) {
	    prev = prev || {};
	    next = next || {};

	    function getValueForKey(key) {
	      if (next.hasOwnProperty(key)) {
	        return next[key];
	      } else {
	        return prev[key];
	      }
	    }

	    // For each key of `next`, the list of keys to insert before that key in
	    // the combined list
	    var nextKeysPending = {};

	    var pendingKeys = [];
	    for (var prevKey in prev) {
	      if (next.hasOwnProperty(prevKey)) {
	        if (pendingKeys.length) {
	          nextKeysPending[prevKey] = pendingKeys;
	          pendingKeys = [];
	        }
	      } else {
	        pendingKeys.push(prevKey);
	      }
	    }

	    var i;
	    var childMapping = {};
	    for (var nextKey in next) {
	      if (nextKeysPending.hasOwnProperty(nextKey)) {
	        for (i = 0; i < nextKeysPending[nextKey].length; i++) {
	          var pendingNextKey = nextKeysPending[nextKey][i];
	          childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
	        }
	      }
	      childMapping[nextKey] = getValueForKey(nextKey);
	    }

	    // Finally, add the keys which didn't appear before any key in `next`
	    for (i = 0; i < pendingKeys.length; i++) {
	      childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	    }

	    return childMapping;
	  }
	};

	module.exports = ReactTransitionChildMapping;

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * @providesModule ReactCSSTransitionGroupChild
	 */

	'use strict';

	var React = __webpack_require__(21);

	var CSSCore = __webpack_require__(323);
	var ReactTransitionEvents = __webpack_require__(324);

	var onlyChild = __webpack_require__(171);
	var warning = __webpack_require__(34);

	// We don't remove the element from the DOM until we receive an animationend or
	// transitionend event. If the user screws up and forgets to add an animation
	// their node will be stuck in the DOM forever, so we detect if an animation
	// does not start and if it doesn't, we just call the end listener immediately.
	var TICK = 17;
	var NO_EVENT_TIMEOUT = 5000;

	var noEventListener = null;

	if (process.env.NODE_ENV !== 'production') {
	  noEventListener = function () {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'transition(): tried to perform an animation without ' + 'an animationend or transitionend event after timeout (' + '%sms). You should either disable this ' + 'transition in JS or add a CSS animation/transition.', NO_EVENT_TIMEOUT) : undefined;
	  };
	}

	var ReactCSSTransitionGroupChild = React.createClass({
	  displayName: 'ReactCSSTransitionGroupChild',

	  transition: function (animationType, finishCallback) {
	    var node = React.findDOMNode(this);

	    if (!node) {
	      if (finishCallback) {
	        finishCallback();
	      }
	      return;
	    }

	    var className = this.props.name[animationType] || this.props.name + '-' + animationType;
	    var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';

	    var noEventTimeout = null;

	    var endListener = function (e) {
	      if (e && e.target !== node) {
	        return;
	      }
	      if (process.env.NODE_ENV !== 'production') {
	        clearTimeout(noEventTimeout);
	      }

	      CSSCore.removeClass(node, className);
	      CSSCore.removeClass(node, activeClassName);

	      ReactTransitionEvents.removeEndEventListener(node, endListener);

	      // Usually this optional callback is used for informing an owner of
	      // a leave animation and telling it to remove the child.
	      if (finishCallback) {
	        finishCallback();
	      }
	    };

	    ReactTransitionEvents.addEndEventListener(node, endListener);

	    CSSCore.addClass(node, className);

	    // Need to do this to actually trigger a transition.
	    this.queueClass(activeClassName);

	    if (process.env.NODE_ENV !== 'production') {
	      noEventTimeout = setTimeout(noEventListener, NO_EVENT_TIMEOUT);
	    }
	  },

	  queueClass: function (className) {
	    this.classNameQueue.push(className);

	    if (!this.timeout) {
	      this.timeout = setTimeout(this.flushClassNameQueue, TICK);
	    }
	  },

	  flushClassNameQueue: function () {
	    if (this.isMounted()) {
	      this.classNameQueue.forEach(CSSCore.addClass.bind(CSSCore, React.findDOMNode(this)));
	    }
	    this.classNameQueue.length = 0;
	    this.timeout = null;
	  },

	  componentWillMount: function () {
	    this.classNameQueue = [];
	  },

	  componentWillUnmount: function () {
	    if (this.timeout) {
	      clearTimeout(this.timeout);
	    }
	  },

	  componentWillAppear: function (done) {
	    if (this.props.appear) {
	      this.transition('appear', done);
	    } else {
	      done();
	    }
	  },

	  componentWillEnter: function (done) {
	    if (this.props.enter) {
	      this.transition('enter', done);
	    } else {
	      done();
	    }
	  },

	  componentWillLeave: function (done) {
	    if (this.props.leave) {
	      this.transition('leave', done);
	    } else {
	      done();
	    }
	  },

	  render: function () {
	    return onlyChild(this.props.children);
	  }
	});

	module.exports = ReactCSSTransitionGroupChild;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSCore
	 * @typechecks
	 */

	'use strict';

	var invariant = __webpack_require__(26);

	/**
	 * The CSSCore module specifies the API (and implements most of the methods)
	 * that should be used when dealing with the display of elements (via their
	 * CSS classes and visibility on screen. It is an API focused on mutating the
	 * display and not reading it as no logical state should be encoded in the
	 * display of elements.
	 */

	var CSSCore = {

	  /**
	   * Adds the class passed in to the element if it doesn't already have it.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  addClass: function (element, className) {
	    !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSSCore.addClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(false) : undefined;

	    if (className) {
	      if (element.classList) {
	        element.classList.add(className);
	      } else if (!CSSCore.hasClass(element, className)) {
	        element.className = element.className + ' ' + className;
	      }
	    }
	    return element;
	  },

	  /**
	   * Removes the class passed in from the element
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  removeClass: function (element, className) {
	    !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSSCore.removeClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(false) : undefined;

	    if (className) {
	      if (element.classList) {
	        element.classList.remove(className);
	      } else if (CSSCore.hasClass(element, className)) {
	        element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ') // multiple spaces to one
	        .replace(/^\s*|\s*$/g, ''); // trim the ends
	      }
	    }
	    return element;
	  },

	  /**
	   * Helper to add or remove a class from an element based on a condition.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @param {*} bool condition to whether to add or remove the class
	   * @return {DOMElement} the element passed in
	   */
	  conditionClass: function (element, className, bool) {
	    return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
	  },

	  /**
	   * Tests whether the element has the class specified.
	   *
	   * @param {DOMNode|DOMWindow} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {boolean} true if the element has the class, false if not
	   */
	  hasClass: function (element, className) {
	    !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSS.hasClass takes only a single class name.') : invariant(false) : undefined;
	    if (element.classList) {
	      return !!className && element.classList.contains(className);
	    }
	    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	  }

	};

	module.exports = CSSCore;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactTransitionEvents
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(58);

	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },

	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};

	var endEvents = [];

	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;

	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }

	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }

	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}

	if (ExecutionEnvironment.canUseDOM) {
	  detectEvents();
	}

	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.

	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}

	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}

	var ReactTransitionEvents = {
	  addEndEventListener: function (node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },

	  removeEndEventListener: function (node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};

	module.exports = ReactTransitionEvents;

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(11)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _app_modulesSiteComponentsPageAnchor = __webpack_require__(216);

	var _app_modulesSiteComponentsPageAnchor2 = _interopRequireDefault(_app_modulesSiteComponentsPageAnchor);

	var _app_modulesSiteComponentsSticky = __webpack_require__(337);

	var _app_modulesSiteComponentsSticky2 = _interopRequireDefault(_app_modulesSiteComponentsSticky);

	var _flavor = __webpack_require__(326);

	var _flavor2 = _interopRequireDefault(_flavor);

	var _app_modulesSiteComponentsCtaLink = __webpack_require__(1);

	var _app_modulesSiteComponentsCtaLink2 = _interopRequireDefault(_app_modulesSiteComponentsCtaLink);

	var _app_modulesSiteUtilComponentStatus = __webpack_require__(307);

	var _app_modulesSiteUtilComponentStatus2 = _interopRequireDefault(_app_modulesSiteUtilComponentStatus);

	var _tableYaml = __webpack_require__(338);

	var _tableYaml2 = _interopRequireDefault(_tableYaml);

	var _app_modulesSitePreferencesMixin = __webpack_require__(306);

	var _app_modulesSitePreferencesMixin2 = _interopRequireDefault(_app_modulesSitePreferencesMixin);

	var _app_modulesUiUtilComponent = __webpack_require__(174);

	var _app_modulesUiUtilComponent2 = _interopRequireDefault(_app_modulesUiUtilComponent);

	var pf = _app_modulesUiUtilComponent2['default'].prefix;

	var ComponentBody = _react2['default'].createClass({
	  displayName: 'ComponentBody',

	  mixins: [_app_modulesSitePreferencesMixin2['default']],

	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      this.renderAnchor(),
	      _react2['default'].createElement(
	        'div',
	        { className: pf('site-content p-around--xx-large grid wrap') },
	        this.renderFlavorsDropDown(),
	        _react2['default'].createElement(
	          'div',
	          { className: pf('site-main-content col col-rule--right size--1-of-1 large-size--5-of-6 large-order--1') },
	          this.renderDocs(),
	          this.renderFlavors(),
	          this.renderInfoTable()
	        )
	      )
	    );
	  },

	  renderAnchor: function renderAnchor() {
	    var component = this.props.component;

	    var button = this.hasPreference('role', 'aura') ? _react2['default'].createElement(
	      'div',
	      { className: pf('site-masthead-actions col no-flex align-middle') },
	      _react2['default'].createElement(
	        'a',
	        {
	          className: pf('button button--inverse'),
	          href: '/assets/downloads/aura/css/' + component.path + '/index.css',
	          download: '' + component.uid + '.css' },
	        'Download CSS'
	      )
	    ) : null;
	    return _react2['default'].createElement(_app_modulesSiteComponentsPageAnchor2['default'], { title: component.title, actions: button });
	  },

	  renderFlavorsDropDown: function renderFlavorsDropDown() {
	    var flavors = this.props.component.flavors.filter(this.shouldDisplayFlavor, this).map(function (flavor) {
	      return _react2['default'].createElement(
	        'li',
	        { className: pf('list__name'), key: flavor.uid },
	        _react2['default'].createElement(
	          _app_modulesSiteComponentsCtaLink2['default'],
	          { href: '#' + flavor.id, ctaEventName: 'variant-link', ctaExtraValues: { value: flavor.id } },
	          flavor.title
	        )
	      );
	    });
	    return _react2['default'].createElement(
	      _app_modulesSiteComponentsSticky2['default'],
	      { className: pf('col size--1-of-1 large-size--1-of-6 large-order--2') },
	      _react2['default'].createElement(
	        'div',
	        { className: pf('site-menu--jump-links') },
	        _react2['default'].createElement(
	          'h3',
	          { className: 'site-text-heading--label' },
	          'Variants'
	        ),
	        _react2['default'].createElement(
	          'ul',
	          { className: pf('list--vertical has-block-links') },
	          flavors,
	          this.renderComponentOverviewLink()
	        )
	      )
	    );
	  },

	  renderDocs: function renderDocs() {
	    return this.props.elements.docs || null;
	  },

	  renderComponentOverviewLink: function renderComponentOverviewLink() {
	    var info = this.props.component.info;
	    if (info.table || info.tableYaml) {
	      return _react2['default'].createElement(
	        'li',
	        { className: pf('list__name has-divider') },
	        _react2['default'].createElement(
	          'a',
	          { href: '#overview' },
	          'Component Overview'
	        )
	      );
	    } else {
	      return null;
	    }
	  },

	  renderFlavors: function renderFlavors() {
	    var _this = this;

	    return this.props.component.flavors.filter(this.shouldDisplayFlavor, this).map(function (flavor) {
	      return _react2['default'].createElement(_flavor2['default'], _extends({}, _this.props, { key: flavor.uid, flavor: flavor }));
	    });
	  },

	  renderInfoTable: function renderInfoTable() {
	    var component = this.props.component;

	    if (component.info.tableYaml) {
	      return _react2['default'].createElement(_tableYaml2['default'], { data: component.info.tableYaml });
	    } else if (component.info.table) {
	      return _react2['default'].createElement('div', { className: 'site-text-longform', dangerouslySetInnerHTML: component.info.table });
	    } else {
	      return null;
	    }
	  },

	  shouldDisplayFlavor: function shouldDisplayFlavor(flavor) {
	    return _app_modulesSiteUtilComponentStatus2['default'].shouldDisplay(this.state.status, flavor.status);
	  }

	});

	exports['default'] = ComponentBody;
	module.exports = exports['default'];

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(244);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactDomServer = __webpack_require__(328);

	var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

	var _classnames = __webpack_require__(173);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash = __webpack_require__(179);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _app_modulesSiteVendorPrism = __webpack_require__(327);

	var _app_modulesSiteVendorPrism2 = _interopRequireDefault(_app_modulesSiteVendorPrism);

	var _app_modulesUiSvgIcon = __webpack_require__(309);

	var _app_modulesUiSvgIcon2 = _interopRequireDefault(_app_modulesUiSvgIcon);

	var _app_modulesSitePreferences = __webpack_require__(245);

	var _app_modulesSitePreferences2 = _interopRequireDefault(_app_modulesSitePreferences);

	var _app_modulesSiteUtilIeSvg = __webpack_require__(329);

	var _app_modulesSiteUtilIeSvg2 = _interopRequireDefault(_app_modulesSiteUtilIeSvg);

	var _jsBeautify = __webpack_require__(330);

	var _app_modulesUiUtilComponent = __webpack_require__(174);

	var _app_modulesUiUtilComponent2 = _interopRequireDefault(_app_modulesUiUtilComponent);

	var _uiComponentsTabsIndexReact = __webpack_require__(334);

	var _uiComponentsTabsIndexReact2 = _interopRequireDefault(_uiComponentsTabsIndexReact);

	var _app_modulesSiteComponentsCtaLink = __webpack_require__(1);

	var _app_modulesSiteComponentsCtaLink2 = _interopRequireDefault(_app_modulesSiteComponentsCtaLink);

	var _app_modulesSiteUtilLocalytics = __webpack_require__(184);

	var _app_modulesGlobal = __webpack_require__(182);

	var _generatedWhitelistUtilitiesJs = __webpack_require__(336);

	var _generatedWhitelistUtilitiesJs2 = _interopRequireDefault(_generatedWhitelistUtilitiesJs);

	var pf = _app_modulesUiUtilComponent2['default'].prefix;

	var whitelist = _lodash2['default'].reduce(_generatedWhitelistUtilitiesJs2['default'], function (obj, val) {
	  obj['' + _app_modulesGlobal.cssPrefix + '' + val.replace(/^\./, '')] = true;
	  return obj;
	}, {});

	function getValueAtKeyPath(obj, keyPath) {
	  return (0, _lodash.reduce)(keyPath.split('.'), function (obj, key) {
	    if (obj) {
	      return obj[key];
	    } else {
	      return obj;
	    }
	  }, obj);
	}

	function highlight(code, language) {
	  return _app_modulesSiteVendorPrism2['default'].highlight(code, _app_modulesSiteVendorPrism2['default'].languages[language]);
	}

	function getAvailablePreviewTabs(flavor) {
	  return [{
	    key: 'mobile',
	    icon: 'phone_portrait',
	    iconClass: 'phone-portrait',
	    label: 'Small',
	    stylesheet: 'iframe',
	    formFactor: 'small'
	  }, {
	    key: 'tablet',
	    icon: 'tablet_portrait',
	    iconClass: 'tablet-portrait',
	    label: 'Medium',
	    stylesheet: 'iframe.medium',
	    formFactor: 'medium'
	  }, {
	    key: 'desktop',
	    icon: 'desktop',
	    iconClass: 'desktop',
	    label: 'Large',
	    stylesheet: 'iframe.large',
	    formFactor: 'large'
	  }].filter(function (tab) {
	    var factors = flavor.showFormFactors;
	    if (!factors.length) {
	      return true;
	    }
	    return _lodash2['default'].includes(factors, tab.formFactor);
	  });
	}

	function allCodeTabs() {
	  return [{
	    key: 'html',
	    label: 'HTML',
	    language: 'markup',
	    code: 'example.html',
	    info: 'info.markup',
	    roles: _app_modulesSitePreferences2['default'].roles
	  }, {
	    key: 'scss',
	    label: 'SCSS',
	    language: 'scss',
	    code: 'styles.scss',
	    info: 'info.styles',
	    roles: [_app_modulesSitePreferences2['default'].roles.regular]
	  }, {
	    key: 'aura-css',
	    label: 'Lightning CSS',
	    language: 'scss',
	    code: 'styles.aura',
	    info: 'info.styles',
	    roles: [_app_modulesSitePreferences2['default'].roles.aura]
	  }, {
	    key: 'design-tokens',
	    label: 'Design Tokens',
	    language: 'scss',
	    code: 'properties',
	    roles: _app_modulesSitePreferences2['default'].roles
	  }, {
	    key: 'dependencies',
	    label: 'Dependencies',
	    language: 'markup',
	    code: 'dependencies',
	    roles: [_app_modulesSitePreferences2['default'].roles.aura]
	  }];
	}

	function highlightUtilityClasses(html) {
	  var funkyLongRegex = new RegExp('(>class</span><span class="token attr-value" ><span class="token punctuation" >=</span><span class="token punctuation" >"</span>)([^<]+)(<span)', 'g');

	  var transformedHtml = html.replace(funkyLongRegex, function (match, before, classNames, after) {
	    var classes = _lodash2['default'].trim(classNames).split(/\s+/).map(function (c) {
	      return whitelist[c] ? '<dfn title="Utility class" class="site-definition">' + c + '</dfn>' : c;
	    });
	    return '' + before + '' + classes.join(' ') + '' + after;
	  });

	  return transformedHtml;
	}

	var renderHTML = _lodash2['default'].memoize(function (uid, previewComponent, shouldHighlightUtilityClasses) {
	  if (previewComponent.code) previewComponent = previewComponent.code;
	  var pattern = /^\<([a-z]*?)[\s\S]*?class\=\"[^"]*demo-only[^"]*\"[\s\S]*?\>([\S\s]*?)\<\/\1\>$/;
	  var html = _reactDomServer2['default'].renderToStaticMarkup(previewComponent);
	  // Remove wrapping tag if it has the ".demo-only" class in it
	  // Note: this will also remove other classes too on that tag! :)
	  html = html.replace(pattern, function (match, tag, content) {
	    return content;
	  });
	  // Format
	  html = (0, _jsBeautify.html)(html, {
	    'indent_size': 2,
	    'indent_char': ' ',
	    'unformatted': ['a']
	  });
	  // Highlight
	  html = highlight(html, 'markup');

	  return shouldHighlightUtilityClasses ? highlightUtilityClasses(html) : html;
	}, function (uid, previewComponent, shouldHighlightUtilityClasses) {
	  // Only first and last args needed for resolver.
	  return '' + uid + '/' + shouldHighlightUtilityClasses;
	});

	function userTypeShouldSeeTab(tab) {
	  return _lodash2['default'].contains(tab.roles, _app_modulesSitePreferences2['default'].get('role'));
	}

	function getCodeTabs(flavor, previewComponent, role) {
	  return (0, _lodash2['default'])(allCodeTabs())
	  // Make sure code for this tab exists
	  .filter(function (tab) {
	    var val = getValueAtKeyPath(flavor, tab.code); // multiple return types, [] is truthy.
	    return userTypeShouldSeeTab(tab) && (val && val.length || tab.key === 'html' && previewComponent);
	  })
	  // Get the code and highlight it
	  .forEach(function (tab) {
	    tab.code = getValueAtKeyPath(flavor, tab.code);
	    if (_lodash2['default'].isArray(tab.code)) {
	      tab.code = tab.code.join('\n');
	    } else if (_lodash2['default'].isString(tab.code)) {
	      tab.code = highlight(tab.code, tab.language);
	    } else if (tab.key === 'html') {
	      var shouldHighlightUtilityClasses = role === _app_modulesSitePreferences2['default'].roles.aura;
	      tab.code = renderHTML(flavor.uid, previewComponent, shouldHighlightUtilityClasses);
	    }
	  }).value();
	}

	var ComponentFlavor = (function (_React$Component) {
	  function ComponentFlavor(props) {
	    _classCallCheck(this, ComponentFlavor);

	    _get(Object.getPrototypeOf(ComponentFlavor.prototype), 'constructor', this).call(this, props);
	    var flavor = props.flavor;
	    var elements = props.elements;

	    var previewComponent = elements['example/flavor/' + flavor.id];
	    var previewTabs = getAvailablePreviewTabs(flavor);
	    this.state = {
	      previewComponent: previewComponent,
	      previewTabs: previewTabs,
	      previewTabActive: (0, _lodash.last)(previewTabs),
	      codeTabs: [],
	      role: _app_modulesSitePreferences2['default'].roles.aura
	    };
	    // Listen for the iframe to load
	    if (typeof window !== 'undefined') {
	      window.__events.once('iframe:load:' + flavor.uid, this.onFrameLoad.bind(this, 'event'));
	    }
	    this.prefsChanged = this.updateCodeTabs.bind(this);
	  }

	  _inherits(ComponentFlavor, _React$Component);

	  _createClass(ComponentFlavor, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({ role: _app_modulesSitePreferences2['default'].get('role') });
	      _app_modulesSitePreferences2['default'].listen(this.prefsChanged);
	      this.updateCodeTabs();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _app_modulesSitePreferences2['default'].unlisten(this.prefsChanged);
	    }
	  }, {
	    key: 'isRegularUser',
	    value: function isRegularUser() {
	      return this.state.role === _app_modulesSitePreferences2['default'].roles.regular;
	    }
	  }, {
	    key: 'updateCodeTabs',
	    value: function updateCodeTabs() {
	      this.setState({
	        codeTabs: getCodeTabs(this.props.flavor, this.state.previewComponent, _app_modulesSitePreferences2['default'].get('role')),
	        role: _app_modulesSitePreferences2['default'].get('role')
	      });
	    }
	  }, {
	    key: 'handleCodeMouseUp',
	    value: function handleCodeMouseUp(tabKey) {
	      var sel = window.getSelection && window.getSelection();
	      if (sel && sel.toString().length > 0) {
	        (0, _app_modulesSiteUtilLocalytics.logInputEvent)('component-code-text-select', { flavor: this.props.flavor.id, tab: tabKey });
	      }
	    }
	  }, {
	    key: 'onFrameLoad',
	    value: function onFrameLoad(caller) {
	      if (!this.refs.iframe) return;
	      this.mountPreview();
	      this.updatePreview();
	    }
	  }, {
	    key: 'mountPreview',
	    value: function mountPreview() {
	      var _state = this.state;
	      var previewComponent = _state.previewComponent;
	      var tab = _state.previewTabActive;

	      // If the module exported a different "preview" element
	      if (previewComponent.preview) previewComponent = previewComponent.preview;
	      var doc = this.refs.iframe.contentWindow.document;
	      _reactDom2['default'].render(previewComponent, doc.getElementById('preview'));
	      (0, _app_modulesSiteUtilIeSvg2['default'])(doc);
	    }
	  }, {
	    key: 'updatePreview',
	    value: function updatePreview() {
	      var _state2 = this.state;
	      var previewComponent = _state2.previewComponent;
	      var tab = _state2.previewTabActive;

	      var node = this.refs.iframe;
	      var doc = node.contentWindow.document;
	      // Adjust the height after the stylesheet loads
	      function adjustHeight() {
	        node.contentWindow.requestAnimationFrame(function () {
	          var style = window.getComputedStyle(doc.body);
	          var padding = (0, _lodash.reduce)(['padding-top', 'padding-bottom'], function (total, key) {
	            return total + parseFloat(style[key], 10);
	          }, 0);
	          node.height = (0, _lodash.reduce)(doc.getElementById('preview').childNodes, function (height, node) {
	            return height + node.offsetHeight;
	          }, padding);
	        });
	      }
	      // Update the stylehsheet
	      var link = document.createElement('link');
	      link.type = 'text/css';
	      link.rel = 'stylesheet';
	      link.href = '/assets/styles/' + tab.stylesheet + '.css';
	      link.onload = function () {
	        // Don't remove the old stylesheet until the new one has loaded
	        (0, _lodash.filter)(doc.head.querySelectorAll('link'), function (tag) {
	          return tag !== link;
	        }).forEach(function (tag) {
	          tag.parentNode.removeChild(tag);
	        });
	        adjustHeight();
	      };
	      doc.head.appendChild(link);
	    }
	  }, {
	    key: 'onPreviewTabClick',
	    value: function onPreviewTabClick(tab, event) {
	      event.preventDefault();
	      this.setState({
	        previewTabActive: tab
	      }, this.updatePreview);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var flavor = this.props.flavor;

	      return _react2['default'].createElement(
	        'section',
	        null,
	        _react2['default'].createElement(
	          'h2',
	          {
	            className: pf('p-top--xx-large site-text-heading--large site-text-heading--callout'),
	            id: flavor.id },
	          flavor.title,
	          this.renderBadge(flavor.status)
	        ),
	        this.renderInfo(),
	        _react2['default'].createElement(
	          'h3',
	          { className: pf('assistive-text') },
	          'Preview'
	        ),
	        this.renderPreview(),
	        _react2['default'].createElement(
	          'h3',
	          { className: pf('assistive-text') },
	          'Code'
	        ),
	        this.renderCode()
	      );
	    }
	  }, {
	    key: 'renderBadge',
	    value: function renderBadge(status) {
	      if (!status) return null;
	      var words = _lodash2['default'].words(status).join(' ');
	      return _react2['default'].createElement(
	        'span',
	        { className: pf('badge m-left--medium shrink-none align-middle') },
	        words
	      );
	    }
	  }, {
	    key: 'renderInfo',
	    value: function renderInfo() {
	      var flavor = this.props.flavor;

	      if (!flavor.info.markup) return null;
	      return _react2['default'].createElement('div', { dangerouslySetInnerHTML: flavor.info.markup });
	    }
	  }, {
	    key: 'renderPreview',
	    value: function renderPreview() {
	      if (!this.state.previewComponent) return null;
	      var flavor = this.props.flavor;

	      var previewPanel = _react2['default'].createElement(
	        _uiComponentsTabsIndexReact2['default'].Content,
	        {
	          id: '' + flavor.uid + '__preview-content',
	          className: pf('site-example--content m-bottom--xx-large scrollable--x'),
	          'aria-labelledby': '' + flavor.uid + '__preview-tab-' + this.state.previewTabActive.key },
	        _react2['default'].createElement('iframe', {
	          src: '/components/preview-frame',
	          height: '100%',
	          name: flavor.uid,
	          ref: 'iframe',
	          'data-form-factor': this.state.previewTabActive.key,
	          scrolling: 'no' })
	      );
	      return _react2['default'].createElement(
	        _uiComponentsTabsIndexReact2['default'],
	        { className: pf('site-example--tabs'), flavor: 'default', panel: previewPanel, selectedIndex: 2 },
	        this.renderPreviewTabs()
	      );
	    }
	  }, {
	    key: 'renderPreviewTabs',
	    value: function renderPreviewTabs() {
	      var _this = this;

	      if (!this.state.previewComponent) return null;
	      var flavor = this.props.flavor;

	      return this.state.previewTabs.map(function (tab, index) {
	        var content = _react2['default'].createElement(
	          _app_modulesSiteComponentsCtaLink2['default'],
	          { ctaEventName: 'component-preview-tab-click', ctaExtraValues: { flavor: flavor.id, tab: tab.key } },
	          _react2['default'].createElement(_app_modulesUiSvgIcon2['default'], { sprite: 'utility', symbol: tab.icon, className: pf('icon icon__svg icon-utility-' + tab.iconClass + ' icon--x-small icon-text-default m-right--x-small') }),
	          tab.label
	        );
	        return _react2['default'].createElement(_uiComponentsTabsIndexReact2['default'].Item, {
	          key: tab.key,
	          'aria-controls': '' + flavor.uid + '__preview-content',
	          'aria-describedby': flavor.uid,
	          id: '' + flavor.uid + '__preview-tab--' + tab.key,
	          content: content,
	          onClick: _this.onPreviewTabClick.bind(_this, tab) });
	      });
	    }
	  }, {
	    key: 'renderCode',
	    value: function renderCode() {
	      if (!this.state.codeTabs.length) return null;
	      var flavor = this.props.flavor;

	      return _react2['default'].createElement(
	        _uiComponentsTabsIndexReact2['default'],
	        { flavor: 'default' },
	        this.renderCodeTabs()
	      );
	    }
	  }, {
	    key: 'renderCodeTabs',
	    value: function renderCodeTabs() {
	      var _this2 = this;

	      var flavor = this.props.flavor;

	      return this.state.codeTabs.map(function (tab, index) {
	        var content = _react2['default'].createElement(
	          _app_modulesSiteComponentsCtaLink2['default'],
	          { ctaEventName: 'component-code-tab-click', ctaExtraValues: { flavor: flavor.id, tab: tab.key } },
	          tab.label
	        );
	        return _react2['default'].createElement(
	          _uiComponentsTabsIndexReact2['default'].Item,
	          {
	            key: tab.key,
	            'aria-controls': '' + flavor.uid + '__code-block--' + tab.key,
	            content: content,
	            'aria-describedby': flavor.uid },
	          _react2['default'].createElement(
	            _uiComponentsTabsIndexReact2['default'].Content,
	            { className: pf('site-code--content scrollable--x') },
	            _this2.renderCodeBlock(tab)
	          )
	        );
	      });
	    }
	  }, {
	    key: 'renderCodeBlock',
	    value: function renderCodeBlock(tab) {
	      var flavor = this.props.flavor;

	      var className = (0, _classnames2['default'])('language-' + tab.language);
	      return _react2['default'].createElement(
	        'pre',
	        {
	          key: tab.key,
	          id: '' + flavor.uid + '__code-block--' + tab.key,
	          className: pf(className),
	          'aria-labelledby': '' + flavor.uid + '__code-tab--' + tab.key },
	        _react2['default'].createElement('code', { className: pf(className), 'data-key': tab.key,
	          dangerouslySetInnerHTML: { __html: tab.code }, onMouseUp: this.handleCodeMouseUp.bind(this, tab.key) })
	      );
	    }
	  }]);

	  return ComponentFlavor;
	})(_react2['default'].Component);

	exports['default'] = ComponentFlavor;
	module.exports = exports['default'];

/***/ },
/* 327 */,
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(163);


/***/ },
/* 329 */
/***/ function(module, exports) {

	/*eslint-disable */

	/*! svg4everybody v2.0.0 | github.com/jonathantneal/svg4everybody */

	/**
	 * IMPORTANT: This module is being shimmed so that a custom document can be passed in
	 */
	'use strict';

	module.exports = function (document, options) {

	  function embed(svg, g) {
	    if (g) {
	      var viewBox = !svg.getAttribute('viewBox') && g.getAttribute('viewBox');
	      var fragment = document.createDocumentFragment();
	      var clone = g.cloneNode(true);

	      if (viewBox) {
	        svg.setAttribute('viewBox', viewBox);
	      }

	      while (clone.childNodes.length) {
	        fragment.appendChild(clone.firstChild);
	      }

	      svg.appendChild(fragment);
	    }
	  }

	  function loadreadystatechange(xhr) {
	    xhr.onreadystatechange = function () {
	      if (xhr.readyState === 4) {
	        var x = document.createElement('x');

	        x.innerHTML = xhr.responseText;

	        xhr.s.splice(0).map(function (array) {
	          embed(array[0], x.querySelector('#' + array[1].replace(/(\W)/g, '\\$1')));
	        });
	      }
	    };

	    xhr.onreadystatechange();
	  }

	  function svg4everybody(opts) {
	    opts = opts || {};

	    var uses = document.getElementsByTagName('use');
	    var nosvg;

	    if (window.LEGACY_SUPPORT) {
	      var fallback = opts.fallback || function (src) {
	        return src.replace(/\?[^#]+/, '').replace('#', '.').replace(/^\./, '') + '.png' + (/\?[^#]+/.exec(src) || [''])[0];
	      };

	      nosvg = 'nosvg' in opts ? opts.nosvg : /\bMSIE [1-8]\b/.test(navigator.userAgent);

	      if (nosvg) {
	        document.createElement('svg');
	        document.createElement('use');
	      }
	    }

	    var polyfill = 'polyfill' in opts ? opts.polyfill : window.LEGACY_SUPPORT ? nosvg || /\bEdge\/12\b|\bMSIE [1-8]\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537 : /\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537;

	    var validate = opts.validate;
	    var requestAnimationFrame = window.requestAnimationFrame || setTimeout;
	    var svgCache = {};

	    function oninterval() {
	      var use;

	      while (use = uses[0]) {
	        var svg = use.parentNode;

	        if (svg && /svg/i.test(svg.nodeName)) {
	          var src = use.getAttribute('xlink:href');

	          if (window.LEGACY_SUPPORT && nosvg) {
	            var img = new Image();
	            var width = svg.getAttribute('width');
	            var height = svg.getAttribute('height');

	            img.src = fallback(src, svg, use);

	            if (width) {
	              img.setAttribute('width', width);
	            }

	            if (height) {
	              img.setAttribute('height', height);
	            }

	            svg.replaceChild(img, use);
	          } else if (polyfill) {
	            if (!validate || validate(src, svg, use)) {
	              var url = src.split('#');
	              var url_root = url[0];
	              var url_hash = url[1];

	              svg.removeChild(use);

	              if (url_root.length) {
	                var xhr = svgCache[url_root] = svgCache[url_root] || new XMLHttpRequest();

	                if (!xhr.s) {
	                  xhr.s = [];

	                  xhr.open('GET', url_root);

	                  xhr.send();
	                }

	                xhr.s.push([svg, url_hash]);

	                loadreadystatechange(xhr);
	              } else {
	                embed(svg, document.getElementById(url_hash));
	              }
	            }
	          }
	        }
	      }

	      requestAnimationFrame(oninterval, 17);
	    }

	    if (polyfill) {
	      oninterval();
	    }
	  }

	  svg4everybody(options);
	};

/***/ },
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _extends = __webpack_require__(11)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	var _uiComponentsLibAccessibleListReact = __webpack_require__(335);

	var _uiComponentsLibAccessibleListReact2 = _interopRequireDefault(_uiComponentsLibAccessibleListReact);

	var _classnames = __webpack_require__(173);

	var _classnames2 = _interopRequireDefault(_classnames);

	var React = __webpack_require__(19);
	var PT = React.PropTypes;
	var componentUtil = __webpack_require__(174);
	var pf = componentUtil.prefix;
	var createChainedFunction = componentUtil.createChainedFunction;
	var flatMapChildren = componentUtil.flatMapChildren;

	var TabContent = (function (_React$Component) {
	  function TabContent(props) {
	    _classCallCheck(this, TabContent);

	    _get(Object.getPrototypeOf(TabContent.prototype), 'constructor', this).call(this, props);
	    componentUtil.install(this);
	  }

	  _inherits(TabContent, _React$Component);

	  _createClass(TabContent, [{
	    key: 'render',
	    value: function render() {
	      var className = (0, _classnames2['default'])(this.props.className, pf((0, _classnames2['default'])('tabs__content', { 'show': this.props.current, 'hide': !this.props.current })));
	      var props = this.$propsWithoutKeys('className');
	      return React.createElement(
	        'div',
	        _extends({}, props, { className: className, role: 'tabpanel' }),
	        this.props.children
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: { current: PT.bool },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: { current: true },
	    enumerable: true
	  }]);

	  return TabContent;
	})(React.Component);

	var TabItem = (function (_React$Component2) {
	  function TabItem(props) {
	    _classCallCheck(this, TabItem);

	    _get(Object.getPrototypeOf(TabItem.prototype), 'constructor', this).call(this, props);
	    componentUtil.install(this);
	  }

	  _inherits(TabItem, _React$Component2);

	  _createClass(TabItem, [{
	    key: 'renderCustom',
	    value: function renderCustom(tabIndex) {
	      return React.cloneElement(this.props.content, { onClick: this.props.onClick.bind(this), tabIndex: tabIndex, 'aria-selected': this.props.current });
	    }
	  }, {
	    key: 'renderDefault',
	    value: function renderDefault(tabIndex) {
	      return React.createElement(
	        'a',
	        { className: pf(this.props.innerClass), onClick: this.props.onClick.bind(this), href: '#', role: 'tab', tabIndex: tabIndex, 'aria-selected': this.props.current },
	        this.props.title
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.$propsWithoutKeys('className', 'role');
	      var className = (0, _classnames2['default'])(this.props.className, pf((0, _classnames2['default'])('tabs__item text-heading--label', { active: this.props.current })));
	      var tabIndex = this.props.current ? 0 : -1;
	      return React.createElement(
	        'li',
	        _extends({ className: className }, props, { role: 'presentation' }),
	        this.props.content ? this.renderCustom(tabIndex) : this.renderDefault(tabIndex)
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: { title: PT.string, content: PT.node },
	    enumerable: true
	  }]);

	  return TabItem;
	})(React.Component);

	var Tabs = (function (_React$Component3) {
	  function Tabs(props) {
	    _classCallCheck(this, Tabs);

	    _get(Object.getPrototypeOf(Tabs.prototype), 'constructor', this).call(this, props);
	    componentUtil.install(this);
	    this.state = { currentTab: this.props.selectedIndex };
	  }

	  _inherits(Tabs, _React$Component3);

	  _createClass(Tabs, [{
	    key: 'onClick',
	    value: function onClick(index, e) {
	      this.setState({ currentTab: index });
	      e.preventDefault();
	      e.stopPropagation();
	    }
	  }, {
	    key: 'tabs',
	    value: function tabs() {
	      var _this = this;

	      return React.Children.map(this.props.children, function (c, i) {
	        return React.cloneElement(c, { current: _this.state.currentTab === i, onClick: createChainedFunction(c.props.onClick, _this.onClick.bind(_this, i)) });
	      });
	    }
	  }, {
	    key: 'currentPanel',
	    value: function currentPanel() {
	      var _this2 = this;

	      return React.Children.map(this.props.children, function (c, i) {
	        if (c.props.children.type === TabContent) {
	          return React.cloneElement(c.props.children, { current: _this2.state.currentTab === i });
	        } else {
	          return React.createElement(
	            TabContent,
	            { current: _this2.state.currentTab === i },
	            c.props.children
	          );
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.$propsWithoutKeys('className', 'flavor');
	      return React.createElement(
	        'div',
	        _extends({}, props, { className: pf('tabs--' + this.props.flavor) }),
	        React.createElement(
	          _uiComponentsLibAccessibleListReact2['default'],
	          { selector: 'a', click: true, className: pf('tabs--' + this.props.flavor + '__nav'), role: 'tablist', selectedIndex: this.props.selectedIndex },
	          this.tabs()
	        ),
	        this.props.panel ? this.props.panel : this.currentPanel()
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      selectedIndex: PT.number,
	      flavor: componentUtil.PropTypes.flavor('scoped', 'default')
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: { selectedIndex: 0 },
	    enumerable: true
	  }]);

	  return Tabs;
	})(React.Component);

	Tabs.Item = TabItem;
	Tabs.Content = TabContent;

	module.exports = Tabs;

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$assign = __webpack_require__(12)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	var _uiComponentsLibDomHelpers = __webpack_require__(314);

	var _uiComponentsLibDomHelpers2 = _interopRequireDefault(_uiComponentsLibDomHelpers);

	var React = __webpack_require__(19);
	var ReactDOM = __webpack_require__(244);
	var PT = React.PropTypes;
	var componentUtil = __webpack_require__(174);
	var createChainedFunction = componentUtil.createChainedFunction;

	var AccessibleList = (function (_React$Component) {
	  function AccessibleList(props) {
	    _classCallCheck(this, AccessibleList);

	    _get(Object.getPrototypeOf(AccessibleList.prototype), 'constructor', this).call(this, props);
	    componentUtil.install(this);
	    this.state = { currentIndex: this.props.selectedIndex };
	    this.instantiated = false;
	  }

	  _inherits(AccessibleList, _React$Component);

	  _createClass(AccessibleList, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      if (this.items) this.items.forEach(function (t) {
	        return t.onfocus = undefined;
	      });
	    }
	  }, {
	    key: 'setFocusedIndex',
	    value: function setFocusedIndex(e) {
	      var _this = this;

	      this.items.forEach(function (item, i) {
	        if (item === e.currentTarget) {
	          _this.setState({ currentIndex: i });
	        }
	      });
	    }
	  }, {
	    key: 'getItems',
	    value: function getItems() {
	      var node = ReactDOM.findDOMNode(this);
	      return [].slice.call(node.querySelectorAll(this.props.selector));
	    }
	  }, {
	    key: 'instantiateItems',
	    value: function instantiateItems() {
	      var _this2 = this;

	      this.getItems().forEach(function (t) {
	        return t.onfocus = _this2.setFocusedIndex.bind(_this2);
	      });
	      this.instantiated = true;
	    }
	  }, {
	    key: 'navigateMenu',
	    value: function navigateMenu(e) {
	      if (e.keyCode === _uiComponentsLibDomHelpers2['default'].keys.space) return _uiComponentsLibDomHelpers2['default'].stopEvent(e) && _uiComponentsLibDomHelpers2['default'].click(this.items[this.state.currentIndex]);
	      var direction = _uiComponentsLibDomHelpers2['default'].keys.directions[String(e.keyCode)];
	      if (!direction) return;
	      if (!this.instantiated) this.instantiateItems(); //not quite sure why this is necessary, but compDidMount didn't find all
	      this.items = this.getItems(); // do this everytime to refresh if items have changed
	      _uiComponentsLibDomHelpers2['default'].stopEvent(e);

	      var goingBackwards = ['up', 'left'].indexOf(direction) >= 0;
	      var currentIdx = this.state.currentIndex;
	      var newIdx = goingBackwards ? currentIdx - 1 : currentIdx + 1;
	      var target = this.items[newIdx];

	      if (!target) {
	        newIdx = goingBackwards ? this.items.length - 1 : 0;
	        target = this.items[newIdx];
	      }

	      target.focus();
	      if (this.props.click) _uiComponentsLibDomHelpers2['default'].click(target);
	      this.setState({ currentIndex: newIdx });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = _Object$assign({ onKeyDown: createChainedFunction(this.props.onKeyDown, this.navigateMenu.bind(this)) }, this.props);
	      return React.createElement('ul', props);
	    }
	  }], [{
	    key: 'propTypes',
	    value: { selector: PT.string, click: PT.bool, selectedIndex: PT.number },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: { selector: 'li', click: false, selectedIndex: 0 },
	    enumerable: true
	  }]);

	  return AccessibleList;
	})(React.Component);

	module.exports = AccessibleList;

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(8)["default"];

	_Object$defineProperty(exports, "__esModule", {
	  value: true
	});

	exports["default"] = [".assistive-text", ".box", ".box--small", ".box--x-small", ".clear", ".clearfix", ".collapsed", ".dl--horizontal__detail", ".dl--horizontal__label", ".dl--inline", ".dl--inline__detail", ".dl--inline__label", ".expanded", ".float--left", ".float--right", ".has-block-links", ".has-cards", ".has-divider", ".has-dividers", ".hidden", ".hide", ".is-nested", ".is-selected", ".large-order--1", ".large-order--10", ".large-order--11", ".large-order--12", ".large-order--2", ".large-order--3", ".large-order--4", ".large-order--5", ".large-order--6", ".large-order--7", ".large-order--8", ".large-order--9", ".large-show", ".large-show--inline", ".large-show--inline-block", ".large-size--1-of-1", ".large-size--1-of-12", ".large-size--1-of-2", ".large-size--1-of-3", ".large-size--1-of-4", ".large-size--1-of-5", ".large-size--1-of-6", ".large-size--10-of-12", ".large-size--11-of-12", ".large-size--12-of-12", ".large-size--2-of-12", ".large-size--2-of-2", ".large-size--2-of-3", ".large-size--2-of-4", ".large-size--2-of-5", ".large-size--2-of-6", ".large-size--3-of-12", ".large-size--3-of-3", ".large-size--3-of-4", ".large-size--3-of-5", ".large-size--3-of-6", ".large-size--4-of-12", ".large-size--4-of-4", ".large-size--4-of-5", ".large-size--4-of-6", ".large-size--5-of-12", ".large-size--5-of-5", ".large-size--5-of-6", ".large-size--6-of-12", ".large-size--6-of-6", ".large-size--7-of-12", ".large-size--8-of-12", ".large-size--9-of-12", ".list--dotted", ".list--horizontal", ".list--horizontal-large", ".list--ordered", ".list--vertical", ".list__item", ".m-around--large", ".m-around--medium", ".m-around--small", ".m-around--x-large", ".m-around--x-small", ".m-around--xx-large", ".m-around--xx-small", ".m-around--xxx-small", ".m-bottom--large", ".m-bottom--medium", ".m-bottom--small", ".m-bottom--x-large", ".m-bottom--x-small", ".m-bottom--xx-large", ".m-bottom--xx-small", ".m-bottom--xxx-small", ".m-horizontal--large", ".m-horizontal--medium", ".m-horizontal--small", ".m-horizontal--x-large", ".m-horizontal--x-small", ".m-horizontal--xx-large", ".m-horizontal--xx-small", ".m-horizontal--xxx-small", ".m-left--large", ".m-left--medium", ".m-left--small", ".m-left--x-large", ".m-left--x-small", ".m-left--xx-large", ".m-left--xx-small", ".m-left--xxx-small", ".m-right--large", ".m-right--medium", ".m-right--small", ".m-right--x-large", ".m-right--x-small", ".m-right--xx-large", ".m-right--xx-small", ".m-right--xxx-small", ".m-top--large", ".m-top--medium", ".m-top--small", ".m-top--x-large", ".m-top--x-small", ".m-top--xx-large", ".m-top--xx-small", ".m-top--xxx-small", ".m-vertical--large", ".m-vertical--medium", ".m-vertical--small", ".m-vertical--x-large", ".m-vertical--x-small", ".m-vertical--xx-large", ".m-vertical--xx-small", ".m-vertical--xxx-small", ".max-medium-hide", ".max-small-hide", ".max-x-small-hide", ".medium-order--1", ".medium-order--2", ".medium-order--3", ".medium-order--4", ".medium-order--5", ".medium-order--6", ".medium-show", ".medium-show--inline", ".medium-show--inline-block", ".medium-show-only", ".medium-show-only--inline", ".medium-show-only--inline-block", ".medium-size--1-of-1", ".medium-size--1-of-2", ".medium-size--1-of-3", ".medium-size--1-of-4", ".medium-size--1-of-5", ".medium-size--1-of-6", ".medium-size--2-of-2", ".medium-size--2-of-3", ".medium-size--2-of-4", ".medium-size--2-of-5", ".medium-size--2-of-6", ".medium-size--3-of-3", ".medium-size--3-of-4", ".medium-size--3-of-5", ".medium-size--3-of-6", ".medium-size--4-of-4", ".medium-size--4-of-5", ".medium-size--4-of-6", ".medium-size--5-of-5", ".medium-size--5-of-6", ".medium-size--6-of-6", ".order--1", ".order--10", ".order--11", ".order--2", ".order--3", ".order--4", ".order--5", ".order--6", ".order--7", ".order--8", ".order--9", ".p-around--large", ".p-around--medium", ".p-around--small", ".p-around--x-large", ".p-around--x-small", ".p-around--xx-large", ".p-around--xx-small", ".p-around--xxx-small", ".p-bottom--large", ".p-bottom--medium", ".p-bottom--small", ".p-bottom--x-large", ".p-bottom--x-small", ".p-bottom--xx-large", ".p-bottom--xx-small", ".p-bottom--xxx-small", ".p-horizontal--large", ".p-horizontal--medium", ".p-horizontal--small", ".p-horizontal--x-large", ".p-horizontal--x-small", ".p-horizontal--xx-large", ".p-horizontal--xx-small", ".p-horizontal--xxx-small", ".p-left--large", ".p-left--medium", ".p-left--small", ".p-left--x-large", ".p-left--x-small", ".p-left--xx-large", ".p-left--xx-small", ".p-left--xxx-small", ".p-right--large", ".p-right--medium", ".p-right--small", ".p-right--x-large", ".p-right--x-small", ".p-right--xx-large", ".p-right--xx-small", ".p-right--xxx-small", ".p-top--large", ".p-top--medium", ".p-top--small", ".p-top--x-large", ".p-top--x-small", ".p-top--xx-large", ".p-top--xx-small", ".p-top--xxx-small", ".p-vertical--large", ".p-vertical--medium", ".p-vertical--small", ".p-vertical--x-large", ".p-vertical--x-small", ".p-vertical--xx-large", ".p-vertical--xx-small", ".p-vertical--xxx-small", ".page-header", ".scrollable--x", ".scrollable--y", ".section-group--is-closed", ".section-title", ".show", ".show--inline", ".show--inline-block", ".size--1-of-1", ".size--1-of-12", ".size--1-of-2", ".size--1-of-3", ".size--1-of-4", ".size--1-of-5", ".size--1-of-6", ".size--10-of-12", ".size--11-of-12", ".size--12-of-12", ".size--2-of-12", ".size--2-of-2", ".size--2-of-3", ".size--2-of-4", ".size--2-of-5", ".size--2-of-6", ".size--3-of-12", ".size--3-of-3", ".size--3-of-4", ".size--3-of-5", ".size--3-of-6", ".size--4-of-12", ".size--4-of-4", ".size--4-of-5", ".size--4-of-6", ".size--5-of-12", ".size--5-of-5", ".size--5-of-6", ".size--6-of-12", ".size--6-of-6", ".size--7-of-12", ".size--8-of-12", ".size--9-of-12", ".small-order--1", ".small-order--2", ".small-show", ".small-show--inline", ".small-show--inline-block", ".small-show-only", ".small-show-only--inline", ".small-show-only--inline-block", ".small-size--1-of-1", ".small-size--1-of-2", ".small-size--1-of-3", ".small-size--1-of-4", ".small-size--1-of-5", ".small-size--1-of-6", ".small-size--2-of-2", ".small-size--2-of-3", ".small-size--2-of-4", ".small-size--2-of-5", ".small-size--2-of-6", ".small-size--3-of-3", ".small-size--3-of-4", ".small-size--3-of-5", ".small-size--3-of-6", ".small-size--4-of-4", ".small-size--4-of-5", ".small-size--4-of-6", ".small-size--5-of-5", ".small-size--5-of-6", ".small-size--6-of-6", ".text-align--center", ".text-align--left", ".text-align--right", ".text-body--regular", ".text-body--small", ".text-heading--label", ".text-heading--large", ".text-heading--medium", ".text-heading--small", ".text-longform", ".theme--alert-texture", ".theme--alt-inverse", ".theme--default", ".theme--error", ".theme--inverse", ".theme--inverse-text", ".theme--offline", ".theme--shade", ".theme--success", ".theme--warning", ".transition-hide", ".transition-show", ".truncate", ".type-focus", ".visible", ".x-small-order--1", ".x-small-order--2", ".x-small-show", ".x-small-show--inline", ".x-small-show--inline-block", ".x-small-show-only", ".x-small-show-only--inline", ".x-small-show-only--inline-block", ".x-small-size--1-of-1", ".x-small-size--1-of-2", ".x-small-size--1-of-3", ".x-small-size--1-of-4", ".x-small-size--1-of-5", ".x-small-size--1-of-6", ".x-small-size--2-of-2", ".x-small-size--2-of-3", ".x-small-size--2-of-4", ".x-small-size--2-of-5", ".x-small-size--2-of-6", ".x-small-size--3-of-3", ".x-small-size--3-of-4", ".x-small-size--3-of-5", ".x-small-size--3-of-6", ".x-small-size--4-of-4", ".x-small-size--4-of-5", ".x-small-size--4-of-6", ".x-small-size--5-of-5", ".x-small-size--5-of-6", ".x-small-size--6-of-6"];
	module.exports = exports["default"];

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(244);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(173);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash = __webpack_require__(179);

	var Sticky = (function (_React$Component) {
	  function Sticky(props) {
	    _classCallCheck(this, Sticky);

	    _get(Object.getPrototypeOf(Sticky.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      isFixed: false
	    };
	  }

	  _inherits(Sticky, _React$Component);

	  _createClass(Sticky, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.calculate();
	      this.onResize = (0, _lodash.throttle)(this.onResize, 1000).bind(this);
	      this.onScroll = this.onScroll.bind(this);
	      window.addEventListener('resize', this.onResize, false);
	      window.addEventListener('scroll', this.onScroll, false);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('resize', this.onResize);
	      window.removeEventListener('scroll', this.onScroll);
	    }
	  }, {
	    key: 'calculate',
	    value: function calculate() {
	      this.refs.content.style.width = '';
	      // Calculate any padding on the top of the page (banners, etc)
	      var page = document.querySelector('main.site-main');
	      var pagePadding = this.getPaddingTop(page);
	      // Content
	      var content = this.refs.content;
	      var contentRect = content.getBoundingClientRect();
	      var contentPadding = this.getPaddingTop(content);
	      // Calculate the extra offset added by any other fixed elements above this one
	      var fixedElements = this.props.fixedElements ? document.querySelectorAll(this.props.fixedElements) : [];
	      var fixedOffset = (0, _lodash.reduce)(fixedElements, function (offset, el) {
	        return offset + el.getBoundingClientRect().height;
	      }, 0);
	      this.setState({
	        contentRect: contentRect,
	        contentTop: pagePadding + contentPadding + fixedOffset,
	        scrollOffset: contentRect.top + window.pageYOffset - pagePadding - fixedOffset
	      });
	    }
	  }, {
	    key: 'getPaddingTop',
	    value: function getPaddingTop(element) {
	      return parseFloat(window.getComputedStyle(element)['padding-top'], 10) || 0;
	    }
	  }, {
	    key: 'onResize',
	    value: function onResize() {
	      this.calculate();
	    }
	  }, {
	    key: 'onScroll',
	    value: function onScroll() {
	      // The page has scrolled past the top of the nav
	      // Attempt to stick it to the top
	      if (window.pageYOffset > this.state.scrollOffset) {
	        // It only needs to be adjusted once
	        if (!this.state.isFixed) {
	          this.setState({
	            isFixed: true
	          });
	        }
	      }
	      // The page has scrolled up past the original top of the nav
	      // Attemp to unstick it
	      else {
	        if (this.state.isFixed) {
	          this.setState({
	            isFixed: false
	          });
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _state = this.state;
	      var isFixed = _state.isFixed;
	      var contentRect = _state.contentRect;
	      var contentTop = _state.contentTop;

	      var content = _react2['default'].Children.only(this.props.children);
	      var className = (0, _classnames2['default'])(content.props.className, {
	        'sticky': true,
	        'sticky--fixed': isFixed
	      });
	      var style = {
	        top: contentTop ? '' + contentTop + 'px' : '',
	        width: contentRect ? '' + contentRect.width + 'px' : ''
	      };
	      var placeholderClassName = (0, _classnames2['default'])({
	        'sticky__placeholder': true,
	        'sticky__placeholder--on': isFixed
	      });
	      var placeholderStyle = {
	        height: contentRect ? '' + contentRect.height + 'px' : ''
	      };
	      content = _react2['default'].cloneElement(content, {
	        style: style, className: className, ref: 'content'
	      });
	      return _react2['default'].createElement(
	        'div',
	        { className: this.props.className },
	        content,
	        _react2['default'].createElement('div', { className: placeholderClassName, style: placeholderStyle, ref: 'placeholder' })
	      );
	    }
	  }]);

	  return Sticky;
	})(_react2['default'].Component);

	Sticky.propTypes = {
	  fixedElements: _react2['default'].PropTypes.string
	};

	exports['default'] = Sticky;
	module.exports = exports['default'];

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _app_modulesSiteComponentsCodeClass = __webpack_require__(339);

	var _app_modulesSiteComponentsCodeClass2 = _interopRequireDefault(_app_modulesSiteComponentsCodeClass);

	var _app_modulesUiSvgIcon = __webpack_require__(309);

	var _app_modulesUiSvgIcon2 = _interopRequireDefault(_app_modulesUiSvgIcon);

	var _app_modulesUiUtilComponent = __webpack_require__(174);

	var _app_modulesGlobal = __webpack_require__(182);

	var _app_modulesGlobal2 = _interopRequireDefault(_app_modulesGlobal);

	var TableYAML = (function (_React$Component) {
	  function TableYAML() {
	    _classCallCheck(this, TableYAML);

	    if (_React$Component != null) {
	      _React$Component.apply(this, arguments);
	    }
	  }

	  _inherits(TableYAML, _React$Component);

	  _createClass(TableYAML, [{
	    key: 'getRows',
	    value: function getRows() {
	      var data = this.props.data;

	      return (data.classes || []).map(function (d, dIndex) {
	        var sanitizedClass = d['class'].replace(/\W/g, '');
	        var required = null;

	        if (d.required) {
	          required = [_react2['default'].createElement(_app_modulesUiSvgIcon2['default'], { key: 'required-' + dIndex + '-icon', className: (0, _app_modulesUiUtilComponent.prefix)('icon icon--x-small icon-text-default'), sprite: 'utility', symbol: 'check' }), _react2['default'].createElement(
	            'span',
	            { key: 'required-' + dIndex + '-asst', className: (0, _app_modulesUiUtilComponent.prefix)('assistive-text') },
	            'Required'
	          )];
	        }
	        return _react2['default'].createElement(
	          'tr',
	          { key: 'tableyaml-' + sanitizedClass + '-' + dIndex },
	          _react2['default'].createElement(
	            'th',
	            { scope: 'row' },
	            _react2['default'].createElement(_app_modulesSiteComponentsCodeClass2['default'], { className: d['class'] })
	          ),
	          _react2['default'].createElement('td', { 'data-label': 'Outcome', dangerouslySetInnerHTML: { __html: d.description } }),
	          _react2['default'].createElement(
	            'td',
	            { 'data-label': 'Required', className: (0, _app_modulesUiUtilComponent.prefix)('cell-shrink') },
	            required
	          ),
	          _react2['default'].createElement('td', { 'data-label': 'Applied to', className: (0, _app_modulesUiUtilComponent.prefix)('cell-shrink'), dangerouslySetInnerHTML: { __html: d.applied } }),
	          _react2['default'].createElement('td', { 'data-label': 'Comments', dangerouslySetInnerHTML: { __html: d.notes } })
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var data = this.props.data;

	      return _react2['default'].createElement(
	        'div',
	        { id: 'overview' },
	        _react2['default'].createElement(
	          'div',
	          { className: (0, _app_modulesUiUtilComponent.prefix)('site-text-longform m-bottom--medium') },
	          _react2['default'].createElement(
	            'h4',
	            { className: (0, _app_modulesUiUtilComponent.prefix)('p-top--xx-large site-text-heading--large') },
	            'Component Overview'
	          ),
	          _react2['default'].createElement('div', { dangerouslySetInnerHTML: { __html: data.description } })
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: (0, _app_modulesUiUtilComponent.prefix)('scrollable--x') },
	          _react2['default'].createElement(
	            'table',
	            { className: (0, _app_modulesUiUtilComponent.prefix)('table table--bordered max-medium-table--stacked no-row-hover') },
	            _react2['default'].createElement(
	              'thead',
	              null,
	              _react2['default'].createElement(
	                'tr',
	                { className: 'site-text-heading--label' },
	                _react2['default'].createElement(
	                  'th',
	                  { scope: 'col' },
	                  _app_modulesGlobal2['default'].abbreviatedName,
	                  ' class'
	                ),
	                _react2['default'].createElement(
	                  'th',
	                  { scope: 'col' },
	                  'Outcome'
	                ),
	                _react2['default'].createElement(
	                  'th',
	                  { scope: 'col' },
	                  'Required'
	                ),
	                _react2['default'].createElement(
	                  'th',
	                  { scope: 'col' },
	                  'Applied to'
	                ),
	                _react2['default'].createElement(
	                  'th',
	                  { scope: 'col' },
	                  'Comments'
	                )
	              )
	            ),
	            _react2['default'].createElement(
	              'tbody',
	              null,
	              this.getRows()
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return TableYAML;
	})(_react2['default'].Component);

	exports['default'] = TableYAML;
	module.exports = exports['default'];

/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _app_modulesUiUtilComponent = __webpack_require__(174);

	var CodeClass = (function (_React$Component) {
	  function CodeClass() {
	    _classCallCheck(this, CodeClass);

	    if (_React$Component != null) {
	      _React$Component.apply(this, arguments);
	    }
	  }

	  _inherits(CodeClass, _React$Component);

	  _createClass(CodeClass, [{
	    key: 'render',
	    value: function render() {
	      var className = this.props.className;

	      return className ? _react2['default'].createElement(
	        'code',
	        null,
	        '.' + (0, _app_modulesUiUtilComponent.prefix)(className)
	      ) : null;
	    }
	  }]);

	  return CodeClass;
	})(_react2['default'].Component);

	CodeClass.displayName = 'CodeClass';
	CodeClass.propTypes = {
	  className: _react2['default'].PropTypes.string
	};

	module.exports = CodeClass;

/***/ }
]);