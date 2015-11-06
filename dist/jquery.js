define("Facades", [], function() { return /******/ (function(modules) { // webpackBootstrap
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	__webpack_require__(3);
	
	var _badgeBadge = __webpack_require__(136);
	
	var _badgeBadge2 = _interopRequireDefault(_badgeBadge);
	
	var _buttonButton = __webpack_require__(150);
	
	var _buttonButton2 = _interopRequireDefault(_buttonButton);
	
	// 	// import './buttongroup/example';
	
	var _checkboxCheckbox = __webpack_require__(156);
	
	var _checkboxCheckbox2 = _interopRequireDefault(_checkboxCheckbox);
	
	var _comboboxCombobox = __webpack_require__(169);
	
	var _comboboxCombobox2 = _interopRequireDefault(_comboboxCombobox);
	
	var _dataTableDataTable = __webpack_require__(179);
	
	var _dataTableDataTable2 = _interopRequireDefault(_dataTableDataTable);
	
	// 	// import './datepicker/example';
	
	var _dropdownDropdown = __webpack_require__(183);
	
	var _dropdownDropdown2 = _interopRequireDefault(_dropdownDropdown);
	
	var _notificationNotification = __webpack_require__(186);
	
	var _notificationNotification2 = _interopRequireDefault(_notificationNotification);
	
	var _picklistPicklist = __webpack_require__(176);
	
	var _picklistPicklist2 = _interopRequireDefault(_picklistPicklist);
	
	var _pillboxPillbox = __webpack_require__(190);
	
	var _pillboxPillbox2 = _interopRequireDefault(_pillboxPillbox);
	
	var _popoverPopover = __webpack_require__(193);
	
	var _popoverPopover2 = _interopRequireDefault(_popoverPopover);
	
	var _radioRadio = __webpack_require__(197);
	
	var _radioRadio2 = _interopRequireDefault(_radioRadio);
	
	var _spinnerSpinner = __webpack_require__(200);
	
	var _spinnerSpinner2 = _interopRequireDefault(_spinnerSpinner);
	
	var _tooltipTooltip = __webpack_require__(202);
	
	var _tooltipTooltip2 = _interopRequireDefault(_tooltipTooltip);
	
	var _treeTree = __webpack_require__(205);
	
	var _treeTree2 = _interopRequireDefault(_treeTree);
	
	module.exports = {
		Badge: _badgeBadge2['default'],
		Button: _buttonButton2['default'],
		Checkbox: _checkboxCheckbox2['default'],
		Combobox: _comboboxCombobox2['default'],
		DataTable: _dataTableDataTable2['default'],
		Dropdown: _dropdownDropdown2['default'],
		Notification: _notificationNotification2['default'],
		Picklist: _picklistPicklist2['default'],
		Pillbox: _pillboxPillbox2['default'],
		Popover: _popoverPopover2['default'],
		Radio: _radioRadio2['default'],
		Spinner: _spinnerSpinner2['default'],
		Tooltip: _tooltipTooltip2['default'],
		Tree: _treeTree2['default']
	};

/***/ },
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// PLUGIN DEFINITION HELPER
	// Include this helper to create jQuery plugin versions of jQuery controls.
	// Without the helper, jQuery controls can still be instantiated directly via their constructors.
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	// Framework specific
	var $ = Lib.global.jQuery || Lib.global.$;
	
	var createPlugin = function createPlugin(name, Constructor, helperOptions) {
		var old = $.fn[name];
		var namespaced = ['fu', name].join('.');
		var initializeSelector = ['[data-initialize=', name, ']'].join('');
		var legacyMethods = helperOptions && helperOptions.legacyMethods || {};
	
		$.fn[name] = function (option) {
			var args = Array.prototype.slice.call(arguments, 1);
			var methodReturn = undefined;
	
			var $set = this.each(function () {
				var $this = $(this);
				var data = $this.data(namespaced);
	
				// If object, this is an initialization, only overwrite options and init if no data exists
				var options = typeof option === 'object' && option;
				if (!data) {
					$this.data(namespaced, data = new Constructor(this, options));
				}
	
				// If string, this is a method call, and apply with args
				if (typeof option === 'string') {
					if (!legacyMethods || Lib.isFunction(data[option])) {
						methodReturn = data[option].apply(data, args);
					} else {
						methodReturn = legacyMethods[option].apply(data, args);
					}
				}
			});
	
			return methodReturn === undefined ? $set : methodReturn;
		};
	
		$.fn[name].Constructor = Constructor;
	
		$.fn[name].noConflict = function () {
			$.fn[name] = old;
			return this;
		};
	
		// DATA-API
	
		$(document).on(['mousedown', namespaced, 'data-api'].join('.'), initializeSelector, function (e) {
			var $control = $(e.target).closest('.' + name);
			if (!$control.data(namespaced)) {
				$control[name]($control.data());
			}
		});
	
		// Must be domReady for AMD compatibility
		$(function () {
			$(initializeSelector).each(function () {
				var $this = $(this);
				if (!$this.data(namespaced)) {
					$this[name]($this.data());
				}
			});
		});
	
		return Constructor;
	};
	
	Lib.registerHelper('createPlugin', createPlugin, ['jquery']);
	
	exports['default'] = createPlugin;
	module.exports = exports['default'];

/***/ },
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
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	// BADGE CONTROL - JQUERY FACADE
	
	// Core
	'use strict';
	
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
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	// Constructor
	var Badge = function Badge() {
		var options = this._getOptions(arguments);
	
		this._initialize(options);
	};
	
	var BadgeObject = {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = $('<span>');
		},
	
		_render: function _render() {
			var className = this._getClassNames();
	
			// TODO: Should this also use the contents of the original? It's different in jQuery becasue in React 'Children' is actually just another prop
			this.element.addClass(className).text(this.getProperty('text'));
	
			return this.element;
		}
	};
	
	exports.BadgeObject = BadgeObject;
	Lib.merge(Badge.prototype, _coreBadge2['default'], _events2['default'], _dom2['default'], _state2['default'], BadgeObject);
	Badge = Lib.runHelpers('jquery', _coreBadge.CONTROL, Badge);
	
	exports['default'] = Badge;

/***/ },
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
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// DOM - JQUERY FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	var DOM = {
		_onBeforeInitialize: function _onBeforeInitialize(options) {
			this.elements = {};
	
			if (options.wrapper) {
				this.appendTo(options.wrapper);
				delete options.wrapper;
			}
		},
	
		_onInitialized: function _onInitialized() {
			if (Lib.isFunction(this._onBeforeRender)) this._onBeforeRender();
	
			if (!this.rendered) {
				if (Lib.isFunction(this._render)) this._render();
				this.rendered = true;
			}
	
			if (Lib.isFunction(this._addToDOM)) this._addToDOM();
	
			if (Lib.isFunction(this._onRendered)) this._onRendered();
		},
	
		appendTo: function appendTo(wrapper) {
			this.elements.wrapper = $(wrapper);
	
			if (this.rendered) {
				this.element.appendTo(this.elements.wrapper);
			} else {
				this._addToDOM = Lib.bind(this.appendTo, this, wrapper);
			}
	
			return this;
		},
	
		prependTo: function prependTo(wrapper) {
			this.elements.wrapper = $(wrapper);
	
			if (this.rendered) {
				this.element.prependTo(this.elements.wrapper);
			} else {
				this._addToDOM = Lib.bind(this.prependTo, this, wrapper);
			}
	
			return this;
		},
	
		on: function on() {
			if (this.element) {
				this.element.on.apply(this.element, arguments);
			}
	
			return this;
		}
	
		// Possibly add a destroy method
	};
	
	exports['default'] = DOM;
	module.exports = exports['default'];

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	// EVENTS - JQUERY FACADE
	
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
			if (this.rendered) {
				var _element;
	
				var _name = eventName;
	
				if (Lib.isString(this.eventSuffix)) {
					_name = [_name, this.eventSuffix].join('.');
				}
	
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}
	
				(_element = this.element).trigger.apply(_element, [_name].concat(args));
			}
		}
	};
	
	exports['default'] = Events;
	module.exports = exports['default'];

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	// STATE - JQUERY FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var State = {
		_onBeforeInitialize: function _onBeforeInitialize() {
			this._initializeState();
		},
	
		_initializeState: function _initializeState() {
			this._props = Lib.extend({}, this._defaultProperties);
			this._state = Lib.extend({}, this._defaultState);
		},
	
		// TODO: Determine whether this is the best place for this function to live
		_getOptions: function _getOptions(args) {
			var wrapper = undefined;
			var options = undefined;
	
			if (args.length === 1) {
				// TODO: Possibly determine what type of argument this is?
				options = args[0];
			} else if (args.length > 1) {
				wrapper = args[0];
				options = args[1];
			}
	
			return Lib.extend({ wrapper: wrapper }, this._defaultProperties, options);
		},
	
		setProperties: function setProperties(values) {
			return Lib.extend(this._props, values);
		},
	
		getProperty: function getProperty(key) {
			return this._props[key];
		},
	
		setState: function setState(values) {
			return Lib.extend(this._state, values);
		},
	
		getState: function getState(key) {
			return this._state[key];
		}
	};
	
	exports['default'] = State;
	module.exports = exports['default'];

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// BUTTON CONTROL - JQUERY FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreButton = __webpack_require__(151);
	
	var _coreButton2 = _interopRequireDefault(_coreButton);
	
	// Framework specific
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	// Children
	
	var _buttonView = __webpack_require__(154);
	
	var _buttonView2 = _interopRequireDefault(_buttonView);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	// Constructor
	var Button = function Button() {
		var _this = this;
	
		var options = this._getOptions(arguments);
	
		this.childOptions = {
			icon: options.icon,
			iconPosition: options.iconPosition,
			iconStyle: options.iconStyle,
			text: options.text
		};
	
		// If button has views, button is stateful
		if (options.views.length > 0) {
			options.views = options.views.map(function (child) {
				return Lib.extend({}, _this.childOptions, child);
			});
		}
	
		this._initialize(options);
	};
	
	var ButtonObject = {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = $('<button>');
		},
	
		_bindUIEvents: function _bindUIEvents() {
			this.element.on('click', $.proxy(this._handleClick, this));
		},
	
		_renderViews: function _renderViews() {
			var _this2 = this;
	
			var viewOptions = this.getProperty('views');
			var viewElements = [];
	
			var childOptions = Lib.extend({
				assistiveText: this.getProperty('assistiveText')
			}, this.childOptions);
	
			if (viewOptions.length > 0) {
				childOptions.view = 'notSelected';
			}
	
			var $buttonview = new _buttonView2['default'](childOptions);
	
			viewElements.push($buttonview.element);
	
			// Other views
			if (viewOptions.length > 0) {
				viewOptions.forEach(function (options) {
					$buttonview = new _buttonView2['default'](options);
					_this2.getProperty('children').push($buttonview);
					viewElements.push($buttonview.element);
				});
			}
	
			return viewElements;
		},
	
		_render: function _render() {
			var isStateful = this.getProperty('views').length > 0;
			var className = this._getClassNames('', isStateful);
	
			this.element.addClass(className).append(this._renderViews()).prop('disabled', this.getProperty('disabled'));
	
			return this.element;
		},
	
		_onRendered: function _onRendered() {
			this._bindUIEvents();
		},
	
		_handleClick: function _handleClick() {
			this.toggle();
		},
	
		_onToggled: function _onToggled() {
			var isStateful = this.getProperty('views').length > 0;
			this.elements.control[0].className = this._getClassNames('', isStateful || this.getProperty('selectable'));
		},
	
		_onEnabledOrDisabled: function _onEnabledOrDisabled() {
			if (this.getProperty('disabled')) {
				this.elements.control.attr('disabled', 'disabled');
			} else {
				this.elements.control.removeAttr('disabled');
			}
		}
	};
	
	exports.ButtonObject = ButtonObject;
	Lib.merge(Button.prototype, _coreButton2['default'], _events2['default'], _dom2['default'], _state2['default'], ButtonObject);
	Button = Lib.runHelpers('jquery', _coreButton.CONTROL, Button);
	
	exports['default'] = Button;

