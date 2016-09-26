define(['module', 'react', '../menu-dropdown', './dropdown-trigger', '../../utilities/constants'], function (module, _react, _menuDropdown, _dropdownTrigger, _constants) {
	'use strict';

	var _react2 = _interopRequireDefault(_react);

	var _menuDropdown2 = _interopRequireDefault(_menuDropdown);

	var _dropdownTrigger2 = _interopRequireDefault(_dropdownTrigger);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
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
  * This component is an implementation of `MenuDropdown` with a custom trigger. All the properties listed below are provided to the `MenuDropdown` component. Any additional properties are provided to the Custom Trigger (that is the `Button` or `li` tag).
  */
	var GlobalHeaderDropdown = function GlobalHeaderDropdown(props) {
		var globalAction = props.globalAction;
		var iconVariant = props.iconVariant;

		var rest = _objectWithoutProperties(props, ['globalAction', 'iconVariant']);

		var iconVariantOverride = void 0;

		if (globalAction) {
			iconVariantOverride = 'container';
		}

		return _react2.default.createElement(
			_menuDropdown2.default,
			rest,
			_react2.default.createElement(_dropdownTrigger2.default, {
				globalAction: globalAction,
				iconSize: globalAction && 'small',
				iconVariant: iconVariantOverride || iconVariant
			})
		);
	};

	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	GlobalHeaderDropdown.displayName = _constants.GLOBAL_HEADER_TOOL;

	// ### Prop Types
	GlobalHeaderDropdown.propTypes = {
		/**
   * Aligns the right or left side of the menu with the respective side of the trigger. This is not intended for use with `nubbinPosition`.
   */
		align: _react.PropTypes.oneOf(['left', 'right']),
		/**
   * Extra classnames to apply to the dropdown menu.
   */
		className: _react.PropTypes.string,
		/**
   * CSS classes to be added to `li` element.
   */
		buttonClassName: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
   */
		iconName: _react.PropTypes.string,
		/**
   * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
   */
		iconVariant: _react.PropTypes.oneOf(['bare', 'container', 'border', 'border-filled', 'more', 'global-header']),
		/**
  * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button.
  */
		id: _react.PropTypes.string,
		/**
  * Adds custom styling such as inverse fill and special sizing/spacing
  */
		globalAction: _react.PropTypes.bool,
		/**
   * Positions dropdown menu with a nubbin--that is the arrow notch. The placement options correspond to the placement of the nubbin. This is implemeted with CSS classes and is best used with a `Button` with "icon container" styling. Dropdown menus will still be contained to the closest scrolling parent.
   */
		nubbinPosition: _react.PropTypes.oneOf(['top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right']),
		/**
   *  Offset adds pixels to the absolutely positioned dropdown menu in the format: ([vertical]px [horizontal]px).
   */
		offset: _react.PropTypes.string,
		/**
   * Triggered when an item in the menu is clicked.
   */
		onSelect: _react.PropTypes.func,
		/**
   * An array of menu item.
   */
		options: _react.PropTypes.array.isRequired
	};

	// ### Default Props
	GlobalHeaderDropdown.defaultProps = {
		align: 'right',
		buttonVariant: 'icon',
		iconVariant: 'global-header',
		nubbinPosition: 'top right',
		// TODO: Use design tokens to remove "magic numbers" that center nubbin under button
		offset: '-12px -16px'
	};

	module.exports = GlobalHeaderDropdown;
});