define("Facades", ["react","react-dom"], function(__WEBPACK_EXTERNAL_MODULE_210__, __WEBPACK_EXTERNAL_MODULE_214__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(208);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};
	
	exports.__esModule = true;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};
	
	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }
	
	    newObj["default"] = obj;
	    return newObj;
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Promise = __webpack_require__(6)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	var _interopRequire = __webpack_require__(61)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.hasClass = hasClass;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.offset = offset;
	exports.offsetFromParent = offsetFromParent;
	exports.outerHeight = outerHeight;
	exports.outerWidth = outerWidth;
	exports.isOffscreen = isOffscreen;
	exports.setWidth = setWidth;
	exports.wrapElement = wrapElement;
	exports.log = log;
	exports.registerAdapter = registerAdapter;
	exports.getItemAdapter = getItemAdapter;
	exports.getDataAdapter = getDataAdapter;
	exports.registerStrings = registerStrings;
	exports.getStrings = getStrings;
	exports.registerIconPaths = registerIconPaths;
	exports.getIconPaths = getIconPaths;
	exports.getSVGPath = getSVGPath;
	exports.registerHelper = registerHelper;
	exports.runHelpers = runHelpers;
	
	// Functions
	
	var _lodashFunctionPartial = __webpack_require__(62);
	
	var _lodashFunctionPartial2 = _interopRequireDefault(_lodashFunctionPartial);
	
	var _lodashFunctionPartialRight = __webpack_require__(100);
	
	var _lodashFunctionPartialRight2 = _interopRequireDefault(_lodashFunctionPartialRight);
	
	// Type Helpers
	
	var _lodashLangIsFunction = __webpack_require__(70);
	
	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);
	
	var _lodashLangIsString = __webpack_require__(101);
	
	var _lodashLangIsString2 = _interopRequireDefault(_lodashLangIsString);
	
	var _lodashLangIsArray = __webpack_require__(89);
	
	var _lodashLangIsArray2 = _interopRequireDefault(_lodashLangIsArray);
	
	// Data
	
	var _lodashObjectExtend = __webpack_require__(102);
	
	var _lodashObjectExtend2 = _interopRequireDefault(_lodashObjectExtend);
	
	var _lodashObjectMerge = __webpack_require__(117);
	
	var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);
	
	var _strings2 = __webpack_require__(128);
	
	var _strings3 = _interopRequireDefault(_strings2);
	
	// TODO: Generate JS icon module, currently one manually created file. Advise against multiple JS files due to need to register/modify if they change
	
	var _iconPaths = __webpack_require__(129);
	
	var _iconPaths2 = _interopRequireDefault(_iconPaths);
	
	var version = '0.0.7';
	
	exports.version = version;
	var global = typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global;exports.global = global;
	exports.partial = _lodashFunctionPartial2['default'];
	exports.partialRight = _lodashFunctionPartialRight2['default'];
	
	var _lodashUtilityNoop = __webpack_require__(84);
	
	exports.noop = _interopRequire(_lodashUtilityNoop);
	
	var _lodashFunctionBind = __webpack_require__(130);
	
	exports.bind = _interopRequire(_lodashFunctionBind);
	exports.isFunction = _lodashLangIsFunction2['default'];
	
	var _lodashLangIsNumber = __webpack_require__(131);
	
	exports.isNumber = _interopRequire(_lodashLangIsNumber);
	exports.isString = _lodashLangIsString2['default'];
	
	var _lodashLangIsRegExp = __webpack_require__(132);
	
	exports.isRegExp = _interopRequire(_lodashLangIsRegExp);
	exports.isArray = _lodashLangIsArray2['default'];
	
	var _lodashLangIsBoolean = __webpack_require__(133);
	
	exports.isBoolean = _interopRequire(_lodashLangIsBoolean);
	
	var _lodashLangIsObject = __webpack_require__(71);
	
	exports.isObject = _interopRequire(_lodashLangIsObject);
	
	// DOM
	
	function hasClass(element, className) {
		return element.className.match(new RegExp('\\b' + className + '\\b')) !== null;
	}
	
	function addClass(element, className) {
		if (element && typeof className === 'string' && !hasClass(element, className)) {
			element.className += ' ' + className;
		}
	}
	
	function removeClass(element, className) {
		if (element && typeof className === 'string') {
			element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}
	
	function offset(element) {
		var rect = element.getBoundingClientRect();
	
		return {
			top: rect.top + document.body.scrollTop,
			left: rect.left + document.body.scrollLeft
		};
	}
	
	function offsetFromParent(element, parent) {
		var elementOffset = offset(element);
		var parentOffset = offset(parent);
	
		return {
			top: elementOffset.top - parentOffset.top,
			left: elementOffset.left - parentOffset.left
		};
	}
	
	function outerHeight(element, includeMargin) {
		var height = element.offsetHeight;
	
		if (includeMargin) {
			var style = getComputedStyle(element);
			height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
		}
	
		return height;
	}
	
	function outerWidth(element, includeMargin) {
		var width = element.offsetWidth;
	
		if (includeMargin) {
			var style = getComputedStyle(element);
			width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
		}
	
		return width;
	}
	
	function isOffscreen(element, details) {
		var windowHeight = window.innerHeight || document.documentElement.clientHeight || 0;
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
		var elmentOffset = offset(element);
		var top = elmentOffset.top;
		var bottom = elmentOffset.top + outerHeight(element, true);
		var results = false;
	
		if (details) {
			results = bottom > windowHeight + scrollTop ? 'bottom' : false;
			if (!results) {
				results = top < scrollTop ? 'top' : false;
			}
		} else {
			results = bottom > windowHeight + scrollTop || top < scrollTop;
		}
	
		return results;
	}
	
	function setWidth(element, width) {
		element.setAttribute('style', 'width:' + width + 'px');
		element.style.width = width + 'px';
	}
	
	function WrappedElement(element) {
		this[0] = element;
		this.element = element;
		this.hasClass = (0, _lodashFunctionPartial2['default'])(hasClass, element);
		this.addClass = (0, _lodashFunctionPartial2['default'])(addClass, element);
		this.removeClass = (0, _lodashFunctionPartial2['default'])(removeClass, element);
		this.offset = (0, _lodashFunctionPartial2['default'])(offset, element);
		this.outerHeight = (0, _lodashFunctionPartial2['default'])(outerHeight, element);
		this.outerWidth = (0, _lodashFunctionPartial2['default'])(outerWidth, element);
		this.width = (0, _lodashFunctionPartial2['default'])(setWidth, element);
	
		return this;
	}
	
	function wrapElement(element) {
		var wrapped = element;
	
		// Don't re-wrap if this is already a jQuery $el or has already been wrapped
		if (!(0, _lodashLangIsFunction2['default'])(wrapped.hasClass)) {
			wrapped = new WrappedElement(element);
		}
	
		// Special function to check if the element is offScreen (not a jQuery method clone)
		if (!(0, _lodashLangIsFunction2['default'])(wrapped.isOffscreen)) {
			wrapped.isOffscreen = (0, _lodashFunctionPartial2['default'])(isOffscreen, wrapped[0]);
		}
	
		return wrapped;
	}
	
	// Utility
	
	var _lodashUtilityUniqueId = __webpack_require__(134);
	
	exports.uniqueId = _interopRequire(_lodashUtilityUniqueId);
	
	function log() {
		if (global.console && global.console.log) {
			console.log.apply(console, arguments);
		}
	}
	
	exports.extend = _lodashObjectExtend2['default'];
	
	var customMerge = (0, _lodashFunctionPartialRight2['default'])(_lodashObjectMerge2['default'], function (a, b, key) {
		if (/(_onBeforeInitialize|_initializer|_onInitialized)/.test(key) && (0, _lodashLangIsFunction2['default'])(a) && (0, _lodashLangIsFunction2['default'])(b)) {
			return function () {
				b.apply(this, arguments);
				a.apply(this, arguments);
			};
		}
	});
	exports.merge = customMerge;
	
	var _adapters = [];
	
	function registerAdapter(name, Adapter) {
		if (!_adapters[name]) {
			_adapters[name] = Adapter;
			_adapters.unshift(Adapter);
		}
	}
	
	function getItemAdapter(item) {
		var _item = undefined;
	
		_adapters.forEach(function (Adapter) {
			if (!_item && item instanceof Adapter.Item) {
				_item = item;
			} else if (!_item && Adapter.Item.isTypeOf(item)) {
				_item = new Adapter.Item(item);
			}
		});
	
		return _item;
	}
	
	function getDataAdapter(data) {
		var _data = undefined;
	
		_adapters.forEach(function (Adapter) {
			if (!_data && data instanceof Adapter.Data) {
				_data = data;
			} else if (!_data && Adapter.Data.isTypeOf(data)) {
				_data = new Adapter.Data(data);
			}
		});
	
		return _data;
	}
	
	// Strings
	var _strings = undefined;
	
	function registerStrings(strings) {
		_strings = strings;
	}
	
	function getStrings() {
		return _Promise.resolve(_strings);
	}
	
	registerStrings(_strings3['default']);
	
	// Icons
	var _icons = {};
	
	function registerIconPaths(icons) {
		customMerge(_icons, icons);
	}
	
	function getIconPaths() {
		return _icons;
	}
	
	function getSVGPath(iconProperty) {
		// TODO: Evaluate best way to do this and clean this up more
		var iconPaths = getIconPaths();
		var icon = (0, _lodashLangIsString2['default'])(iconProperty) && iconProperty.split('.');
	
		if (icon.length === 2) {
			var iconPath = iconPaths[icon[0]];
	
			if (iconPath) {
				return [iconPath, icon[1]].join('#');
			}
		}
	
		// TODO: For now, if an appropriate path is not found we are going to assume that we were given one
		return iconProperty;
	}
	
	registerIconPaths(_iconPaths2['default']);
	
	// Helpers
	var _controlHelpers = {};
	
	function registerHelper(name, helper, frameworks) {
		if ((0, _lodashLangIsArray2['default'])(frameworks)) {
			frameworks.forEach(function (framework) {
				if (!_controlHelpers[framework]) {
					_controlHelpers[framework] = [];
				}
	
				if (!_controlHelpers[framework][name]) {
					_controlHelpers[framework][name] = helper;
					_controlHelpers[framework].unshift(helper);
				}
			});
		}
	}
	
	function runHelpers(framework, name, Control, options) {
		var helpers = _controlHelpers[framework];
		var _control = Control;
	
		if ((0, _lodashLangIsArray2['default'])(helpers)) {
			helpers.forEach(function (helper) {
				return _control = helper(name, _control, options);
			});
		}
	
		return _control;
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(31);
	__webpack_require__(38);
	module.exports = __webpack_require__(17).Promise;

/***/ },
/* 8 */
/***/ function(module, exports) {



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(10)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(13)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(11)
	  , defined   = __webpack_require__(12);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
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
/* 11 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(14)
	  , $def            = __webpack_require__(15)
	  , $redef          = __webpack_require__(18)
	  , hide            = __webpack_require__(19)
	  , has             = __webpack_require__(24)
	  , SYMBOL_ITERATOR = __webpack_require__(25)('iterator')
	  , Iterators       = __webpack_require__(28)
	  , $iterCreate     = __webpack_require__(29)
	  , setToStringTag  = __webpack_require__(30)
	  , getProto        = __webpack_require__(20).getProto
	  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values';
	var returnThis = function(){ return this; };
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
	  }
	  // Define iterator
	  if((!LIBRARY || FORCE) && (BUGGY || !(SYMBOL_ITERATOR in proto))){
	    hide(proto, SYMBOL_ITERATOR, _default);
	  }
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEFAULT == VALUES ? _default : getMethod(VALUES),
	      keys:    IS_SET            ? _default : getMethod(KEYS),
	      entries: DEFAULT != VALUES ? _default : getMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * BUGGY, NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(16)
	  , core      = __webpack_require__(17)
	  , PROTOTYPE = 'prototype';
	var ctx = function(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {})[PROTOTYPE]
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && typeof target[key] != 'function')exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp[PROTOTYPE] = C[PROTOTYPE];
	    }(out);
	    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 16 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.5'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(20)
	  , createDesc = __webpack_require__(21);
	module.exports = __webpack_require__(22) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(23)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(26)('wks')
	  , uid    = __webpack_require__(27)
	  , Symbol = __webpack_require__(16).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(16)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(20)
	  , descriptor     = __webpack_require__(21)
	  , setToStringTag = __webpack_require__(30)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(19)(IteratorPrototype, __webpack_require__(25)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(20).setDesc
	  , has = __webpack_require__(24)
	  , TAG = __webpack_require__(25)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	var Iterators = __webpack_require__(28);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(33)
	  , step             = __webpack_require__(34)
	  , Iterators        = __webpack_require__(28)
	  , toIObject        = __webpack_require__(35);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(13)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(36)
	  , defined = __webpack_require__(12);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(37);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(20)
	  , LIBRARY    = __webpack_require__(14)
	  , global     = __webpack_require__(16)
	  , ctx        = __webpack_require__(39)
	  , classof    = __webpack_require__(41)
	  , $def       = __webpack_require__(15)
	  , isObject   = __webpack_require__(42)
	  , anObject   = __webpack_require__(43)
	  , aFunction  = __webpack_require__(40)
	  , strictNew  = __webpack_require__(44)
	  , forOf      = __webpack_require__(45)
	  , setProto   = __webpack_require__(50).set
	  , same       = __webpack_require__(51)
	  , SPECIES    = __webpack_require__(25)('species')
	  , speciesConstructor = __webpack_require__(52)
	  , RECORD     = __webpack_require__(27)('record')
	  , asap       = __webpack_require__(53)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;
	
	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};
	
	var useNative = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(22)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	var isPromise = function(it){
	  return isObject(it) && (useNative ? classof(it) == 'Promise' : RECORD in it);
	};
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    this[RECORD] = record;
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(58)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var react = {
	        ok:   typeof onFulfilled == 'function' ? onFulfilled : true,
	        fail: typeof onRejected == 'function'  ? onRejected  : false
	      };
	      var promise = react.P = new (speciesConstructor(this, P))(function(res, rej){
	        react.res = res;
	        react.rej = rej;
	      });
	      aFunction(react.res);
	      aFunction(react.rej);
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	__webpack_require__(30)(P, PROMISE);
	__webpack_require__(59)(PROMISE);
	Wrapper = __webpack_require__(17)[PROMISE];
	
	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new this(function(res, rej){ rej(r); });
	  }
	});
	$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isPromise(x) && sameConstructor(x.constructor, this)
	      ? x : new this(function(res){ res(x); });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(60)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(40);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
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
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(37)
	  , TAG = __webpack_require__(25)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(42);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(39)
	  , call        = __webpack_require__(46)
	  , isArrayIter = __webpack_require__(47)
	  , anObject    = __webpack_require__(43)
	  , toLength    = __webpack_require__(48)
	  , getIterFn   = __webpack_require__(49);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(43);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(28)
	  , ITERATOR   = __webpack_require__(25)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return (Iterators.Array || ArrayProto[ITERATOR]) === it;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(11)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(41)
	  , ITERATOR  = __webpack_require__(25)('iterator')
	  , Iterators = __webpack_require__(28);
	module.exports = __webpack_require__(17).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(20).getDesc
	  , isObject = __webpack_require__(42)
	  , anObject = __webpack_require__(43);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(39)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(43)
	  , aFunction = __webpack_require__(40)
	  , SPECIES   = __webpack_require__(25)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(16)
	  , macrotask = __webpack_require__(54).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , isNode    = __webpack_require__(37)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, domain;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    if(domain)domain.enter();
	    head.fn.call(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx                = __webpack_require__(39)
	  , invoke             = __webpack_require__(55)
	  , html               = __webpack_require__(56)
	  , cel                = __webpack_require__(57)
	  , global             = __webpack_require__(16)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(37)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16).document && document.documentElement;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(42)
	  , document = __webpack_require__(16).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(18);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(17)
	  , $           = __webpack_require__(20)
	  , DESCRIPTORS = __webpack_require__(22)
	  , SPECIES     = __webpack_require__(25)('species');
	
	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(25)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj["default"] : obj;
	};
	
	exports.__esModule = true;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var createPartial = __webpack_require__(63);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var PARTIAL_FLAG = 32;
	
	/**
	 * Creates a function that invokes `func` with `partial` arguments prepended
	 * to those provided to the new function. This method is like `_.bind` except
	 * it does **not** alter the `this` binding.
	 *
	 * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	 * builds, may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** This method does not set the "length" property of partially
	 * applied functions.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to partially apply arguments to.
	 * @param {...*} [partials] The arguments to be partially applied.
	 * @returns {Function} Returns the new partially applied function.
	 * @example
	 *
	 * var greet = function(greeting, name) {
	 *   return greeting + ' ' + name;
	 * };
	 *
	 * var sayHelloTo = _.partial(greet, 'hello');
	 * sayHelloTo('fred');
	 * // => 'hello fred'
	 *
	 * // using placeholders
	 * var greetFred = _.partial(greet, _, 'fred');
	 * greetFred('hi');
	 * // => 'hi fred'
	 */
	var partial = createPartial(PARTIAL_FLAG);
	
	// Assign default placeholders.
	partial.placeholder = {};
	
	module.exports = partial;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var createWrapper = __webpack_require__(64),
	    replaceHolders = __webpack_require__(94),
	    restParam = __webpack_require__(99);
	
	/**
	 * Creates a `_.partial` or `_.partialRight` function.
	 *
	 * @private
	 * @param {boolean} flag The partial bit flag.
	 * @returns {Function} Returns the new partial function.
	 */
	function createPartial(flag) {
	  var partialFunc = restParam(function(func, partials) {
	    var holders = replaceHolders(partials, partialFunc.placeholder);
	    return createWrapper(func, flag, undefined, partials, holders);
	  });
	  return partialFunc;
	}
	
	module.exports = createPartial;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(65),
	    createBindWrapper = __webpack_require__(73),
	    createHybridWrapper = __webpack_require__(76),
	    createPartialWrapper = __webpack_require__(97),
	    getData = __webpack_require__(83),
	    mergeData = __webpack_require__(98),
	    setData = __webpack_require__(95);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64;
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that either curries or invokes `func` with optional
	 * `this` binding and partially applied arguments.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to reference.
	 * @param {number} bitmask The bitmask of flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - `_.bind`
	 *     2 - `_.bindKey`
	 *     4 - `_.curry` or `_.curryRight` of a bound function
	 *     8 - `_.curry`
	 *    16 - `_.curryRight`
	 *    32 - `_.partial`
	 *    64 - `_.partialRight`
	 *   128 - `_.rearg`
	 *   256 - `_.ary`
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to be partially applied.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	  var isBindKey = bitmask & BIND_KEY_FLAG;
	  if (!isBindKey && typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var length = partials ? partials.length : 0;
	  if (!length) {
	    bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
	    partials = holders = undefined;
	  }
	  length -= (holders ? holders.length : 0);
	  if (bitmask & PARTIAL_RIGHT_FLAG) {
	    var partialsRight = partials,
	        holdersRight = holders;
	
	    partials = holders = undefined;
	  }
	  var data = isBindKey ? undefined : getData(func),
	      newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
	
	  if (data) {
	    mergeData(newData, data);
	    bitmask = newData[1];
	    arity = newData[9];
	  }
	  newData[9] = arity == null
	    ? (isBindKey ? 0 : func.length)
	    : (nativeMax(arity - length, 0) || 0);
	
	  if (bitmask == BIND_FLAG) {
	    var result = createBindWrapper(newData[0], newData[2]);
	  } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
	    result = createPartialWrapper.apply(undefined, newData);
	  } else {
	    result = createHybridWrapper.apply(undefined, newData);
	  }
	  var setter = data ? baseSetData : setData;
	  return setter(result, newData);
	}
	
	module.exports = createWrapper;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(66),
	    metaMap = __webpack_require__(67);
	
	/**
	 * The base implementation of `setData` without support for hot loop detection.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetData = !metaMap ? identity : function(func, data) {
	  metaMap.set(func, data);
	  return func;
	};
	
	module.exports = baseSetData;


/***/ },
/* 66 */
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var getNative = __webpack_require__(68);
	
	/** Native method references. */
	var WeakMap = getNative(global, 'WeakMap');
	
	/** Used to store function metadata. */
	var metaMap = WeakMap && new WeakMap;
	
	module.exports = metaMap;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(69);
	
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(70),
	    isObjectLike = __webpack_require__(72);
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
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
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isNative;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(71);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
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
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 71 */
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
/* 72 */
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var createCtorWrapper = __webpack_require__(74);
	
	/**
	 * Creates a function that wraps `func` and invokes it with the `this`
	 * binding of `thisArg`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @returns {Function} Returns the new bound function.
	 */
	function createBindWrapper(func, thisArg) {
	  var Ctor = createCtorWrapper(func);
	
	  function wrapper() {
	    var fn = (this && this !== global && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(thisArg, arguments);
	  }
	  return wrapper;
	}
	
	module.exports = createBindWrapper;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(75),
	    isObject = __webpack_require__(71);
	
	/**
	 * Creates a function that produces an instance of `Ctor` regardless of
	 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	 *
	 * @private
	 * @param {Function} Ctor The constructor to wrap.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createCtorWrapper(Ctor) {
	  return function() {
	    // Use a `switch` statement to work with class constructors.
	    // See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	    // for more details.
	    var args = arguments;
	    switch (args.length) {
	      case 0: return new Ctor;
	      case 1: return new Ctor(args[0]);
	      case 2: return new Ctor(args[0], args[1]);
	      case 3: return new Ctor(args[0], args[1], args[2]);
	      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	    }
	    var thisBinding = baseCreate(Ctor.prototype),
	        result = Ctor.apply(thisBinding, args);
	
	    // Mimic the constructor's `return` behavior.
	    // See https://es5.github.io/#x13.2.2 for more details.
	    return isObject(result) ? result : thisBinding;
	  };
	}
	
	module.exports = createCtorWrapper;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(71);
	
	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(prototype) {
	    if (isObject(prototype)) {
	      object.prototype = prototype;
	      var result = new object;
	      object.prototype = undefined;
	    }
	    return result || {};
	  };
	}());
	
	module.exports = baseCreate;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var arrayCopy = __webpack_require__(77),
	    composeArgs = __webpack_require__(78),
	    composeArgsRight = __webpack_require__(79),
	    createCtorWrapper = __webpack_require__(74),
	    isLaziable = __webpack_require__(80),
	    reorder = __webpack_require__(92),
	    replaceHolders = __webpack_require__(94),
	    setData = __webpack_require__(95);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    BIND_KEY_FLAG = 2,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    CURRY_RIGHT_FLAG = 16,
	    PARTIAL_FLAG = 32,
	    PARTIAL_RIGHT_FLAG = 64,
	    ARY_FLAG = 128;
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that wraps `func` and invokes it with optional `this`
	 * binding of, partial application, and currying.
	 *
	 * @private
	 * @param {Function|string} func The function or method name to reference.
	 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	 * @param {Array} [holders] The `partials` placeholder indexes.
	 * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
	 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	 * @param {Array} [argPos] The argument positions of the new function.
	 * @param {number} [ary] The arity cap of `func`.
	 * @param {number} [arity] The arity of `func`.
	 * @returns {Function} Returns the new wrapped function.
	 */
	function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	  var isAry = bitmask & ARY_FLAG,
	      isBind = bitmask & BIND_FLAG,
	      isBindKey = bitmask & BIND_KEY_FLAG,
	      isCurry = bitmask & CURRY_FLAG,
	      isCurryBound = bitmask & CURRY_BOUND_FLAG,
	      isCurryRight = bitmask & CURRY_RIGHT_FLAG,
	      Ctor = isBindKey ? undefined : createCtorWrapper(func);
	
	  function wrapper() {
	    // Avoid `arguments` object use disqualifying optimizations by
	    // converting it to an array before providing it to other functions.
	    var length = arguments.length,
	        index = length,
	        args = Array(length);
	
	    while (index--) {
	      args[index] = arguments[index];
	    }
	    if (partials) {
	      args = composeArgs(args, partials, holders);
	    }
	    if (partialsRight) {
	      args = composeArgsRight(args, partialsRight, holdersRight);
	    }
	    if (isCurry || isCurryRight) {
	      var placeholder = wrapper.placeholder,
	          argsHolders = replaceHolders(args, placeholder);
	
	      length -= argsHolders.length;
	      if (length < arity) {
	        var newArgPos = argPos ? arrayCopy(argPos) : undefined,
	            newArity = nativeMax(arity - length, 0),
	            newsHolders = isCurry ? argsHolders : undefined,
	            newHoldersRight = isCurry ? undefined : argsHolders,
	            newPartials = isCurry ? args : undefined,
	            newPartialsRight = isCurry ? undefined : args;
	
	        bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
	        bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);
	
	        if (!isCurryBound) {
	          bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
	        }
	        var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
	            result = createHybridWrapper.apply(undefined, newData);
	
	        if (isLaziable(func)) {
	          setData(result, newData);
	        }
	        result.placeholder = placeholder;
	        return result;
	      }
	    }
	    var thisBinding = isBind ? thisArg : this,
	        fn = isBindKey ? thisBinding[func] : func;
	
	    if (argPos) {
	      args = reorder(args, argPos);
	    }
	    if (isAry && ary < args.length) {
	      args.length = ary;
	    }
	    if (this && this !== global && this instanceof wrapper) {
	      fn = Ctor || createCtorWrapper(func);
	    }
	    return fn.apply(thisBinding, args);
	  }
	  return wrapper;
	}
	
	module.exports = createHybridWrapper;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 77 */
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
/* 78 */
/***/ function(module, exports) {

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates an array that is the composition of partially applied arguments,
	 * placeholders, and provided arguments into a single array of arguments.
	 *
	 * @private
	 * @param {Array|Object} args The provided arguments.
	 * @param {Array} partials The arguments to prepend to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgs(args, partials, holders) {
	  var holdersLength = holders.length,
	      argsIndex = -1,
	      argsLength = nativeMax(args.length - holdersLength, 0),
	      leftIndex = -1,
	      leftLength = partials.length,
	      result = Array(leftLength + argsLength);
	
	  while (++leftIndex < leftLength) {
	    result[leftIndex] = partials[leftIndex];
	  }
	  while (++argsIndex < holdersLength) {
	    result[holders[argsIndex]] = args[argsIndex];
	  }
	  while (argsLength--) {
	    result[leftIndex++] = args[argsIndex++];
	  }
	  return result;
	}
	
	module.exports = composeArgs;


/***/ },
/* 79 */
/***/ function(module, exports) {

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * This function is like `composeArgs` except that the arguments composition
	 * is tailored for `_.partialRight`.
	 *
	 * @private
	 * @param {Array|Object} args The provided arguments.
	 * @param {Array} partials The arguments to append to those provided.
	 * @param {Array} holders The `partials` placeholder indexes.
	 * @returns {Array} Returns the new array of composed arguments.
	 */
	function composeArgsRight(args, partials, holders) {
	  var holdersIndex = -1,
	      holdersLength = holders.length,
	      argsIndex = -1,
	      argsLength = nativeMax(args.length - holdersLength, 0),
	      rightIndex = -1,
	      rightLength = partials.length,
	      result = Array(argsLength + rightLength);
	
	  while (++argsIndex < argsLength) {
	    result[argsIndex] = args[argsIndex];
	  }
	  var offset = argsIndex;
	  while (++rightIndex < rightLength) {
	    result[offset + rightIndex] = partials[rightIndex];
	  }
	  while (++holdersIndex < holdersLength) {
	    result[offset + holders[holdersIndex]] = args[argsIndex++];
	  }
	  return result;
	}
	
	module.exports = composeArgsRight;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(81),
	    getData = __webpack_require__(83),
	    getFuncName = __webpack_require__(85),
	    lodash = __webpack_require__(87);
	
	/**
	 * Checks if `func` has a lazy counterpart.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
	 */
	function isLaziable(func) {
	  var funcName = getFuncName(func),
	      other = lodash[funcName];
	
	  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
	    return false;
	  }
	  if (func === other) {
	    return true;
	  }
	  var data = getData(other);
	  return !!data && func === data[0];
	}
	
	module.exports = isLaziable;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(75),
	    baseLodash = __webpack_require__(82);
	
	/** Used as references for `-Infinity` and `Infinity`. */
	var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
	
	/**
	 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 */
	function LazyWrapper(value) {
	  this.__wrapped__ = value;
	  this.__actions__ = [];
	  this.__dir__ = 1;
	  this.__filtered__ = false;
	  this.__iteratees__ = [];
	  this.__takeCount__ = POSITIVE_INFINITY;
	  this.__views__ = [];
	}
	
	LazyWrapper.prototype = baseCreate(baseLodash.prototype);
	LazyWrapper.prototype.constructor = LazyWrapper;
	
	module.exports = LazyWrapper;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * The function whose prototype all chaining wrappers inherit from.
	 *
	 * @private
	 */
	function baseLodash() {
	  // No operation performed.
	}
	
	module.exports = baseLodash;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var metaMap = __webpack_require__(67),
	    noop = __webpack_require__(84);
	
	/**
	 * Gets metadata for `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {*} Returns the metadata for `func`.
	 */
	var getData = !metaMap ? noop : function(func) {
	  return metaMap.get(func);
	};
	
	module.exports = getData;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/**
	 * A no-operation function that returns `undefined` regardless of the
	 * arguments it receives.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // No operation performed.
	}
	
	module.exports = noop;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var realNames = __webpack_require__(86);
	
	/**
	 * Gets the name of `func`.
	 *
	 * @private
	 * @param {Function} func The function to query.
	 * @returns {string} Returns the function name.
	 */
	function getFuncName(func) {
	  var result = (func.name + ''),
	      array = realNames[result],
	      length = array ? array.length : 0;
	
	  while (length--) {
	    var data = array[length],
	        otherFunc = data.func;
	    if (otherFunc == null || otherFunc == func) {
	      return data.name;
	    }
	  }
	  return result;
	}
	
	module.exports = getFuncName;