/***/ },
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
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// BUTTONVIEW OBJECT - JQUERY FACADE
	// Not meant to be directly bound to DOM
	
	// Core
	'use strict';
	
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
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	// Constructor
	var ButtonView = function ButtonView() {
		var options = this._getOptions(arguments);
	
		this._initialize(options);
	};
	
	var ButtonViewObject = {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = $('<span>');
		},
	
		_renderAssistiveText: function _renderAssistiveText() {
			if (this.getProperty('assistiveText')) {
				return $('<span>').addClass(this.cssClasses.ASSISTIVE_TEXT).text(this.getProperty('assistiveText'));
			}
		},
	
		_renderIcon: function _renderIcon(position) {
			var $icon = undefined;
	
			if (this.getProperty('icon') && this.getProperty('iconPosition') === position) {
				$icon = $('<svg ' + 'class="' + this._getIconClassNames() + '"><use xlink:href="' + Lib.getSVGPath(this.getProperty('icon')) + '"></use></svg>').attr('aria-hidden', 'true');
			}
	
			if (position === 'right' && this.getProperty('iconStyle') === 'icon-more') {
				$icon = $('<svg ' + 'class="' + this._getIconClassNames(this.buttonIconSizes['x-small']) + '"><use xlink:href="' + Lib.getSVGPath(this.moreIcon) + '"></use></svg>').attr('aria-hidden', 'true');
			}
	
			return $icon;
		},
	
		_render: function _render() {
			this.element.text(this.getProperty('text')).addClass(this.buttonStatefulViewStyles[this.getProperty('view')]).append(this._renderAssistiveText());
	
			this.element.append(this._renderIcon('right')).prepend(this._renderIcon('left'));
	
			return this.element;
		}
	};
	
	exports.ButtonViewObject = ButtonViewObject;
	Lib.merge(ButtonView.prototype, _coreButtonView2['default'], _dom2['default'], _state2['default'], ButtonViewObject);
	ButtonView = Lib.runHelpers('jquery', _coreButtonView.CONTROL, ButtonView);
	
	exports['default'] = ButtonView;

/***/ },
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
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// CHECKBOX CONTROL - JQUERY FACADE
	
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
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	// Template imports
	
	var _checkboxTemplate = __webpack_require__(159);
	
	var _checkboxTemplate2 = _interopRequireDefault(_checkboxTemplate);
	
	// Constructor
	
	var $ = Lib.global.jQuery || Lib.global.$;var Checkbox = function Checkbox() {
		var options = this._getOptions(arguments);
	
		this.inputSelector = 'input[type="checkbox"]';
		this.template = $(_checkboxTemplate2['default']);
	
		this._initialize(options);
	};
	
	// Prototype extension object
	var CheckboxObject = {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = this.template.clone();
			this.elements.input = this.element.find(this.inputSelector);
			this.elements.label = this.element.find('.' + this.cssClasses.LABEL);
		},
	
		_bindUIEvents: function _bindUIEvents() {
			this.elements.input.on('change', $.proxy(this.toggle, this));
		},
	
		_render: function _render() {
			this.elements.input.attr('value', this.getProperty('value'));
			this.elements.input.attr('checked', this.getProperty('checked'));
			this.elements.label.append(this.getProperty('text'));
	
			this._onEnabledOrDisabled();
	
			return this.element;
		},
	
		_onRendered: function _onRendered() {
			this._bindUIEvents();
		},
	
		_onEnabledOrDisabled: function _onEnabledOrDisabled() {
			var disabled = this.getProperty('disabled');
			var disabledAttr = 'disabled';
	
			if (disabled) {
				this.elements.input.attr(disabledAttr, disabledAttr);
			} else {
				this.elements.input.removeAttr(disabledAttr);
			}
		},
	
		_onToggled: function _onToggled(checked) {
			this.elements.input.prop('checked', checked);
		}
	};
	
	exports.CheckboxObject = CheckboxObject;
	// Merging into prototype
	Lib.merge(Checkbox.prototype, _coreCheckbox2['default'], _events2['default'], _dom2['default'], _state2['default'], CheckboxObject);
	
	// Framework setup
	Checkbox = Lib.runHelpers('jquery', _coreCheckbox.CONTROL, Checkbox);
	
	// Exporting
	exports['default'] = Checkbox;

