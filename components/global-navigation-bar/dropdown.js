define(['exports', 'react', 'prop-types', '../menu-dropdown', './dropdown-trigger', '../../utilities/constants'], function (exports, _react, _propTypes, _menuDropdown, _dropdownTrigger, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

	var _dropdownTrigger2 = _interopRequireDefault(_dropdownTrigger);

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
  * This component is an implementation of `MenuDropdown` with a custom trigger. All the properties listed below are provided to the `MenuDropdown` component. Any additional properties are provided to the Custom Trigger (that is the `Button` or `li` tag).
  */
	var GlobalNavigationBarDropdown = function GlobalNavigationBarDropdown(props) {
		var active = props.active,
		    activeBackgroundColor = props.activeBackgroundColor,
		    assistiveText = props.assistiveText,
		    dividerPosition = props.dividerPosition,
		    rest = _objectWithoutProperties(props, ['active', 'activeBackgroundColor', 'assistiveText', 'dividerPosition']);

		return _react2.default.createElement(
			_menuDropdown2.default,
			_extends({
				align: 'right',
				hasStaticAlignment: true
				// only need if using hybrid or hover
				, hoverCloseDelay: 400,
				length: props.length,
				menuPosition: 'relative'
			}, rest),
			_react2.default.createElement(_dropdownTrigger2.default, {
				active: active,
				assistiveText: assistiveText,
				activeBackgroundColor: activeBackgroundColor,
				dividerPosition: dividerPosition
			})
		);
	};

	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	GlobalNavigationBarDropdown.displayName = _constants.GLOBAL_NAVIGATION_BAR_DROPDOWN;

	// ### Prop Types
	GlobalNavigationBarDropdown.propTypes = {
		/**
   * Whether the item is active or not.
   */
		active: _propTypes2.default.bool,
		/**
   * Allows alignment of active item with active application background color.
   */
		activeBackgroundColor: _propTypes2.default.string,
		/**
   * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
   */
		assistiveText: _propTypes2.default.string.isRequired,
		/**
   * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
   */
		align: _propTypes2.default.oneOf(['left', 'right']),
		/**
   * Extra classnames to apply to the dropdown menu.
   */
		className: _propTypes2.default.string,
		/**
   * Determines position of separating bar.
   */
		dividerPosition: _propTypes2.default.oneOf(['left', 'right']),
		/**
   * CSS classes to be added to `li` element.
   */
		buttonClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
   */
		id: _propTypes2.default.string,
		/**
   * Provided to List to indicate number of items visible in the List. Pass `null` to display all items, or a string containing one of the numeric option values listed under [Dropdown Height](https://www.lightningdesignsystem.com/components/menus/#flavor-dropdown-height) at the right (eg. '5').
   */
		length: _propTypes2.default.oneOf([null, '5', '7', '10']),
		/**
   *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
   */
		offset: _propTypes2.default.string,
		/**
   * Triggered when an item in the menu is clicked.
   */
		onSelect: _propTypes2.default.func,
		/**
   * An array of menu item.
   */
		options: _propTypes2.default.array.isRequired
	};

	// ### Default Props
	GlobalNavigationBarDropdown.defaultProps = {
		align: 'right',
		length: null
	};

	exports.default = GlobalNavigationBarDropdown;
});