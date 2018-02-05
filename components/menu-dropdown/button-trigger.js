'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Dropdown Trigger Component (Simple Button Flavor) --- SLDS for React

// ### React
// React is an external dependency of the project.


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."


// ### Children


/**
 *  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
 */
var Trigger = (0, _createReactClass2.default)({
	// ### Display Name
	// Always use the canonical component name (set in the core) as the React
	// display name.
	displayName: _constants.MENU_DROPDOWN_TRIGGER,

	// ### Prop Types
	propTypes: {
		/**
   * Import the module `design-system-react/dropdown/button-trigger` and render a grandchild of the element type `Button`. Any `props` specified on that `Button` will be assigned to the triggering button. Any `id` prop or event hanlders (`onBlur`, `onClick`, etc.) set on the button grandchild will be overwritten by `MenuDropdown` to allow functionality and accessibility.
   * ```
   * <Dropdown>
   *   <Trigger>
   *   <Button iconCategory="utility" iconName="settings" />
   *   </Trigger>
   * </Dropdown>
   * ```
   */
		children: _propTypes2.default.element,
		/**
   * CSS classes to be added to triggering button.
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. This is provided by the `MenuDropdown`. Please use `MenuDropdown` to set.
   */
		id: _propTypes2.default.string,
		/**
   * Informs the trigger on the open/close state of the dropdown menu
   */
		isOpen: _propTypes2.default.bool,
		/**
   * By Default the dropdown menu is inside a `Dialog` component.
   */
		menu: _propTypes2.default.node,
		/**
   * Is only called when `openOn` is set to `hover` and when the triggering button loses focus.
   */
		onBlur: _propTypes2.default.func,
		/**
   * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
   */
		onClick: _propTypes2.default.func,
		/**
   * Is only called when `openOn` is set to `hover` and when the triggering button gains focus.
   */
		onFocus: _propTypes2.default.func,
		/**
   * Called when a key pressed.
   */
		onKeyDown: _propTypes2.default.func,
		/**
   * Called when mouse clicks down on the trigger button.
   */
		onMouseDown: _propTypes2.default.func,
		/**
   * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
		onMouseEnter: _propTypes2.default.func,
		/**
   * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
   */
		onMouseLeave: _propTypes2.default.func,
		/**
   * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
   */
		openOn: _propTypes2.default.oneOf(['hover', 'click', 'hybrid']),
		/**
   * The ref of the actual triggering button.
   */
		triggerRef: _propTypes2.default.func,
		/**
   * CSS classes to be added to wrapping trigger `div` around the button.
   */
		triggerClassName: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string])
	},

	// ### Render
	render: function render() {
		// The following are required for use with dropdown. Any other custom props for `Button` should be set with a `Button` child of this component, and are technically just here for backwards compatibility. See `children` prop description for more information.
		var _props = this.props,
		    assistiveText = _props.assistiveText,
		    children = _props.children,
		    className = _props.className,
		    id = _props.id,
		    isInline = _props.isInline,
		    isOpen = _props.isOpen,
		    onBlur = _props.onBlur,
		    menu = _props.menu,
		    onClick = _props.onClick,
		    onFocus = _props.onFocus,
		    onKeyDown = _props.onKeyDown,
		    onMouseDown = _props.onMouseDown,
		    onMouseEnter = _props.onMouseEnter,
		    onMouseLeave = _props.onMouseLeave,
		    openOn = _props.openOn,
		    triggerRef = _props.triggerRef,
		    triggerClassName = _props.triggerClassName,
		    deprecatedPropsFromMenuDropdown = _objectWithoutProperties(_props, ['assistiveText', 'children', 'className', 'id', 'isInline', 'isOpen', 'onBlur', 'menu', 'onClick', 'onFocus', 'onKeyDown', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'openOn', 'triggerRef', 'triggerClassName']);

		// Trigger manipulation


		var propsFromGrandchildButton = {};
		// if there are no children, render the default button
		if (_react2.default.Children.count(this.props.children) !== 0) {
			_react2.default.Children.forEach(this.props.children, function (child) {
				if (child && child.type.displayName === _button2.default.displayName) {
					propsFromGrandchildButton = child.props;
				}
			});
		}

		// If Trigger has a Button child, then use the explicitly declared child's props layered on top of those passed down by dropdown's props to allow manual override
		return (
			/* eslint-disable jsx-a11y/no-static-element-interactions */
			_react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-dropdown-trigger slds-dropdown-trigger--' + openOn, {
						'slds-is-open': isOpen
					}, triggerClassName),
					id: id,
					onBlur: onBlur,
					onClick: onClick,
					onKeyDown: onKeyDown,
					onFocus: onFocus,
					onMouseDown: onMouseDown,
					onMouseEnter: onMouseEnter,
					onMouseLeave: onMouseLeave
				},
				_react2.default.createElement(_button2.default, _extends({
					assistiveText: assistiveText,
					className: className,
					'aria-expanded': isOpen,
					'aria-haspopup': true
				}, deprecatedPropsFromMenuDropdown, propsFromGrandchildButton, {
					buttonRef: triggerRef
				})),
				menu
			)
		);
	}
});

exports.default = Trigger;