/***/ },
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
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// TODO: figure out how to use base.LABEL and base.NAMESPACE throughout template
	"use strict";

	var _taggedTemplateLiteral = __webpack_require__(160)["default"];

	var _String$raw = __webpack_require__(166)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["\n<label class=\"slds-checkbox\"><input name=\"checkbox\" type=\"checkbox\" /><span class=\"slds-checkbox--faux\"></span><span class=\"slds-form-element__label\"></span>\n</label>\n"], ["\n<label class=\"slds-checkbox\"><input name=\"checkbox\" type=\"checkbox\" /><span class=\"slds-checkbox--faux\"></span><span class=\"slds-form-element__label\"></span>\n</label>\n"]);

	exports["default"] = _String$raw(_templateObject);
	module.exports = exports["default"];

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$freeze = __webpack_require__(161)["default"];
	
	var _Object$defineProperties = __webpack_require__(164)["default"];
	
	exports["default"] = function (strings, raw) {
	  return _Object$freeze(_Object$defineProperties(strings, {
	    raw: {
	      value: _Object$freeze(raw)
	    }
	  }));
	};
	
	exports.__esModule = true;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(162), __esModule: true };

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(163);
	module.exports = __webpack_require__(17).Object.freeze;

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(42);
	
	__webpack_require__(143)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(it) : it;
	  };
	});

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(165), __esModule: true };

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(20);
	module.exports = function defineProperties(T, D){
	  return $.setDescs(T, D);
	};

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(167), __esModule: true };

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(168);
	module.exports = __webpack_require__(17).String.raw;

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var $def      = __webpack_require__(15)
	  , toIObject = __webpack_require__(35)
	  , toLength  = __webpack_require__(48);
	
	$def($def.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl   = toIObject(callSite.raw)
	      , len   = toLength(tpl.length)
	      , $$    = arguments
	      , $$len = $$.length
	      , res   = []
	      , i     = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < $$len)res.push(String($$[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// COMBOBOX CONTROL - JQUERY FACADE
	
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
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _svg = __webpack_require__(175);
	
	var _svg2 = _interopRequireDefault(_svg);
	
	var _picklistPicklist = __webpack_require__(176);
	
	// Template imports
	
	var _comboboxTemplate = __webpack_require__(178);
	
	var _comboboxTemplate2 = _interopRequireDefault(_comboboxTemplate);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	var Combobox = function Combobox() {
		var options = this._getOptions(arguments);
	
		this.template = $(_comboboxTemplate2['default']);
		this._closeOnClick = $.proxy(this._closeOnClick, this);
	
		this._initialize(options);
	};
	
	var ComboboxObject = {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = this.template.clone();
			this._initElements();
		},
	
		_initElements: function _initElements() {
			this.elements.button = this.element.find('.' + this.cssClasses.TOGGLE);
			this.elements.input = this.element.find('.' + this.cssClasses.INPUT);
			this.elements.dropdown = this.element.find('.' + this.cssClasses.MENU);
			this.elements.dropdownMenu = this.element.find('.' + this.cssClasses.LIST);
		},
	
		_bindUIEvents: function _bindUIEvents() {
			this.elements.button.on('click', $.proxy(this._handleClicked, this));
			this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
			this.elements.input.on('change', $.proxy(this._handleChanged, this)).on('click', function (e) {
				e.stopPropagation();
			});
			// TODO: Find the right element for these keypress triggers
			this.elements.dropdown.on('keydown', $.proxy(this._handleKeyDown, this));
			this.elements.dropdown.on('keypress', $.proxy(this._handleKeyPressed, this));
		},
	
		_render: function _render() {
			var selection = this._getSelection();
	
			// Configure the button
			var disabled = !!this.getProperty('disabled');
			this.elements.button.prop('disabled', disabled);
	
			// Show the current selection if there is one
			this.elements.input.val(selection.getText());
	
			this._renderMenu(this.elements);
	
			return this.element;
		},
	
		_onSelected: function _onSelected(item) {
			if (this.rendered) {
				this.elements.input.val(item.getText());
	
				this._addCheckmark(this.elements);
			}
		},
	
		_onEnabledOrDisabled: function _onEnabledOrDisabled() {
			if (this.rendered) {
				var disabled = !!this.getProperty('disabled');
	
				this.elements.input.prop('disabled', disabled);
				this.elements.button.prop('disabled', disabled);
			}
		},
	
		_resetWidth: function _resetWidth(width) {
			if (this.rendered) {
				this.elements.dropdownMenu.width(width);
			}
		},
	
		_handleChanged: function _handleChanged() {
			var value = {};
	
			// TODO: Not SLDS related, I've realized this model won't work perfectly with all data accessor types - might want to consider this
			value[this.accessors.textProp()] = this.elements.input.val();
	
			this.setSelection(value);
		}
	};
	
	exports.ComboboxObject = ComboboxObject;
	Lib.merge(Combobox.prototype, _coreCombobox2['default'], _events2['default'], _dom2['default'], _state2['default'], _svg2['default'], _picklistPicklist.PicklistObject, ComboboxObject);
	
	Combobox = Lib.runHelpers('jquery', _coreCombobox.CONTROL, Combobox, {
		legacyMethods: _picklistPicklist.legacyMethods
	});
	
	exports['default'] = Combobox;

/***/ },
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
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// SVG HELPER METHODS - JQUERY FACADE
	
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
	
	// Third party
	
	var _classnames = __webpack_require__(146);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var $ = Lib.global.jQuery || Lib.global.$;var SvgObject = {
	
		_getSVGPath: function _getSVGPath(iconString) {
			// TODO: Evaluate best way to do this and clean this up more
			var iconPaths = Lib.getIconPaths();
			var icon = Lib.isString(iconString) && iconString.split('.');
	
			if (icon.length === 2) {
				var iconPath = iconPaths[icon[0]];
	
				if (iconPath) {
					return [iconPath, icon[1]].join('#');
				}
			}
		},
	
		_getIconClassNames: function _getIconClassNames(extraClasses) {
			var iconBaseClass = undefined;
	
			if (this.getProperty('view')) {
				iconBaseClass = this.cssClasses.STATEFUL_ICON;
			} else {
				iconBaseClass = this.cssClasses.ICON;
			}
	
			return (0, _classnames2['default'])(iconBaseClass, extraClasses, !!this.getProperty('text') && this.childIconStyles[this.getProperty('iconPosition')]);
		},
	
		_renderIcon: function _renderIcon(iconString, extraClasses) {
			var $icon = undefined;
			var icon = iconString || this.getProperty('icon');
	
			if (icon) {
				$icon = $('<svg class="' + this._getIconClassNames(extraClasses) + '"><use xlink:href="' + this._getSVGPath(icon) + '"></use></svg>').attr('aria-hidden', 'true');
			}
	
			return $icon || '';
		}
	};
	
	exports.SvgObject = SvgObject;
	exports['default'] = SvgObject;

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// PICKLIST CONTROL - JQUERY FACADE
	
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
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _svg = __webpack_require__(175);
	
	var _svg2 = _interopRequireDefault(_svg);
	
	// Template imports
	
	var _picklistTemplate = __webpack_require__(177);
	
	var _picklistTemplate2 = _interopRequireDefault(_picklistTemplate);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	var Picklist = function Picklist() {
		var options = this._getOptions(arguments);
	
		this.template = $(_picklistTemplate2['default']);
		this._closeOnClick = $.proxy(this._closeOnClick, this);
	
		this._initialize(options);
	};
	
	var PicklistObject = {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = this.template.clone();
			this._initElements();
		},
	
		_initElements: function _initElements() {
			this.elements.button = this.element.find('.' + this.cssClasses.TOGGLE);
			this.elements.hiddenField = this.element.find('input.slds-hide');
			this.elements.label = this.elements.button.find('.' + this.cssClasses.LABEL);
			this.elements.dropdown = this.element.find('.' + this.cssClasses.MENU);
			this.elements.dropdownMenu = this.element.find('.' + this.cssClasses.LIST);
		},
	
		_bindUIEvents: function _bindUIEvents() {
			this.elements.button.on('click', $.proxy(this._handleClicked, this));
			this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
			this.element.on('keydown', $.proxy(this._handleKeyDown, this));
			this.element.on('keypress', $.proxy(this._handleKeyPressed, this));
		},
	
		_renderItem: function _renderItem(item) {
			var disabled = item.getDisabled();
			var $li = this.template.find('li').clone();
	
			$li.data({
				item: item._item
			});
			$li.prop('disabled', disabled);
	
			var $a = $li.find('a');
			$a.text(item.getText());
	
			if (disabled) {
				$a.attr('aria-disabled', true);
			}
	
			var icon = item.getIcon();
	
			if (Lib.isString(icon) && icon.length > 0) {
				var $icon = this._renderIcon(icon, 'slds-icon--small slds-icon--right');
				$a.append($icon);
			}
	
			return $li;
		},
	
		_renderHeader: function _renderHeader(item) {
			return $('<li class="' + this.cssClasses.HEADER + '"><span class="' + this.cssClasses.HEADERTEXT + '">' + item.getText() + '</span></li>');
		},
	
		_renderDivider: function _renderDivider() {
			return $('<li class="' + this.cssClasses.DIVIDER + '" role="separator"></li>');
		},
	
		_renderMenu: function _renderMenu(elements) {
			var _this = this;
	
			// Empty the menu from the template
			elements.dropdownMenu.empty();
	
			// Building the menu items
			this._collection.forEach(function (item) {
				var $li = undefined;
				var func = undefined;
				var funcMap = {
					header: _this._renderHeader,
					divider: _this._renderDivider,
					item: _this._renderItem
				};
	
				func = funcMap[item.getType()] || _this._renderItem;
	
				$li = func.call(_this, item);
	
				elements.dropdownMenu.append($li);
			});
	
			this._addCheckmark(elements);
		},
	
		_render: function _render() {
			var strings = this.getState('strings');
			var selection = this._getSelection();
			var elements = this.elements;
	
			// Configure the button
			var disabled = !!this.getProperty('disabled');
			elements.button.prop('disabled', disabled);
	
			// Show the current selection if there is one
			var selectionName = selection.getText() || strings.NONE_SELECTED;
			elements.label.text(selectionName);
			elements.hiddenField.val(selection.getText());
	
			this._renderMenu(elements);
	
			if (this._collection._data.length === 0) {
				this.disable();
			}
	
			return this.element;
		},
	
		_onRendered: function _onRendered() {
			// Get the menu items for keyboard nav
			this.elements.menuItems = [];
			var menuItems = this.elements.dropdownMenu[0].getElementsByTagName('li');
	
			for (var i = 0; i < menuItems.length; i++) {
				var menuItem = menuItems[i].getElementsByTagName('a');
	
				if (!menuItems[i].disabled && menuItem.length === 1) {
					this.elements.menuItems.push(menuItem[0]);
				}
			}
	
			this._bindUIEvents();
		},
	
		_onSelected: function _onSelected(item) {
			if (this.rendered) {
				var strings = this.getState('strings');
	
				this.elements.hiddenField.val(item.getText());
				this.elements.label.text(item.getText() || strings.NONE_SELECTED);
	
				this._addCheckmark(this.elements);
			}
		},
	
		_onExpandOrCollapse: function _onExpandOrCollapse() {
			if (this.rendered) {
				var isOpen = this.getState('isOpen');
	
				this.elements.dropdown.toggleClass('slds-hide', !isOpen);
				this.elements.button.attr('aria-expanded', isOpen);
			}
		},
	
		_onEnabledOrDisabled: function _onEnabledOrDisabled() {
			if (this.rendered) {
				var disabled = !!this.getProperty('disabled');
	
				this.elements.dropdown.toggleClass('slds-hide', disabled);
				this.elements.button.prop('disabled', disabled);
			}
		},
	
		_resetWidth: function _resetWidth(width) {
			if (this.rendered) {
				this.elements.button.width(width);
				this.elements.dropdownMenu.width(width);
			}
		},
	
		_handleClicked: function _handleClicked(e) {
			this._openToggleEvent(e.originalEvent);
		},
	
		_handleMenuItemSelected: function _handleMenuItemSelected(e) {
			e.preventDefault();
	
			var $a = $(e.currentTarget);
			var $li = $a.parent('li');
	
			if (!$li.prop('disabled')) {
				this.setSelection($li.data('item'));
			}
		},
	
		_handleKeyDown: function _handleKeyDown(e) {
			var key = undefined;
	
			if (/(38)/.test(e.which)) {
				key = 'ArrowUp';
			} else if (/(40)/.test(e.which)) {
				key = 'ArrowDown';
			}
	
			if (key) {
				e.preventDefault();
				this._keyboardNav(key, this.elements.menuItems);
			}
		},
	
		_handleKeyPressed: function _handleKeyPressed(e) {
			var key = String.fromCharCode(e.which);
	
			if (key && key.length === 1) {
				e.preventDefault();
				this._keyboardNav(key, this.elements.menuItems);
			}
		},
	
		_addCheckmark: function _addCheckmark(elements) {
			var selection = this.getSelection();
			var $li = undefined;
	
			if (selection) {
				elements.dropdownMenu.find('li').each(function () {
					if ($(this).data('item') === selection) {
						$li = $(this);
					}
				});
			}
	
			if ($li) {
				$li.parent().find('.slds-is-selected').removeClass('slds-is-selected').find('svg.slds-icon--left').remove();
	
				$li.addClass('slds-is-selected');
				$li.find('a').prepend(this._renderIcon('standard.task2', 'slds-icon--small slds-icon--left'));
			}
		}
	};
	
	exports.PicklistObject = PicklistObject;
	Lib.merge(Picklist.prototype, _corePicklist2['default'], _events2['default'], _dom2['default'], _state2['default'], _svg2['default'], PicklistObject);
	
	// LEGACY METHODS
	//
	
	// aliased by getValue and selectedItem
	function selectedItem() {
		var selection = this._getSelection().get();
	
		if (Lib.isObject(selection)) {
			selection = Lib.extend({}, selection);
	
			selection.selected = true;
			delete selection._itemType;
		} else {
			selection = null;
		}
	
		return selection;
	}
	
	// TODO: add emptyLabelHTML that then overrides NONE_SELECTED
	
	var legacyMethods = {
		getValue: selectedItem,
		selectedItem: selectedItem,
	
		selectByValue: function selectByValue(value) {
			return this.setSelection({ value: value });
		},
	
		selectByText: function selectByText(text) {
			return this.setSelection(function (item) {
				var itemText = item && item.getText();
	
				return item && Lib.isString(itemText) && Lib.isString(text) && itemText.toLowerCase() === text.toLowerCase();
			});
		},
	
		selectBySelector: function selectBySelector(selector) {
			var $item = $(selector);
			return this.setSelection($item.data('item'));
		},
	
		selectByIndex: function selectByIndex(index) {
			var i = index;
	
			if (!Lib.isNumber(i)) {
				i = parseInt(index, 10);
			}
			return this.setSelectionByIndex(i);
		}
	};
	
	exports.legacyMethods = legacyMethods;
	Picklist = Lib.runHelpers('jquery', _corePicklist.CONTROL, Picklist, {
		legacyMethods: legacyMethods
	});
	
	exports['default'] = Picklist;

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _taggedTemplateLiteral = __webpack_require__(160)["default"];

	var _String$raw = __webpack_require__(166)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["\n<div class=\"slds-form-element\">\n  <div aria-expanded=\"true\" class=\"slds-picklist\">\n    <button class=\"slds-button slds-button--neutral slds-picklist__label\" aria-haspopup=\"true\">\n      <span class=\"slds-truncate\">Select an Option</span>\n      <svg aria-hidden=\"true\" class=\"slds-icon\">\n        <use xlink:href=\"/assets/design-system/icons/utility-sprite/svg/symbols.svg#down\"></use>\n      </svg>\n    </button>\n    <div class=\"slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu slds-hide\">\n      <ul class=\"slds-dropdown__list\" role=\"menu\">\n\t\t<li href=\"#\" class=\"slds-dropdown__item slds-has-icon--left\"><a href=\"#\" class=\"slds-truncate\" role=\"menuitemradio\"></a></li>\n      </ul>\n    </div>\n\t<input class=\"slds-hide\" readonly aria-hidden=\"true\" type=\"text\"></input>\n  </div>\n</div>\n"], ["\n<div class=\"slds-form-element\">\n  <div aria-expanded=\"true\" class=\"slds-picklist\">\n    <button class=\"slds-button slds-button--neutral slds-picklist__label\" aria-haspopup=\"true\">\n      <span class=\"slds-truncate\">Select an Option</span>\n      <svg aria-hidden=\"true\" class=\"slds-icon\">\n        <use xlink:href=\"/assets/design-system/icons/utility-sprite/svg/symbols.svg#down\"></use>\n      </svg>\n    </button>\n    <div class=\"slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu slds-hide\">\n      <ul class=\"slds-dropdown__list\" role=\"menu\">\n\t\t<li href=\"#\" class=\"slds-dropdown__item slds-has-icon--left\"><a href=\"#\" class=\"slds-truncate\" role=\"menuitemradio\"></a></li>\n      </ul>\n    </div>\n\t<input class=\"slds-hide\" readonly aria-hidden=\"true\" type=\"text\"></input>\n  </div>\n</div>\n"]);

	exports["default"] = _String$raw(_templateObject);
	module.exports = exports["default"];

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _taggedTemplateLiteral = __webpack_require__(160)["default"];

	var _String$raw = __webpack_require__(166)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["\n<div class=\"slds-combobox slds-form-element\">\n  <div aria-expanded=\"true\" class=\"slds-picklist\">\n    <button class=\"slds-button slds-button--neutral slds-picklist__label\" aria-haspopup=\"true\" style=\"padding-left:0\">\n      <div class=\"slds-form-element__control\">\n        <input type=\"text\" class=\"slds-input\" style=\"border:none;border-right:1px solid #d8dde6;border-radius:.25rem 0 0 .25rem\" />\n      </div>\n      <svg aria-hidden=\"true\" class=\"slds-icon\" style=\"right:.7rem\">\n        <use xlink:href=\"/assets/design-system/icons/utility-sprite/svg/symbols.svg#down\"></use>\n      </svg>\n    </button>\n    <div class=\"slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu slds-hide\">\n      <ul class=\"slds-dropdown__list\" role=\"menu\">\n\t\t<li href=\"#\" class=\"slds-dropdown__item slds-has-icon--left\"><a href=\"#\" class=\"slds-truncate\" role=\"menuitemradio\"></a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n"], ["\n<div class=\"slds-combobox slds-form-element\">\n  <div aria-expanded=\"true\" class=\"slds-picklist\">\n    <button class=\"slds-button slds-button--neutral slds-picklist__label\" aria-haspopup=\"true\" style=\"padding-left:0\">\n      <div class=\"slds-form-element__control\">\n        <input type=\"text\" class=\"slds-input\" style=\"border:none;border-right:1px solid #d8dde6;border-radius:.25rem 0 0 .25rem\" />\n      </div>\n      <svg aria-hidden=\"true\" class=\"slds-icon\" style=\"right:.7rem\">\n        <use xlink:href=\"/assets/design-system/icons/utility-sprite/svg/symbols.svg#down\"></use>\n      </svg>\n    </button>\n    <div class=\"slds-dropdown slds-dropdown--left slds-dropdown--small slds-dropdown--menu slds-hide\">\n      <ul class=\"slds-dropdown__list\" role=\"menu\">\n\t\t<li href=\"#\" class=\"slds-dropdown__item slds-has-icon--left\"><a href=\"#\" class=\"slds-truncate\" role=\"menuitemradio\"></a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n"]);

	exports["default"] = _String$raw(_templateObject);
	module.exports = exports["default"];

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// PICKLIST CONTROL - JQUERY FACADE
	
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
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	// Template imports
	
	var _dataTableTemplate = __webpack_require__(182);
	
	var _dataTableTemplate2 = _interopRequireDefault(_dataTableTemplate);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	var DataTable = function DataTable() {
		var options = this._getOptions(arguments);
	
		var $html = $('<i />').append(_dataTableTemplate2['default']);
		this.template = $html.find('table');
	
		this._initialize(options);
	};
	
	var DataTableObject = {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = this.template.clone();
		},
	
		_bindUIEvents: function _bindUIEvents() {
			// this.elements.button.on('click', $.proxy(this._handleClicked, this));
			// this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
			// this.elements.wrapper.on('keydown', $.proxy(this._handleKeyDown, this));
			// this.elements.wrapper.on('keypress', $.proxy(this._handleKeyPressed, this));
		},
	
		_renderItem: function _renderItem(propertyName, item) {
			return $('<td/>', {
				'data-label': propertyName
			}).append($('<span/>', {
				'class': 'slds-truncate',
				text: item.get(propertyName)
			}));
		},
	
		_renderHeader: function _renderHeader(item, classes) {
			var $th = $('<th/>', {
				'class': 'col ' + classes
			}).append($('<span/>', {
				'class': 'slds-truncate',
				text: item.displayName
			}));
	
			return $th;
		},
	
		_render: function _render() {
			var _this = this;
	
			// Get the template
			var $el = this.element;
			$el.addClass(this._getClassNames(this.getProperty('styles')));
	
			var $theadRow = $el.find('thead tr.slds-text-heading--label');
			var $tbody = $el.find('tbody');
	
			this.getProperty('columns').forEach(function (item) {
				var styles = {
					sortable: item.sortable,
					hintParent: item.hintParent
				};
				var classes = _this._getClassNames(styles);
				$theadRow.append(_this._renderHeader(item, classes));
			});
	
			// For each item in the collection
			this._collection.forEach(function (item) {
				var $row = $('<tr/>', { 'class': 'slds-hint-parent' });
	
				// For each column marked for render, create a cell for that value on this data node
				_this.getProperty('columns').forEach(function (column) {
					$row.append(_this._renderItem(column.propertyName, item));
				});
	
				$tbody.append($row);
			});
	
			return this.element;
		},
	
		_onRendered: function _onRendered() {
			this._bindUIEvents();
		}
	};
	
	exports.DataTableObject = DataTableObject;
	Lib.merge(DataTable.prototype, _coreDataTable2['default'], _events2['default'], _dom2['default'], _state2['default'], DataTableObject);
	DataTable = Lib.runHelpers('jquery', _coreDataTable.CONTROL, DataTable);
	
	exports['default'] = DataTable;