/***/ },
/* 86 */
/***/ function(module, exports) {

	/** Used to lookup unminified function names. */
	var realNames = {};
	
	module.exports = realNames;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(81),
	    LodashWrapper = __webpack_require__(88),
	    baseLodash = __webpack_require__(82),
	    isArray = __webpack_require__(89),
	    isObjectLike = __webpack_require__(72),
	    wrapperClone = __webpack_require__(91);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates a `lodash` object which wraps `value` to enable implicit chaining.
	 * Methods that operate on and return arrays, collections, and functions can
	 * be chained together. Methods that retrieve a single value or may return a
	 * primitive value will automatically end the chain returning the unwrapped
	 * value. Explicit chaining may be enabled using `_.chain`. The execution of
	 * chained methods is lazy, that is, execution is deferred until `_#value`
	 * is implicitly or explicitly called.
	 *
	 * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
	 * fusion is an optimization strategy which merge iteratee calls; this can help
	 * to avoid the creation of intermediate data structures and greatly reduce the
	 * number of iteratee executions.
	 *
	 * Chaining is supported in custom builds as long as the `_#value` method is
	 * directly or indirectly included in the build.
	 *
	 * In addition to lodash methods, wrappers have `Array` and `String` methods.
	 *
	 * The wrapper `Array` methods are:
	 * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
	 * `splice`, and `unshift`
	 *
	 * The wrapper `String` methods are:
	 * `replace` and `split`
	 *
	 * The wrapper methods that support shortcut fusion are:
	 * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
	 * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
	 * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
	 * and `where`
	 *
	 * The chainable wrapper methods are:
	 * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
	 * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
	 * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defaultsDeep`,
	 * `defer`, `delay`, `difference`, `drop`, `dropRight`, `dropRightWhile`,
	 * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`,
	 * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
	 * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
	 * `invoke`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`,
	 * `matchesProperty`, `memoize`, `merge`, `method`, `methodOf`, `mixin`,
	 * `modArgs`, `negate`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
	 * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
	 * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `restParam`,
	 * `reverse`, `set`, `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`,
	 * `sortByOrder`, `splice`, `spread`, `take`, `takeRight`, `takeRightWhile`,
	 * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `toPlainObject`,
	 * `transform`, `union`, `uniq`, `unshift`, `unzip`, `unzipWith`, `values`,
	 * `valuesIn`, `where`, `without`, `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
	 *
	 * The wrapper methods that are **not** chainable by default are:
	 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clone`, `cloneDeep`,
	 * `deburr`, `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`,
	 * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`,
	 * `floor`, `get`, `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`,
	 * `inRange`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
	 * `isEmpty`, `isEqual`, `isError`, `isFinite` `isFunction`, `isMatch`,
	 * `isNative`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`,
	 * `isRegExp`, `isString`, `isUndefined`, `isTypedArray`, `join`, `kebabCase`,
	 * `last`, `lastIndexOf`, `lt`, `lte`, `max`, `min`, `noConflict`, `noop`,
	 * `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`, `random`, `reduce`,
	 * `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `shift`, `size`,
	 * `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`, `startCase`,
	 * `startsWith`, `sum`, `template`, `trim`, `trimLeft`, `trimRight`, `trunc`,
	 * `unescape`, `uniqueId`, `value`, and `words`
	 *
	 * The wrapper method `sample` will return a wrapped value when `n` is provided,
	 * otherwise an unwrapped value is returned.
	 *
	 * @name _
	 * @constructor
	 * @category Chain
	 * @param {*} value The value to wrap in a `lodash` instance.
	 * @returns {Object} Returns the new `lodash` wrapper instance.
	 * @example
	 *
	 * var wrapped = _([1, 2, 3]);
	 *
	 * // returns an unwrapped value
	 * wrapped.reduce(function(total, n) {
	 *   return total + n;
	 * });
	 * // => 6
	 *
	 * // returns a wrapped value
	 * var squares = wrapped.map(function(n) {
	 *   return n * n;
	 * });
	 *
	 * _.isArray(squares);
	 * // => false
	 *
	 * _.isArray(squares.value());
	 * // => true
	 */
	function lodash(value) {
	  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
	    if (value instanceof LodashWrapper) {
	      return value;
	    }
	    if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
	      return wrapperClone(value);
	    }
	  }
	  return new LodashWrapper(value);
	}
	
	// Ensure wrappers are instances of `baseLodash`.
	lodash.prototype = baseLodash.prototype;
	
	module.exports = lodash;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(75),
	    baseLodash = __webpack_require__(82);
	
	/**
	 * The base constructor for creating `lodash` wrapper objects.
	 *
	 * @private
	 * @param {*} value The value to wrap.
	 * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
	 * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
	 */
	function LodashWrapper(value, chainAll, actions) {
	  this.__wrapped__ = value;
	  this.__actions__ = actions || [];
	  this.__chain__ = !!chainAll;
	}
	
	LodashWrapper.prototype = baseCreate(baseLodash.prototype);
	LodashWrapper.prototype.constructor = LodashWrapper;
	
	module.exports = LodashWrapper;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(68),
	    isLength = __webpack_require__(90),
	    isObjectLike = __webpack_require__(72);
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
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
/* 90 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
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
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var LazyWrapper = __webpack_require__(81),
	    LodashWrapper = __webpack_require__(88),
	    arrayCopy = __webpack_require__(77);
	
	/**
	 * Creates a clone of `wrapper`.
	 *
	 * @private
	 * @param {Object} wrapper The wrapper to clone.
	 * @returns {Object} Returns the cloned wrapper.
	 */
	function wrapperClone(wrapper) {
	  return wrapper instanceof LazyWrapper
	    ? wrapper.clone()
	    : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
	}
	
	module.exports = wrapperClone;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(77),
	    isIndex = __webpack_require__(93);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;
	
	/**
	 * Reorder `array` according to the specified indexes where the element at
	 * the first index is assigned as the first element, the element at
	 * the second index is assigned as the second element, and so on.
	 *
	 * @private
	 * @param {Array} array The array to reorder.
	 * @param {Array} indexes The arranged array indexes.
	 * @returns {Array} Returns `array`.
	 */
	function reorder(array, indexes) {
	  var arrLength = array.length,
	      length = nativeMin(indexes.length, arrLength),
	      oldArray = arrayCopy(array);
	
	  while (length--) {
	    var index = indexes[length];
	    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	  }
	  return array;
	}
	
	module.exports = reorder;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
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
/* 94 */
/***/ function(module, exports) {

	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';
	
	/**
	 * Replaces all `placeholder` elements in `array` with an internal placeholder
	 * and returns an array of their indexes.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {*} placeholder The placeholder to replace.
	 * @returns {Array} Returns the new array of placeholder indexes.
	 */
	function replaceHolders(array, placeholder) {
	  var index = -1,
	      length = array.length,
	      resIndex = -1,
	      result = [];
	
	  while (++index < length) {
	    if (array[index] === placeholder) {
	      array[index] = PLACEHOLDER;
	      result[++resIndex] = index;
	    }
	  }
	  return result;
	}
	
	module.exports = replaceHolders;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetData = __webpack_require__(65),
	    now = __webpack_require__(96);
	
	/** Used to detect when a function becomes hot. */
	var HOT_COUNT = 150,
	    HOT_SPAN = 16;
	
	/**
	 * Sets metadata for `func`.
	 *
	 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	 * period of time, it will trip its breaker and transition to an identity function
	 * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
	 * for more details.
	 *
	 * @private
	 * @param {Function} func The function to associate metadata with.
	 * @param {*} data The metadata.
	 * @returns {Function} Returns `func`.
	 */
	var setData = (function() {
	  var count = 0,
	      lastCalled = 0;
	
	  return function(key, value) {
	    var stamp = now(),
	        remaining = HOT_SPAN - (stamp - lastCalled);
	
	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return key;
	      }
	    } else {
	      count = 0;
	    }
	    return baseSetData(key, value);
	  };
	}());
	
	module.exports = setData;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(68);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeNow = getNative(Date, 'now');
	
	/**
	 * Gets the number of milliseconds that have elapsed since the Unix epoch
	 * (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @category Date
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => logs the number of milliseconds it took for the deferred function to be invoked
	 */
	var now = nativeNow || function() {
	  return new Date().getTime();
	};
	
	module.exports = now;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var createCtorWrapper = __webpack_require__(74);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1;
	
	/**
	 * Creates a function that wraps `func` and invokes it with the optional `this`
	 * binding of `thisArg` and the `partials` prepended to those provided to
	 * the wrapper.
	 *
	 * @private
	 * @param {Function} func The function to partially apply arguments to.
	 * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} partials The arguments to prepend to those provided to the new function.
	 * @returns {Function} Returns the new bound function.
	 */
	function createPartialWrapper(func, bitmask, thisArg, partials) {
	  var isBind = bitmask & BIND_FLAG,
	      Ctor = createCtorWrapper(func);
	
	  function wrapper() {
	    // Avoid `arguments` object use disqualifying optimizations by
	    // converting it to an array before providing it `func`.
	    var argsIndex = -1,
	        argsLength = arguments.length,
	        leftIndex = -1,
	        leftLength = partials.length,
	        args = Array(leftLength + argsLength);
	
	    while (++leftIndex < leftLength) {
	      args[leftIndex] = partials[leftIndex];
	    }
	    while (argsLength--) {
	      args[leftIndex++] = arguments[++argsIndex];
	    }
	    var fn = (this && this !== global && this instanceof wrapper) ? Ctor : func;
	    return fn.apply(isBind ? thisArg : this, args);
	  }
	  return wrapper;
	}
	
	module.exports = createPartialWrapper;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(77),
	    composeArgs = __webpack_require__(78),
	    composeArgsRight = __webpack_require__(79),
	    replaceHolders = __webpack_require__(94);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    CURRY_BOUND_FLAG = 4,
	    CURRY_FLAG = 8,
	    ARY_FLAG = 128,
	    REARG_FLAG = 256;
	
	/** Used as the internal argument placeholder. */
	var PLACEHOLDER = '__lodash_placeholder__';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;
	
	/**
	 * Merges the function metadata of `source` into `data`.
	 *
	 * Merging metadata reduces the number of wrappers required to invoke a function.
	 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	 * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
	 * augment function arguments, making the order in which they are executed important,
	 * preventing the merging of metadata. However, we make an exception for a safe
	 * common case where curried functions have `_.ary` and or `_.rearg` applied.
	 *
	 * @private
	 * @param {Array} data The destination metadata.
	 * @param {Array} source The source metadata.
	 * @returns {Array} Returns `data`.
	 */
	function mergeData(data, source) {
	  var bitmask = data[1],
	      srcBitmask = source[1],
	      newBitmask = bitmask | srcBitmask,
	      isCommon = newBitmask < ARY_FLAG;
	
	  var isCombo =
	    (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) ||
	    (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) ||
	    (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);
	
	  // Exit early if metadata can't be merged.
	  if (!(isCommon || isCombo)) {
	    return data;
	  }
	  // Use source `thisArg` if available.
	  if (srcBitmask & BIND_FLAG) {
	    data[2] = source[2];
	    // Set when currying a bound function.
	    newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
	  }
	  // Compose partial arguments.
	  var value = source[3];
	  if (value) {
	    var partials = data[3];
	    data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
	    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
	  }
	  // Compose partial right arguments.
	  value = source[5];
	  if (value) {
	    partials = data[5];
	    data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
	    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
	  }
	  // Use source `argPos` if available.
	  value = source[7];
	  if (value) {
	    data[7] = arrayCopy(value);
	  }
	  // Use source `ary` if it's smaller.
	  if (srcBitmask & ARY_FLAG) {
	    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	  }
	  // Use source `arity` if one is not provided.
	  if (data[9] == null) {
	    data[9] = source[9];
	  }
	  // Use source `func` and merge bitmasks.
	  data[0] = source[0];
	  data[1] = newBitmask;
	
	  return data;
	}
	
	module.exports = mergeData;


/***/ },
/* 99 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);
	
	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}
	
	module.exports = restParam;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var createPartial = __webpack_require__(63);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var PARTIAL_RIGHT_FLAG = 64;
	
	/**
	 * This method is like `_.partial` except that partially applied arguments
	 * are appended to those provided to the new function.
	 *
	 * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
	 * builds, may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** This method does not set the "length" property of partially
	 * applied functions.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to partially apply arguments to.
	 * @param {...*} [partials] The arguments to be partially applied.
	 * @returns {Function} Returns the new partially applied function.
	 * @example
	 *
	 * var greet = function(greeting, name) {
	 *   return greeting + ' ' + name;
	 * };
	 *
	 * var greetFred = _.partialRight(greet, 'fred');
	 * greetFred('hi');
	 * // => 'hi fred'
	 *
	 * // using placeholders
	 * var sayHelloTo = _.partialRight(greet, 'hello', _);
	 * sayHelloTo('fred');
	 * // => 'hello fred'
	 */
	var partialRight = createPartial(PARTIAL_RIGHT_FLAG);
	
	// Assign default placeholders.
	partialRight.placeholder = {};
	
	module.exports = partialRight;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(72);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
	}
	
	module.exports = isString;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(103);


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var assignWith = __webpack_require__(104),
	    baseAssign = __webpack_require__(112),
	    createAssigner = __webpack_require__(114);
	
	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object. Subsequent sources overwrite property assignments of previous sources.
	 * If `customizer` is provided it's invoked to produce the assigned values.
	 * The `customizer` is bound to `thisArg` and invoked with five arguments:
	 * (objectValue, sourceValue, key, object, source).
	 *
	 * **Note:** This method mutates `object` and is based on
	 * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
	 *
	 * @static
	 * @memberOf _
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	 * // => { 'user': 'fred', 'age': 40 }
	 *
	 * // using a customizer callback
	 * var defaults = _.partialRight(_.assign, function(value, other) {
	 *   return _.isUndefined(value) ? other : value;
	 * });
	 *
	 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var assign = createAssigner(function(object, source, customizer) {
	  return customizer
	    ? assignWith(object, source, customizer)
	    : baseAssign(object, source);
	});
	
	module.exports = assign;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(105);
	
	/**
	 * A specialized version of `_.assign` for customizing assigned values without
	 * support for argument juggling, multiple sources, and `this` binding `customizer`
	 * functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 */
	function assignWith(object, source, customizer) {
	  var index = -1,
	      props = keys(source),
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index],
	        value = object[key],
	        result = customizer(value, source[key], key, object, source);
	
	    if ((result === result ? (result !== value) : (value === value)) ||
	        (value === undefined && !(key in object))) {
	      object[key] = result;
	    }
	  }
	  return object;
	}
	
	module.exports = assignWith;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(68),
	    isArrayLike = __webpack_require__(106),
	    isObject = __webpack_require__(71),
	    shimKeys = __webpack_require__(109);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
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
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};
	
	module.exports = keys;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(107),
	    isLength = __webpack_require__(90);
	
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
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(108);
	
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
/* 108 */
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
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(110),
	    isArray = __webpack_require__(89),
	    isIndex = __webpack_require__(93),
	    isLength = __webpack_require__(90),
	    keysIn = __webpack_require__(111);
	
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
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(106),
	    isObjectLike = __webpack_require__(72);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
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
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}
	
	module.exports = isArguments;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(110),
	    isArray = __webpack_require__(89),
	    isIndex = __webpack_require__(93),
	    isLength = __webpack_require__(90),
	    isObject = __webpack_require__(71);
	
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
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(113),
	    keys = __webpack_require__(105);
	
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
/* 113 */
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(115),
	    isIterateeCall = __webpack_require__(116),
	    restParam = __webpack_require__(99);
	
	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;
	
	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(66);
	
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
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(106),
	    isIndex = __webpack_require__(93),
	    isObject = __webpack_require__(71);
	
	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(118),
	    createAssigner = __webpack_require__(114);
	
	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it's invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);
	
	module.exports = merge;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(119),
	    baseMergeDeep = __webpack_require__(120),
	    isArray = __webpack_require__(89),
	    isArrayLike = __webpack_require__(106),
	    isObject = __webpack_require__(71),
	    isObjectLike = __webpack_require__(72),
	    isTypedArray = __webpack_require__(126),
	    keys = __webpack_require__(105);
	
	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	      props = isSrcArr ? undefined : keys(source);
	
	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    }
	    else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;
	
	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((result !== undefined || (isSrcArr && !(key in object))) &&
	          (isCommon || (result === result ? (result !== value) : (value === value)))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}
	
	module.exports = baseMerge;


/***/ },
/* 119 */
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
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(77),
	    isArguments = __webpack_require__(110),
	    isArray = __webpack_require__(89),
	    isArrayLike = __webpack_require__(106),
	    isPlainObject = __webpack_require__(121),
	    isTypedArray = __webpack_require__(126),
	    toPlainObject = __webpack_require__(127);
	
	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];
	
	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;
	
	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value)
	        ? value
	        : (isArrayLike(value) ? arrayCopy(value) : []);
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value)
	        ? toPlainObject(value)
	        : (isPlainObject(value) ? value : {});
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);
	
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? (result !== value) : (value === value)) {
	    object[key] = result;
	  }
	}
	
	module.exports = baseMergeDeep;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(122),
	    isArguments = __webpack_require__(110),
	    isObjectLike = __webpack_require__(72);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  var Ctor;
	
	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
	      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function(subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}
	
	module.exports = isPlainObject;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(123),
	    keysIn = __webpack_require__(111);
	
	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}
	
	module.exports = baseForIn;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(124);
	
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
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(125);
	
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
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(71);
	
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
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(90),
	    isObjectLike = __webpack_require__(72);
	
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
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}
	
	module.exports = isTypedArray;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(113),
	    keysIn = __webpack_require__(111);
	
	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return baseCopy(value, keysIn(value));
	}
	
	module.exports = toPlainObject;


/***/ },
/* 128 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	var strings = {
		'NONE_SELECTED': 'None selected',
		'TOGGLE_DROPDOWN': 'Toggle Dropdown',
		'LOADING': 'Loading...',
		'PREV': 'Prev',
		'NEXT': 'Next',
		'COMPLETE': 'Complete'
	};
	
	exports['default'] = strings;
	module.exports = exports['default'];

/***/ },
/* 129 */
/***/ function(module, exports) {

	// TODO: Having a base path hardcoded here is obviously just a temp solution
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	var iconBasePath = '/assets/design-system/icons/';
	
	var icons = {
		'action': iconBasePath + 'action-sprite/svg/symbols.svg',
		'custom': iconBasePath + 'custom-sprite/svg/symbols.svg',
		'doctype': iconBasePath + 'doctype-sprite/svg/symbols.svg',
		'standard': iconBasePath + 'standard-sprite/svg/symbols.svg',
		'utility': iconBasePath + 'utility-sprite/svg/symbols.svg'
	};
	
	exports['default'] = icons;
	module.exports = exports['default'];

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var createWrapper = __webpack_require__(64),
	    replaceHolders = __webpack_require__(94),
	    restParam = __webpack_require__(99);
	
	/** Used to compose bitmasks for wrapper metadata. */
	var BIND_FLAG = 1,
	    PARTIAL_FLAG = 32;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of `thisArg`
	 * and prepends any additional `_.bind` arguments to those provided to the
	 * bound function.
	 *
	 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	 * may be used as a placeholder for partially applied arguments.
	 *
	 * **Note:** Unlike native `Function#bind` this method does not set the "length"
	 * property of bound functions.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} [partials] The arguments to be partially applied.
	 * @returns {Function} Returns the new bound function.
	 * @example
	 *
	 * var greet = function(greeting, punctuation) {
	 *   return greeting + ' ' + this.user + punctuation;
	 * };
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * var bound = _.bind(greet, object, 'hi');
	 * bound('!');
	 * // => 'hi fred!'
	 *
	 * // using placeholders
	 * var bound = _.bind(greet, object, _, '!');
	 * bound('hi');
	 * // => 'hi fred!'
	 */
	var bind = restParam(function(func, thisArg, partials) {
	  var bitmask = BIND_FLAG;
	  if (partials.length) {
	    var holders = replaceHolders(partials, bind.placeholder);
	    bitmask |= PARTIAL_FLAG;
	  }
	  return createWrapper(func, bitmask, thisArg, partials, holders);
	});
	
	// Assign default placeholders.
	bind.placeholder = {};
	
	module.exports = bind;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(72);
	
	/** `Object#toString` result references. */
	var numberTag = '[object Number]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	 * as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isNumber(8.4);
	 * // => true
	 *
	 * _.isNumber(NaN);
	 * // => true
	 *
	 * _.isNumber('8.4');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
	}
	
	module.exports = isNumber;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(71);
	
	/** `Object#toString` result references. */
	var regexpTag = '[object RegExp]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `RegExp` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isRegExp(/abc/);
	 * // => true
	 *
	 * _.isRegExp('/abc/');
	 * // => false
	 */
	function isRegExp(value) {
	  return isObject(value) && objToString.call(value) == regexpTag;
	}
	
	module.exports = isRegExp;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(72);
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a boolean primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isBoolean(false);
	 * // => true
	 *
	 * _.isBoolean(null);
	 * // => false
	 */
	function isBoolean(value) {
	  return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
	}
	
	module.exports = isBoolean;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(135);
	
	/** Used to generate unique IDs. */
	var idCounter = 0;
	
	/**
	 * Generates a unique ID. If `prefix` is provided the ID is appended to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {string} [prefix] The value to prefix the ID with.
	 * @returns {string} Returns the unique ID.
	 * @example
	 *
	 * _.uniqueId('contact_');
	 * // => 'contact_104'
	 *
	 * _.uniqueId();
	 * // => '105'
	 */
	function uniqueId(prefix) {
	  var id = ++idCounter;
	  return baseToString(prefix) + id;
	}
	
	module.exports = uniqueId;


