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

	var Landmark = (function () {
		function Landmark() {
			_classCallCheck(this, Landmark);

			Landmark.log("Running version " + this.version);
		}

		_createClass(Landmark, [{
			key: "version",
			get: function get() {
				return _packageJson.version;
			}
		}], [{
			key: "log",
			value: function log(val) {
				console.log(val);
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

  var options = {};
  var selectlist = new _selectlist.Selectlist(options);
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

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var Selectlist = (function (_Landmark) {
    function Selectlist() {
      _classCallCheck(this, Selectlist);

      _get(Object.getPrototypeOf(Selectlist.prototype), "constructor", this).apply(this, arguments);
    }

    _inherits(Selectlist, _Landmark);

    return Selectlist;
  })(_landmark.Landmark);

  exports.Selectlist = Selectlist;
  ;
});

},{"./landmark":2}]},{},[3]);