/***/ },
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
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _taggedTemplateLiteral = __webpack_require__(160)["default"];

	var _String$raw = __webpack_require__(166)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["\n<table class=\"\">\n  <thead>\n    <tr class=\"slds-text-heading--label\"></tr>\n  </thead>\n  <tbody>\n  </tbody>\n</table>\n"], ["\n<table class=\"\">\n  <thead>\n    <tr class=\"slds-text-heading--label\"></tr>\n  </thead>\n  <tbody>\n  </tbody>\n</table>\n"]);

	exports["default"] = _String$raw(_templateObject);

	// TH
	// Sortable
	// <th class="slds-is-sortable" scope="col">
	//   <span class="slds-truncate">Opportunity Name</span>
	//   <button class="slds-button slds-button--icon-bare slds-button--icon-border-small">
	//     <svg aria-hidden="true" class="slds-button__icon slds-button__icon--small">
	//       <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"></use>
	//     </svg>
	//     <span class="slds-assistive-text">Sort</span>
	//   </button>
	// </th>

	// Non-sortable
	// <th scope="col">
	//   <span class="slds-truncate">Account Name</span>
	// </th>

	// TD
	// Row selector
	// <td class="slds-row-select">
	//   <label class="slds-checkbox" for="select-row1">
	//     <input name="select-row1" type="checkbox" id="select-row1" />
	//     <span class="slds-checkbox--faux"></span>
	//     <span class="slds-form-element__label slds-assistive-text">select row1</span>
	//   </label>
	// </td>

	// Normal
	// <td data-label="activity">
	//   <span class="slds-truncate">4/14/2015</span>
	// </td>
	module.exports = exports["default"];

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	// DROPDOWN CONTROL - JQUERY FACADE
	
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
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _svg = __webpack_require__(175);
	
	var _svg2 = _interopRequireDefault(_svg);
	
	var _picklistPicklist = __webpack_require__(176);
	
	// Children
	
	var _buttonButton = __webpack_require__(150);
	
	var _buttonButton2 = _interopRequireDefault(_buttonButton);
	
	// Template imports
	
	var _dropdownTemplate = __webpack_require__(185);
	
	var _dropdownTemplate2 = _interopRequireDefault(_dropdownTemplate);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	var Dropdown = function Dropdown() {
		var options = this._getOptions(arguments);
	
		this.template = $(_dropdownTemplate2['default']);
		this._closeOnClick = $.proxy(this._closeOnClick, this);
	
		this._initialize(options);
	};
	
	var DropdownObject = {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = this.template.clone();
			this._initElements();
		},
	
		_initElements: function _initElements() {
			this.elements.dropdown = this.element.find('.' + this.cssClasses.MENU);
			this.elements.dropdownMenu = this.element.find('.' + this.cssClasses.LIST);
		},
	
		_bindUIEvents: function _bindUIEvents() {
			this.elements.dropdownMenu.on('click', 'a', $.proxy(this._handleMenuItemSelected, this));
		},
	
		_render: function _render() {
			// Configure the button
			var icon = undefined;
	
			if (this.getProperty('swapIcon')) {
				var selection = this._getSelection();
				icon = !!selection && selection.getIcon();
			}
	
			icon = icon || this.getProperty('icon');
	
			this.button = new _buttonButton2['default']({
				icon: icon,
				iconStyle: 'icon-more'
			});
	
			this.button.prependTo(this.element);
	
			// Render the menu
			this._renderMenu(this.elements);
	
			if (this._collection._data.length === 0) {
				this.disable();
			}
	
			return this.element;
		},
	
		_onSelected: function _onSelected(item) {
			if (this.rendered) {
				this._addCheckmark(this.elements);
				this._swapIcon(item.getIcon());
			}
		},
	
		_onExpandOrCollapse: function _onExpandOrCollapse() {
			if (this.rendered) {
				var isOpen = this.getState('isOpen');
	
				this.elements.trigger.attr('aria-expanded', isOpen);
			}
		},
	
		_swapIcon: function _swapIcon(iconString) {
			var icon = iconString || this.getProperty('icon');
	
			if (Lib.isString(icon) && icon.length > 0 && this.getProperty('swapIcon')) {
				// TODO: Implement this, which will require an update to Button
			}
		}
	};
	
	exports.DropdownObject = DropdownObject;
	Lib.merge(Dropdown.prototype, _coreDropdown2['default'], _events2['default'], _dom2['default'], _state2['default'], _svg2['default'], _picklistPicklist.PicklistObject, DropdownObject);
	
	Dropdown = Lib.runHelpers('jquery', _coreDropdown.CONTROL, Dropdown, {
		legacyMethods: _picklistPicklist.legacyMethods
	});
	
	exports['default'] = Dropdown;

