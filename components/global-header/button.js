define(['exports', 'react', '../button', '../../utilities/constants'], function (exports, _react, _button, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _button2 = _interopRequireDefault(_button);

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
  * A helper component that renders a Button in the tools area of the Global Header. Currently defaults to a bare icon, but this can be overriden if text-based buttons are required.
  */
	var GlobalHeaderButton = function GlobalHeaderButton(props) {
		return _react2.default.createElement(
			'li',
			null,
			_react2.default.createElement(_button2.default, _extends({
				iconVariant: 'global-header',
				variant: 'icon'
			}, props))
		);
	};

	GlobalHeaderButton.displayName = _constants.GLOBAL_HEADER_TOOL;

	exports.default = GlobalHeaderButton;
});