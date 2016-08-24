define(['module', 'react', './index', '../../../utilities/constants'], function (module, _react, _index, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _extends = Object.assign || function (target) {
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

	/**
  * An `Search` is is an `Input` which renders the search icon by default.
  */
	var Search = function Search(props) {
		return _react2.default.createElement(_index2.default, _extends({
			iconAssistiveText: 'Search',
			iconCategory: 'utility',
			iconName: 'search',
			iconPosition: 'left'
		}, props));
	};

	Search.displayName = _constants.FORMS_SEARCH;

	module.exports = Search;
});