/***/ },
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
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _taggedTemplateLiteral = __webpack_require__(160)["default"];

	var _String$raw = __webpack_require__(166)["default"];

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _templateObject = _taggedTemplateLiteral(["\n<div class=\"slds-dropdown-trigger\">\n\t<div class=\"slds-dropdown slds-dropdown--left slds-dropdown--menu\">\n\t\t<ul class=\"slds-dropdown__list\" role=\"menu\">\n\t\t\t<li href=\"#\" class=\"slds-dropdown__item slds-has-icon--left\"><a href=\"#\" class=\"slds-truncate\" role=\"menuitemradio\"></a></li>\n\t\t</ul>\n\t</div>\n</div>\n"], ["\n<div class=\"slds-dropdown-trigger\">\n\t<div class=\"slds-dropdown slds-dropdown--left slds-dropdown--menu\">\n\t\t<ul class=\"slds-dropdown__list\" role=\"menu\">\n\t\t\t<li href=\"#\" class=\"slds-dropdown__item slds-has-icon--left\"><a href=\"#\" class=\"slds-truncate\" role=\"menuitemradio\"></a></li>\n\t\t</ul>\n\t</div>\n</div>\n"]);

	exports["default"] = _String$raw(_templateObject);
	module.exports = exports["default"];

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// NOTIFICATION CONTROL - JQUERY FACADE
	
	// Core
	'use strict';
	
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
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	// Template imports
	
	var _template = __webpack_require__(189);
	
	var _template2 = _interopRequireDefault(_template);
	
	// Constructor
	
	var $ = Lib.global.jQuery || Lib.global.$;var Notification = function Notification() {
		var options = this._getOptions(arguments);
	
		this.template = $(_template2['default']);
	
		this._initialize(options);
	};
	
	var NotificationObject = {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = this.template.clone();
		},
	
		// TODO: Internationalize
		// TODO: The patterns here are a little different than the rest of our controls
		_render: function _render() {
			var classNames = this._getClassNames();
	
			// Load template
			var $el = this.element;
	
			// Update theme
			$el.addClass(classNames);
	
			// Replace notification text
			// TODO: Should this also use the contents of the original? It's different in jQuery becasue in React 'Children' is actually just another prop
			$el.find('.notify-text').text(this.getProperty('text'));
	
			// Events
			$el.find('.slds-notify__close').on('click', $.proxy(this.hide, this));
		},
	
		_onShow: function _onShow() {
			this.element.removeClass(this.cssClasses.HIDDEN);
		},
	
		_onHide: function _onHide() {
			this.element.addClass(this.cssClasses.HIDDEN);
		}
	};
	
	exports.NotificationObject = NotificationObject;
	Lib.merge(Notification.prototype, _coreNotification2['default'], _events2['default'], _dom2['default'], _state2['default'], NotificationObject);
	Notification = Lib.runHelpers('jquery', _coreNotification.CONTROL, Notification);
	
	exports['default'] = Notification;