/***/ },
/* 135 */
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
	  return value == null ? '' : (value + '');
	}
	
	module.exports = baseToString;


/***/ },
/* 136 */,
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// BADGE CORE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	// Styles
	// require('../../scss/components/badges/flavors/base/index.scss');
	
	var CONTROL = 'slds-badge';
	
	exports.CONTROL = CONTROL;
	var BadgeCore = Lib.merge({}, _base2['default'], {
		cssClasses: {
			CONTROL: CONTROL
		},
	
		themes: {
			'default': 'slds-theme--default',
			shade: 'slds-theme--shade',
			inverse: 'slds-theme--inverse'
		},
	
		_defaultProperties: {
			text: 'label',
			theme: null
		},
	
		_getClassNames: function _getClassNames() {
			return (0, _classnames2['default'])(this.cssClasses.CONTROL, this.themes[this.getProperty('theme')]);
		}
	});
	
	exports['default'] = BadgeCore;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	// Base Control
	// ------------
	
	// Inherited at the `core` level by all other controls.
	
	// Bring in the [shared library functions](../lib/lib).
	'use strict';
	
	var _Object$keys = __webpack_require__(139)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// Always include the ["vanilla" data adapter](../data/vanilla), which allows controls to work with plain javascript arrays and objects. More about data adapters may be found in the data directory.
	
	__webpack_require__(144);
	
	// Declare the object which will be exported. This object is what will be mixed in to every other control.
	var Base = {
		// Define shared CSS classes to be used across every control.
		cssClasses: {
			NAMESPACE: 'slds-',
			ASSISTIVE_TEXT: 'slds-assistive-text',
			LABEL: 'slds-form-element__label',
			CONTROL: 'slds-form-element__control'
		},
	
		// Define a default state with a strings object that is used by internationalization logic. The merge function used to mix `Base` into the other controls will allow this to be extended with additional defaults.
		_defaultState: {
			strings: {}
		},
	
		// We can't count on exactly how each facade will handle object construction, so instead we ask that this function be called at an appropriate point by the facade.
		_initialize: function _initialize(options) {
			var _this = this;
	
			// `_onBeforeInitialize` is an optional lifecycle event that individual controls / facades may choose to implement. During this step the options are still available and still free to be modified.
			if (Lib.isFunction(this._onBeforeInitialize)) this._onBeforeInitialize(options);
	
			// If any accessors were passed in as objects during construction use them to override the defaults for this control. _Important: acessors cannot be updated after initialization._
			if (options && Lib.isObject(options.accessors)) {
				this.accessors = Lib.extend({}, this.accessors, options.accessors);
				delete options.accessors;
			}
	
			// Set the current value of the props based on the options passed in. After this point the options are no longer available and any future code should reference only the props.
			this.setProperties(options);
	
			// Many controls make use of a collection to define their contents (list items, table rows, etc). If one has been provided for this control we want to wrap it in a `dataAdapter` and save result to `this._collection`.
			var collection = this.getProperty('collection');
			if (collection) this._collection = this._getDataAdapter(collection);
	
			// Run any initializers provided by the control and/or the traits. The special merge function used to mix together controls allows multiple `_onBeforeInitialize`, `_initializer`, and `_onInitialized` hooks to be defined, which will then run in sequence. More information can be found in `Lib.merge`.
			if (Lib.isFunction(this._initializer)) this._initializer();
	
			// Kick off the internationalization logic.
			this._getStrings(function (strings) {
				_this.setState({
					strings: strings
				});
	
				// Any `_onInitialized` functions defined by the controls or traits will be executed asynchronously after internationalization completes.
				if (Lib.isFunction(_this._onInitialized)) _this._onInitialized();
			});
		},
	
		// `onInitialized` is part of the public API. If it has been provided, run it after initialization is complete.
		/* TODO: Determine how to delineate and document API methods and options so that they can be easily collected and displayed together. */
		_onInitialized: function _onInitialized() {
			var onInitialized = this.getProperty('onInitialized');
	
			if (Lib.isFunction(onInitialized)) onInitialized.call(this, this);
		},
	
		// Item adapters are a key piece of functionality that allow Facades to work seamlessly with many different data sources. For example, an "item" might be a plain javascript object with key/value pairs or it might be a Backbone.js model.
		_getItemAdapter: function _getItemAdapter(_item, _itemAdapter) {
			var _this2 = this;
	
			// If a specific item adapter was passed in (typically this would be the one used provided by the data adapter we are using) then we want to use that one. Otherwise we'll fall back on a `Lib` function that walks all of the registered item adapters and chooses the first one that matches.
			var itemAdapter = _itemAdapter || Lib.getItemAdapter;
			var item = itemAdapter(_item);
	
			// When this function is used to wrap an item in an item adapter it has the added benefit of including the accessors for you. Accessors typically provide methods like `getText` or `getChildren` that provide flexibility in the structure of the data provided, while the adapter itself provides flexibility in the type of data.
			if (this.accessors) {
				_Object$keys(this.accessors).forEach(function (method) {
					item[method] = Lib.bind(_this2.accessors[method], _this2, item);
				});
			}
	
			return item;
		},
	
		// Like item adapters, data adpaters help Facades work with many different types of data. Data adapters work with the collections of data, like plain javascript arrays of objects or Backbone.js collections of models.
		_getDataAdapter: function _getDataAdapter(_data) {
			var data = Lib.getDataAdapter(_data);
	
			// This `Base` version of `getDataAdapter` largely delegates to the one in `Lib` with one key difference: this one uses the version of `getItemAdapter` defined above to ensure that the accessors are properly bound to each item.
			data.getItemAdapter = Lib.partialRight(Lib.bind(this._getItemAdapter, this), data.getItemAdapter);
	
			return data;
		},
	
		// Facades comes with support for internationalization of strings out of the box. Strings may be provided globally to `Lib` as either a js object or as a promise which resolves as such (see more details in that file), and overrides for a specific instance of a control may be passed in as properties.
		_getStrings: function _getStrings(callback) {
			var _this3 = this;
	
			Lib.getStrings().then(function (_strings) {
				var strings = _this3.getProperty('strings');
	
				if (strings) {
					strings = Lib.extend({}, _strings, strings);
				} else {
					strings = _strings;
				}
	
				return strings;
			}).then(callback);
		},
	
		// Every control inherits the current version of the library.
		version: Lib.version
	};
	
	exports['default'] = Base;
	module.exports = exports['default'];

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(140), __esModule: true };

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(141);
	module.exports = __webpack_require__(17).Object.keys;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(142);
	
	__webpack_require__(143)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $def  = __webpack_require__(15)
	  , core  = __webpack_require__(17)
	  , fails = __webpack_require__(23);
	module.exports = function(KEY, exec){
	  var $def = __webpack_require__(15)
	    , fn   = (core.Object || {})[KEY] || Object[KEY]
	    , exp  = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	// VANILLA JS DATA ADPATER
	
	'use strict';
	
	var _Object$keys = __webpack_require__(139)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(145);
	
	var _base2 = _interopRequireDefault(_base);
	
	var Item = _base2['default'].Item.extend({
		// Instance methods
		get: function get(key) {
			var result = undefined;
	
			if (key !== undefined) {
				result = this._item[key];
			} else {
				result = this._item;
			}
	
			return result;
		},
	
		keys: function keys() {
			return _Object$keys(this._item);
		}
	});
	
	// Static methods
	Item.isTypeOf = function isTypeOf(item) {
		return Lib.isObject(item);
	};
	
	var Data = _base2['default'].Data.extend({
		ItemType: Item,
	
		// Instance methods
		get: function get(criteria) {
			var result = undefined;
	
			if (criteria !== undefined) {
				result = this.findWhere(this._data, criteria);
			} else {
				result = this._data;
			}
	
			return result;
		},
	
		at: function at(index) {
			var result = undefined;
	
			if (this._data && Lib.isNumber(index)) {
				result = this._data[index];
			}
	
			return result;
		},
	
		indexOf: function indexOf(criteria) {
			var index = -1;
	
			this._data.forEach(function (item, i) {
				if (index < 0 && item === criteria._item) {
					index = i;
				}
			});
	
			return index;
		},
	
		length: function length() {
			return this._data.length;
		},
	
		add: function add(addition, options) {
			var _this = this;
	
			var itemAddition = Lib.isArray(addition) ? addition : [addition];
	
			itemAddition.forEach(function (item, itemIndex) {
				if (options && (options.at || options.at === 0)) {
					_this._data.splice(options.at + itemIndex, 0, item._item);
				} else {
					_this._data.push(item._item);
				}
			});
	
			return this;
		},
	
		remove: function remove(removal) {
			var _remove = Lib.bind(function _remove(itemToRemove) {
				var indexToRemove = undefined;
	
				this.forEach(function (item, index) {
					if (indexToRemove === undefined && item._item === itemToRemove._item) {
						indexToRemove = index;
					}
				});
	
				if (indexToRemove !== undefined) {
					this._data.splice(indexToRemove, 1);
				}
			}, this);
	
			if (Lib.isArray(removal)) {
				removal.forEach(function (item) {
					_remove(item);
				});
			} else {
				_remove(removal);
			}
	
			return this;
		},
	
		reset: function reset(item) {
			if (!item) {
				this._data.length = 0;
			} else {
				this.reset().add(item);
			}
	
			return this;
		},
	
		clone: function clone() {
			this._data = this._data.slice(0);
	
			return this;
		}
	});
	
	Data._addDefaultImplementations(Data, ['forEach', 'filter', 'map', 'every']);
	
	// Static methods
	Data.isTypeOf = function isTypeOf(data) {
		return Lib.isArray(data);
	};
	
	var Adapter = {
		Data: Data,
		Item: Item
	};
	
	Lib.registerAdapter('Vanilla', Adapter);
	
	exports['default'] = Adapter;
	module.exports = exports['default'];

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	// Base Item & Data Adapter
	// ------------------------
	
	// Bring in the [shared library functions](../lib/lib).
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// "Children" of the base adapter will use this extend method as a form of prototypical inheritance. This differs from the mix in system used by the controls themselves, and is more similar to Backbone's `extend`.
	/* TODO: this function can probably be cleaned up a little, and maybe inherit some implementation from lodash */
	function _extend(protoProps) {
		var parent = this;
	
		// Create a new function to apply the props to. This will be the child (or "subclass").
		var child = function child() {
			// The constructor of this child should call the constructor of the base control (which is the parent).
			return parent.apply(this, arguments);
		};
	
		// Pass on static properties of the parent if there are any.
		Lib.extend(child, parent);
	
		// Set the prototype chain to inherit from the parent, without calling the parent's constructor function.
		var Surrogate = function Surrogate() {
			this.constructor = child;
		};
	
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate();
	
		// Add in the new instance properties.
		if (protoProps) {
			Lib.extend(child.prototype, protoProps);
		}
	
		// Set a convenience property in case the parent’s prototype is needed later.
		child.__super__ = parent.prototype;
	
		return child;
	}
	
	// This method is used internally by `findWhere` to search for matches in the collection.
	function _findMatch(data, isMatch) {
		var found = undefined;
	
		// `isMatch` should be a function that returns true or false based on whether the item matches the current criteria.
		if (Lib.isFunction(isMatch)) {
			data.forEach(function (item) {
				// Only return the first match.
				if (!found) {
					// Note that `item` here will be wrapped in an item adapter.
					if (isMatch(item)) {
						found = item;
					}
				}
			});
		}
	
		return found;
	}
	
	// Lots of methods that operate on collections follow the same callback/iterator pattern and we need a way to easily wire up existing ones so that they can make use of item adapters. This is aliased on the base data adapter as `_addDefaultImplementations`.
	function _addMethods(instance, methods) {
		// For each method passed in we want to add a method on the instance (that is, the data adapter).
		methods.forEach(function (method) {
			instance.prototype[method] = function (callback) {
				var _data;
	
				var self = this;
	
				// The first argument to the method will be the callback or iterator, which we'll wrap so that we can call `getItemAdapter` before calling it.
				var _callback = function _callback(item) {
					var _item = self.getItemAdapter(item);
	
					for (var _len2 = arguments.length, callbackArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
						callbackArgs[_key2 - 1] = arguments[_key2];
					}
	
					return callback.apply(undefined, [_item].concat(callbackArgs));
				};
	
				for (var _len = arguments.length, funcArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					funcArgs[_key - 1] = arguments[_key];
				}
	
				return (_data = this._data)[method].apply(_data, [_callback].concat(funcArgs));
			};
		});
	}
	
	function Item(item) {
		this._item = item;
	}
	
	Lib.extend(Item.prototype, {
		// Instance methods
		get: function get() {
			return undefined;
		}
	});
	
	['keys'].forEach(function (method) {
		Item.prototype[method] = Lib.noop;
	});
	
	// Static methods
	Item.isTypeOf = function isTypeOf() {
		return true;
	};
	
	function Data(data) {
		this._data = data;
	}
	
	Lib.extend(Data.prototype, {
		// Instance methods
		findWhere: function findWhere(criteria) {
			var _isMatch = undefined;
	
			if (!Lib.isFunction(criteria)) {
				(function () {
					var _criteria = Lib.getItemAdapter(criteria);
	
					_isMatch = function (item) {
						var keys = _criteria.keys();
						var match = keys && keys.length > 0;
	
						if (match) {
							keys.forEach(function (key) {
								if (!match || _criteria.get(key) !== item.get(key)) {
									match = false;
								}
							});
						}
	
						return match;
					};
				})();
			} else {
				_isMatch = criteria;
			}
	
			return _findMatch(this, _isMatch);
		},
	
		get: function get() {
			return undefined;
		},
	
		clone: function clone() {
			return this;
		}
	});
	
	['at', 'indexOf', 'length', 'add', 'remove', 'reset', 'forEach', 'filter', 'map', 'every'].forEach(function (method) {
		Data.prototype[method] = Lib.noop;
	});
	
	// Static methods
	Data.isTypeOf = function isTypeOf() {
		return true;
	};
	
	Data.getItemAdapter = function (_item) {
		return new this.ItemType(_item);
	};
	
	Data._addDefaultImplementations = _addMethods;
	
	Data.extend = Item.extend = _extend;
	
	var Adapter = {
		Data: Data,
		Item: Item
	};
	
	Lib.registerAdapter('Base', Adapter);
	
	exports['default'] = Adapter;
	module.exports = exports['default'];

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// BUTTON CORE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	// Traits
	
	var _traitsDisableable = __webpack_require__(152);
	
	var _traitsDisableable2 = _interopRequireDefault(_traitsDisableable);
	
	var _traitsSelectableBoolean = __webpack_require__(153);
	
	var _traitsSelectableBoolean2 = _interopRequireDefault(_traitsSelectableBoolean);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	// Styles
	// require('../../scss/components/button-groups/flavors/base/index.scss');
	// require('../../scss/components/button-groups/flavors/icon-group/index.scss');
	// require('../../scss/components/button-groups/flavors/inverse/index.scss');
	// require('../../scss/components/buttons/flavors/base/index.scss');
	// require('../../scss/components/buttons/flavors/brand/index.scss');
	// require('../../scss/components/buttons/flavors/hint/index.scss');
	// require('../../scss/components/buttons/flavors/icon/index.scss');
	// require('../../scss/components/buttons/flavors/icon-inverse/index.scss');
	// require('../../scss/components/buttons/flavors/icon-more/index.scss');
	// require('../../scss/components/buttons/flavors/icon-stateful/index.scss');
	// require('../../scss/components/buttons/flavors/inverse/index.scss');
	// require('../../scss/components/buttons/flavors/neutral/index.scss');
	// require('../../scss/components/buttons/flavors/neutral-icon/index.scss');
	// require('../../scss/components/buttons/flavors/stateful/index.scss');
	// require('../../scss/components/buttons/flavors/stateful-inverse/index.scss');
	
	var CONTROL = 'slds-button';
	
	exports.CONTROL = CONTROL;
	var ButtonCore = Lib.merge({}, _base2['default'], _traitsSelectableBoolean2['default'], _traitsDisableable2['default'], {
		// TODO: add button property or check for button parent, inverse, size, etc.
		cssClasses: {
			'CONTROL': CONTROL,
			'NOT_SELECTED': _base2['default'].cssClasses.NAMESPACE + 'not-selected'
		},
	
		themes: {
			'neutral': CONTROL + '--neutral',
			'brand': CONTROL + '--brand',
			'inverse': CONTROL + '--inverse'
		},
	
		sizes: {
			'small': CONTROL + '--small'
		},
	
		// applied to the button, not the icon/SVG
		iconButtonStyles: {
			'icon-bare': CONTROL + '--icon-bare',
			'icon-border': CONTROL + '--icon-border',
			'icon-border-filled': CONTROL + '--icon-border-filled',
			'icon-container': CONTROL + '--icon-container',
			'icon-inverse': CONTROL + '--icon-inverse',
			'icon-more': CONTROL + '--icon-more',
			'icon-small': CONTROL + '--icon-small',
			'picklist-label': 'slds-picklist__label'
		},
	
		_defaultProperties: {
			iconStyle: null,
			iconPosition: 'left',
			selected: false,
			size: null,
			theme: null,
			views: [],
			children: []
		},
	
		_canSelect: function _canSelect() {
			if (this.getProperty('disabled')) {
				// Component is disabled, do not allow a toggle to occur.
				return false;
			}
	
			return true;
		},
	
		toggle: function toggle() {
			this._toggleSelected();
		},
	
		_getClassNames: function _getClassNames(additionalClasses, isStateful) {
			var selectedClasses = {};
	
			if (isStateful) {
				selectedClasses[this.cssClasses.NOT_SELECTED] = !this.getProperty('selected');
				selectedClasses[this.cssClasses.SELECTED] = this.getProperty('selected');
			}
	
			return (0, _classnames2['default'])(this.cssClasses.CONTROL, this.sizes[this.getProperty('size')], this.themes[this.getProperty('theme')], this.iconButtonStyles[this.getProperty('iconStyle')], selectedClasses, additionalClasses);
		}
	});
	
	exports['default'] = ButtonCore;

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// DISABLEABLE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var Disableable = {
		cssClasses: {
			DISABLED: 'slds-disabled'
		},
	
		_defaultProperties: {
			disabled: false
		},
	
		enable: function enable() {
			var property = { disabled: false };
	
			this.setProperties(property);
			if (Lib.isFunction(this._onEnabledOrDisabled)) this._onEnabledOrDisabled(property);
	
			this.trigger('enabled');
		},
	
		disable: function disable() {
			var property = { disabled: true };
	
			this.setProperties(property);
			if (Lib.isFunction(this._onEnabledOrDisabled)) this._onEnabledOrDisabled(property);
	
			this.trigger('disabled');
		}
	};
	
	exports['default'] = Disableable;
	module.exports = exports['default'];

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// SELECTABLE BOOLEAN
	// For select/deselect selection such as buttons, not for controls with "items"
	// Similar to checkable trait
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreBase = __webpack_require__(138);
	
	var _coreBase2 = _interopRequireDefault(_coreBase);
	
	var SelectableBoolean = {
		cssClasses: {
			SELECTED: _coreBase2['default'].cssClasses.NAMESPACE + 'is-selected'
		},
	
		_defaultProperties: {
			selected: null
		},
	
		isSelected: function isSelected() {
			return !!this.getProperty('selected');
		},
	
		_setSelected: function _setSelected(selected) {
			if (Lib.isFunction(this._canSelect) && !this._canSelect(selected)) {
				return false;
			}
	
			if (selected === this.isSelected()) {
				return false;
			}
	
			this.setProperties({ selected: selected });
	
			if (Lib.isFunction(this._onToggled)) this._onToggled(selected);
	
			this.trigger('changed', selected);
	
			return true;
		},
	
		_toggleSelected: function _toggleSelected() {
			if (this.isSelected()) {
				this.deselect();
			} else {
				this.select();
			}
		},
	
		select: function select() {
			if (this._setSelected(true)) {
				this.trigger('selected');
			}
		},
	
		deselect: function deselect() {
			if (this._setSelected(false)) {
				this.trigger('deselected');
			}
		}
	
	};
	
	exports['default'] = SelectableBoolean;
	module.exports = exports['default'];

/***/ },
/* 154 */,
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	// BUTTON VIEW CORE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _button = __webpack_require__(151);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var CONTROL = 'slds-buttonview';
	
	exports.CONTROL = CONTROL;
	var ButtonViewCore = Lib.merge({}, _base2['default'], {
		cssClasses: {
			ICON: _button.CONTROL + '__icon',
			STATEFUL_ICON: _button.CONTROL + '__icon--stateful',
			ASSISTIVE_TEXT: 'slds-assistive-text'
		},
	
		buttonStatefulViewStyles: {
			notSelected: 'slds-text-not-selected',
			selected: 'slds-text-selected',
			selectedHover: 'slds-text-selected-focus'
		},
	
		iconPositions: {
			'left': _button.CONTROL + '__icon--left',
			'right': _button.CONTROL + '__icon--right'
		},
	
		moreIcon: 'utility.down',
	
		buttonIconSizes: {
			'x-small': _button.CONTROL + '__icon--x-small',
			'small': _button.CONTROL + '__icon--small',
			'large': _button.CONTROL + '__icon--large'
		},
	
		_getIconClassNames: function _getIconClassNames(additionalClasses) {
			// getIconClassNames is a part of button/button-view because icons within buttons
			// have a completely different set of class than icons on their own
			var iconBaseClass = undefined;
			var buttonIconSizeClass = undefined;
	
			if (this.getProperty('view')) {
				iconBaseClass = this.cssClasses.STATEFUL_ICON;
			} else {
				iconBaseClass = this.cssClasses.ICON;
			}
	
			if (this.getProperty('iconSize')) {
				buttonIconSizeClass = this.buttonIconSizes[this.getProperty('iconSize')];
			}
	
			return (0, _classnames2['default'])(iconBaseClass, !!this.getProperty('text') && this.iconPositions[this.getProperty('iconPosition')], buttonIconSizeClass, additionalClasses);
		}
	});
	
	exports['default'] = ButtonViewCore;

/***/ },
/* 156 */,
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	// CHECKBOX CORE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	// Traits
	
	var _traitsDisableable = __webpack_require__(152);
	
	var _traitsDisableable2 = _interopRequireDefault(_traitsDisableable);
	
	var _traitsCheckable = __webpack_require__(158);
	
	var _traitsCheckable2 = _interopRequireDefault(_traitsCheckable);
	
	// Styles
	// require('../../scss/components/forms/flavors/form-element/index.scss');
	// require('../../scss/components/forms/flavors/checkbox/index.scss');
	
	var CONTROL = 'checkbox';
	
	exports.CONTROL = CONTROL;
	var CheckboxCore = Lib.merge({}, _base2['default'], _traitsDisableable2['default'], _traitsCheckable2['default'], {
		cssClasses: {
			CONTROL: _base2['default'].cssClasses.NAMESPACE + CONTROL,
			FAUX: _base2['default'].cssClasses.NAMESPACE + CONTROL + '--faux'
		},
	
		_defaultProperties: {
			labelText: '',
			value: '',
			name: ''
		},
	
		_canCheck: function _canCheck() {
			if (this.getProperty('disabled')) {
				// Component is disabled, do not allow a toggle to occur.
				return false;
			}
	
			return true;
		},
	
		toggle: function toggle() {
			this._toggleChecked();
		}
	});
	
	exports['default'] = CheckboxCore;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// CHECKABLE
	// Similar to selectable-boolean trait
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var Checkable = {
		_defaultProperties: {
			checked: false
		},
	
		checked: function checked() {
			return !!this.getProperty('checked');
		},
	
		_setChecked: function _setChecked(checked) {
			if (Lib.isFunction(this._canCheck) && !this._canCheck(checked)) {
				return false;
			}
	
			if (checked === this.checked()) {
				return false;
			}
	
			this.setProperties({ checked: checked });
	
			if (Lib.isFunction(this._onToggled)) this._onToggled(checked);
	
			this.trigger('changed', checked);
	
			return true;
		},
	
		_toggleChecked: function _toggleChecked() {
			if (this.checked()) {
				this.uncheck();
			} else {
				this.check();
			}
		},
	
		check: function check() {
			if (this._setChecked(true)) {
				this.trigger('checked');
			}
		},
	
		uncheck: function uncheck() {
			if (this._setChecked(false)) {
				this.trigger('unchecked');
			}
		}
	};
	
	exports['default'] = Checkable;
	module.exports = exports['default'];

