define(['module', 'react', '../button', '../../utilities/constants'], function (module, _react, _button, _constants) {
	'use strict';

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
  *  The Dropdown Button Trigger renders the default trigger button for the dropdown menu. If this component has children, it does not render itself to the DOM. Instead, it renders its child element, `Button`, and all that child's properties. This component may be used as a template to create custom triggers that do not use `Button`.
  */
	var Trigger = _react2.default.createClass({
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
    *     <Button iconCategory="utility" iconName="settings" />
    *   </Trigger>
    * </Dropdown>
    * ```
    */
			children: _react.PropTypes.element,
			/**
   * A unique ID is needed in order to support keyboard navigation, ARIA support, and connect the dropdown to the triggering button. This is provided by the `MenuDropdown`. Please use `MenuDropdown` to set.
   */
			id: _react.PropTypes.string,
			/**
   * The dropdown menu which is typically a `Popover` component.
   */
			menu: _react.PropTypes.node,
			/**
    * Is only called when `openOn` is set to `hover` and when the triggering button loses focus.
    */
			onBlur: _react.PropTypes.func,
			/**
    * This prop is passed onto the triggering `Button`. Triggered when the trigger button is clicked.
    */
			onClick: _react.PropTypes.func,
			/**
    * Is only called when `openOn` is set to `hover` and when the triggering button gains focus.
    */
			onFocus: _react.PropTypes.func,
			/**
    * Called when a key pressed.
    */
			onKeyDown: _react.PropTypes.func,
			/**
    * Called when mouse clicks down on the trigger button.
    */
			onMouseDown: _react.PropTypes.func,
			/**
    * Called when mouse hovers over the trigger button. This is only called if `this.props.openOn` is set to `hover`.
    */
			onMouseEnter: _react.PropTypes.func,
			/**
    * Called when mouse hover leaves the trigger button. This is only called if `this.props.openOn` is set to `hover`.
    */
			onMouseLeave: _react.PropTypes.func,
			/**
    * Determines if mouse hover or click opens the dropdown menu. The default of `click` is highly recommended to comply with accessibility standards. If you are planning on using hover, please pause a moment and reconsider.
    */
			openOn: _react.PropTypes.oneOf(['hover', 'click'])
		},

		render: function render() {
			var _props = this.props;
			var id = _props.id;
			var onBlur = _props.onBlur;
			var menu = _props.menu;
			var onClick = _props.onClick;
			var onFocus = _props.onFocus;
			var onKeyDown = _props.onKeyDown;
			var onMouseDown = _props.onMouseDown;
			var onMouseEnter = _props.onMouseEnter;
			var onMouseLeave = _props.onMouseLeave;

			var deprecatedPropsFromMenuDropdown = _objectWithoutProperties(_props, ['id', 'onBlur', 'menu', 'onClick', 'onFocus', 'onKeyDown', 'onMouseDown', 'onMouseEnter', 'onMouseLeave']);

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

			// If Trigger has a Button child, then use the explicitly declared child's props layered on top of those passed down by dropdown to allow manual override
			return _react2.default.createElement(
				_button2.default,
				_extends({
					'aria-haspopup': 'true'
				}, deprecatedPropsFromMenuDropdown, propsFromGrandchildButton, {

					id: id,
					onBlur: onBlur,
					onClick: onClick,
					onFocus: onFocus,
					onKeyDown: onKeyDown,
					onMouseDown: onMouseDown,
					onMouseEnter: onMouseEnter,
					onMouseLeave: onMouseLeave
				}),
				menu
			);
		}
	});

	module.exports = Trigger;
});