/***/ },
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
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _taggedTemplateLiteral = __webpack_require__(160)["default"];

	var _String$raw = __webpack_require__(166)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["\n<div class=\"slds-notify\" role=\"alert\">\n  <span class=\"slds-assistive-text\">Info</span>\n  <button class=\"slds-button slds-button--icon-inverse slds-notify__close\">\n    <svg aria-hidden=\"true\" class=\"slds-button__icon\">\n      <use xlink:href=\"/assets/design-system/icons/action-sprite/svg/symbols.svg#close\"></use>\n    </svg>\n    <span class=\"slds-assistive-text\">Close</span>\n  </button>\n  <h2 class=\"notify-text\">Base System Alert</h2>\n</div>\n"], ["\n<div class=\"slds-notify\" role=\"alert\">\n  <span class=\"slds-assistive-text\">Info</span>\n  <button class=\"slds-button slds-button--icon-inverse slds-notify__close\">\n    <svg aria-hidden=\"true\" class=\"slds-button__icon\">\n      <use xlink:href=\"/assets/design-system/icons/action-sprite/svg/symbols.svg#close\"></use>\n    </svg>\n    <span class=\"slds-assistive-text\">Close</span>\n  </button>\n  <h2 class=\"notify-text\">Base System Alert</h2>\n</div>\n"]);

	exports["default"] = _String$raw(_templateObject);
	module.exports = exports["default"];

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	// PILLBOX CONTROL - JQUERY FACADE
	
	// Core
	'use strict';
	
	var _Promise = __webpack_require__(6)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _corePillbox = __webpack_require__(191);
	
	var _corePillbox2 = _interopRequireDefault(_corePillbox);
	
	// Framework Specific
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	// Template imports
	
	var _pillboxTemplate = __webpack_require__(192);
	
	var _pillboxTemplate2 = _interopRequireDefault(_pillboxTemplate);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	var Pillbox = function Pillbox() {
		var options = this._getOptions(arguments);
	
		this.template = $(_pillboxTemplate2['default']);
	
		this._initialize(options);
	};
	
	Lib.merge(Pillbox.prototype, _corePillbox2['default'], _events2['default'], _dom2['default'], _state2['default'], {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = this.template.clone();
			this.elements.group = this.element.find('.slds-pill-group');
			this.elements.input = this.element.find('.slds-pill-add-item');
			this.elements.inputWrap = this.element.find('.slds-pill-input-wrap');
			this.elements.pillTemplate = this.elements.group.find('.slds-pill').remove();
		},
	
		_bindUIEvents: function _bindUIEvents() {
			this.element.on('keyup.fu.tree', '.slds-pill-add-item', $.proxy(this._keyUp, this));
			this.element.on('click.fu.tree', '.slds-pill > .slds-button', $.proxy(this._itemClicked, this));
		},
	
		_render: function _render() {
			this._renderSelection();
	
			return this.element;
		},
	
		_onRendered: function _onRendered() {
			this._bindUIEvents();
		},
	
		_keyUp: function _keyUp(e) {
			var inputValue = undefined;
	
			if (this._isAcceptKeyCode(e.keyCode)) {
				inputValue = this.elements.input.val();
	
				// If commas are an accepted keycode clean inputValue of commas
				if (e.keyCode === 188 && this._isAcceptKeyCode(188)) {
					inputValue = inputValue.replace(/[ ]*\,[ ]*/, '');
				}
	
				// TODO: This will need to be updated when typeahead feature is added
				// TODO: This won't really work with data accessors other than vanilla js
				this.selectItem({
					text: inputValue,
					value: inputValue
				});
	
				this._clearInput();
			}
		},
	
		// TODO: Do we still need this part for SLDS? I don't want to lose the code but I also don't want things to be over-complicated
		_onAdd: function _onAdd(newSelection) {
			var _this = this;
	
			return new _Promise(function (resolve) {
				var onAdd = _this.getProperty('onAdd');
	
				if (Lib.isFunction(onAdd)) {
					onAdd([newSelection._item], function (itemsToSelect) {
						resolve(itemsToSelect);
					});
				} else {
					resolve();
				}
			});
		},
	
		_onRemove: function _onRemove(newDeselection) {
			var _this2 = this;
	
			return new _Promise(function (resolve) {
				var onRemove = _this2.getProperty('onRemove');
	
				if (onRemove) {
					onRemove([newDeselection._item], function (itemsToDeselect) {
						resolve(itemsToDeselect);
					});
				} else {
					resolve();
				}
			});
		},
	
		_onEnabledOrDisabled: function _onEnabledOrDisabled(props) {
			this.element.toggleClass(this.cssClasses.DISABLED, props.disabled);
			this.elements.inputWrap.toggle(!props.disabled);
		},
	
		_itemClicked: function _itemClicked(e) {
			var item = $(e.currentTarget).parent().data('item');
	
			if (!this.getProperty('disabled')) {
				this.deselectItem(item);
			}
		},
	
		_clearInput: function _clearInput() {
			this.elements.input.val('');
		},
	
		_onSelected: function _onSelected() {
			this._renderSelection();
		},
	
		_onDeselected: function _onDeselected() {
			this._renderSelection();
		},
	
		_renderPill: function _renderPill(pill) {
			var $pill = this.elements.pillTemplate.clone();
	
			$pill.find('.slds-pill__label').text(pill.getText());
			$pill.data({
				item: pill.get()
			});
	
			return $pill;
		},
	
		_renderSelection: function _renderSelection() {
			var self = this;
			var elements = [];
	
			this._getSelectedItems().forEach(function (pill) {
				elements.push(self._renderPill(pill));
			});
	
			this.elements.group.find('.slds-pill').remove();
			this.elements.group.prepend(elements);
		}
	});
	
	var legacyMethods = {
		addItems: function addItems(index, items) {
			var baseZeroIndex = index - 1;
	
			this.selectItems(items, baseZeroIndex);
	
			return this.elements.control;
		},
	
		removeItems: function removeItems(index, count) {
			var selection = this._getSelectedItems().get();
			var baseZeroIndex = index - 1;
	
			this.deselectItems(selection.slice(baseZeroIndex, baseZeroIndex + count));
	
			return this.elements.control;
		},
	
		items: function items() {
			var selection = this._getSelectedItems();
	
			return selection.get();
		},
	
		itemCount: function itemCount() {
			var selection = this._getSelectedItems();
	
			return selection.get().length;
		},
	
		readonly: function readonly() {
			this.disable();
		},
	
		removeBySelector: function removeBySelector($item) {
			var item = $item.data('item');
	
			this.deselectItem(item);
	
			return this.elements.control;
		},
	
		removeByText: function removeByText(text) {
			var _this3 = this;
	
			var selection = this._getSelectedItems().get();
	
			selection.forEach(function (item) {
				if (item.text === text) {
					_this3.deselectItem(item);
				}
			});
	
			return this.elements.control;
		},
	
		removeByValue: function removeByValue(value) {
			var _this4 = this;
	
			var selection = this._getSelectedItems().get();
	
			selection.forEach(function (item) {
				if (item.value === value) {
					_this4.deselectItem(item);
				}
			});
	
			return this.elements.control;
		}
	};
	
	Pillbox = Lib.runHelpers('jquery', _corePillbox.CONTROL, Pillbox, {
		legacyMethods: legacyMethods
	});
	
	exports['default'] = Pillbox;
	module.exports = exports['default'];

/***/ },
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
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _taggedTemplateLiteral = __webpack_require__(160)["default"];

	var _String$raw = __webpack_require__(166)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["\n<div class=\"pillbox slds-pillbox\">\n  <ul class=\"slds-pill-group\">\n    <li class=\"slds-pill\">\n      <span href=\"#\" class=\"slds-pill__label\">Item Title</span>\n      <button class=\"slds-button slds-button--icon-bare\">\n        <svg aria-hidden=\"true\" class=\"slds-button__icon\">\n          <use xlink:href=\"/examples/symbols.svg#close\"></use>\n        </svg>\n        <span class=\"slds-assistive-text\">Remove</span>\n      </button>\n    </li>\n    <li class=\"slds-pill-input-wrap\">\n      <input type=\"text\" class=\"slds-input slds-input--x-small | slds-pill-add-item\" placeholder=\"add item\">\n    </li>\n  </ul>\n</div>\n"], ["\n<div class=\"pillbox slds-pillbox\">\n  <ul class=\"slds-pill-group\">\n    <li class=\"slds-pill\">\n      <span href=\"#\" class=\"slds-pill__label\">Item Title</span>\n      <button class=\"slds-button slds-button--icon-bare\">\n        <svg aria-hidden=\"true\" class=\"slds-button__icon\">\n          <use xlink:href=\"/examples/symbols.svg#close\"></use>\n        </svg>\n        <span class=\"slds-assistive-text\">Remove</span>\n      </button>\n    </li>\n    <li class=\"slds-pill-input-wrap\">\n      <input type=\"text\" class=\"slds-input slds-input--x-small | slds-pill-add-item\" placeholder=\"add item\">\n    </li>\n  </ul>\n</div>\n"]);

	exports["default"] = _String$raw(_templateObject);
	module.exports = exports["default"];

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	// POPOVER CONTROL - JQUERY FACADE
	
	// Core
	'use strict';
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _corePopover = __webpack_require__(194);
	
	var _corePopover2 = _interopRequireDefault(_corePopover);
	
	// Framework Specific
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	// Template imports
	
	var _popoverTemplate = __webpack_require__(196);
	
	var _popoverTemplate2 = _interopRequireDefault(_popoverTemplate);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	var Popover = function Popover() {
		var options = this._getOptions(arguments);
	
		this.template = $(_popoverTemplate2['default']);
	
		this._initialize(options);
	};
	
	var PopoverMethods = {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = this.template.clone();
			this.elements.popover = Lib.wrapElement(this.element);
		},
	
		_onRendered: function _onRendered() {
			this._setElementOptions();
			this._setTrigger();
	
			// TODO: This is probably not the best way to do this or the best place for it to be
			this.appendTo(this.elements.container);
	
			this._updatePosition();
		},
	
		_setElementOptions: function _setElementOptions() {
			var target = this.getProperty('target');
			var container = this.getProperty('container');
			var align = this.getProperty('align');
	
			this.elements.target = Lib.wrapElement(target || this.elements.wrapper);
			this.elements.container = Lib.wrapElement(container || this.elements.wrapper);
			this.elements.align = Lib.wrapElement(align || this.elements.target);
		},
	
		_setTrigger: function _setTrigger() {
			var trigger = this.getProperty('trigger');
	
			if (trigger === 'click') {
				this.elements.target.on('click', $.proxy(this.toggle, this));
			} else if (trigger === 'hover') {
				this.elements.target.on('mouseover', $.proxy(this.show, this));
				this.elements.target.on('mouseout', $.proxy(this.hide, this));
			} else if (trigger === 'focus') {
				this.elements.target.on('focus', $.proxy(this.show, this));
				this.elements.target.on('focusout', $.proxy(this.hide, this));
			}
		},
	
		_onShow: function _onShow() {
			this._updatePosition();
		},
	
		_onHide: function _onHide() {
			this._updatePosition();
		}
	};
	
	exports.PopoverMethods = PopoverMethods;
	Lib.merge(Popover.prototype, _corePopover2['default'], _events2['default'], _dom2['default'], _state2['default'], PopoverMethods, {
		_render: function _render() {
			var header = this.element.find('.slds-popover__header > p');
			var body = this.element.find('.slds-popover__body');
	
			if (this.getProperty('header')) {
				header.append(this.getProperty('header'));
			}
	
			if (this.getProperty('content')) {
				body.append(this.getProperty('content'));
			}
	
			return this.element;
		}
	});
	
	Popover = Lib.runHelpers('jquery', _corePopover.CONTROL, Popover, {});
	
	exports['default'] = Popover;

