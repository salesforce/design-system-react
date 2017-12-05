define(['exports', 'react', 'prop-types', 'classnames', 'lodash.isfunction', '../../utilities/utility-icon', '../../button', '../../../utilities/constants'], function (exports, _react, _propTypes, _classnames, _lodash, _utilityIcon, _button, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _utilityIcon2 = _interopRequireDefault(_utilityIcon);

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
  * A wrapper for icons that will be rendered inside of an Input
  *
  * If the `onClick` function prop is provided, the `design-system-react/components/button` component is used.
  * If not, the icon will be an instance of `design-system-react/components/utilities/utility-icon`.
  * Checkout out the appropriate component to see what props can be passed along via the `{...props}` rest operator
  */
	var InputIcon = function InputIcon(props) {
		var category = props.category,
		    iconPosition = props.iconPosition,
		    name = props.name,
		    path = props.path,
		    onClick = props.onClick,
		    variant = props.variant,
		    rest = _objectWithoutProperties(props, ['category', 'iconPosition', 'name', 'path', 'onClick', 'variant']);

		// need to pass click event up on SVG

		var variants = {
			combobox: _react2.default.createElement(
				'span',
				{ className: 'slds-icon_container slds-input__icon slds-input__icon_right' },
				_react2.default.createElement(_utilityIcon2.default, _extends({
					'aria-hidden': true,
					category: category,
					className: (0, _classnames2.default)('slds-icon slds-icon_x-small slds-icon-text-default'),
					name: name,
					path: path
				}, rest))
			),
			base: _react2.default.createElement(_utilityIcon2.default, _extends({
				'aria-hidden': true,
				category: category,
				className: (0, _classnames2.default)('slds-input__icon slds-icon-text-default', _defineProperty({}, 'slds-input__icon--' + iconPosition, iconPosition)),
				name: name,
				path: path
			}, rest))
		};

		return (0, _lodash2.default)(onClick) ? _react2.default.createElement(_button2.default, _extends({
			className: (0, _classnames2.default)('slds-input__icon', _defineProperty({}, 'slds-input__icon_' + iconPosition, iconPosition)),
			iconCategory: category,
			iconName: name,
			iconPath: path,
			onClick: onClick,
			variant: 'icon'
		}, rest)) : variants[variant];
	};

	InputIcon.displayName = _constants.ICON_INPUT;

	InputIcon.propTypes = {
		/**
   * Icon category from [lightningdesignsystem.com/icons/](https://www.lightningdesignsystem.com/icons/)
   */
		category: _propTypes2.default.string,
		/**
   * This is only needed if an input contains two icons, the Input component handles this prop for you.
   */
		iconPosition: _propTypes2.default.oneOf(['left', 'right']),
		/**
   * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
   */
		name: _propTypes2.default.string,
		/**
   * Path to the icon. This will override any global icon settings.
   */
		path: _propTypes2.default.string,
		/**
   * This event fires when the icon is clicked.
   */
		onClick: _propTypes2.default.func,
		/**
   * Changes styles of the InputIcon.
   */
		variant: _propTypes2.default.oneOf(['base', 'combobox'])
	};

	InputIcon.defaultProps = {
		category: 'utility',
		variant: 'base'
	};

	exports.default = InputIcon;
});