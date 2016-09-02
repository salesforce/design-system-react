define(['exports', 'react', '../lookup', '../../utilities/constants'], function (exports, _react, _lookup, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _lookup2 = _interopRequireDefault(_lookup);

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
  * The Global Header Search component is currently a Lookup. In the future this wrapper may provide additional presets or features.
  */
	var GlobalHeaderSearch = function GlobalHeaderSearch(props) {
		return _react2.default.createElement(
			'div',
			{ className: 'slds-global-header__item slds-global-header__item--search' },
			_react2.default.createElement(_lookup2.default, _extends({ iconPosition: 'left' }, props))
		);
	};

	GlobalHeaderSearch.displayName = _constants.GLOBAL_HEADER_SEARCH;

	exports.default = GlobalHeaderSearch;
});