/***/ },
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
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _taggedTemplateLiteral = __webpack_require__(160)["default"];

	var _String$raw = __webpack_require__(166)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["\n<div class=\"popover slds-popover slds-popover-target slds-hidden\" role=\"dialog\">\n  <div class=\"slds-popover__content\">\n    <div class=\"slds-popover__header\">\n      <p class=\"slds-text-heading--small\"></p>\n    </div>\n    <div class=\"slds-popover__body\">\n    </div>\n  </div>\n</div>\n"], ["\n<div class=\"popover slds-popover slds-popover-target slds-hidden\" role=\"dialog\">\n  <div class=\"slds-popover__content\">\n    <div class=\"slds-popover__header\">\n      <p class=\"slds-text-heading--small\"></p>\n    </div>\n    <div class=\"slds-popover__body\">\n    </div>\n  </div>\n</div>\n"]);

	exports["default"] = _String$raw(_templateObject);
	module.exports = exports["default"];

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	// RADIO CONTROL - JQUERY FACADE
	
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
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _checkboxCheckbox = __webpack_require__(156);
	
	// Template imports
	
	var _radioTemplate = __webpack_require__(199);
	
	var _radioTemplate2 = _interopRequireDefault(_radioTemplate);
	
	// Constructor
	
	var $ = Lib.global.jQuery || Lib.global.$;var Radio = function Radio() {
		var options = this._getOptions(arguments);
	
		this.inputSelector = 'input[type="radio"]';
		this.template = $(_radioTemplate2['default']);
	
		this._initialize(options);
	};
	
	// Prototype extension object
	var RadioObject = {
		_bindUIEvents: function _bindUIEvents() {
			this.elements.input.on('change', $.proxy(this.check, this));
		},
	
		_render: function _render() {
			this.elements.input.attr('name', this.getProperty('name'));
	
			return _checkboxCheckbox.CheckboxObject._render.call(this);
		},
	
		// TODO: Update this when we add a universal destroy method
		destroy: function destroy() {
			var self = this;
			var group = this._getGroup();
			var index = group.findIndex(function (item) {
				return item === self;
			});
	
			if (index > -1) group.splice(index, 1);
			this.elements.wrapper.remove();
			return this.elements.wrapper[0].outerHTML;
		}
	};
	
	// Merging into prototype
	Lib.merge(Radio.prototype, _coreRadio2['default'], _events2['default'], _dom2['default'], _state2['default'], _checkboxCheckbox.CheckboxObject, RadioObject);
	
	// Framework setup
	Radio = Lib.runHelpers('jquery', _coreRadio.CONTROL, Radio);
	
	// Exporting
	exports['default'] = Radio;
	module.exports = exports['default'];

/***/ },
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
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _taggedTemplateLiteral = __webpack_require__(160)["default"];

	var _String$raw = __webpack_require__(166)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["\n<label class=\"slds-radio\"><input type=\"radio\" name=\"options\"/><span class=\"slds-radio--faux\"></span><span class=\"slds-form-element__label\"></span>\n</label>\n"], ["\n<label class=\"slds-radio\"><input type=\"radio\" name=\"options\"/><span class=\"slds-radio--faux\"></span><span class=\"slds-form-element__label\"></span>\n</label>\n"]);

	exports["default"] = _String$raw(_templateObject);
	module.exports = exports["default"];

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	// LOADER CONTROL - JQUERY FACADE
	
	// Core
	'use strict';
	
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
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	var Spinner = function Spinner() {
		var options = this._getOptions(arguments);
	
		this._initialize(options);
	};
	
	// Prototype extension object
	var SpinnerObject = {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = $('<div />', {
				'class': this.sizes[this.getProperty('size')]
			});
		},
	
		_render: function _render() {
			var strings = this.getState('strings');
	
			this.element.append($('<img />', {
				src: this.fileNames[this.getProperty('theme')],
				alt: strings.LOADING
			}));
	
			return this.element;
		}
	};
	
	// Merging into prototype
	Lib.merge(Spinner.prototype, _coreSpinner2['default'], _dom2['default'], _state2['default'], SpinnerObject);
	
	// Framework setup
	Spinner = Lib.runHelpers('jquery', _coreSpinner.CONTROL, Spinner);
	
	// Exporting
	exports['default'] = Spinner;
	module.exports = exports['default'];

/***/ },
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
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	// TOOLTIP CONTROL - JQUERY FACADE
	
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
	
	var _popoverPopover = __webpack_require__(193);
	
	// Framework Specific
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	// Template imports
	
	var _tooltipTemplate = __webpack_require__(204);
	
	var _tooltipTemplate2 = _interopRequireDefault(_tooltipTemplate);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	var Tooltip = function Tooltip() {
		var options = this._getOptions(arguments);
	
		this.template = $(_tooltipTemplate2['default']);
	
		this._initialize(options);
	};
	
	Lib.merge(Tooltip.prototype, _coreTooltip2['default'], _events2['default'], _dom2['default'], _state2['default'], _popoverPopover.PopoverMethods, {
		_render: function _render() {
			var body = this.elements.popover.find('.slds-tooltip__body');
	
			if (this.getProperty('content')) {
				body.append(this.getProperty('content'));
			}
	
			return this.element;
		}
	});
	
	Tooltip = Lib.runHelpers('jquery', _coreTooltip.CONTROL, Tooltip, {});
	
	exports['default'] = Tooltip;
	module.exports = exports['default'];

