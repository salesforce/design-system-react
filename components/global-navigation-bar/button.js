define(['exports', 'react', 'prop-types', 'classnames', '../button', '../../utilities/constants'], function (exports, _react, _propTypes, _classnames, _button, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _button2 = _interopRequireDefault(_button);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _defineProperty(obj, key, value) {
		if (key in obj) {
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: true,
				configurable: true,
				writable: true
			});
		} else {
			obj[key] = value;
		}

		return obj;
	}

	function _objectWithoutProperties(obj, keys) {
		var target = {};

		for (var i in obj) {
			if (keys.indexOf(i) >= 0) continue;
			if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
			target[i] = obj[i];
		}

		return target;
	}

	/**
  * A helper component that renders a Button as an item in the Global Navigation Bar. All props are passed onto `Button` except `active` and `dividerPosition`.
  */
	var GlobalNavigationButton = function GlobalNavigationButton(_ref) {
		var active = _ref.active,
		    dividerPosition = _ref.dividerPosition,
		    props = _objectWithoutProperties(_ref, ['active', 'dividerPosition']);

		return _react2.default.createElement(
			'li',
			{
				className: (0, _classnames2.default)('slds-context-bar__item', _defineProperty({
					'slds-is-active': active
				}, 'slds-context-bar__item--divider-' + dividerPosition, dividerPosition))
			},
			_react2.default.createElement(_button2.default, props)
		);
	};

	GlobalNavigationButton.displayName = _constants.GLOBAL_NAVIGATION_BAR_BUTTON;

	// ### Prop Types
	GlobalNavigationButton.propTypes = {
		/**
   * Whether the item is active or not.
   */
		active: _propTypes2.default.bool,
		/**
   * Determines position of separating bar.
   */
		dividerPosition: _propTypes2.default.oneOf(['left', 'right'])
	};

	// ### Default Props
	GlobalNavigationButton.defaultProps = {
		className: 'slds-context-bar__label-action slds-text-body--regular',
		// This is a hack since buttons are not supported by Global Navigation
		// Bar and have different `font-size` and `line-height` than links or
		// dropdowns.
		style: { lineHeight: 'inherit' },
		variant: 'base'
	};

	exports.default = GlobalNavigationButton;
});