define(['exports', 'classnames'], function (exports, _classnames) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var classNamesWrapper = function classNamesWrapper() {
		var string = _classnames2.default.apply(undefined, arguments);
		return string === '' ? undefined : string;
	}; // ### classNames
	// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
	// This project uses `classnames`, "a simple javascript utility for conditionally
	// joining classNames together."
	exports.default = classNamesWrapper;
});