/***/ },
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
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _taggedTemplateLiteral = __webpack_require__(160)["default"];

	var _String$raw = __webpack_require__(166)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _templateObject = _taggedTemplateLiteral(["\n<div class=\"slds-tooltip slds-hidden\" role=\"tooltip\">\n  <div class=\"slds-tooltip__content\">\n    <div class=\"slds-tooltip__body\"></div>\n  </div>\n</div>\n"], ["\n<div class=\"slds-tooltip slds-hidden\" role=\"tooltip\">\n  <div class=\"slds-tooltip__content\">\n    <div class=\"slds-tooltip__body\"></div>\n  </div>\n</div>\n"]);

	exports["default"] = _String$raw(_templateObject);
	module.exports = exports["default"];

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	// TREE CONTROL - JQUERY FACADE
	
	// Core
	'use strict';
	
	var _Promise = __webpack_require__(6)['default'];
	
	var _interopRequireWildcard = __webpack_require__(4)['default'];
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _libLib = __webpack_require__(5);
	
	var Lib = _interopRequireWildcard(_libLib);
	
	var _coreTree = __webpack_require__(206);
	
	var _coreTree2 = _interopRequireDefault(_coreTree);
	
	// Framework Specific
	
	var _dom = __webpack_require__(147);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _events = __webpack_require__(148);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _state = __webpack_require__(149);
	
	var _state2 = _interopRequireDefault(_state);
	
	// Template imports
	
	var _treeTemplate = __webpack_require__(207);
	
	var _treeTemplate2 = _interopRequireDefault(_treeTemplate);
	
	var $ = Lib.global.jQuery || Lib.global.$;
	
	var legacyAccessors = {
		getText: function getText(item) {
			return item.get('name');
		},
	
		getChildren: function getChildren(item) {
			var _this = this;
	
			return new _Promise(function (resolve) {
				_this.getProperty('dataSource')(item._item, function (response) {
					resolve(response.data);
				});
			});
		},
	
		getType: function getType(item) {
			return item.get('type');
		},
	
		getIconClass: function getIconClass(item) {
			var dataAttributes = item.get('dataAttributes');
	
			return dataAttributes && dataAttributes['data-icon'];
		},
	
		getExpandable: function getExpandable(item) {
			var dataAttributes = item.get('dataAttributes');
	
			return dataAttributes && dataAttributes.hasChildren;
		},
	
		getKey: function getKey(item) {
			return item.get();
		},
	
		getId: function getId(item) {
			var dataAttributes = item.get('dataAttributes');
	
			return dataAttributes.id;
		}
	};
	
	var Tree = function Tree() {
		var options = Lib.extend({
			open: []
		}, this._getOptions(arguments));
	
		this.template = $(_treeTemplate2['default']);
	
		if (options.dataSource) {
			options.accessors = legacyAccessors;
		}
	
		this._initialize(options);
	};
	
	Lib.merge(Tree.prototype, _coreTree2['default'], _events2['default'], _dom2['default'], _state2['default'], {
		_initializer: function _initializer() {
			this.element = this.$el = this.elements.control = this.template.clone();
			this.elements.list = this.element.find('.' + this.cssClasses.CONTROL);
		},
	
		_onInitialized: function _onInitialized() {
			var strings = this.getState('strings');
			this.template.find('.slds-tree__loader').text(strings.LOADING);
		},
	
		selectItem: function selectItem(item) {
			this._selectItem(this._getItemAdapter(item.jquery ? item.data('item') : item));
		},
	
		_configureBranchSelect: function _configureBranchSelect() {
			var branchSelect = this.getProperty('folderSelect');
	
			// When folder selection is allowed...
			if (branchSelect) {
				// Branch name clicks act like item clicks
				this.element.on('click.fu.slds-tree', 'button.slds-button', $.proxy(this._handleBranchClicked, this));
				this.element.on('click.fu.slds-tree', '.slds-tree__branch--name', $.proxy(this._handleItemClicked, this));
			} else {
				this.element.on('click.fu.slds-tree', '.slds-tree__branch--name', $.proxy(this._handleBranchClicked, this));
			}
		},
	
		_renderItem: function _renderItem(item) {
			var $item = this.template.find('li.slds-tree__item').clone();
	
			$item.find('.slds-tree__item-label').text(item.getText());
			$item.data({
				item: item._item
			});
	
			this._renderSelection($item, item);
	
			return $item;
		},
	
		_renderBranch: function _renderBranch(branch, level) {
			var _this2 = this;
	
			var $branch = this.template.find('.slds-tree__branch').clone();
			var $branchContent = $branch.find('.slds-tree__group');
	
			$branch.find('.slds-tree__branch--name').text(branch.getText());
	
			$branch.data({
				item: branch._item,
				id: branch.getId()
			});
	
			this._renderSelection($branch, branch);
	
			// Expandable?
			var isExpandable = branch.getExpandable();
	
			$branch.attr('data-has-children', isExpandable ? undefined : 'false');
	
			// Take care of the state
			var isOpen = this._isFolderOpen(branch);
			var _level = undefined;
	
			if (!isOpen && this._shouldAutoOpen(level)) {
				this._toggleFolder(branch, {
					silent: true
				});
	
				isOpen = this._isFolderOpen(branch);
				_level = level + 1;
			}
	
			$branch.toggleClass('slds-is-open', isOpen);
			$branch.attr('aria-expanded', isOpen);
	
			if (isOpen) {
				var $loader = this.template.find('.slds-tree__loader').clone();
	
				$branchContent.append($loader);
	
				branch._getChildren().then(function (resolvedChildren) {
					_this2._loopChildren(resolvedChildren, $branchContent, _level);
				}, function (error) {
					Lib.log(error);
					_this2._loopChildren(Lib.getDataAdapter(), $branchContent, _level);
				});
			}
	
			return $branch;
		},
	
		_renderSelection: function _renderSelection($item, item, selection) {
			var selected = this._isItemSelected(item, selection);
	
			$item.toggleClass('slds-is-selected', selected);
		},
	
		_render: function _render() {
			var _this3 = this;
	
			var dataSource = this.getProperty('dataSource');
	
			if (this._collection.length()) {
				this._loopChildren(this._collection, this.elements.list, 1);
			} else if (dataSource) {
				dataSource({}, function (response) {
					_this3._collection = _this3._getDataAdapter(response.data);
					_this3._loopChildren(_this3._collection, _this3.elements.list, 1);
				});
			}
	
			return this.element;
		},
	
		_onRendered: function _onRendered() {
			this._configureBranchSelect();
	
			this.element.on('click.fu.slds-tree', 'li.slds-tree__item', $.proxy(this._handleItemClicked, this));
		},
	
		_loopChildren: function _loopChildren(children, $el, level) {
			var self = this;
			var elements = [];
	
			children.forEach(function buildBranch(item) {
				var isBranch = item.getType() === 'folder';
	
				if (!isBranch) {
					elements.push(self._renderItem(item));
				} else {
					elements.push(self._renderBranch(item, level));
				}
			});
	
			$el.empty();
			$el.append(elements);
		},
	
		_handleBranchClicked: function _handleBranchClicked($event) {
			var $el = $($event.currentTarget).closest('li.slds-tree__item, .slds-tree__branch');
			var branch = this._getItemAdapter($el.data('item'));
	
			this._toggleFolder(branch);
		},
	
		_onFolderToggled: function _onFolderToggled(branch) {
			var self = this;
			var id = branch.getId();
			var $branches = this.element.find('.slds-tree__branch');
	
			$branches.each(function () {
				var $branch = $(this);
	
				if ($branch.data('id') === id) {
					$branch.replaceWith(self._renderBranch(branch));
				}
			});
		},
	
		_onFoldersClosed: function _onFoldersClosed() {
			this.setProperties({ autoOpen: false });
			this._render();
		},
	
		_handleItemClicked: function _handleItemClicked($event) {
			var $el = $($event.currentTarget).closest('li.slds-tree__item, .slds-tree__branch');
			var item = this._getItemAdapter($el.data('item'));
			var selected = this._isItemSelected(item);
	
			if (selected) {
				this._deselectItem(item);
			} else {
				this._selectItem(item);
			}
		},
	
		_onSelected: function _onSelected(selection) {
			this._onSelectionUpdated(selection);
		},
	
		_onDeselected: function _onDeselected(selection) {
			this._onSelectionUpdated(selection);
		},
	
		_onSelectionUpdated: function _onSelectionUpdated(selection) {
			var self = this;
			var $items = this.element.find('.slds-tree__branch, li.slds-tree__item');
	
			$items.each(function () {
				var $item = $(this);
				var item = self._getItemAdapter($item.data('item'));
	
				self._renderSelection($item, item, selection);
			});
		},
	
		_shouldAutoOpen: function _shouldAutoOpen(level) {
			var autoOpen = this.getProperty('autoOpen');
			var autoOpenLimit = this.getProperty('autoOpenLimit');
	
			return autoOpen && Lib.isNumber(level) && Lib.isNumber(autoOpenLimit) && level <= autoOpenLimit;
		}
	});
	
	// LEGACY METHODS
	
	var legacyMethods = {
		selectedItems: function selectedItems() {
			var selection = this._getSelectedItems();
	
			return selection.get();
		},
	
		selectFolder: function selectFolder($folder) {
			this.selectItem($folder);
		},
	
		openFolder: function openFolder($folder) {
			if (!$folder.hasClass('slds-is-open')) {
				this.toggleFolder($folder);
			}
		},
	
		closeFolder: function closeFolder($folder) {
			if ($folder.hasClass('slds-is-open')) {
				this.toggleFolder($folder);
			}
		},
	
		toggleFolder: function toggleFolder($folder) {
			this._toggleFolder(this._getItemAdapter($folder.data('item')));
		},
	
		closeAll: function closeAll() {
			this.closeAllFolders();
		},
	
		discloseAll: function discloseAll() {
			this.setProperties({
				autoOpen: true,
				autoOpenLimit: 100
			});
			this._render();
		},
	
		discloseVisible: function discloseVisible() {
			var self = this;
	
			this.element.find('.slds-tree__branch:not(.slds-is-open)').each(function () {
				var $branch = $(this);
				var _branch = $branch.data('item');
	
				self.toggleFolder(_branch);
			});
		},
	
		refresh: function refresh() {
			this._render();
		},
	
		render: function render() {
			this._render();
		}
	};
	
	Tree = Lib.runHelpers('jquery', _coreTree.CONTROL, Tree, {
		legacyMethods: legacyMethods
	});
	
	exports['default'] = Tree;
	module.exports = exports['default'];

/***/ },
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
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _taggedTemplateLiteral = __webpack_require__(160)["default"];

	var _String$raw = __webpack_require__(166)["default"];

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _templateObject = _taggedTemplateLiteral(["\n<div class=\"slds-tree-container\" role=\"application\">\n\t<ul class=\"slds-tree\" role=\"tree\">\n\t\t<li class=\"slds-tree__branch\" role=\"treeitem\" aria-expanded=\"true\">\n\t\t\t<div class=\"slds-tree__branch--header slds-tree__item\">\n\t\t\t\t<button class=\"slds-button slds-button--icon-bare slds-m-right--x-small\">\n\t\t\t\t\t<svg aria-hidden=\"true\" class=\"slds-button__icon slds-button__icon--small\">\n\t\t\t\t\t\t<use xlink:href=\"/examples/symbols.svg#chevronright\"></use>\n\t\t\t\t\t</svg>\n\t\t\t\t\t<span class=\"slds-assistive-text\">Toggle</span>\n\t\t\t\t</button>\n\t\t\t\t<div class=\"slds-tree__branch--name\" role=\"presentation\">Tree Branch</div>\n\t\t\t</div>\n\t\t\t<ul class=\"slds-tree__group slds-nested\" role=\"group\" aria-labelledby=\"tree0-node0-link\">\n\t\t\t\t<li className=\"slds-tree__loader\" role=\"alert\"></li>\n\t\t\t</ul>\n\t\t</li>\n\t\t<li class=\"slds-tree__item\" data-template=\"treeitem\" role=\"treeitem\">\n\t\t\t<div role=\"presentation\" class=\"slds-tree__item-label | slds-truncate\">Tree Item</div>\n\t\t</li>\n\t</ul>\n</div>\n"], ["\n<div class=\"slds-tree-container\" role=\"application\">\n\t<ul class=\"slds-tree\" role=\"tree\">\n\t\t<li class=\"slds-tree__branch\" role=\"treeitem\" aria-expanded=\"true\">\n\t\t\t<div class=\"slds-tree__branch--header slds-tree__item\">\n\t\t\t\t<button class=\"slds-button slds-button--icon-bare slds-m-right--x-small\">\n\t\t\t\t\t<svg aria-hidden=\"true\" class=\"slds-button__icon slds-button__icon--small\">\n\t\t\t\t\t\t<use xlink:href=\"/examples/symbols.svg#chevronright\"></use>\n\t\t\t\t\t</svg>\n\t\t\t\t\t<span class=\"slds-assistive-text\">Toggle</span>\n\t\t\t\t</button>\n\t\t\t\t<div class=\"slds-tree__branch--name\" role=\"presentation\">Tree Branch</div>\n\t\t\t</div>\n\t\t\t<ul class=\"slds-tree__group slds-nested\" role=\"group\" aria-labelledby=\"tree0-node0-link\">\n\t\t\t\t<li className=\"slds-tree__loader\" role=\"alert\"></li>\n\t\t\t</ul>\n\t\t</li>\n\t\t<li class=\"slds-tree__item\" data-template=\"treeitem\" role=\"treeitem\">\n\t\t\t<div role=\"presentation\" class=\"slds-tree__item-label | slds-truncate\">Tree Item</div>\n\t\t</li>\n\t</ul>\n</div>\n"]);

	exports["default"] = _String$raw(_templateObject);
	module.exports = exports["default"];

/***/ }
/******/ ])});;
//# sourceMappingURL=jquery.js.map