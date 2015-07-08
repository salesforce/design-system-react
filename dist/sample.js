(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "landmark-js-poc",
  "private": true,
  "repository": {
    "type": "git",
    "url": "git://github.exacttarget.com/uxarchitecture/landmark-js-poc.git"
  },
  "version": "0.0.1",
  "devDependencies": {
    "babelify": "^6.1.2",
    "grunt": "^0.4.5",
    "grunt-browserify": "^3.8.0",
    "grunt-contrib-watch": "^0.6.1"
  }
}

},{}],2:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "../package.json"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("../package.json"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global._package);
		global.landmark = mod.exports;
	}
})(this, function (exports, _packageJson) {
	// TO-DO: This currently imports the whole package. Surely we can somehow tell the compiler to only grab the relevant bit?
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var components = {};

	var Landmark = (function () {
		function Landmark() {
			_classCallCheck(this, Landmark);
		}

		_createClass(Landmark, null, [{
			key: "log",
			value: function log(val) {
				console.log(val);
			}
		}, {
			key: "isFunction",
			value: function isFunction(obj) {
				return toString.call(obj) === "[object Function]";
			}
		}, {
			key: "findWhere",
			value: function findWhere(collection, criteria) {
				// TO-DO: Implement this. Should it delegate to frameworks somehow or is a vanilla implementation best?
				return {};
			}
		}, {
			key: "version",
			get: function get() {
				return _packageJson.version;
			}
		}, {
			key: "components",
			get: function get() {
				return components;
			}
		}]);

		return Landmark;
	})();

	exports.Landmark = Landmark;
	;
});

},{"../package.json":1}],3:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./selectlist"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./selectlist"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.selectlist);
    global.sample = mod.exports;
  }
})(this, function (exports, _selectlist) {
  "use strict";

  var collection = [];
  var options = {};
  var selectlist = new _selectlist.Selectlist(collection, options);
  selectlist.Landmark.log("Running version " + selectlist.Landmark.version);
});

},{"./selectlist":4}],4:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "./landmark"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("./landmark"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.landmark);
		global.selectlist = mod.exports;
	}
})(this, function (exports, _landmark) {
	// This doesn't work, still need to figure out how to do proper named imports
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Selectlist = (function () {
		function Selectlist(collection, options) {
			_classCallCheck(this, Selectlist);

			this.Landmark = _landmark.Landmark;

			if (_landmark.Landmark.isFunction(this.onBeforeInitialize)) this.onBeforeInitialize();

			this._collection = collection || {};
			this._selection = null;

			if (options && options.initialSelection) {
				this.setSelection(options.initialSelection);
			}

			if (options && options.resize === "auto") {
				if (_landmark.Landmark.isFunction(this.resize)) this.resize();
			}

			if (_landmark.Landmark.isFunction(this.onInitialized)) this.onInitialized();
		}

		_createClass(Selectlist, [{
			key: "_setSelection",
			value: function _setSelection(newSelection) {
				// TO-DO:
				// • Handle multi-select

				if (!newSelection || !newSelection.id) {
					return;
				}

				if (this._selection !== newSelection.id) {
					if (_landmark.Landmark.isFunction(this.onBeforeSelection)) this.onBeforeSelection();
					this._selection = newSelection.id;
					if (_landmark.Landmark.isFunction(this.onSelected)) this.onSelected();
				}
			}
		}, {
			key: "setSelectionByText",
			value: function setSelectionByText(text) {
				var item = _landmark.Landmark.findWhere(collection, { text: text });

				this._setSelection(item);
			}
		}, {
			key: "setSelectionByValue",
			value: function setSelectionByValue(value) {
				var item = _landmark.Landmark.findWhere(collection, { value: value });

				this._setSelection(item);
			}
		}, {
			key: "setSelectionByIndex",
			value: function setSelectionByIndex(index) {
				if (!collection) {
					return;
				}

				var item = collection[index];

				this._setSelection(item);
			}
		}, {
			key: "selection",
			get: function get() {
				return _landmark.Landmark.findWhere(collection, { id: this._selection });
			}
		}]);

		return Selectlist;
	})();

	exports.Selectlist = Selectlist;
	;
});

},{"./landmark":2}]},{},[3]);