/***/ },
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
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// COMBOBOX CORE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _picklist = __webpack_require__(171);
	
	var _picklist2 = _interopRequireDefault(_picklist);
	
	// TODO: This doesn't actually exist, should we name some variant of picklist or something equivalent?
	// require('../../scss/components/forms/flavors/input/index.scss');
	
	var CONTROL = 'slds-combobox';
	
	exports.CONTROL = CONTROL;
	var ComboboxCore = Lib.merge({}, _picklist2['default'], {
		// CSS classes used within this control
		cssClasses: {
			CONTROL: CONTROL,
			INPUT: 'slds-input',
			TOGGLE: 'slds-button'
		},
	
		resize: function resize() {
			if (this.elements.wrapper) {
				var width = this.elements.wrapper.outerWidth();
	
				this.setState({ width: width });
				if (Lib.isFunction(this.resetWidth)) this.resetWidth(width);
			}
		}
	});
	
	exports['default'] = ComboboxCore;

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// PICKLIST CORE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	// Traits
	
	var _traitsDisableable = __webpack_require__(152);
	
	var _traitsDisableable2 = _interopRequireDefault(_traitsDisableable);
	
	var _traitsOpenable = __webpack_require__(172);
	
	var _traitsOpenable2 = _interopRequireDefault(_traitsOpenable);
	
	var _traitsSelectable = __webpack_require__(173);
	
	var _traitsSelectable2 = _interopRequireDefault(_traitsSelectable);
	
	var _traitsKeyboardNavigable = __webpack_require__(174);
	
	var _traitsKeyboardNavigable2 = _interopRequireDefault(_traitsKeyboardNavigable);
	
	var CONTROL = 'picklist';
	
	exports.CONTROL = CONTROL;
	var PicklistCore = Lib.merge({}, _base2['default'], _traitsDisableable2['default'], _traitsOpenable2['default'], _traitsSelectable2['default'], _traitsKeyboardNavigable2['default'], {
		// CSS classes used within this control
		cssClasses: {
			CONTROL: CONTROL,
			LABEL: 'slds-truncate',
			MENU: 'slds-dropdown',
			LIST: 'slds-dropdown__list',
			TOGGLE: 'slds-button',
			HEADER: 'slds-dropdown__header',
			HEADERTEXT: 'slds-text-heading--label',
			DIVIDER: 'slds-has-divider',
			ICON: 'slds-icon'
		},
	
		_defaultProperties: {
			collection: []
		},
	
		/* Accessors: These may be supplied in the options hash to override default behavior
	 	 textProp ()
	  Return the name of the property that contains the text
	 	 getText (item)
	  Return the text value to display in the list
	  item => object wrapped in an Item Adapter
	 	 getType (item)
	  Return the type of the current item - can be 'header', 'divider', or nothing
	  item => object wrapped in an Item Adapter
	 	 getDisabled (item)
	  Return true if the item is disabled
	  item => object wrapped in an Item Adapter
	 	 getKey (item)
	  Return either an object with key/value pairs to match or a match function
	  Use this to reduce the number of fields required for searching if a unique key is available
	  item => object wrapped in an Item Adapter
	 	 */
	
		accessors: {
			textProp: function textProp() {
				return 'text';
			},
	
			getText: function getText(item) {
				return item.get(item.textProp());
			},
	
			getType: function getType(item) {
				return item.get('_itemType');
			},
	
			getDisabled: function getDisabled(item) {
				return item.get('disabled') === true;
			},
	
			getKey: function getKey(item) {
				return item.get();
			},
	
			getIcon: function getIcon(item) {
				return item.get('icon');
			}
		},
	
		_onExpandOrCollapse: function _onExpandOrCollapse() {
			this.setState({
				focusedIndex: this._defaultState.focusedIndex
			});
		},
	
		_canSelect: function _canSelect(newSelection, select) {
			var item = this._getItemAdapter(newSelection);
	
			if (!item.getType() && !item.getDisabled()) {
				select();
			}
		}
	});
	
	exports['default'] = PicklistCore;

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// OPENABLE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var Openable = {
		cssClasses: {
			OPEN: 'open',
			SHOWING: 'showing'
		},
	
		_defaultState: {
			isOpen: false
		},
	
		open: function open() {
			var _open = Lib.bind(function _open() {
				this.setState({ isOpen: true });
				if (Lib.isFunction(this._onExpandOrCollapse)) this._onExpandOrCollapse();
	
				document.addEventListener('click', this._closeOnClick, false);
				this.trigger('opened');
			}, this);
	
			if (!Lib.isFunction(this._canOpen)) {
				_open();
			} else {
				this._canOpen(_open);
			}
		},
	
		close: function close() {
			this.setState({ isOpen: false });
			if (Lib.isFunction(this._onExpandOrCollapse)) this._onExpandOrCollapse();
	
			// TODO: Once we have a destroy event we might want to remove this there as well
			document.removeEventListener('click', this._closeOnClick, false);
			this.trigger('closed');
		},
	
		_openToggleEvent: function _openToggleEvent(e) {
			if (e) {
				e.originator = this;
			}
	
			if (!this.getProperty('disabled')) {
				if (this.getState('isOpen')) {
					this.close();
				} else {
					this.open();
				}
			}
		},
	
		_closeOnClick: function _closeOnClick(e) {
			if (!e || e.originator !== this) {
				this.close();
			}
		}
	};
	
	exports['default'] = Openable;
	module.exports = exports['default'];

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	// SELECTABLE
	
	'use strict';
	
	var _Object$keys = __webpack_require__(139)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.customSelectable = customSelectable;
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var Selectable = {
		cssClasses: {
			SELECTED: 'slds-is-selected'
		},
	
		_defaultProperties: {
			selection: null
		},
	
		_selectableProperty: 'selection',
	
		_setSelection: function _setSelection(selection) {
			var _select = Lib.bind(function _select() {
				var props = {};
	
				props[this._selectableProperty] = selection;
	
				this.setProperties(props);
	
				if (Lib.isFunction(this._onSelected)) this._onSelected(this._getItemAdapter(selection));
	
				// Trigger the event using facade-native methods
				this.trigger('changed', selection);
			}, this);
	
			if (this.getProperty(this._selectableProperty) !== selection) {
				if (!Lib.isFunction(this._canSelect)) {
					_select();
				} else {
					this._canSelect(selection, _select);
				}
			}
		},
	
		// Pass any combination of key / value pairs
		setSelection: function setSelection(criteria) {
			var item = this._collection.findWhere(criteria);
	
			if (item) {
				item = item._item;
			} else {
				item = criteria;
			}
	
			return this._setSelection(item);
		},
	
		setSelectionByIndex: function setSelectionByIndex(index) {
			var item = this._collection.at(index);
	
			if (item) {
				this._setSelection(item);
			}
		},
	
		getSelection: function getSelection() {
			return this._getSelection()._item;
		},
	
		_getSelection: function _getSelection() {
			var selection = this.getProperty(this._selectableProperty);
			var item = this._collection.findWhere(selection);
	
			if (!item) {
				item = this._getItemAdapter(selection);
			}
	
			return item;
		},
	
		clearSelection: function clearSelection() {
			this._setSelection();
		}
	};
	
	function customSelectable(property, overrides) {
		var CustomSelectable = {};
		var lowercase = property.toLowerCase();
		var camelCase = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
	
		_Object$keys(Selectable).forEach(function (key) {
			var newKey = key;
	
			if (newKey.charAt(0) !== '_') {
				newKey = newKey.replace('Selection', camelCase);
			}
	
			CustomSelectable[newKey] = Selectable[key];
		});
	
		CustomSelectable._selectableProperty = lowercase;
		CustomSelectable._defaultProperties = {};
		CustomSelectable._defaultProperties[lowercase] = null;
	
		return Lib.extend(CustomSelectable, overrides);
	}
	
	exports['default'] = Selectable;

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	// KEYBOARD NAVIGABLE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var KeyBuffer = function KeyBuffer() {
		var self = this;
		this.buffer = '';
	
		return function add(key) {
			if (self.timeout) {
				Lib.global.clearTimeout(self.timeout);
				self.timeout = undefined;
			}
	
			self.timeout = Lib.global.setTimeout(function () {
				self.buffer = '';
			}, 400);
	
			self.buffer = self.buffer + key;
			return self.buffer;
		};
	};
	
	var KeyboardNavigable = {
		_defaultState: {
			focusedIndex: -1
		},
	
		_initializer: function _initializer() {
			this._keyBuffer = new KeyBuffer();
		},
	
		_keyboardNav: function _keyboardNav(input, menuItems) {
			var _this = this;
	
			var isOpen = this.getState('isOpen');
			var index = undefined;
			var selection = undefined;
	
			if (/(Escape)/.test(input)) {
				if (isOpen && Lib.isFunction(this.close)) this.close();
			} else if (!isOpen && Lib.isFunction(this.open)) {
				this.open();
			} else {
				index = this.getState('focusedIndex');
	
				if (input.length === 1) {
					(function () {
						// Combine subsequent keypresses
						var pattern = _this._keyBuffer(input).toLowerCase();
						var consecutive = 0;
	
						// Support for navigating to the next option of the same letter with repeated presses of the same key
						if (pattern.length > 1 && new RegExp('^[' + input.replace('\\', '\\\\') + ']+$').test(pattern)) {
							consecutive = pattern.length;
						}
	
						menuItems.forEach(function compareMenuItem(menuItem, i) {
							if (!selection && menuItem.textContent.substr(0, pattern.length).toLowerCase() === pattern || consecutive > 0 && menuItem.textContent.substr(0, 1).toLowerCase() === input) {
								consecutive--;
								index = i;
								selection = menuItem;
							}
						});
					})();
				} else if (/(ArrowDown)/.test(input)) {
					if (index < menuItems.length - 1) {
						index++;
						selection = menuItems[index];
					}
				} else if (/(ArrowUp)/.test(input)) {
					if (index > this._defaultState.focusedIndex) {
						index--;
						selection = menuItems[index];
					}
				}
			}
	
			if (selection) {
				selection.focus();
			} else {
				index = this._defaultState.focusedIndex;
			}
	
			this.setState({
				focusedIndex: index
			});
	
			return !!selection;
		}
	};
	
	exports['default'] = KeyboardNavigable;
	module.exports = exports['default'];

/***/ },
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// DATA-TABLE CORE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	// Traits
	
	var _traitsMultiselectable = __webpack_require__(181);
	
	var _traitsMultiselectable2 = _interopRequireDefault(_traitsMultiselectable);
	
	// Styles
	// require('../../scss/components/data-tables/flavors/base/index.scss');
	// require('../../scss/components/data-tables/flavors/responsive-stacked/index.scss');
	// require('../../scss/components/data-tables/flavors/responsive-stacked-horizontal/index.scss');
	
	var CONTROL = 'table';
	
	exports.CONTROL = CONTROL;
	var DataTableCore = Lib.merge({}, _base2['default'], _traitsMultiselectable2['default'], {
		cssClasses: {
			CONTROL: _base2['default'].cssClasses.NAMESPACE + CONTROL,
			NOHOVER: _base2['default'].cssClasses.NAMESPACE + 'no-row-hover',
			SORTABLE: _base2['default'].cssClasses.NAMESPACE + 'is-sortable',
			HINTPARENT: _base2['default'].cssClasses.NAMESPACE + 'hint-parent',
			CELLSHRINK: _base2['default'].cssClasses.NAMESPACE + 'cell-shrink',
			CELLWRAP: _base2['default'].cssClasses.NAMESPACE + 'cell-wrap',
			SCROLLABLEX: _base2['default'].cssClasses.NAMESPACE + 'scrollable--x',
			BORDERED: _base2['default'].cssClasses.NAMESPACE + CONTROL + '--bordered',
			STRIPED: _base2['default'].cssClasses.NAMESPACE + CONTROL + '--striped',
			STACKED: _base2['default'].cssClasses.NAMESPACE + 'max-medium-table--stacked',
			STACKEDHORIZONTAL: _base2['default'].cssClasses.NAMESPACE + 'max-medium-table--stacked-horizontalviewports'
		},
	
		_defaultProperties: {
			sortable: false,
			collection: [],
			selection: null,
			bordered: false,
			striped: false,
			stacked: false,
			stackedHorizontal: false
		},
	
		/* Accessors: These may be supplied in the options hash to override default behavior
	 	 textProp ()
	  Return the name of the property that contains the text
	 	 getText (item)
	  Return the text value to display in the list
	  item => object wrapped in an Item Adapter
	 	 getType (item)
	  Return the type of the current item - can be 'header', 'divider', or nothing
	  item => object wrapped in an Item Adapter
	 	 getDisabled (item)
	  Return true if the item is disabled
	  item => object wrapped in an Item Adapter
	 	 getKey (item)
	  Return either an object with key/value pairs to match or a match function
	  Use this to reduce the number of fields required for searching if a unique key is available
	  item => object wrapped in an Item Adapter
	 	 */
	
		accessors: { // TODO: use these
			textProp: function textProp() {
				return 'text';
			},
	
			getText: function getText(item) {
				return item.get(item.textProp());
			},
	
			getType: function getType(item) {
				return item.get('_itemType');
			},
	
			getDisabled: function getDisabled(item) {
				return item.get('disabled') === true;
			},
	
			getKey: function getKey(item) {
				return item.get();
			},
	
			getId: function getId(item) {
				return item.get('id');
			}
		},
	
		_getClassNames: function _getClassNames(classFlags) {
			var classList = [this.cssClasses.CONTROL];
	
			for (var flagName in classFlags) {
				if (classFlags[flagName] === true) {
					classList.push(this.cssClasses[flagName.toUpperCase()]);
				}
			}
	
			return (0, _classnames2['default'])(classList);
		}
	});
	
	exports['default'] = DataTableCore;

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	// MULTISELECTABLE
	// TODO: Combine this with Selectable
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var Multiselectable = {
		cssClasses: {
			SELECTED: 'selected'
		},
	
		_defaultProperties: {
			selection: []
		},
	
		getSelectedItems: function getSelectedItems() {
			return this.getProperty('selection');
		},
	
		_getSelectedItems: function _getSelectedItems() {
			return this._getDataAdapter(this.getSelectedItems()).clone();
		},
	
		_isItemSelected: function _isItemSelected(item, selection) {
			var _selection = selection || this._getDataAdapter(this.getSelectedItems());
			var key = Lib.isFunction(item.getKey) ? item.getKey() : item._item;
			return !!_selection.findWhere(key);
		},
	
		_areItemsSelected: function _areItemsSelected(items, selection) {
			var _this = this;
	
			var itemIsSelected = undefined;
	
			items.forEach(function (item) {
				if (_this._isItemSelected(item, selection)) {
					itemIsSelected = true;
				}
			});
	
			return !!itemIsSelected;
		},
	
		_selectItem: function _selectItem(item, selectIndex) {
			var selection = this._getSelectedItems();
			var multipleItems = Lib.isArray(item);
	
			var _select = Lib.bind(function _select() {
				if (this.getProperty('multiSelect')) {
					if (selectIndex || selectIndex === 0) {
						selection.add(item, { at: selectIndex });
					} else {
						selection.add(item);
					}
				} else {
					selection.reset(item);
				}
	
				this.setProperties({ selection: selection._data });
				if (Lib.isFunction(this._onSelected)) this._onSelected(selection);
	
				this.trigger('changed', item._item, selection._data);
			}, this);
	
			if (multipleItems ? !this._areItemsSelected(item, selection) : !this._isItemSelected(item, selection)) {
				if (!Lib.isFunction(this._canSelect)) {
					_select();
				} else {
					this._canSelect(item, _select);
				}
			}
		},
	
		selectItem: function selectItem(_item) {
			this._selectItem(this._getItemAdapter(_item));
		},
	
		selectItems: function selectItems(_items, index) {
			var _this2 = this;
	
			var itemsForAdapter = [];
	
			_items.forEach(function (item) {
				itemsForAdapter.push(_this2._getItemAdapter(item));
			});
	
			this._selectItem(itemsForAdapter, index);
		},
	
		_deselectItem: function _deselectItem(item) {
			var selection = this._getSelectedItems();
			var multipleItems = Lib.isArray(item);
	
			var _deSelect = Lib.bind(function _deSelect() {
				selection.remove(item);
	
				this.setProperties({ selection: selection._data });
				if (Lib.isFunction(this._onDeselected)) this._onDeselected(selection);
	
				this.trigger('changed', selection._item, selection._data);
			}, this);
	
			if (multipleItems ? this._areItemsSelected(item, selection) : this._isItemSelected(item, selection)) {
				if (!Lib.isFunction(this._canDeselect)) {
					_deSelect();
				} else {
					this._canDeselect(item, _deSelect);
				}
			}
		},
	
		deselectItem: function deselectItem(_item) {
			this._deselectItem(this._getItemAdapter(_item));
		},
	
		deselectItems: function deselectItems(_items) {
			var _this3 = this;
	
			var itemsForAdapter = [];
	
			_items.forEach(function (item) {
				itemsForAdapter.push(_this3._getItemAdapter(item));
			});
	
			this._deselectItem(itemsForAdapter);
		},
	
		deselectAll: function deselectAll() {
			var selection = this._getSelectedItems();
	
			selection.reset(null);
	
			this.setProperties({ selection: selection._data });
			if (Lib.isFunction(this._onDeselected)) this._onDeselected(selection);
	
			this.trigger('changed', null, selection._data);
		}
	};
	
	exports['default'] = Multiselectable;
	module.exports = exports['default'];

/***/ },
/* 182 */,
/* 183 */,
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// DROPDOWN CORE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _picklist = __webpack_require__(171);
	
	var _picklist2 = _interopRequireDefault(_picklist);
	
	// TODO: This doesn't actually exist, should we name some variant of picklist or something equivalent?
	// require('../../scss/components/forms/flavors/input/index.scss');
	
	var CONTROL = 'slds-dropdown';
	
	exports.CONTROL = CONTROL;
	var DropdownCore = Lib.merge({}, _picklist2['default'], {
		// CSS classes used within this control
		cssClasses: {
			CONTROL: CONTROL,
			ICON_DOWN_SIZE: 'slds-button__icon--x-small',
			TRIGGER: 'slds-dropdown-trigger'
		},
	
		_defaultProperties: {
			icon: 'standard.empty',
			swapIcon: true,
			renderArrow: true
		},
	
		resize: function resize() {
			if (this.elements.wrapper) {
				var width = this.elements.wrapper.outerWidth();
	
				this.setState({ width: width });
				if (Lib.isFunction(this.resetWidth)) this.resetWidth(width);
			}
		}
	});
	
	exports['default'] = DropdownCore;

/***/ },
/* 185 */,
/* 186 */,
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	// NOTIFICATION CORE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	// Traits
	
	var _traitsHideable = __webpack_require__(188);
	
	var _traitsHideable2 = _interopRequireDefault(_traitsHideable);
	
	// Styles
	// require('../../scss/components/notifications/flavors/base/index.scss');
	// require('../../scss/components/notifications/flavors/alert/index.scss');
	// require('../../scss/components/notifications/flavors/toast/index.scss');
	
	var CONTROL = 'slds-notify';
	
	exports.CONTROL = CONTROL;
	var NotificationCore = Lib.merge({}, _base2['default'], _traitsHideable2['default'], {
		cssClasses: {
			CONTROL: CONTROL,
			ALERT: 'slds-notify--alert slds-theme--alert-texture'
		},
	
		themes: {
			success: 'slds-theme--success',
			error: 'slds-theme--error',
			offline: 'slds-theme--offline'
		},
	
		_defaultProperties: {
			text: 'label',
			theme: null
		},
	
		_getClassNames: function _getClassNames() {
			var hiddenClass = this.getState('isHidden') && this.cssClasses.HIDDEN;
	
			return (0, _classnames2['default'])(this.cssClasses.CONTROL, this.cssClasses.ALERT, 'slds-theme--inverse-text', this.themes[this.getProperty('theme')], hiddenClass);
		}
	});
	
	exports['default'] = NotificationCore;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// HIDEABLE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var Hideable = {
		cssClasses: {
			HIDE: 'slds-hide',
			HIDDEN: 'slds-hidden'
		},
	
		_defaultState: {
			isHidden: false
		},
	
		show: function show() {
			this.setState({ isHidden: false });
			if (Lib.isFunction(this._onShow)) this._onShow();
	
			this.trigger('shown');
		},
	
		hide: function hide() {
			this.setState({ isHidden: true });
			if (Lib.isFunction(this._onHide)) this._onHide();
	
			this.trigger('hidden');
		}
	};
	
	exports['default'] = Hideable;
	module.exports = exports['default'];

/***/ },
/* 189 */,
/* 190 */,
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	// PILLBOX CORE
	
	'use strict';
	
	var _Promise = __webpack_require__(6)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	// Traits
	
	var _traitsDisableable = __webpack_require__(152);
	
	var _traitsDisableable2 = _interopRequireDefault(_traitsDisableable);
	
	var _traitsMultiselectable = __webpack_require__(181);
	
	var _traitsMultiselectable2 = _interopRequireDefault(_traitsMultiselectable);
	
	// Styles
	// require('../../scss/components/buttons/flavors/base/index.scss');
	// require('../../scss/components/buttons/flavors/icon/index.scss');
	// require('../../scss/components/pills/flavors/base/index.scss');
	// require('../../scss/components/pills/flavors/portrait/index.scss');
	// require('../../scss/components/forms/flavors/input/index.scss');
	
	var CONTROL = 'pillbox';
	
	exports.CONTROL = CONTROL;
	var PillboxCore = Lib.merge({}, _base2['default'], _traitsDisableable2['default'], _traitsMultiselectable2['default'], {
		// CSS classes used within this control
		cssClasses: {
			CONTROL: CONTROL
		},
	
		_defaultProperties: {
			multiSelect: true,
			selection: [],
			acceptKeyCodes: [13, 188]
		},
	
		accessors: {
			getText: function getText(item) {
				return item.get('text');
			},
	
			getValue: function getValue(item) {
				return item.get('value');
			}
		},
	
		_canSelect: function _canSelect(item, select) {
			if (Lib.isFunction(this._onAdd)) {
				_Promise.resolve(this._onAdd(item)).then(function (canSelect) {
					if (canSelect !== false) {
						select();
					}
				}, function (error) {
					Lib.log(error);
				});
			} else {
				select();
			}
		},
	
		_canDeselect: function _canDeselect(item, deselect) {
			if (Lib.isFunction(this._onRemove)) {
				_Promise.resolve(this._onRemove(item)).then(function (canDeselect) {
					if (canDeselect !== false) {
						deselect();
					}
				}, function (error) {
					Lib.log(error);
				});
			} else {
				deselect();
			}
		},
	
		_isAcceptKeyCode: function _isAcceptKeyCode(keyCode) {
			var acceptKeys = this.getProperty('acceptKeyCodes');
			var isAccepted = undefined;
	
			acceptKeys.forEach(function (key) {
				if (key === keyCode) {
					isAccepted = true;
				}
			});
	
			return isAccepted;
		}
	});
	
	exports['default'] = PillboxCore;

/***/ },
/* 192 */,
/* 193 */,
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	// POPOVER CONTROL
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	// Traits
	
	var _traitsPositionable = __webpack_require__(195);
	
	var _traitsPositionable2 = _interopRequireDefault(_traitsPositionable);
	
	var _traitsDisableable = __webpack_require__(152);
	
	var _traitsDisableable2 = _interopRequireDefault(_traitsDisableable);
	
	var _traitsHideable = __webpack_require__(188);
	
	var _traitsHideable2 = _interopRequireDefault(_traitsHideable);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	// Styles
	// require('../../scss/components/popovers/flavors/base/index.scss');
	
	var CONTROL = 'slds-popover';
	
	exports.CONTROL = CONTROL;
	var PopoverCore = Lib.merge({}, _base2['default'], _traitsPositionable2['default'], _traitsDisableable2['default'], _traitsHideable2['default'], {
		cssClasses: {
			CONTROL: CONTROL,
			TARGET: 'slds-popover-target'
		},
	
		triggers: {
			click: 'click',
			hover: ['mouseover', 'mouseout'],
			focus: ['focus', 'focusout'],
			manual: ''
		},
	
		_defaultProperties: {
			trigger: 'click',
			target: null, // The element who's events will trigger the popover
			container: null, // The element the popover will be contained within
			align: null // The element the popover will be aligned with
		},
	
		_defaultState: {
			isHidden: true
		},
	
		_getClassNames: function _getClassNames() {
			var positionClass = this.positions[this.currentPosition];
			var hiddenClass = this.getState('isHidden') && this.cssClasses.HIDDEN;
	
			return (0, _classnames2['default'])(this.cssClasses.CONTROL, this.cssClasses.TARGET, positionClass, hiddenClass);
		},
	
		toggle: function toggle() {
			if (this.getState('isHidden')) {
				this.show();
			} else {
				this.hide();
			}
		}
	});
	
	exports['default'] = PopoverCore;

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	// POSITIONABLE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var Positionable = {
		_defaultProperties: {
			position: 'right',
			autoFlip: true,
			targetDistance: 15,
			targetLateralAlign: 'center' // center, left
		},
	
		positions: {
			left: 'slds-nubbin--right',
			top: 'slds-nubbin--bottom',
			bottom: 'slds-nubbin--top',
			right: 'slds-nubbin--left'
		},
	
		_getElementAlignment: function _getElementAlignment(el, container, align, newPosition) {
			var offset = Lib.offsetFromParent(align[0], container[0]);
			var targetDistance = this.getProperty('targetDistance');
			var targetLateralAlign = this.getProperty('targetLateralAlign');
			var position = {};
			var alignLatPos = 0;
	
			var popSize = {
				width: el.outerWidth(),
				height: el.outerHeight()
			};
	
			var alignSize = {
				width: align.outerWidth(),
				height: align.outerHeight()
			};
	
			var currentPosition = newPosition || this.getProperty('position');
	
			if (targetLateralAlign === 'center') {
				alignLatPos = popSize.width / 2 - alignSize.width / 2;
			} else if (targetLateralAlign === 'left') {
				alignLatPos = 0;
			}
	
			switch (currentPosition) {
				case 'left':
					position.left = offset.left - (popSize.width + targetDistance);
					position.top = offset.top - (popSize.height / 2 - alignSize.height / 2);
					break;
				case 'top':
					position.left = offset.left - alignLatPos;
					position.top = offset.top - (popSize.height + targetDistance);
					break;
				case 'bottom':
					position.left = offset.left - alignLatPos;
					position.top = offset.top + alignSize.height + targetDistance;
					break;
				case 'right':
				default:
					position.left = offset.left + alignSize.width + targetDistance;
					position.top = offset.top - (popSize.height / 2 - alignSize.height / 2);
					break;
			}
	
			this.currentPosition = currentPosition;
	
			return position;
		},
	
		_setPositionStyles: function _setPositionStyles(style) {
			if (style) {
				var popover = this.elements.popover[0];
	
				popover.style.top = style.top + 'px';
				popover.style.left = style.left + 'px';
				// TODO: If we're going to call this here we need to check if it exists first. But maybe we shouldn't?
				if (this._getClassNames) popover.className = this._getClassNames();
			}
		},
	
		_updatePosition: function _updatePosition() {
			this._setPositionStyles(this._getElementAlignment(this.elements.popover, this.elements.container, this.elements.align));
	
			var isOffscreen = this.elements.popover.isOffscreen(true);
			if (isOffscreen === 'top') {
				this._setPositionStyles(this._getElementAlignment(this.elements.popover, this.elements.container, this.elements.align, 'bottom'));
			} else if (isOffscreen === 'bottom') {
				this._setPositionStyles(this._getElementAlignment(this.elements.popover, this.elements.container, this.elements.align, 'top'));
			}
		}
	};
	
	exports['default'] = Positionable;
	module.exports = exports['default'];

/***/ },
/* 196 */,
/* 197 */,
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	// RADIO CORE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _checkbox = __webpack_require__(157);
	
	var _checkbox2 = _interopRequireDefault(_checkbox);
	
	// Styles
	// require('../../scss/components/forms/flavors/form-element/index.scss');
	// require('../../scss/components/forms/flavors/radio/index.scss');
	
	var CONTROL = 'radio';
	
	exports.CONTROL = CONTROL;
	var RadioCore = Lib.merge({}, _checkbox2['default'], {
		cssClasses: {
			CONTROL: _checkbox2['default'].cssClasses.NAMESPACE + CONTROL,
			FAUX: _checkbox2['default'].cssClasses.NAMESPACE + CONTROL + '--faux'
		}
	});
	
	exports['default'] = RadioCore;

/***/ },
/* 199 */,
/* 200 */,
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	// SPINNER CORE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	// FIXME: This needs the namespace too, but that will mess up the filenames below
	
	// require('../../scss/components/spinners/flavors/base/index.scss');
	// require('../../scss/components/spinners/flavors/large/index.scss');
	// require('../../scss/components/spinners/flavors/medium/index.scss');
	
	// TODO: We need to come up with a way to manage assets across the whole project, this hard-coding solution can only be temporary
	var CONTROL = 'spinner';
	exports.CONTROL = CONTROL;
	var assetsDir = '/assets/design-system/images/spinners/';
	
	var SpinnerCore = Lib.merge({}, _base2['default'], {
	
		sizes: {
			'small': _base2['default'].cssClasses.NAMESPACE + CONTROL + '--small',
			'medium': _base2['default'].cssClasses.NAMESPACE + CONTROL + '--medium',
			'large': _base2['default'].cssClasses.NAMESPACE + CONTROL + '--large'
		},
	
		fileNames: {
			base: assetsDir + 'slds_' + CONTROL + '.gif',
			brand: assetsDir + 'slds_' + CONTROL + '_brand.gif',
			inverse: assetsDir + 'slds_' + CONTROL + '_inverse.gif'
		},
	
		// Set the defaults
		_defaultProperties: {
			size: 'medium',
			theme: 'base'
		}
	});
	
	exports['default'] = SpinnerCore;

/***/ },
/* 202 */,
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	// TOOLTIP CONTROL
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _popover = __webpack_require__(194);
	
	var _popover2 = _interopRequireDefault(_popover);
	
	// Styles
	// require('../../scss/components/tooltips/flavors/base/index.scss');
	
	var CONTROL = 'slds-tooltip';
	
	exports.CONTROL = CONTROL;
	var TooltipCore = Lib.merge({}, _popover2['default'], {
		cssClasses: {
			CONTROL: CONTROL
		}
	});
	
	exports['default'] = TooltipCore;

/***/ },
/* 204 */,
/* 205 */,
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	// TREE CORE
	
	'use strict';
	
	var _Promise = __webpack_require__(6)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	// Traits
	
	var _traitsDisableable = __webpack_require__(152);
	
	var _traitsDisableable2 = _interopRequireDefault(_traitsDisableable);
	
	var _traitsMultiselectable = __webpack_require__(181);
	
	var _traitsMultiselectable2 = _interopRequireDefault(_traitsMultiselectable);
	
	// Styles
	// require('../../scss/components/trees/flavors/base/index.scss');
	
	var CONTROL = 'slds-tree';
	
	exports.CONTROL = CONTROL;
	var TreeCore = Lib.merge({}, _base2['default'], _traitsDisableable2['default'], _traitsMultiselectable2['default'], {
		// CSS classes used within this control
		cssClasses: {
			CONTROL: CONTROL,
			CONTAINER: 'slds-tree-container'
		},
	
		// Set the defaults
		_defaultProperties: {
			collection: [],
			folderSelect: false,
			multiSelect: false,
			autoOpen: false,
			autoOpenLimit: 1
		},
	
		/* Accessors: These may be supplied in the options hash to override default behavior
	 
	 getText (item)
	 	Return the text value to display as the branch or item name
	 	item => object wrapped in an Item Adapter
	 
	 getChildren (item)
	 	Return the children of the specified item
	 	May return either an array / collection that is supported by Data Adapters, or a promise the resolves as such
	 	item => object wrapped in an Item Adapter
	 
	 getType (item)
	 	Return the type of the current node - either 'folder' (for branches) or 'item'
	 	item => object wrapped in an Item Adapter
	 
	 getIconClass (item)
	 	Return an (optional) class name that can be used to override the icon
	 	item => object wrapped in an Item Adapter
	 
	 getExpandable (item)
	 	For branches, returns whether or not the branch is expandable (generally, whether it has children)
	 	item => object wrapped in an Item Adapter
	 
	 getKey (item)
	 	Return either an object with key/value pairs to match or a match function
	 	Use this to reduce the number of fields required for searching if a unique key is available
	 	item => object wrapped in an Item Adapter
	 
	 getId (item)
	 	Return a unique value for each node
	 	item => object wrapped in an Item Adapter
	 
	 */
	
		accessors: {
			getText: function getText(item) {
				return item.get('text');
			},
	
			getChildren: function getChildren(item) {
				return item.get('children');
			},
	
			// Proxy this call to the public accessor to ensure that we always receive a promise wrapped in a Data Adapter
			_getChildren: function _getChildren(item) {
				return _Promise.resolve(item.getChildren()).then(Lib.bind(this._getDataAdapter, this));
			},
	
			getType: function getType(item) {
				// FIXME: Set a reasonable default or throw an error for "item-ish" items that don't have a type defined
				return item.get('_itemType');
			},
	
			getIconClass: function getIconClass(item) {
				return item.get('_iconClass');
			},
	
			getExpandable: function getExpandable(item) {
				return item.get('_isExpandable') !== false;
			},
	
			getKey: function getKey(item) {
				return { id: item.get('id') };
			},
	
			getId: function getId(item) {
				return item.get('id');
			}
		},
	
		_canSelect: function _canSelect(newSelection, select) {
			if (newSelection.getType() === 'item' || !!this.getProperty('folderSelect')) {
				select();
			}
		},
	
		// TODO: This beginning code is basically the same as multi-select right now
		getOpenFolders: function getOpenFolders() {
			return this.getProperty('open');
		},
	
		getClosedFolders: function getClosedFolders() {
			return this.getProperty('open');
		},
	
		_getOpenFolders: function _getOpenFolders() {
			return this._getDataAdapter(this.getOpenFolders()).clone();
		},
	
		_getClosedFolders: function _getClosedFolders() {
			return this._getDataAdapter(this.getClosedFolders()).clone();
		},
	
		_isFolderOpen: function _isFolderOpen(folder, open) {
			var _open = open || this._getDataAdapter(this.getOpenFolders());
			return !!_open.findWhere(folder.getKey());
		},
	
		_canOpen: function _canOpen(folder) {
			return folder.getExpandable();
		},
	
		_toggleFolder: function _toggleFolder(folder, options) {
			if (this._canOpen(folder)) {
				var _open2 = this._getOpenFolders();
				var isOpen = this._isFolderOpen(folder, _open2);
				var silent = options && options.silent;
				var eventName = undefined;
	
				if (isOpen) {
					_open2.remove(folder);
					eventName = 'closed';
				} else {
					_open2.add(folder);
					eventName = 'opened';
				}
	
				this.setProperties({ open: _open2._data });
				if (!silent && Lib.isFunction(this._onFolderToggled)) this._onFolderToggled(folder, !isOpen);
	
				this.trigger(eventName, folder._item, _open2._data);
			}
		},
	
		toggleFolder: function toggleFolder(_folder) {
			this._toggleFolder(this._getItemAdapter(_folder));
		},
	
		closeAllFolders: function closeAllFolders() {
			var open = this._getOpenFolders();
	
			open.reset(null);
	
			this.setProperties({ open: open._data });
			if (Lib.isFunction(this._onFoldersClosed)) this._onFoldersClosed();
	
			this.trigger('closed', null, open._data);
		}
	});
	
	exports['default'] = TreeCore;

/***/ },
/* 207 */,
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	var _libLib = __webpack_require__(5);
	
	var _libLib2 = _interopRequireDefault(_libLib);
	
	var _badgeBadge = __webpack_require__(209);
	
	var _badgeBadge2 = _interopRequireDefault(_badgeBadge);
	
	var _buttonButton = __webpack_require__(215);
	
	var _buttonButton2 = _interopRequireDefault(_buttonButton);
	
	var _buttonGroupButtonGroup = __webpack_require__(226);
	
	var _buttonGroupButtonGroup2 = _interopRequireDefault(_buttonGroupButtonGroup);
	
	var _checkboxCheckbox = __webpack_require__(231);
	
	var _checkboxCheckbox2 = _interopRequireDefault(_checkboxCheckbox);
	
	var _comboboxCombobox = __webpack_require__(232);
	
	var _comboboxCombobox2 = _interopRequireDefault(_comboboxCombobox);
	
	var _dataTableDataTable = __webpack_require__(233);
	
	var _dataTableDataTable2 = _interopRequireDefault(_dataTableDataTable);
	
	var _datepickerDatepicker = __webpack_require__(235);
	
	var _datepickerDatepicker2 = _interopRequireDefault(_datepickerDatepicker);
	
	var _dropdownDropdown = __webpack_require__(227);
	
	var _dropdownDropdown2 = _interopRequireDefault(_dropdownDropdown);
	
	var _lookupLookup = __webpack_require__(243);
	
	var _lookupLookup2 = _interopRequireDefault(_lookupLookup);
	
	var _notificationNotification = __webpack_require__(248);
	
	var _notificationNotification2 = _interopRequireDefault(_notificationNotification);
	
	var _picklistPicklist = __webpack_require__(228);
	
	var _picklistPicklist2 = _interopRequireDefault(_picklistPicklist);
	
	var _pillboxPillbox = __webpack_require__(249);
	
	var _pillboxPillbox2 = _interopRequireDefault(_pillboxPillbox);
	
	var _popoverPopover = __webpack_require__(251);
	
	var _popoverPopover2 = _interopRequireDefault(_popoverPopover);
	
	var _radioRadio = __webpack_require__(253);
	
	var _radioRadio2 = _interopRequireDefault(_radioRadio);
	
	var _spinnerSpinner = __webpack_require__(254);
	
	var _spinnerSpinner2 = _interopRequireDefault(_spinnerSpinner);
	
	var _spinnerSpinner3 = _interopRequireDefault(_spinnerSpinner);
	
	var _tooltipTooltip = __webpack_require__(255);
	
	var _tooltipTooltip2 = _interopRequireDefault(_tooltipTooltip);
	
	var _treeTree = __webpack_require__(256);
	
	var _treeTree2 = _interopRequireDefault(_treeTree);
	
	module.exports = {
		Lib: _libLib2['default'],
		Badge: _badgeBadge2['default'],
		Button: _buttonButton2['default'],
		ButtonGroup: _buttonGroupButtonGroup2['default'],
		Checkbox: _checkboxCheckbox2['default'],
		Combobox: _comboboxCombobox2['default'],
		Datatable: _dataTableDataTable2['default'],
		Datepicker: _datepickerDatepicker2['default'],
		Dropdown: _dropdownDropdown2['default'],
		Lookup: _lookupLookup2['default'],
		Notification: _notificationNotification2['default'],
		Picklist: _picklistPicklist2['default'],
		Pillbox: _pillboxPillbox2['default'],
		Popover: _popoverPopover2['default'],
		Radio: _radioRadio2['default'],
		Spinner: _spinnerSpinner2['default'],
		Svg: _spinnerSpinner3['default'],
		Tooltip: _tooltipTooltip2['default'],
		Tree: _treeTree2['default']
	};

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	// BADGE CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _Object$keys = __webpack_require__(139)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreBadge = __webpack_require__(137);
	
	var _coreBadge2 = _interopRequireDefault(_coreBadge);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	var BadgeObject = {
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		propTypes: {
			children: _react2['default'].PropTypes.string.isRequired,
			theme: _react2['default'].PropTypes.oneOf(_Object$keys(_coreBadge2['default'].themes))
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'span',
				{ className: this._getClassNames() },
				this.props.children
			);
		}
	};
	
	exports.BadgeObject = BadgeObject;
	var Badge = Lib.merge({}, _coreBadge2['default'], BadgeObject);
	
	Badge = Lib.runHelpers('react', _coreBadge.CONTROL, Badge);
	Badge = _react2['default'].createClass(Badge);
	
	exports['default'] = Badge;

/***/ },
/* 210 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_210__;

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	// STATE - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var State = {
		getDefaultProps: function getDefaultProps() {
			return Lib.extend({}, this.prototype._defaultProperties);
		},
	
		getInitialState: function getInitialState() {
			return Lib.extend({}, this._defaultState);
		},
	
		setProperties: Lib.noop,
	
		getProperty: function getProperty(key) {
			return this.props[key];
		},
	
		getState: function getState(key) {
			return this.state[key];
		}
	};
	
	exports['default'] = State;
	module.exports = exports['default'];

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	// EVENTS - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var Events = {
		trigger: function trigger(eventName) {
			var name = 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
	
			if (Lib.isFunction(this.props[name])) {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}
	
				this.props[name].apply(this, args);
			}
		}
	};
	
	exports['default'] = Events;
	module.exports = exports['default'];

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// Framework specific
	
	var _reactDom = __webpack_require__(214);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var genericWillMount = {
		componentWillMount: function componentWillMount() {
			this.elements = {};
			if (Lib.isFunction(this._initialize)) this._initialize(this.props);
		},
	
		componentDidMount: function componentDidMount() {
			this.elements.wrapper = Lib.wrapElement(_reactDom2['default'].findDOMNode(this));
		},
	
		// These are handled slightly differently than your average props, so they need to be kept in sync here
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (nextProps.collection) this._collection = this._getDataAdapter(nextProps.collection);
	
			if (nextProps.strings) {
				this.setState({
					strings: Lib.extend({}, this.state.strings, nextProps.strings)
				});
			}
		}
	};
	
	exports['default'] = genericWillMount;
	module.exports = exports['default'];

/***/ },
/* 214 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_214__;

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	// BUTTON CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _objectWithoutProperties = __webpack_require__(216)['default'];
	
	var _extends = __webpack_require__(217)['default'];
	
	var _Object$keys = __webpack_require__(139)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreButton = __webpack_require__(151);
	
	var _coreButton2 = _interopRequireDefault(_coreButton);
	
	var _coreButtonView = __webpack_require__(155);
	
	var _coreButtonView2 = _interopRequireDefault(_coreButtonView);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	var _mixinsCustomPropTypesIconJs = __webpack_require__(222);
	
	var _mixinsCustomPropTypesIconJs2 = _interopRequireDefault(_mixinsCustomPropTypesIconJs);
	
	// Children
	
	var _buttonView = __webpack_require__(224);
	
	var _buttonView2 = _interopRequireDefault(_buttonView);
	
	var ButtonObject = {
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		propTypes: {
			assistiveText: _react2['default'].PropTypes.string,
			icon: _mixinsCustomPropTypesIconJs2['default'],
			iconPosition: _react2['default'].PropTypes.oneOf(_Object$keys(_coreButtonView2['default'].iconPositions)),
			iconSize: _react2['default'].PropTypes.oneOf(_Object$keys(_coreButtonView2['default'].buttonIconSizes)),
			iconStyle: _react2['default'].PropTypes.oneOf(_Object$keys(_coreButton2['default'].iconButtonStyles)),
			selected: _react2['default'].PropTypes.bool,
			selectable: _react2['default'].PropTypes.bool,
			size: _react2['default'].PropTypes.oneOf(_Object$keys(_coreButton2['default'].sizes)),
			text: _react2['default'].PropTypes.string,
			theme: _react2['default'].PropTypes.oneOf(_Object$keys(_coreButton2['default'].themes))
	
			// TODO: Decide if this valid. Picklist needs spans and SVG as children.
			// children: function (props, propName, componentName) {
			// 	const prop = props[propName];
			// 	let error;
	
			// 	React.Children.forEach(prop, child => {
			// 		if (!error && child.type !== ButtonView) {
			// 			error = new Error(
			// 				'`' + componentName + '` ' +
			// 				'should only contain children of the type `ButtonView`.'
			// 			);
			// 		}
			// 	});
	
			// 	if (error) {
			// 		return error;
			// 	}
			// }
		},
	
		_renderViews: function _renderViews() {
			var _this = this;
	
			var views = _react2['default'].Children.map(this.props.children, function (child, index) {
				return _react2['default'].cloneElement(child, { iconPosition: _this.props.iconPosition, key: index });
			}) || [];
	
			var defaultView = views.length > 0 ? 'notSelected' : null;
			views.push(_react2['default'].createElement(_buttonView2['default'], {
				assistiveText: this.props.assistiveText,
				icon: this.props.icon,
				iconSize: this.props.iconSize,
				iconStyle: this.props.iconStyle,
				text: this.props.text,
				view: defaultView,
				iconPosition: this.props.iconPosition,
				key: 'default' }));
			return views;
		},
	
		render: function render() {
			var _props = this.props;
			var assistiveText = _props.assistiveText;
			var className = _props.className;
			var icon = _props.icon;
			var iconPosition = _props.iconPosition;
			var iconSize = _props.iconSize;
			var iconStyle = _props.iconStyle;
			var selected = _props.selected;
			var selectable = _props.selectable;
			var size = _props.size;
			var text = _props.text;
			var theme = _props.theme;
	
			var props = _objectWithoutProperties(_props, ['assistiveText', 'className', 'icon', 'iconPosition', 'iconSize', 'iconStyle', 'selected', 'selectable', 'size', 'text', 'theme']);
	
			var hasChildren = _react2['default'].Children.count(this.props.children);
			// TODO: Does the onClick received by the user need a specific payload or is the event alone enough?
			return _react2['default'].createElement(
				'button',
				_extends({ type: 'button',
					className: this._getClassNames(this.props.className, hasChildren || this.props.selectable)
				}, props),
				this._renderViews()
			);
		}
	};
	
	exports.ButtonObject = ButtonObject;
	var Button = Lib.merge({}, _coreButton2['default'], ButtonObject);
	
	Button = Lib.runHelpers('react', _coreButton.CONTROL, Button);
	Button = _react2['default'].createClass(Button);
	
	exports['default'] = Button;

/***/ },
/* 216 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj, keys) {
	  var target = {};
	
	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }
	
	  return target;
	};
	
	exports.__esModule = true;

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$assign = __webpack_require__(218)["default"];
	
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
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(219), __esModule: true };

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(220);
	module.exports = __webpack_require__(17).Object.assign;

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(15);
	
	$def($def.S + $def.F, 'Object', {assign: __webpack_require__(221)});

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(20)
	  , toObject = __webpack_require__(142)
	  , IObject  = __webpack_require__(36);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(23)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _common = __webpack_require__(223);
	
	/**
	 * Checks whether a prop provides an icon format
	 * *
	 * @param props
	 * @param propName
	 * @param componentName
	 * @returns {Error|undefined}
	 */
	
	function validate(props, propName, componentName) {
	  if (!/^\w+\.\w+$/.test(props[propName]) && props[propName] !== undefined) {
	    return new Error((0, _common.errMsg)(props, propName, componentName, ', expected a format of [icon_set].[icon]'));
	  }
	}
	
	exports['default'] = (0, _common.createChainableTypeChecker)(validate);
	module.exports = exports['default'];

/***/ },
/* 223 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.errMsg = errMsg;
	exports.createChainableTypeChecker = createChainableTypeChecker;
	
	function errMsg(props, propName, componentName, msgContinuation) {
		return 'Invalid prop \'' + propName + '\' of value \'' + props[propName] + '\'' + (' supplied to \'' + componentName + '\'' + msgContinuation);
	}
	
	/**
	 * Create chain-able isRequired validator
	 *
	 * Largely copied directly from:
	 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
	 */
	
	function createChainableTypeChecker(validate) {
		function checkType(isRequired, props, propName, componentName) {
			var componentNameTemp = componentName || '<<anonymous>>';
			if (props[propName] === null) {
				if (isRequired) {
					return new Error('Required prop \'' + propName + '\' was not specified in \'' + componentName + '\'.');
				}
			} else {
				return validate(props, propName, componentNameTemp);
			}
		}
	
		var chainedCheckType = checkType.bind(null, false);
		chainedCheckType.isRequired = checkType.bind(null, true);
	
		return chainedCheckType;
	}

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	// BUTTON VIEW - REACT FACADE
	
	// Core
	'use strict';
	
	var _Object$keys = __webpack_require__(139)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreButtonView = __webpack_require__(155);
	
	var _coreButtonView2 = _interopRequireDefault(_coreButtonView);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _svgSvg = __webpack_require__(225);
	
	var _svgSvg2 = _interopRequireDefault(_svgSvg);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsCustomPropTypesIconJs = __webpack_require__(222);
	
	var _mixinsCustomPropTypesIconJs2 = _interopRequireDefault(_mixinsCustomPropTypesIconJs);
	
	var ButtonViewObject = {
		propTypes: {
			assistiveText: _react2['default'].PropTypes.string,
			icon: _mixinsCustomPropTypesIconJs2['default'],
			iconPosition: _react2['default'].PropTypes.oneOf(_Object$keys(_coreButtonView2['default'].iconPositions)),
			iconSize: _react2['default'].PropTypes.oneOf(_Object$keys(_coreButtonView2['default'].buttonIconSizes)),
			text: _react2['default'].PropTypes.string,
			view: _react2['default'].PropTypes.oneOf(_Object$keys(_coreButtonView2['default'].buttonStatefulViewStyles))
		},
	
		_renderAssistiveText: function _renderAssistiveText() {
			if (this.props.assistiveText) {
				return _react2['default'].createElement(
					'span',
					{ className: this.cssClasses.ASSISTIVE_TEXT },
					this.props.assistiveText
				);
			}
		},
	
		_renderIcon: function _renderIcon(position) {
			var buttonIconSize = '';
	
			if (this.props.iconSize) {
				buttonIconSize = this.buttonIconSizes[this.props.iconSize];
			}
	
			if (this.props.icon && this.props.iconPosition === position) {
				return _react2['default'].createElement(_svgSvg2['default'], { className: this._getIconClassNames(buttonIconSize), icon: this.props.icon });
			}
	
			if (position === 'right' && this.props.iconStyle === 'icon-more') {
				buttonIconSize = this.buttonIconSizes['x-small'];
				return _react2['default'].createElement(_svgSvg2['default'], { className: this._getIconClassNames(buttonIconSize), icon: this.moreIcon });
			}
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'span',
				{ className: this.buttonStatefulViewStyles[this.props.view] },
				this._renderIcon('left'),
				this.props.text,
				this._renderIcon('right'),
				this._renderAssistiveText()
			);
		}
	};
	
	exports.ButtonViewObject = ButtonViewObject;
	var ButtonView = Lib.merge({}, _mixinsState2['default'], _coreButtonView2['default'], ButtonViewObject);
	
	ButtonView = Lib.runHelpers('react', _coreButtonView.CONTROL, ButtonView);
	ButtonView = _react2['default'].createClass(ButtonView);
	
	exports['default'] = ButtonView;

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	// SVG COMPONENT - REACT FACADE
	
	// Core
	'use strict';
	
	var _objectWithoutProperties = __webpack_require__(216)['default'];
	
	var _extends = __webpack_require__(217)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsCustomPropTypesIconJs = __webpack_require__(222);
	
	var _mixinsCustomPropTypesIconJs2 = _interopRequireDefault(_mixinsCustomPropTypesIconJs);
	
	var SvgObject = {
		propTypes: {
			icon: _mixinsCustomPropTypesIconJs2['default']
		},
	
		render: function render() {
			var _props = this.props;
			var icon = _props.icon;
	
			var other = _objectWithoutProperties(_props, ['icon']);
	
			return _react2['default'].createElement(
				'svg',
				_extends({ ariaHidden: 'true' }, other),
				_react2['default'].createElement('use', { xlinkHref: Lib.getSVGPath(this.props.icon) })
			);
		}
	};
	
	exports.SvgObject = SvgObject;
	var Svg = _react2['default'].createClass(SvgObject);
	
	exports['default'] = Svg;

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	// BUTTON GROUP CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	// Children
	
	var _buttonButton = __webpack_require__(215);
	
	var _buttonButton2 = _interopRequireDefault(_buttonButton);
	
	var _dropdownDropdown = __webpack_require__(227);
	
	var _dropdownDropdown2 = _interopRequireDefault(_dropdownDropdown);
	
	var ButtonGroupObject = {
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		propTypes: {
			children: function children(props, propName, componentName) {
				var prop = props[propName];
				var error = undefined;
				_react2['default'].Children.forEach(prop, function (child) {
					if (!error && child.type !== _buttonButton2['default'] && child.type !== _dropdownDropdown2['default']) {
						error = new Error('`' + componentName + '` ' + 'should only contain children of the type `Button` or `Dropdown`.');
					}
				});
	
				if (error) {
					return error;
				}
			}
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'slds-button-group', role: 'group'
				},
				this.props.children
			);
		}
	};
	
	exports.ButtonGroupObject = ButtonGroupObject;
	var CONTROL = 'slds-button-group';
	
	var ButtonGroup = Lib.merge({}, ButtonGroupObject);
	
	ButtonGroup = Lib.runHelpers('react', CONTROL, ButtonGroup);
	ButtonGroup = _react2['default'].createClass(ButtonGroup);
	
	exports['default'] = ButtonGroup;

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	// DROPDOWN CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreDropdown = __webpack_require__(184);
	
	var _coreDropdown2 = _interopRequireDefault(_coreDropdown);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _picklistPicklist = __webpack_require__(228);
	
	var _mixinsCustomPropTypesIconJs = __webpack_require__(222);
	
	var _mixinsCustomPropTypesIconJs2 = _interopRequireDefault(_mixinsCustomPropTypesIconJs);
	
	// Children
	
	var _picklistPicklistItems = __webpack_require__(229);
	
	var _picklistPicklistItems2 = _interopRequireDefault(_picklistPicklistItems);
	
	var _buttonButton = __webpack_require__(215);
	
	var _buttonButton2 = _interopRequireDefault(_buttonButton);
	
	var DropdownObject = Lib.merge(_picklistPicklist.PicklistObject, {
		propTypes: {
			// TODO: Type of collection unknown until parsed by Data Adapter
			collection: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object]).isRequired,
			disabled: _react2['default'].PropTypes.bool,
			icon: _mixinsCustomPropTypesIconJs2['default'],
			renderArrow: _react2['default'].PropTypes.bool,
			selection: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.object]),
			swapIcon: _react2['default'].PropTypes.bool
		},
	
		_getIcon: function _getIcon() {
			var icon = undefined;
	
			if (this.props.swapIcon && this.props.selection) {
				icon = this.props.selection.icon;
			}
	
			return icon || this.props.icon;
		},
	
		_getStyle: function _getStyle() {
			return this.props.renderArrow ? 'icon-more' : 'icon-container';
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'slds-dropdown-trigger', onKeyDown: this._handleKeyPressed, onKeyPress: this._handleKeyPressed },
				_react2['default'].createElement(_buttonButton2['default'], { icon: this._getIcon(), iconStyle: this._getStyle(), disabled: this.props.disabled }),
				_react2['default'].createElement(_picklistPicklistItems2['default'], { collection: this._collection, selection: this.getSelection(), show: !this.props.disabled, onSelected: this._handleMenuItemSelected, ref: this._setMenuRef })
			);
		}
	});
	
	exports.DropdownObject = DropdownObject;
	var Dropdown = Lib.merge({}, _coreDropdown2['default'], DropdownObject);
	
	Dropdown = Lib.runHelpers('react', _coreDropdown.CONTROL, Dropdown);
	Dropdown = _react2['default'].createClass(Dropdown);
	
	exports['default'] = Dropdown;

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	// PICKLIST CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _corePicklist = __webpack_require__(171);
	
	var _corePicklist2 = _interopRequireDefault(_corePicklist);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(214);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	var _svgSvg = __webpack_require__(225);
	
	var _svgSvg2 = _interopRequireDefault(_svgSvg);
	
	var _buttonButton = __webpack_require__(215);
	
	var _buttonButton2 = _interopRequireDefault(_buttonButton);
	
	// Children
	
	var _picklistItems = __webpack_require__(229);
	
	var _picklistItems2 = _interopRequireDefault(_picklistItems);
	
	var PicklistObject = {
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		propTypes: {
			disabled: _react2['default'].PropTypes.bool,
			selection: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object]),
			// TODO: Type of collection unknown until parsed by Data Adapter
			collection: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object]).isRequired
		},
	
		render: function render() {
			var item = this._getSelection();
			var selectionName = item.getText() || this.state.strings.NONE_SELECTED;
			var styles = {
				width: this.state.width
			};
	
			return _react2['default'].createElement(
				'div',
				{ 'aria-haspopup': 'true', 'aria-expanded': this.state.isOpen, className: 'slds-picklist', onKeyDown: this._handleKeyPressed, onKeyPress: this._handleKeyPressed },
				_react2['default'].createElement(
					_buttonButton2['default'],
					{
						className: 'slds-picklist__label',
						disabled: this.props.disabled,
						onClick: this._handleClicked,
						style: styles,
						theme: 'neutral' },
					_react2['default'].createElement(
						'span',
						{ className: 'slds-truncate' },
						selectionName
					),
					_react2['default'].createElement(_svgSvg2['default'], { className: 'slds-icon', icon: 'utility.down' })
				),
				_react2['default'].createElement(_picklistItems2['default'], { collection: this._collection, selection: this.getSelection(), show: this.state.isOpen, onSelected: this._handleMenuItemSelected, ref: this._setMenuRef }),
				_react2['default'].createElement('input', { className: 'slds-hide', readOnly: true, 'aria-hidden': 'true', type: 'text' })
			);
		},
	
		componentDidUpdate: function componentDidUpdate() {
			this._setMenuItemsRef();
		},
	
		_setMenuRef: function _setMenuRef(menu) {
			this.elements.dropdownMenu = Lib.wrapElement(_reactDom2['default'].findDOMNode(menu));
		},
	
		_setMenuItemsRef: function _setMenuItemsRef() {
			var menuItems = this.elements.dropdownMenu[0].getElementsByTagName('li');
			this.elements.menuItems = [];
	
			for (var i = 0; i < menuItems.length; i++) {
				var menuItem = menuItems[i].getElementsByTagName('a');
	
				if (!menuItems[i].disabled && menuItem.length === 1) {
					this.elements.menuItems.push(menuItem[0]);
				}
			}
		},
	
		_handleMenuItemSelected: function _handleMenuItemSelected(selection) {
			this.setSelection(selection);
			this.close();
		},
	
		_handleClicked: function _handleClicked(e) {
			this._openToggleEvent(e.nativeEvent);
		},
	
		_handleKeyPressed: function _handleKeyPressed(e) {
			if (e.key && (/(ArrowUp|ArrowDown|Escape)/.test(e.key) || e.key.length === 1)) {
				e.preventDefault();
				this._keyboardNav(e.key, this.elements.menuItems);
			}
		}
	};
	
	exports.PicklistObject = PicklistObject;
	var Picklist = Lib.merge({}, _corePicklist2['default'], PicklistObject);
	
	Picklist = Lib.runHelpers('react', _corePicklist.CONTROL, Picklist);
	Picklist = _react2['default'].createClass(Picklist);
	
	exports['default'] = Picklist;

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	// PICKLIST ITEMS - REACT FACADE
	
	// Framework specific
	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	// Children
	
	var _picklistItem = __webpack_require__(230);
	
	var _picklistItem2 = _interopRequireDefault(_picklistItem);
	
	var PicklistItems = _react2['default'].createClass({
		displayName: 'PicklistItems',
	
		propTypes: {
			// TODO: Type of collection unknown until parsed by Data Adapter
			collection: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object]).isRequired,
			onSelected: _react2['default'].PropTypes.func.isRequired,
			selection: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object]),
			show: _react2['default'].PropTypes.bool.isRequired
		},
	
		cssClasses: {
			DROPDOWN: 'slds-dropdown',
			LEFT: 'slds-dropdown--left',
			MENU: 'slds-dropdown--menu',
			LIST: 'slds-dropdown__list'
		},
	
		_menuItems: function _menuItems() {
			var _this = this;
	
			return this.props.collection.map(function (item, index) {
				return _react2['default'].createElement(_picklistItem2['default'], { key: index, selected: item._item === _this.props.selection, item: item, onSelected: _this.props.onSelected });
			});
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: (0, _classnames2['default'])(this.cssClasses.DROPDOWN, this.cssClasses.LEFT, this.cssClasses.MENU, { 'slds-hide': !this.props.show }) },
				_react2['default'].createElement(
					'ul',
					{ className: this.cssClasses.LIST, role: 'menu', ref: this.cssClasses.LIST },
					this._menuItems()
				)
			);
		}
	});
	
	exports['default'] = PicklistItems;
	module.exports = exports['default'];

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	// PICKLIST ITEM - REACT FACADE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _svgSvg = __webpack_require__(225);
	
	var _svgSvg2 = _interopRequireDefault(_svgSvg);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var PicklistItem = _react2['default'].createClass({
		displayName: 'PicklistItem',
	
		cssClasses: {
			HEADER: 'slds-dropdown__header',
			HEADERTEXT: 'slds-text-heading--label',
			DIVIDER: 'slds-has-divider'
		},
	
		propTypes: {
			// TODO: explore if item PropTypes can be done better
			item: _react2['default'].PropTypes.shape({
				getType: _react2['default'].PropTypes.func.isRequired,
				getDisabled: _react2['default'].PropTypes.func.isRequired,
				// getId: React.PropTypes.func.isRequired,
				getText: _react2['default'].PropTypes.func.isRequired,
				// getValue: React.PropTypes.func.isRequired,
				getIcon: _react2['default'].PropTypes.func.isRequired
			}).isRequired,
			onSelected: _react2['default'].PropTypes.func.isRequired,
			selected: _react2['default'].PropTypes.bool
		},
	
		_renderCheckmark: function _renderCheckmark() {
			if (this.props.selected) {
				return _react2['default'].createElement(_svgSvg2['default'], { className: 'slds-icon slds-icon--small slds-icon--left', icon: 'standard.task2' });
			}
		},
	
		_renderIcon: function _renderIcon() {
			var icon = this.props.item.getIcon();
	
			if (Lib.isString(icon)) {
				return _react2['default'].createElement(_svgSvg2['default'], { className: 'slds-icon slds-icon--small slds-icon--right', icon: icon });
			}
		},
	
		render: function render() {
			var html = undefined;
	
			switch (this.props.item.getType()) {
				case 'header':
					html = _react2['default'].createElement(
						'li',
						{ className: this.cssClasses.HEADER },
						_react2['default'].createElement(
							'span',
							{ className: this.cssClasses.HEADERTEXT },
							this.props.item.getText()
						)
					);
					break;
				case 'divider':
					html = _react2['default'].createElement('li', { className: this.cssClasses.DIVIDER });
					break;
				default:
					var disabled = this.props.item.getDisabled();
	
					html = _react2['default'].createElement(
						'li',
						{ className: (0, _classnames2['default'])('slds-dropdown__item', 'slds-has-icon--left', { 'slds-is-selected': this.props.selected }), disabled: disabled },
						_react2['default'].createElement(
							'a',
							{ href: '#', className: 'slds-truncate', onClick: this.handleClicked, 'aria-disabled': disabled },
							this._renderCheckmark(),
							this.props.item.getText(),
							this._renderIcon()
						)
					);
			}
	
			return html;
		},
	
		handleClicked: function handleClicked(e) {
			e.preventDefault();
			this.props.onSelected(this.props.item);
		}
	});
	
	exports['default'] = PicklistItem;
	module.exports = exports['default'];

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	// CHECKBOX CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreCheckbox = __webpack_require__(157);
	
	var _coreCheckbox2 = _interopRequireDefault(_coreCheckbox);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var CheckboxObject = {
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		propTypes: {
			checked: _react2['default'].PropTypes.bool,
			disabled: _react2['default'].PropTypes.bool,
			labelText: _react2['default'].PropTypes.string,
			name: _react2['default'].PropTypes.string.isRequired,
			onChanged: _react2['default'].PropTypes.func,
			onDisabled: _react2['default'].PropTypes.func,
			onEnabled: _react2['default'].PropTypes.func,
			value: _react2['default'].PropTypes.string
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'label',
				{ className: (0, _classnames2['default'])(this.cssClasses.CONTROL) },
				this._renderInput(),
				_react2['default'].createElement('span', { className: (0, _classnames2['default'])(this.cssClasses.FAUX) }),
				this._renderLabelText()
			);
		},
	
		_renderInput: function _renderInput() {
			return _react2['default'].createElement('input', { name: this.props.name,
				type: 'checkbox',
				disabled: this.props.disabled,
				checked: this.props.checked,
				value: this.props.value || '',
				onChange: this.toggle });
		},
	
		_renderLabelText: function _renderLabelText() {
			if (this.props.labelText) {
				return _react2['default'].createElement(
					'span',
					{ className: (0, _classnames2['default'])(this.cssClasses.LABEL) },
					this.props.labelText
				);
			}
		}
	};
	
	exports.CheckboxObject = CheckboxObject;
	var Checkbox = Lib.merge({}, _coreCheckbox2['default'], CheckboxObject);
	
	Checkbox = Lib.runHelpers('react', _coreCheckbox.CONTROL, Checkbox);
	Checkbox = _react2['default'].createClass(Checkbox);
	
	exports['default'] = Checkbox;

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	// COMBOBOX CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreCombobox = __webpack_require__(170);
	
	var _coreCombobox2 = _interopRequireDefault(_coreCombobox);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(214);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _picklistPicklist = __webpack_require__(228);
	
	// Children
	
	var _picklistPicklistItems = __webpack_require__(229);
	
	var _picklistPicklistItems2 = _interopRequireDefault(_picklistPicklistItems);
	
	var _svgSvg = __webpack_require__(225);
	
	var _svgSvg2 = _interopRequireDefault(_svgSvg);
	
	var ComboboxObject = Lib.merge(_picklistPicklist.PicklistObject, {
		propTypes: {
			collection: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object]).isRequired,
			disabled: _react2['default'].PropTypes.bool,
			onChanged: _react2['default'].PropTypes.func,
			selection: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.object])
		},
	
		render: function render() {
			var item = this._getSelection();
			var selectionName = item.getText();
	
			/* TODO: Icon is currently absolute positioned due to picklist wrapper picklist, but needs centering.
	  			Also, does not use Button component, because Button only supports ButtonViews as children right now. */
			return _react2['default'].createElement(
				'div',
				{ 'aria-haspopup': 'true', 'aria-expanded': this.state.isOpen, className: 'slds-combobox slds-picklist', onKeyDown: this._handleKeyPressed, onKeyPress: this._handleKeyPressed },
				_react2['default'].createElement(
					'button',
					{ className: 'slds-button slds-button--neutral slds-picklist__label', 'aria-haspopup': 'true', style: { paddingLeft: 0 }, disabled: this.props.disabled, 'aria-expanded': this.state.isOpen, onClick: this._handleClicked },
					_react2['default'].createElement(
						'div',
						{ className: 'slds-form-element__control' },
						_react2['default'].createElement('input', { name: this.props.name, type: 'text', value: selectionName, disabled: this.props.disabled, onChange: this._handleChanged, className: 'slds-input', ref: this._setInputRef })
					),
					_react2['default'].createElement(_svgSvg2['default'], { className: 'slds-icon', style: { right: '.6rem' }, icon: 'utility.down' })
				),
				_react2['default'].createElement(_picklistPicklistItems2['default'], { collection: this._collection, selection: this.getSelection(), show: this.state.isOpen, onSelected: this._handleMenuItemSelected, ref: this._setMenuRef })
			);
		},
	
		_setInputRef: function _setInputRef(input) {
			this.elements.input = Lib.wrapElement(_reactDom2['default'].findDOMNode(input));
		},
	
		_handleChanged: function _handleChanged(e) {
			var value = {};
	
			value[this.accessors.textProp()] = e.target.value;
	
			this.setSelection(value);
		},
	
		_handleKeyPressed: function _handleKeyPressed(e) {
			if (e.key && /(ArrowUp|ArrowDown|Escape)/.test(e.key)) {
				e.preventDefault();
				if (!this._keyboardNav(e.key, this.elements.menuItems)) {
					this.elements.input[0].focus();
				}
			} else if (e.key.length === 1) {
				if (!this.state.isOpen) this.open();
				this.elements.input[0].focus();
			}
		}
	});
	
	exports.ComboboxObject = ComboboxObject;
	var Combobox = Lib.merge({}, _coreCombobox2['default'], ComboboxObject);
	
	Combobox = Lib.runHelpers('react', _coreCombobox.CONTROL, Combobox);
	Combobox = _react2['default'].createClass(Combobox);
	
	exports['default'] = Combobox;

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	// DATATABLR CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreDataTable = __webpack_require__(180);
	
	var _coreDataTable2 = _interopRequireDefault(_coreDataTable);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	// Children
	
	var _dataTableItem = __webpack_require__(234);
	
	var _dataTableItem2 = _interopRequireDefault(_dataTableItem);
	
	var DataTableObject = {
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		propTypes: {
			bordered: _react2['default'].PropTypes.bool,
			collection: _react2['default'].PropTypes.array.isRequired,
			columns: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
				propertyName: _react2['default'].PropTypes.string,
				displayName: _react2['default'].PropTypes.string,
				sortable: _react2['default'].PropTypes.bool,
				hintParent: _react2['default'].PropTypes.bool
			})).isRequired,
			// TODO: Needs to be more specific, once selection feature is fleshed out.
			selection: _react2['default'].PropTypes.any,
			sortable: _react2['default'].PropTypes.bool,
			stacked: _react2['default'].PropTypes.bool,
			stackedHorizontal: _react2['default'].PropTypes.bool,
			striped: _react2['default'].PropTypes.bool
		},
	
		_tableHeaders: function _tableHeaders() {
			var _this = this;
	
			return this.props.columns.map(function (column, index) {
				return _react2['default'].createElement(
					'th',
					{ scope: 'col', key: index, className: _this._getClassNames({
							sortable: column.sortable,
							hintParent: column.hintParent
						}) },
					_react2['default'].createElement(
						'span',
						{ className: 'slds-truncate', 'data-prop': column.propertyName },
						column.displayName
					)
				);
			});
		},
	
		_tableItems: function _tableItems() {
			var _this2 = this;
	
			return this._collection.map(function (item, index) {
				var isSelected = _this2._isItemSelected(item);
	
				return _react2['default'].createElement(_dataTableItem2['default'], {
					key: index,
					hintParent: true,
					bordered: true,
					headers: _this2.props.columns,
					item: item,
					onSelected: _this2._selectItem,
					selected: isSelected
				});
			});
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'table',
				{ className: this._getClassNames({
						bordered: this.props.bordered,
						stacked: this.props.stacked,
						stackedHorizontal: this.props.stackedHorizontal,
						striped: this.props.striped
					}) },
				_react2['default'].createElement(
					'thead',
					null,
					_react2['default'].createElement(
						'tr',
						{ className: 'slds-text-heading--label' },
						this._tableHeaders()
					)
				),
				_react2['default'].createElement(
					'tbody',
					null,
					this._tableItems()
				)
			);
		}
	};
	
	exports.DataTableObject = DataTableObject;
	var DataTable = Lib.merge({}, _coreDataTable2['default'], DataTableObject);
	DataTable = Lib.runHelpers('react', _coreDataTable.CONTROL, DataTable);
	DataTable = _react2['default'].createClass(DataTable);
	
	exports['default'] = DataTable;

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	// DATATABLE ITEM - REACT FACADE
	
	// Framework specific
	"use strict";
	
	var _interopRequireDefault = __webpack_require__(2)["default"];
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var DataTableItem = _react2["default"].createClass({
		displayName: "DataTableItem",
	
		// TODO: Break TD cell out into it's own child component, so that the shape of the headers object can be tested
		propTypes: {
			bordered: _react2["default"].PropTypes.bool,
			item: _react2["default"].PropTypes.object.isRequired,
			headers: _react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.shape({
				propertyName: _react2["default"].PropTypes.string,
				displayName: _react2["default"].PropTypes.string,
				sortable: _react2["default"].PropTypes.bool,
				hintParent: _react2["default"].PropTypes.bool
			})).isRequired,
			onSelected: _react2["default"].PropTypes.func.isRequired,
			selected: _react2["default"].PropTypes.bool.isRequired
		},
	
		render: function render() {
			var _this = this;
	
			return (// TODO: feature.selection
				_react2["default"].createElement(
					"tr",
					{ className: ".slds-hint-parent" },
					this.props.headers.map(function (header, index) {
						return _react2["default"].createElement(
							"td",
							{ key: index, "data-label": header.propertyName },
							_react2["default"].createElement(
								"span",
								{ className: "slds-truncate" },
								_this.props.item.get(header.propertyName)
							)
						);
					})
				)
			);
		},
	
		handleClicked: function handleClicked(e) {
			// TODO: feature.selection
			e.preventDefault();
			// this.props.onSelected(this.props.item);
		}
	});
	
	exports["default"] = DataTableItem;
	module.exports = exports["default"];

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	// DATEPICKER CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreDatepicker = __webpack_require__(236);
	
	var _coreDatepicker2 = _interopRequireDefault(_coreDatepicker);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	// Children
	
	var _datepickerMonth = __webpack_require__(237);
	
	var _datepickerMonth2 = _interopRequireDefault(_datepickerMonth);
	
	var _datepickerYear = __webpack_require__(238);
	
	var _datepickerYear2 = _interopRequireDefault(_datepickerYear);
	
	var _datepickerCalendar = __webpack_require__(239);
	
	var _datepickerCalendar2 = _interopRequireDefault(_datepickerCalendar);
	
	var _datepickerInput = __webpack_require__(242);
	
	var _datepickerInput2 = _interopRequireDefault(_datepickerInput);
	
	var DatepickerObject = Lib.merge({}, _coreDatepicker2['default'], {
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		propTypes: {
			dateRange: _react2['default'].PropTypes.array,
			selection: _react2['default'].PropTypes.any
		},
	
		getInitialState: function getInitialState() {
			return {
				isOpen: false
			};
		},
	
		render: function render() {
			var calendarData = this._getCalendarData();
			var selectedDates = this.getProperty('selection');
			var selDateFormatted = selectedDates.length ? this._formatDate(selectedDates[0]) : '';
	
			if (this.refs.popover) {
				this._setElements();
			}
	
			return _react2['default'].createElement(
				'div',
				{ className: 'slds-form--stacked slds-float--left slds-datepicker-form', ref: 'container' },
				_react2['default'].createElement(_datepickerInput2['default'], { triggerCalendar: this._triggerCalendar, selectedDate: selDateFormatted }),
				_react2['default'].createElement(
					'div',
					{ className: (0, _classnames2['default'])('slds-dropdown slds-dropdown--left slds-datepicker', { 'slds-hidden': !this.state.isOpen }), ref: 'popover', 'data-selection': 'single' },
					_react2['default'].createElement(
						'div',
						{ className: 'slds-datepicker__filter slds-grid' },
						_react2['default'].createElement(_datepickerMonth2['default'], { monthName: this._getMonthName(), setViewingDate: this._setViewingDate, dateViewing: this.state.dateViewing }),
						_react2['default'].createElement(_datepickerYear2['default'], { getYearRange: this._getYearRangeData, setViewingDate: this._setViewingDate, dateViewing: this.state.dateViewing })
					),
					_react2['default'].createElement(_datepickerCalendar2['default'], { calendarData: calendarData, selectDate: this._selectDate, multiSelect: this.props.multiSelect })
				)
			);
		},
	
		_setElements: function _setElements() {
			this.elements.popover = Lib.wrapElement(this.refs.popover);
			this.elements.container = Lib.wrapElement(this.refs.container);
			this.elements.align = Lib.wrapElement(this.refs.container);
		},
	
		componentDidUpdate: function componentDidUpdate() {
			this._updatePosition();
		},
	
		_triggerCalendar: function _triggerCalendar() {
			this.setState({
				isOpen: !this.state.isOpen
			});
		},
	
		_selectDate: function _selectDate(date) {
			var isRangeSelect = this.getProperty('multiSelect');
			var selectedItems = this.getProperty('selection');
			var insertIndex = 1;
	
			if (isRangeSelect) {
				if (selectedItems.length === 1 && selectedItems[0].date.getTime() > date.date.getTime()) {
					insertIndex = 0;
				}
	
				this._selectItem(this._getItemAdapter({ date: date.date }), insertIndex);
			} else {
				this._selectItem(this._getItemAdapter({ date: date.date }));
			}
		},
	
		_setViewingDate: function _setViewingDate(date) {
			this.setState({
				dateViewing: date
			});
		}
	});
	
	exports.DatepickerObject = DatepickerObject;
	var Datepicker = Lib.merge({}, _coreDatepicker2['default'], DatepickerObject);
	
	Datepicker = Lib.runHelpers('react', _coreDatepicker.CONTROL, Datepicker);
	Datepicker = _react2['default'].createClass(Datepicker);
	
	exports['default'] = Datepicker;

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	// DATEPICKER CORE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	// Traits
	
	var _traitsDisableable = __webpack_require__(152);
	
	var _traitsDisableable2 = _interopRequireDefault(_traitsDisableable);
	
	var _traitsMultiselectable = __webpack_require__(181);
	
	var _traitsMultiselectable2 = _interopRequireDefault(_traitsMultiselectable);
	
	var _traitsPositionable = __webpack_require__(195);
	
	var _traitsPositionable2 = _interopRequireDefault(_traitsPositionable);
	
	var CONTROL = 'datepicker';
	
	exports.CONTROL = CONTROL;
	var DatepickerCore = Lib.merge({}, _base2['default'], _traitsDisableable2['default'], _traitsMultiselectable2['default'], _traitsPositionable2['default'], {
		// CSS classes used within this control
		cssClasses: {
			CONTROL: CONTROL,
			WRAPPER: 'slds-datepicker-form'
		},
	
		_defaultProperties: {
			multiSelect: false,
			dateRange: [new Date('1991'), new Date('2030')],
			targetDistance: 4, // Used by positionable
			targetLateralAlign: 'left',
			position: 'bottom'
		},
	
		_defaultState: {
			selectedDate: null,
			dateViewing: new Date()
		},
	
		_monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	
		accessors: {
			getDate: function getDate(item) {
				return item.get('date');
			}
		},
	
		_getCalendarData: function _getCalendarData(baseDate) {
			var date = this.getState('dateViewing') || baseDate;
			var selectedDates = this.getSelectedItems();
			var isRangeSelect = this.getProperty('multiSelect');
			var dateConstraints = this.getProperty('dateRange');
			var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // Index of first day base 0 sunday
			var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // Date of the last day
			var lastMonthDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); // Last date for previous month
			var month = date.getMonth(); // Month of the date selected
			var year = date.getFullYear(); // Year of the date selected
			var now = new Date(); // Today Date
			var nowDate = now.getDate(); // Today Day
			var nowMonth = now.getMonth(); // Today Month
			var nowYear = now.getFullYear(); // Today Year
			var MonthData = [];
			var selectedDate = [];
			var curDate = undefined;
			var rows = undefined;
			var dateCurrentLoop = undefined;
			var wk = undefined;
			var dy = undefined;
	
			if (isRangeSelect && selectedDates.length > 1) {
				selectedDate.push(selectedDates[0].date);
				selectedDate.push(selectedDates[1].date);
			} else {
				if (selectedDates[0]) {
					selectedDate.push(selectedDates[0].date);
				}
			}
	
			if (firstDay !== 0) {
				curDate = lastMonthDate - firstDay + 1;
			} else {
				curDate = 1;
			}
	
			rows = lastDate <= 35 - firstDay ? 5 : 6;
	
			for (wk = 0; wk < rows; wk++) {
				MonthData.push([]);
				for (dy = 0; dy < 7; dy++) {
					MonthData[wk].push({
						day: curDate,
						month: month,
						year: year,
						date: new Date(month + 1 + '-' + curDate + '-' + year)
					});
	
					if (wk === 0) {
						if (curDate === lastMonthDate) {
							curDate = 0;
							MonthData[wk][dy].month = month - 1;
							MonthData[wk][dy].outside = true;
						} else if (curDate > 7) {
							MonthData[wk][dy].month = month - 1;
							MonthData[wk][dy].outside = true;
						}
					} else if (wk >= 4) {
						if (curDate === lastDate) {
							curDate = 0;
						} else if (curDate < 7) {
							MonthData[wk][dy].month = month + 1;
							MonthData[wk][dy].outside = true;
						}
					}
	
					if (MonthData[wk][dy].date.getTime() < dateConstraints[0].getTime() || MonthData[wk][dy].date.getTime() > dateConstraints[1].getTime()) {
						MonthData[wk][dy].outside = true;
					}
	
					if (selectedDate.length && !MonthData[wk][dy].outside) {
						dateCurrentLoop = MonthData[wk][dy].date.getTime();
	
						if (selectedDate.length === 1 && dateCurrentLoop === selectedDate[0].getTime()) {
							MonthData[wk][dy].selected = true;
						} else if (selectedDate.length === 2 && dateCurrentLoop >= selectedDate[0].getTime() && dateCurrentLoop <= selectedDate[1].getTime()) {
							MonthData[wk][dy].selected = true;
						}
					}
	
					MonthData[wk][dy].today = year === nowYear && MonthData[wk][dy].month === nowMonth && curDate === nowDate;
	
					curDate++;
				}
			}
	
			return MonthData;
		},
	
		_getMonthName: function _getMonthName(baseDate) {
			var date = this.getState('dateViewing') || baseDate;
			var month = date.getMonth();
	
			return this._monthNames[month];
		},
	
		_getYear: function _getYear(baseDate) {
			var date = this.getState('dateViewing') || baseDate;
	
			return date.getFullYear();
		},
	
		_getYearRangeData: function _getYearRangeData() {
			var dateRange = this.getProperty('dateRange');
			var viewingYear = this._getYear();
			var allDates = [];
			var selDate = undefined;
			var curDate = undefined;
	
			for (curDate = dateRange[0].getFullYear(); curDate <= dateRange[1].getFullYear(); curDate++) {
				allDates.push({ text: curDate, value: curDate });
	
				if (viewingYear === curDate) {
					selDate = { text: curDate, value: curDate };
				}
			}
	
			return {
				selected: selDate,
				all: allDates
			};
		},
	
		_formatDate: function _formatDate() {
			var selectedDates = this.getSelectedItems();
			var formattedDate = undefined;
	
			if (selectedDates.length) {
				if (selectedDates.length > 1) {
					formattedDate = selectedDates[0].date.getMonth() + 1 + '/' + selectedDates[0].date.getDate() + '/' + selectedDates[0].date.getFullYear();
					formattedDate += ' - ' + (selectedDates[1].date.getMonth() + 1) + '/' + selectedDates[1].date.getDate() + '/' + selectedDates[1].date.getFullYear();
				} else {
					formattedDate = selectedDates[0].date.getMonth() + 1 + '/' + selectedDates[0].date.getDate() + '/' + selectedDates[0].date.getFullYear();
				}
			}
	
			return formattedDate;
		}
	
	});
	
	exports['default'] = DatepickerCore;

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	// DATEPICKER MONTH - REACT FACADE
	
	// Framework specific
	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _buttonButton = __webpack_require__(215);
	
	var _buttonButton2 = _interopRequireDefault(_buttonButton);
	
	var DateMonth = _react2['default'].createClass({
		displayName: 'DateMonth',
	
		propTypes: {
			monthName: _react2['default'].PropTypes.string,
			setViewingDate: _react2['default'].PropTypes.func,
			dateViewing: _react2['default'].PropTypes.instanceOf(Date)
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4' },
				_react2['default'].createElement(
					'div',
					{ className: 'slds-align-middle' },
					_react2['default'].createElement(_buttonButton2['default'], { icon: 'utility.left', assistiveText: 'Previous Month', iconStyle: 'icon-container', onClick: this.backMonth })
				),
				_react2['default'].createElement(
					'h2',
					{ id: 'month', className: 'slds-align-middle', 'aria-live': 'assertive', 'aria-atomic': 'true' },
					this.props.monthName
				),
				_react2['default'].createElement(
					'div',
					{ className: 'slds-align-middle' },
					_react2['default'].createElement(_buttonButton2['default'], { icon: 'utility.right', assistiveText: 'Next Month', iconStyle: 'icon-container', onClick: this.forwardMonth })
				)
			);
		},
	
		backMonth: function backMonth() {
			var curMonth = this.props.dateViewing;
	
			this.props.setViewingDate(new Date(curMonth.setMonth(curMonth.getMonth() - 1)));
		},
	
		forwardMonth: function forwardMonth() {
			var curMonth = this.props.dateViewing;
	
			this.props.setViewingDate(new Date(curMonth.setMonth(curMonth.getMonth() + 1)));
		}
	});
	
	exports['default'] = DateMonth;
	module.exports = exports['default'];

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	// DATEPICKER YEAR - REACT FACADE
	
	// Framework specific
	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	// Children
	
	var _picklistPicklist = __webpack_require__(228);
	
	var _picklistPicklist2 = _interopRequireDefault(_picklistPicklist);
	
	var DateMonth = _react2['default'].createClass({
		displayName: 'DateMonth',
	
		propTypes: {
			getYearRange: _react2['default'].PropTypes.func,
			setViewingDate: _react2['default'].PropTypes.func,
			dateViewing: _react2['default'].PropTypes.instanceOf(Date)
		},
	
		render: function render() {
			var picklistRange = this.props.getYearRange();
	
			return _react2['default'].createElement(_picklistPicklist2['default'], { collection: picklistRange.all, selection: picklistRange.selected, onChanged: this._handleModelChange });
		},
	
		_handleModelChange: function _handleModelChange(info) {
			var curViewDate = this.props.dateViewing;
	
			this.props.setViewingDate(new Date(curViewDate.setYear(info.value)));
		}
	});
	
	exports['default'] = DateMonth;
	module.exports = exports['default'];

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	// DATEPICKER CALENDAR - REACT FACADE
	
	// Framework specific
	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _datepickerWeek = __webpack_require__(240);
	
	var _datepickerWeek2 = _interopRequireDefault(_datepickerWeek);
	
	var Calendar = _react2['default'].createClass({
		displayName: 'Calendar',
	
		propTypes: {
			calendarData: _react2['default'].PropTypes.array,
			selectDate: _react2['default'].PropTypes.func
		},
	
		render: function render() {
			var self = this;
	
			return _react2['default'].createElement(
				'table',
				{ className: 'datepicker__month', role: 'grid', 'aria-labelledby': 'month' },
				_react2['default'].createElement(
					'thead',
					null,
					_react2['default'].createElement(
						'tr',
						{ id: 'weekdays' },
						_react2['default'].createElement(
							'th',
							{ id: 'Sunday' },
							_react2['default'].createElement(
								'abbr',
								{ title: 'Sunday' },
								'S'
							)
						),
						_react2['default'].createElement(
							'th',
							{ id: 'Monday' },
							_react2['default'].createElement(
								'abbr',
								{ title: 'Monday' },
								'M'
							)
						),
						_react2['default'].createElement(
							'th',
							{ id: 'Tuesday' },
							_react2['default'].createElement(
								'abbr',
								{ title: 'Tuesday' },
								'T'
							)
						),
						_react2['default'].createElement(
							'th',
							{ id: 'Wednesday' },
							_react2['default'].createElement(
								'abbr',
								{ title: 'Wednesday' },
								'W'
							)
						),
						_react2['default'].createElement(
							'th',
							{ id: 'Thursday' },
							_react2['default'].createElement(
								'abbr',
								{ title: 'Thursday' },
								'T'
							)
						),
						_react2['default'].createElement(
							'th',
							{ id: 'Friday' },
							_react2['default'].createElement(
								'abbr',
								{ title: 'Friday' },
								'F'
							)
						),
						_react2['default'].createElement(
							'th',
							{ id: 'Saturday' },
							_react2['default'].createElement(
								'abbr',
								{ title: 'Saturday' },
								'S'
							)
						)
					)
				),
				_react2['default'].createElement(
					'tbody',
					null,
					this.props.calendarData.map(function (week, i) {
						return _react2['default'].createElement(_datepickerWeek2['default'], { key: i, week: week, onSelectDay: self._handleDateClicked, multiSelect: self.props.multiSelect });
					})
				)
			);
		},
	
		_handleDateClicked: function _handleDateClicked(day) {
			this.props.selectDate(day);
		}
	});
	
	exports['default'] = Calendar;
	module.exports = exports['default'];

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	// DATEPICKER CALENDAR - REACT FACADE
	
	// Framework specific
	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _datepickerDay = __webpack_require__(241);
	
	var _datepickerDay2 = _interopRequireDefault(_datepickerDay);
	
	var DateInput = _react2['default'].createClass({
		displayName: 'DateInput',
	
		propTypes: {
			week: _react2['default'].PropTypes.array
		},
	
		render: function render() {
			var self = this;
	
			return _react2['default'].createElement(
				'tr',
				null,
				this.props.week.map(function (day, i) {
					return _react2['default'].createElement(_datepickerDay2['default'], { key: i, onSelectDay: self.props.onSelectDay, day: day, multiSelect: self.props.multiSelect });
				})
			);
		}
	});
	
	exports['default'] = DateInput;
	module.exports = exports['default'];

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	// DATEPICKER CALENDAR - REACT FACADE
	
	// Framework specific
	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var DateDay = _react2['default'].createClass({
		displayName: 'DateDay',
	
		propTypes: {
			day: _react2['default'].PropTypes.object,
			multiSelect: _react2['default'].PropTypes.bool,
			onSelectDay: _react2['default'].PropTypes.func
		},
	
		render: function render() {
			var self = this;
			var day = this.props.day;
	
			return _react2['default'].createElement(
				'td',
				{ onClick: this._handleDateClicked.bind(self, this.props.day), className: (0, _classnames2['default'])({ 'slds-is-today': day.today, 'slds-disabled-text': day.outside, 'slds-is-selected': day.selected, 'slds-is-selected-multi': day.selected && this.props.multiSelect }), role: 'gridcell', 'aria-disabled': 'true' },
				_react2['default'].createElement(
					'span',
					{ className: 'slds-day' },
					day.day
				)
			);
		},
	
		_handleDateClicked: function _handleDateClicked(day) {
			this.props.onSelectDay(day);
		}
	});
	
	exports['default'] = DateDay;
	module.exports = exports['default'];

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	// DATEPICKER CALENDAR - REACT FACADE
	
	// Framework specific
	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _svgSvg = __webpack_require__(225);
	
	var _svgSvg2 = _interopRequireDefault(_svgSvg);
	
	var DateInput = _react2['default'].createClass({
		displayName: 'DateInput',
	
		propTypes: {
			triggerCalendar: _react2['default'].PropTypes.func,
			selectedDate: _react2['default'].PropTypes.any
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'slds-form-element' },
				_react2['default'].createElement(
					'div',
					{ className: 'slds-form-element__control' },
					_react2['default'].createElement(
						'div',
						{ className: 'slds-input-has-icon slds-input-has-icon--right' },
						_react2['default'].createElement(_svgSvg2['default'], { className: 'slds-input__icon slds-icon-text-default', icon: 'utility.event' }),
						_react2['default'].createElement('input', { className: 'slds-input', type: 'text', placeholder: 'Pick a Date', label: 'Date Picker Label', onClick: this.props.triggerCalendar, value: this.props.selectedDate })
					)
				)
			);
		}
	});
	
	exports['default'] = DateInput;
	module.exports = exports['default'];

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	// # Lookup Control
	// ### React Facade
	
	// Implements the Lookup [design pattern](https://www.lightningdesignsystem.com/components/lookups) in React. This is similar to both the Picklist and the Pills, but currently there is no inheritance from either control.
	
	/* TODO: Add a full API description of the control here. */
	
	// Bring in the [shared library functions](../lib/lib).
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// Use the [shared core](../../core/lookup), which contains logic that is the same in every facade.
	
	var _coreLookup = __webpack_require__(244);
	
	var _coreLookup2 = _interopRequireDefault(_coreLookup);
	
	// Facades uses [classNames](https://github.com/JedWatson/classnames), "a simple javascript utility for conditionally joining classNames together." Because of the small size of the library, the default build includes the entire library rather than requiring it as an external dependency.
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	// React and ReactDOM are external depdencies of the project.
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(214);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	// [State](../mixins/state), [Events](../mixins/events), and [genericWillMount](../mixins/generic-will-mount) are wrappers that bring some consistency between facades controls.
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	// [LookupButton](lookup-button), [LookupMenuItem](lookup-menu-item), and [LookupPill](lookup-pill) are default implementations of the control that give it the standard Lightning Design System look and feel. These may be overriden via the properties `menuFooterElement`, `menuHeaderElement`, `menuItemElement`, and `pillElement`.
	
	var _lookupButton = __webpack_require__(245);
	
	var _lookupButton2 = _interopRequireDefault(_lookupButton);
	
	var _lookupMenuItem = __webpack_require__(246);
	
	var _lookupMenuItem2 = _interopRequireDefault(_lookupMenuItem);
	
	var _lookupPill = __webpack_require__(247);
	
	var _lookupPill2 = _interopRequireDefault(_lookupPill);
	
	// The [Svg helper](../svg/svg) for React provides a simple wrapper around the markup required for SVGs, and uses `Lib.getSVGPath` to convert strings in the format `sprite file`.`icon name` into full paths.
	
	var _svgSvg = __webpack_require__(225);
	
	var _svgSvg2 = _interopRequireDefault(_svgSvg);
	
	/* TODO: Finish documenting the control's methods. */
	var Lookup = Lib.merge({}, _coreLookup2['default'], {
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		propTypes: {
			collection: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object]).isRequired,
			label: _react2['default'].PropTypes.string.isRequired,
			menuFooterElement: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.element, _react2['default'].PropTypes.bool]),
			menuHeaderElement: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.element, _react2['default'].PropTypes.bool]),
			menuItemElement: _react2['default'].PropTypes.element,
			onAddClick: _react2['default'].PropTypes.func,
			onChanged: _react2['default'].PropTypes.func,
			onFilter: _react2['default'].PropTypes.func,
			pillElement: _react2['default'].PropTypes.element,
			searchIcon: _react2['default'].PropTypes.string,
			selection: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object])
		},
	
		_renderInput: function _renderInput(hasSelection, selectedItems) {
			var activeDescendantId = this.getMenuItemId(this.state.focusedIndex);
	
			return _react2['default'].createElement(
				'div',
				{ className: 'slds-form-element' },
				_react2['default'].createElement(
					'label',
					{ className: 'slds-form-element__label', htmlFor: this.state.inputId },
					this.props.label
				),
				_react2['default'].createElement(
					'div',
					{ className: 'slds-form-element__control slds-input-has-icon slds-input-has-icon--right', onClick: !hasSelection && this._handleClicked },
					_react2['default'].createElement(_svgSvg2['default'], { icon: this.props.searchIcon, className: 'slds-input__icon' }),
					hasSelection && this._renderPillContainer(selectedItems),
					_react2['default'].createElement('input', { id: this.state.inputId, className: (0, _classnames2['default'])('slds-input', { 'slds-hide': hasSelection }), type: 'text', 'aria-autocomplete': 'list', role: 'combobox', 'aria-expanded': this.state.isOpen, 'aria-activedescendant': activeDescendantId, onChange: this._handleChanged, value: this.state.searchString, ref: this._setInputRef })
				)
			);
		},
	
		_renderPillContainer: function _renderPillContainer(selectedItems) {
			return _react2['default'].createElement(
				'div',
				{ className: 'slds-pill-container slds-show' },
				_react2['default'].createElement(
					'span',
					{ className: 'slds-pill slds-pill--bare' },
					this._renderPills(selectedItems),
					_react2['default'].createElement(
						'button',
						{ className: 'slds-button slds-button--icon-bare', onClick: this.deselectAll },
						_react2['default'].createElement(_svgSvg2['default'], { icon: 'utility.close', className: 'slds-button__icon' }),
						_react2['default'].createElement(
							'span',
							{ className: 'slds-assistive-text' },
							'Remove'
						)
					)
				)
			);
		},
	
		_renderPills: function _renderPills(selectedItems) {
			var _this = this;
	
			return selectedItems.map(function (item, index) {
				var props = { item: item, key: index };
				var element = undefined;
	
				if (_this.props.pillElement) {
					element = _react2['default'].cloneElement(_this.props.pillElement, props);
				} else {
					element = _react2['default'].createElement(_lookupPill2['default'], props);
				}
	
				return element;
			});
		},
	
		_renderMenu: function _renderMenu() {
			return _react2['default'].createElement(
				'div',
				{ className: (0, _classnames2['default'])('slds-lookup__menu', { 'slds-hide': !this.state.isOpen }), role: 'listbox' },
				this._renderMenuHeader(),
				_react2['default'].createElement(
					'ul',
					{ className: 'slds-lookup__list', role: 'presentation', ref: this._setMenuRef },
					this._renderMenuItems()
				),
				this._renderMenuFooter()
			);
		},
	
		_renderMenuButton: function _renderMenuButton(props, menuButtonElement) {
			var element = undefined;
	
			if (menuButtonElement === true) {
				element = _react2['default'].createElement(_lookupButton2['default'], props);
			} else if (menuButtonElement) {
				element = _react2['default'].cloneElement(menuButtonElement, props);
			}
	
			return element;
		},
	
		_renderMenuHeader: function _renderMenuHeader() {
			var props = {
				icon: this.props.searchIcon,
				label: '"' + this.state.searchString + '" in ' + this.props.label
			};
	
			return this._renderMenuButton(props, this.props.menuHeaderElement);
		},
	
		_renderMenuFooter: function _renderMenuFooter() {
			var props = {
				icon: 'utility.add',
				label: 'Add',
				onClick: this.props.onAddClick
			};
	
			return this._renderMenuButton(props, this.props.menuFooterElement);
		},
	
		_renderMenuItems: function _renderMenuItems() {
			var _this2 = this;
	
			return this._collection.map(function (item, index) {
				var id = _this2.getMenuItemId(index);
				var props = { item: item, id: id, onSelected: _this2._selectItem, key: index };
				var element = undefined;
	
				if (_this2.props.menuItemElement) {
					element = _react2['default'].cloneElement(_this2.props.menuItemElement, props);
				} else {
					element = _react2['default'].createElement(_lookupMenuItem2['default'], props);
				}
	
				return element;
			});
		},
	
		render: function render() {
			var selectedItems = this._getSelectedItems();
			var hasSelection = selectedItems.length() > 0;
	
			return _react2['default'].createElement(
				'div',
				{ className: (0, _classnames2['default'])('slds-lookup', { 'slds-has-selection': hasSelection }), 'data-select': 'single', 'data-scope': 'single', 'data-typeahead': 'true', onKeyDown: this._handleKeyPressed, onKeyPress: this._handleKeyPressed },
				this._renderInput(hasSelection, selectedItems),
				this._renderMenu(hasSelection)
			);
		},
	
		componentDidUpdate: function componentDidUpdate() {
			this._setMenuItemsRef();
		},
	
		_setMenuRef: function _setMenuRef(menu) {
			this.elements.dropdownMenu = Lib.wrapElement(_reactDom2['default'].findDOMNode(menu));
		},
	
		_setMenuItemsRef: function _setMenuItemsRef() {
			var menuItems = this.elements.dropdownMenu[0].getElementsByTagName('li');
			this.elements.menuItems = Array.prototype.map.call(menuItems, function (menuItem) {
				var anchor = menuItem.getElementsByTagName('a');
				if (anchor.length === 1) {
					return anchor[0];
				}
			});
		},
	
		_setInputRef: function _setInputRef(input) {
			this.elements.input = Lib.wrapElement(_reactDom2['default'].findDOMNode(input));
		},
	
		_handleChanged: function _handleChanged(e) {
			this.search(e.target.value);
		},
	
		_handleClicked: function _handleClicked(e) {
			if (e) {
				e.nativeEvent.originator = this;
			}
	
			this.open();
		},
	
		_handleKeyPressed: function _handleKeyPressed(e) {
			if (e.key && /(ArrowUp|ArrowDown|Escape)/.test(e.key)) {
				e.preventDefault();
				if (!this._keyboardNav(e.key, this.elements.menuItems)) {
					this.elements.input[0].focus();
				}
			} else if (e.key.length === 1) {
				if (!this.state.isOpen) this.open();
				this.elements.input[0].focus();
			}
		}
	});
	
	// `Helpers` are a feature of Facades that allows anyone to register code that can manipulate the control before it is encapsulated in a React class. This allows flexibility for adding custom behavior without modifying the original source, or for adding optional behavior. For example, the jQuery facade uses this mechanism to optionally create jQuery plugin versions of each control.
	Lookup = Lib.runHelpers('react', _coreLookup.CONTROL, Lookup);
	
	// Once everything has been merged together and all registered helpers have been run we can create the React class and export the result for consumption by our apps.
	Lookup = _react2['default'].createClass(Lookup);
	
	exports['default'] = Lookup;
	module.exports = exports['default'];

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	// # Lookup Control
	// ### Core
	
	// Implements basic functionality required for the Lookup [design pattern](https://www.lightningdesignsystem.com/components/lookups) and pulls in any appropriate traits. This file is shared between all facades and should not know anything about specific frameworks.
	
	// Bring in the [shared library functions](../lib/lib).
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// Inherit from the [base control](base).
	
	var _base = __webpack_require__(138);
	
	var _base2 = _interopRequireDefault(_base);
	
	/* TODO: Finish documenting the core. */
	// Traits
	
	var _traitsDisableable = __webpack_require__(152);
	
	var _traitsDisableable2 = _interopRequireDefault(_traitsDisableable);
	
	var _traitsOpenable = __webpack_require__(172);
	
	var _traitsOpenable2 = _interopRequireDefault(_traitsOpenable);
	
	var _traitsMultiselectable = __webpack_require__(181);
	
	var _traitsMultiselectable2 = _interopRequireDefault(_traitsMultiselectable);
	
	var _traitsKeyboardNavigable = __webpack_require__(174);
	
	var _traitsKeyboardNavigable2 = _interopRequireDefault(_traitsKeyboardNavigable);
	
	var CONTROL = 'slds-lookup';
	
	exports.CONTROL = CONTROL;
	var LookupCore = Lib.merge({}, _base2['default'], _traitsDisableable2['default'], _traitsOpenable2['default'], _traitsMultiselectable2['default'], _traitsKeyboardNavigable2['default'], {
		// CSS classes used within this control
		cssClasses: {
			CONTROL: CONTROL,
			INPUT: 'slds-input',
			MENU: 'slds-lookup__menu',
			LIST: 'slds-lookup__list'
		},
	
		_defaultProperties: {
			collection: [],
			multiSelect: false,
			menuFooterElement: true,
			menuHeaderElement: false, // Defaulting to hidden for the single scope version
			searchIcon: 'utility.search'
		},
	
		_defaultState: {
			searchString: ''
		},
	
		/* Accessors: These may be supplied in the options hash to override default behavior
	 	 textProp ()
	  Return the name of the property that contains the text
	 	 getText (item)
	  Return the text value to display in the list
	  item => object wrapped in an Item Adapter
	 	 getKey (item)
	  Return either an object with key/value pairs to match or a match function
	  Use this to reduce the number of fields required for searching if a unique key is available
	  item => object wrapped in an Item Adapter
	 	 getIcon (item)
	  Return a string that points to the appropriate icon
	  item => object wrapped in an Item Adapter
	 	 */
	
		accessors: {
			textProp: function textProp() {
				return 'text';
			},
	
			getText: function getText(item) {
				return item.get(item.textProp());
			},
	
			getKey: function getKey(item) {
				return item.get();
			},
	
			getIcon: function getIcon(item) {
				return item.get('icon');
			}
		},
	
		_initializer: function _initializer() {
			this.setState({
				inputId: Lib.uniqueId(CONTROL + '-input-')
			});
		},
	
		_onSelected: function _onSelected() {
			this.search('');
			this.close();
		},
	
		_onExpandOrCollapse: function _onExpandOrCollapse() {
			this.setState({
				focusedIndex: this._defaultState.focusedIndex
			});
		},
	
		getMenuItemId: function getMenuItemId(index) {
			if (index >= 0) {
				return this.getState('inputId') + '-item-' + index;
			}
		},
	
		search: function search(searchString) {
			if (this.getState(searchString) !== searchString) {
				this.setState({
					searchString: searchString
				});
	
				this.trigger('filter', searchString);
			}
		}
	});
	
	exports['default'] = LookupCore;

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	// LOOKUP BUTTON - REACT FACADE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _svgSvg = __webpack_require__(225);
	
	var _svgSvg2 = _interopRequireDefault(_svgSvg);
	
	var LookupButton = _react2['default'].createClass({
		displayName: 'LookupButton',
	
		propTypes: {
			icon: _react2['default'].PropTypes.string,
			label: _react2['default'].PropTypes.string.isRequired,
			onClick: _react2['default'].PropTypes.func
		},
	
		_renderIcon: function _renderIcon() {
			if (Lib.isString(this.props.icon)) {
				return _react2['default'].createElement(_svgSvg2['default'], { className: 'slds-icon slds-icon-text-default slds-icon--small', icon: this.props.icon });
			}
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: 'slds-lookup__item' },
				_react2['default'].createElement(
					'button',
					{ className: 'slds-button', onClick: this.props.onClick },
					this._renderIcon(),
					this.props.label
				)
			);
		}
	});
	
	exports['default'] = LookupButton;
	module.exports = exports['default'];

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	// LOOKUP MENU ITEM - REACT FACADE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _svgSvg = __webpack_require__(225);
	
	var _svgSvg2 = _interopRequireDefault(_svgSvg);
	
	var LookupMenuItem = _react2['default'].createClass({
		displayName: 'LookupMenuItem',
	
		propTypes: {
			item: _react2['default'].PropTypes.shape({
				getText: _react2['default'].PropTypes.func.isRequired,
				getIcon: _react2['default'].PropTypes.func.isRequired
			}).isRequired,
			onSelected: _react2['default'].PropTypes.func.isRequired,
			id: _react2['default'].PropTypes.string.isRequired
		},
	
		_renderIcon: function _renderIcon() {
			var icon = this.props.item.getIcon();
	
			if (Lib.isString(icon)) {
				// TODO: Seems strange that this classname is specific to account
				return _react2['default'].createElement(_svgSvg2['default'], { className: 'slds-icon slds-icon-standard-account slds-icon--small', icon: icon });
			}
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'li',
				{ id: this.props.id, className: 'slds-lookup__item' },
				_react2['default'].createElement(
					'a',
					{ href: '#', role: 'option', onClick: this.handleClicked },
					this._renderIcon(),
					this.props.item.getText()
				)
			);
		},
	
		handleClicked: function handleClicked(e) {
			e.preventDefault();
			this.props.onSelected(this.props.item);
		}
	});
	
	exports['default'] = LookupMenuItem;
	module.exports = exports['default'];

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	// LOOKUP PILL - REACT FACADE
	
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _svgSvg = __webpack_require__(225);
	
	var _svgSvg2 = _interopRequireDefault(_svgSvg);
	
	var LookupPill = _react2['default'].createClass({
		displayName: 'LookupPill',
	
		propTypes: {
			item: _react2['default'].PropTypes.shape({
				getText: _react2['default'].PropTypes.func.isRequired,
				getIcon: _react2['default'].PropTypes.func.isRequired
			}).isRequired
		},
	
		_renderIcon: function _renderIcon() {
			var icon = this.props.item.getIcon();
	
			if (Lib.isString(icon)) {
				// TODO: Seems strange that this classname is specific to account
				return _react2['default'].createElement(_svgSvg2['default'], { className: 'slds-icon slds-icon-standard-account slds-icon--small', icon: icon });
			}
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'a',
				{ href: '#', className: 'slds-pill__label', onClick: this.handleClicked },
				this._renderIcon(),
				this.props.item.getText()
			);
		},
	
		handleClicked: function handleClicked(e) {
			e.preventDefault();
		}
	});
	
	exports['default'] = LookupPill;
	module.exports = exports['default'];

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	// NOTIFICATION CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _Object$keys = __webpack_require__(139)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreNotification = __webpack_require__(187);
	
	var _coreNotification2 = _interopRequireDefault(_coreNotification);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	// Children
	
	var _buttonButton = __webpack_require__(215);
	
	var _buttonButton2 = _interopRequireDefault(_buttonButton);
	
	// TODO: Internationalize
	var NotificationObject = {
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		propTypes: {
			children: _react2['default'].PropTypes.string.isRequired,
			theme: _react2['default'].PropTypes.oneOf(_Object$keys(_coreNotification2['default'].themes))
		},
	
		render: function render() {
			var classNames = this._getClassNames();
	
			return _react2['default'].createElement(
				'div',
				{ className: classNames, role: 'alert' },
				_react2['default'].createElement(
					'span',
					{ className: 'slds-assistive-text' },
					'Info'
				),
				_react2['default'].createElement(_buttonButton2['default'], {
					className: 'slds-notify__close',
					icon: 'action.close',
					assistiveText: 'Close',
					iconStyle: 'icon-inverse',
					onClick: this.hide }),
				_react2['default'].createElement(
					'h2',
					null,
					this.props.children
				)
			);
		}
	};
	
	exports.NotificationObject = NotificationObject;
	var Notification = Lib.merge({}, _coreNotification2['default'], NotificationObject);
	
	Notification = Lib.runHelpers('react', _coreNotification.CONTROL, Notification);
	Notification = _react2['default'].createClass(Notification);
	
	exports['default'] = Notification;

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	// PILLBOX CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _corePillbox = __webpack_require__(191);
	
	var _corePillbox2 = _interopRequireDefault(_corePillbox);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	// Children
	
	var _pillboxItem = __webpack_require__(250);
	
	var _pillboxItem2 = _interopRequireDefault(_pillboxItem);
	
	var Pillbox = Lib.merge({}, _corePillbox2['default'], {
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		propTypes: {
			selection: _react2['default'].PropTypes.any
		},
	
		render: function render() {
			var items = this._generatePills();
	
			return _react2['default'].createElement(
				'div',
				{ className: 'pillbox slds-pillbox' },
				_react2['default'].createElement(
					'ul',
					{ className: 'slds-pill-group' },
					items,
					_react2['default'].createElement(
						'li',
						{ className: 'slds-pill-input-wrap' },
						_react2['default'].createElement('input', { type: 'text', onKeyUp: this._handleKeyUp, className: 'slds-input slds-input--x-small | slds-pill-add-item', placeholder: 'add item' })
					)
				)
			);
		},
	
		_generatePills: function _generatePills() {
			var _this = this;
	
			return this._getSelectedItems().map(function (item, index) {
				return _react2['default'].createElement(_pillboxItem2['default'], { key: index, item: item, onClick: _this._handleItemClick });
			});
		},
	
		_handleKeyUp: function _handleKeyUp(e) {
			var inputValue = undefined;
	
			if (this._isAcceptKeyCode(e.keyCode)) {
				inputValue = e.target.value;
	
				// If commas are an accepted keycode clean inputValue of commas
				if (e.keyCode === 188 && this._isAcceptKeyCode(188)) {
					inputValue = inputValue.replace(/[ ]*\,[ ]*/, '');
				}
	
				// TODO: This will need to be updated when typeahead feature is added
				this.selectItem({
					text: inputValue,
					value: inputValue
				});
	
				e.target.value = '';
			}
		},
	
		_handleItemClick: function _handleItemClick(item) {
			this._deselectItem(item);
		}
	
	});
	
	Pillbox = Lib.runHelpers('react', _corePillbox.CONTROL, Pillbox);
	Pillbox = _react2['default'].createClass(Pillbox);
	
	exports['default'] = Pillbox;
	module.exports = exports['default'];

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	// Framework specific
	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	// Children
	
	var _buttonButton = __webpack_require__(215);
	
	var _buttonButton2 = _interopRequireDefault(_buttonButton);
	
	var PillboxItem = _react2['default'].createClass({
		displayName: 'PillboxItem',
	
		propTypes: {
			// TODO: explore if item PropTypes can be done better
			item: _react2['default'].PropTypes.shape({
				// getType: React.PropTypes.func.isRequired,
				// getDisabled: React.PropTypes.func.isRequired,
				// getIcon: React.PropTypes.func.isRequired,
				// getId: React.PropTypes.func.isRequired,
				getText: _react2['default'].PropTypes.func.isRequired
				// getValue: React.PropTypes.func.isRequired
			}).isRequired,
			onClick: _react2['default'].PropTypes.func.isRequired
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'li',
				{ className: 'slds-pill' },
				_react2['default'].createElement(
					'span',
					{ href: '#', className: 'slds-pill__label' },
					this.props.item.getText()
				),
				_react2['default'].createElement(_buttonButton2['default'], {
					icon: 'action.close',
					assistiveText: 'Remove',
					iconStyle: 'icon-bare',
					onClick: this._onClick })
			);
		},
	
		_onClick: function _onClick() {
			this.props.onClick(this.props.item);
		}
	});
	
	exports['default'] = PillboxItem;
	module.exports = exports['default'];

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	// POPOVER CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _Object$keys = __webpack_require__(139)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _corePopover = __webpack_require__(194);
	
	var _corePopover2 = _interopRequireDefault(_corePopover);
	
	var _traitsPositionable = __webpack_require__(195);
	
	var _traitsPositionable2 = _interopRequireDefault(_traitsPositionable);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	var _mixinsCustomPropTypesMountable = __webpack_require__(252);
	
	var _mixinsCustomPropTypesMountable2 = _interopRequireDefault(_mixinsCustomPropTypesMountable);
	
	var PopoverMethods = {
		propTypes: {
			align: _mixinsCustomPropTypesMountable2['default'],
			autoFlip: _react2['default'].PropTypes.bool,
			container: _mixinsCustomPropTypesMountable2['default'],
			header: _react2['default'].PropTypes.string,
			position: _react2['default'].PropTypes.oneOf(_Object$keys(_traitsPositionable2['default'].positions)),
			trigger: _react2['default'].PropTypes.oneOf(_Object$keys(_corePopover2['default'].triggers))
		},
	
		_setElements: function _setElements() {
			this.elements.popover = Lib.wrapElement(this.refs.popover);
			this.elements.container = Lib.wrapElement(this.props.container || this.elements.wrapper);
			this.elements.align = Lib.wrapElement(this.props.align || this.elements.container);
		},
	
		componentWillMount: function componentWillMount() {
			this.setState({
				isHidden: !this.props.isOpen
			});
		},
	
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			this.setState({
				isHidden: !nextProps.isOpen
			});
		},
	
		componentDidUpdate: function componentDidUpdate() {
			this._updatePosition();
		}
	};
	
	exports.PopoverMethods = PopoverMethods;
	var Popover = Lib.merge({}, _corePopover2['default'], PopoverMethods, {
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		render: function render() {
			if (this.refs.popover) {
				this._setElements();
			}
	
			return _react2['default'].createElement(
				'div',
				{ className: this._getClassNames(), role: 'dialog', ref: 'popover' },
				_react2['default'].createElement(
					'div',
					{ className: 'slds-popover__content' },
					this._renderHeader(),
					_react2['default'].createElement(
						'div',
						{ className: 'slds-popover__body' },
						this.props.children
					)
				)
			);
		},
	
		_renderHeader: function _renderHeader() {
			if (this.props.header) {
				return _react2['default'].createElement(
					'div',
					{ className: 'slds-popover__header' },
					_react2['default'].createElement(
						'p',
						{ className: 'slds-text-heading--small' },
						this.props.header
					)
				);
			}
		}
	
	});
	
	Popover = Lib.runHelpers('react', _corePopover.CONTROL, Popover);
	Popover = _react2['default'].createClass(Popover);
	
	exports['default'] = Popover;

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _common = __webpack_require__(223);
	
	/**
	 * Checks whether a prop provides a DOM element
	 *
	 * The element can be provided in two forms:
	 * - Directly passed
	 * - Or passed an object that has a `render` method
	 *
	 * @param props
	 * @param propName
	 * @param componentName
	 * @returns {Error|undefined}
	 */
	
	function validate(props, propName, componentName) {
	  if (typeof props[propName] !== 'object' || typeof props[propName].render !== 'function' && props[propName].nodeType !== 1) {
	    return new Error((0, _common.errMsg)(props, propName, componentName, ', expected a DOM element or an object that has a `render` method'));
	  }
	}
	
	exports['default'] = (0, _common.createChainableTypeChecker)(validate);
	module.exports = exports['default'];

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	// RADIO CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreRadio = __webpack_require__(198);
	
	var _coreRadio2 = _interopRequireDefault(_coreRadio);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _checkboxCheckbox = __webpack_require__(231);
	
	var RadioObject = Lib.merge(_checkboxCheckbox.CheckboxObject, {
		propTypes: {
			checked: _react2['default'].PropTypes.bool,
			disabled: _react2['default'].PropTypes.bool,
			labelText: _react2['default'].PropTypes.string,
			name: _react2['default'].PropTypes.string.isRequired,
			onChanged: _react2['default'].PropTypes.func,
			onDisabled: _react2['default'].PropTypes.func,
			onEnabled: _react2['default'].PropTypes.func,
			value: _react2['default'].PropTypes.string
		},
	
		_renderInput: function _renderInput() {
			return _react2['default'].createElement('input', { name: this.props.name,
				type: 'radio',
				disabled: this.props.disabled,
				checked: this.checked(),
				value: this.props.value || '',
				onChange: this.check });
		}
	});
	
	exports.RadioObject = RadioObject;
	var Radio = Lib.merge({}, _coreRadio2['default'], RadioObject);
	
	Radio = Lib.runHelpers('react', _coreRadio.CONTROL, Radio);
	Radio = _react2['default'].createClass(Radio);
	
	exports['default'] = Radio;

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	// SPINNER CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _Object$keys = __webpack_require__(139)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreSpinner = __webpack_require__(201);
	
	var _coreSpinner2 = _interopRequireDefault(_coreSpinner);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	var Spinner = Lib.merge({}, _coreSpinner2['default'], {
		mixins: [_mixinsState2['default'], _mixinsGenericWillMount2['default']],
	
		propTypes: {
			size: _react2['default'].PropTypes.oneOf(_Object$keys(_coreSpinner2['default'].sizes)),
			theme: _react2['default'].PropTypes.oneOf(_Object$keys(_coreSpinner2['default'].fileNames))
		},
	
		render: function render() {
			var strings = this.getState('strings');
	
			return _react2['default'].createElement(
				'div',
				{ className: this.sizes[this.props.size] },
				_react2['default'].createElement('img', { src: this.fileNames[this.props.theme], alt: strings.LOADING })
			);
		}
	});
	
	Spinner = Lib.runHelpers('react', _coreSpinner.CONTROL, Spinner);
	Spinner = _react2['default'].createClass(Spinner);
	
	exports['default'] = Spinner;
	module.exports = exports['default'];

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	// POPOVER CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreTooltip = __webpack_require__(203);
	
	var _coreTooltip2 = _interopRequireDefault(_coreTooltip);
	
	// Inherited functionality from popover
	
	var _popoverPopover = __webpack_require__(251);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	var _mixinsCustomPropTypesMountable = __webpack_require__(252);
	
	var _mixinsCustomPropTypesMountable2 = _interopRequireDefault(_mixinsCustomPropTypesMountable);
	
	var Tooltip = Lib.merge({}, _coreTooltip2['default'], _popoverPopover.PopoverMethods, {
		propTypes: {
			align: _mixinsCustomPropTypesMountable2['default'],
			container: _mixinsCustomPropTypesMountable2['default'],
			isOpen: _react2['default'].PropTypes.bool,
			placement: _react2['default'].PropTypes.string
		},
	
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		render: function render() {
			if (this.refs.popover) {
				this._setElements();
			}
	
			return _react2['default'].createElement(
				'div',
				{ className: this._getClassNames(), role: 'tooltip', ref: 'popover' },
				_react2['default'].createElement(
					'div',
					{ className: 'slds-tooltip__content' },
					_react2['default'].createElement(
						'div',
						{ className: 'slds-tooltip__body' },
						this.props.children
					)
				)
			);
		}
	
	});
	
	Tooltip = Lib.runHelpers('react', _coreTooltip.CONTROL, Tooltip);
	Tooltip = _react2['default'].createClass(Tooltip);
	
	exports['default'] = Tooltip;
	module.exports = exports['default'];

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	// TREE CONTROL - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreTree = __webpack_require__(206);
	
	var _coreTree2 = _interopRequireDefault(_coreTree);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mixinsState = __webpack_require__(211);
	
	var _mixinsState2 = _interopRequireDefault(_mixinsState);
	
	var _mixinsEvents = __webpack_require__(212);
	
	var _mixinsEvents2 = _interopRequireDefault(_mixinsEvents);
	
	var _mixinsGenericWillMount = __webpack_require__(213);
	
	var _mixinsGenericWillMount2 = _interopRequireDefault(_mixinsGenericWillMount);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	// Children
	
	var _treeBranch = __webpack_require__(257);
	
	var _treeBranch2 = _interopRequireDefault(_treeBranch);
	
	var _treeItem = __webpack_require__(258);
	
	var _treeItem2 = _interopRequireDefault(_treeItem);
	
	var Tree = Lib.merge({}, _coreTree2['default'], {
		mixins: [_mixinsState2['default'], _mixinsEvents2['default'], _mixinsGenericWillMount2['default']],
	
		propTypes: {
			autoOpen: _react2['default'].PropTypes.bool,
			autoOpenLimit: _react2['default'].PropTypes.number,
			// TODO: Type of collection unknown until parsed by Data Adapter
			collection: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object]).isRequired,
			disabled: _react2['default'].PropTypes.bool,
			folderSelect: _react2['default'].PropTypes.bool,
			multiSelect: _react2['default'].PropTypes.bool,
			onChanged: _react2['default'].PropTypes.func,
			onClosed: _react2['default'].PropTypes.func,
			onOpened: _react2['default'].PropTypes.func,
			open: _react2['default'].PropTypes.any,
			selection: _react2['default'].PropTypes.any
		},
	
		render: function render() {
			var _this = this;
	
			var children = [];
	
			this._collection.forEach(function (model) {
				var id = model.getId();
				var selectable = _this.getProperty('folderSelect');
	
				if (model.getType() === 'folder') {
					children.push(_react2['default'].createElement(_treeBranch2['default'], { key: id, item: model, selectable: selectable, strings: _this.state.strings, autoOpenLevel: 1, autoOpenLimit: _this.props.autoOpen ? _this.props.autoOpenLimit : 0, onItemClick: _this._handleItemClick, onExpandClick: _this._handleExpandClick, _isFolderOpen: _this._isFolderOpen, _isItemSelected: _this._isItemSelected }));
				} else {
					children.push(_react2['default'].createElement(_treeItem2['default'], { key: id, item: model, onClick: _this._handleItemClick, _isItemSelected: _this._isItemSelected }));
				}
			});
	
			return _react2['default'].createElement(
				'div',
				{ className: this.cssClasses.CONTAINER, role: 'application' },
				_react2['default'].createElement(
					'ul',
					{ className: (0, _classnames2['default'])(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP), role: 'tree' },
					children
				)
			);
		},
	
		_handleItemClick: function _handleItemClick(item) {
			if (item.getType() !== 'folder' || this.getProperty('folderSelect')) {
				if (this._isItemSelected(item)) {
					this._deselectItem(item);
				} else {
					this._selectItem(item);
				}
			} else {
				this._toggleFolder(item);
			}
		},
	
		_handleExpandClick: function _handleExpandClick(item) {
			this._toggleFolder(item);
		}
	});
	
	Tree = Lib.runHelpers('react', _coreTree.CONTROL, Tree);
	Tree = _react2['default'].createClass(Tree);
	
	exports['default'] = Tree;
	module.exports = exports['default'];

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	// TREE BRANCH - REACT FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// Framework specific
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	// Children
	
	var _treeItem = __webpack_require__(258);
	
	var _treeItem2 = _interopRequireDefault(_treeItem);
	
	var _buttonButton = __webpack_require__(215);
	
	var _buttonButton2 = _interopRequireDefault(_buttonButton);
	
	var InnerTreeBranch = undefined;
	
	var TreeBranch = _react2['default'].createClass({
		displayName: 'TreeBranch',
	
		propTypes: {
			autoOpenLevel: _react2['default'].PropTypes.number.isRequired,
			autoOpenLimit: _react2['default'].PropTypes.number.isRequired,
			_isFolderOpen: _react2['default'].PropTypes.func.isRequired,
			_isItemSelected: _react2['default'].PropTypes.func.isRequired,
			// TODO: Modify when tree data adapter gets set up
			item: _react2['default'].PropTypes.shape({
				// getType: React.PropTypes.func.isRequired,
				_getChildren: _react2['default'].PropTypes.func.isRequired,
				// getDisabled: React.PropTypes.func.isRequired,
				// getIcon: React.PropTypes.func.isRequired,
				// getId: React.PropTypes.func.isRequired,
				getText: _react2['default'].PropTypes.func.isRequired
				// getValue: React.PropTypes.func.isRequired
			}).isRequired,
			onItemClick: _react2['default'].PropTypes.func.isRequired,
			onExpandClick: _react2['default'].PropTypes.func.isRequired,
			selectable: _react2['default'].PropTypes.bool.isRequired,
			strings: _react2['default'].PropTypes.object.isRequired
		},
	
		getInitialState: function getInitialState() {
			return {
				children: Lib.getDataAdapter(),
				loading: true
			};
		},
	
		componentWillMount: function componentWillMount() {
			var _this = this;
	
			if (!InnerTreeBranch) {
				InnerTreeBranch = __webpack_require__(257);
			}
	
			if (this.props.autoOpenLevel <= this.props.autoOpenLimit && !this.props._isFolderOpen(this.props.item)) {
				this._handleExpandClick(this.props.item);
			}
	
			this.props.item._getChildren().then(function (resolvedChildren) {
				_this.setState({
					children: resolvedChildren,
					loading: false
				});
			}, function (error) {
				_this.setState({
					loading: false,
					error: error
				});
			});
		},
	
		render: function render() {
			var _this2 = this;
	
			var isOpen = this.props._isFolderOpen(this.props.item);
			var isSelected = this.props._isItemSelected(this.props.item);
			var children = [];
	
			this.state.children.forEach(function (model) {
				var id = model.getId();
	
				if (model.getType() === 'folder') {
					children.push(_react2['default'].createElement(TreeBranch, { key: id, item: model, selectable: _this2.props.selectable, strings: _this2.props.strings, autoOpenLevel: _this2.props.autoOpenLevel + 1, autoOpenLimit: _this2.props.autoOpenLimit, onItemClick: _this2._handleItemClick, onExpandClick: _this2._handleExpandClick, _isFolderOpen: _this2.props._isFolderOpen, _isItemSelected: _this2.props._isItemSelected }));
				} else {
					children.push(_react2['default'].createElement(_treeItem2['default'], { key: id, item: model, onClick: _this2._handleItemClick.bind(_this2, model), _isItemSelected: _this2.props._isItemSelected }));
				}
			});
	
			return _react2['default'].createElement(
				'li',
				{ className: (0, _classnames2['default'])('slds-tree__branch', { 'slds-is-open': isOpen, 'slds-is-selected': isSelected }), role: 'treeitem', 'aria-expanded': isOpen ? 'false' : 'true' },
				_react2['default'].createElement(
					'div',
					{ className: 'slds-tree__branch--header slds-tree__item' },
					_react2['default'].createElement(_buttonButton2['default'], {
						className: 'slds-m-right--x-small',
						icon: 'utility.chevronright',
						iconSize: 'small',
						assistiveText: 'Toggle',
						iconStyle: 'icon-bare',
						onClick: this._handleExpandClick.bind(this, this.props.item) }),
					_react2['default'].createElement(
						'div',
						{ className: 'slds-tree__branch--name', role: 'presentation', onClick: this._handleItemClick.bind(this, this.props.item) },
						this.props.item.getText()
					)
				),
				_react2['default'].createElement(
					'ul',
					{ className: 'slds-tree__group slds-nested', role: 'group' },
					isOpen ? children : undefined
				),
				_react2['default'].createElement(
					'div',
					{ className: (0, _classnames2['default'])('slds-tree__loader', { 'slds-hide': !this.state.loading || !isOpen }), role: 'alert' },
					'Loading'
				)
			);
		},
	
		_handleItemClick: function _handleItemClick(item) {
			if (this.props.onItemClick) {
				this.props.onItemClick(item);
			}
		},
	
		_handleExpandClick: function _handleExpandClick(item) {
			if (this.props.onExpandClick) {
				this.props.onExpandClick(item);
			}
		}
	});
	
	exports['default'] = TreeBranch;
	module.exports = exports['default'];

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	// TREE ITEM - REACT FACADE
	
	// Framework specific
	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _react = __webpack_require__(210);
	
	var _react2 = _interopRequireDefault(_react);
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var TreeItem = _react2['default'].createClass({
		displayName: 'TreeItem',
	
		propTypes: {
			// TODO: Modify when tree data adapter gets set up
			item: _react2['default'].PropTypes.shape({
				// getType: React.PropTypes.func.isRequired,
				// getDisabled: React.PropTypes.func.isRequired,
				// getIcon: React.PropTypes.func.isRequired,
				// getId: React.PropTypes.func.isRequired,
				getText: _react2['default'].PropTypes.func.isRequired
				// getValue: React.PropTypes.func.isRequired
			}).isRequired,
			onClick: _react2['default'].PropTypes.func.isRequired,
			_isItemSelected: _react2['default'].PropTypes.func.isRequired
		},
	
		render: function render() {
			var isSelected = this.props._isItemSelected(this.props.item);
	
			return _react2['default'].createElement(
				'li',
				{ className: (0, _classnames2['default'])('slds-tree__item', { 'slds-is-selected': isSelected }), onClick: this._handleItemClick.bind(this, this.props.item), 'data-template': 'treeitem', role: 'treeitem' },
				_react2['default'].createElement(
					'div',
					{ role: 'presentation', className: 'slds-tree__item-label | slds-truncate' },
					this.props.item.getText()
				)
			);
		},
	
		_handleItemClick: function _handleItemClick(item) {
			if (this.props.onClick) {
				this.props.onClick(item);
			}
		}
	});
	
	exports['default'] = TreeItem;
	module.exports = exports['default'];

/***/ }
/******/ ])});;
//# sourceMappingURL=react.js.map