define(['exports', 'react', 'classnames', '../icon/button-icon', '../popover-tooltip', '../../utilities/constants'], function (exports, _react, _classnames, _buttonIcon, _popoverTooltip, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _buttonIcon2 = _interopRequireDefault(_buttonIcon);

	var _popoverTooltip2 = _interopRequireDefault(_popoverTooltip);

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

	/**
  * The Button component is the Lightning Design System Button component. The Button should be used for label buttons, icon buttons, or buttons that have both labels and icons.
  * Either a <code>label</code> or <code>assistiveText</code> is required; see the Prop Details table below.
  * For buttons that maintain selected/unselected states, use the <a href="#/button-stateful">ButtonStateful</a> component.
  */
	var Button = _react2.default.createClass({
		displayName: _constants.BUTTON,

		propTypes: {
			/**
    * Used if the Button triggers a tooltip. The value should match the `id` of the element with `role="tooltip"`.
    */
			'aria-describedby': _react.PropTypes.string,
			/**
    * Used if the Button triggers a menu or popup. Bool indicates if the menu or popup is open or closed.
    */
			'aria-expanded': _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
			/**
    * True if Button triggers a menu or popup to open/close.
    */
			'aria-haspopup': _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
			/**
    * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
    * If the button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
    */
			assistiveText: _react.PropTypes.string,
			/**
    * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
    */
			buttonRef: _react.PropTypes.func,
			/**
    * CSS classes to be added to button.
    */
			className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
			/**
    * Disables the button and adds disabled styling.
    */
			disabled: _react.PropTypes.bool,
			/**
    * Associates an icon button with another element on the page by changes the color of the SVG. Please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#hint">Lightning Design System Buttons > Hint</a>.
    */
			hint: _react.PropTypes.bool,
			/**
    * Name of the icon category. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon categories.
    */
			iconCategory: _react.PropTypes.oneOf(['action', 'custom', 'doctype', 'standard', 'utility']),
			/**
    * Name of the icon. Visit <a href="http://www.lightningdesignsystem.com/resources/icons">Lightning Design System Icons</a> to reference icon names.
    */
			iconName: _react.PropTypes.string,
			/**
    * If omitted, icon position is centered.
    */
			iconPosition: _react.PropTypes.oneOf(['left', 'right']),
			/**
    * Determines the size of the icon.
    */
			iconSize: _react.PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
			/**
    * For icon variants, please reference <a href="http://www.lightningdesignsystem.com/components/buttons/#icon">Lightning Design System Icons</a>.
    */
			iconVariant: _react.PropTypes.oneOf(['bare', 'container', 'border', 'border-filled', 'more', 'global-header']),
			/**
    * Id string applied to button node.
    */
			id: _react.PropTypes.string,
			/**
   	* If true, button/icon is white. Meant for buttons or utility icons on dark backgrounds.
    */
			inverse: _react.PropTypes.bool,
			/**
    * Visible label on the button. If the button is an icon button with no label, you must use the <code>assistiveText</code> prop.
    */
			label: _react.PropTypes.string,
			onBlur: _react.PropTypes.func,
			/**
    * Triggered when the button is clicked.
    */
			onClick: _react.PropTypes.func,
			onFocus: _react.PropTypes.func,
			onKeyDown: _react.PropTypes.func,
			onKeyPress: _react.PropTypes.func,
			onKeyUp: _react.PropTypes.func,
			onMouseDown: _react.PropTypes.func,
			onMouseEnter: _react.PropTypes.func,
			onMouseLeave: _react.PropTypes.func,
			/**
    * If true, button scales to 100% width on small form factors.
    */
			responsive: _react.PropTypes.bool,
			/**
    * Write <code>"-1"</code> if you don't want the user to tab to the button.
    */
			tabIndex: _react.PropTypes.string,
			/**
    * HTML title attribute
    */
			title: _react.PropTypes.string,
			variant: _react2.default.PropTypes.oneOf(['base', 'link', 'neutral', 'brand', 'destructive', 'success', 'icon'])
		},

		getDefaultProps: function getDefaultProps() {
			return {
				disabled: false,
				hint: false,
				iconSize: 'medium',
				iconCategory: 'utility',
				responsive: false,
				variant: 'neutral'
			};
		},
		getInitialState: function getInitialState() {
			return {
				active: false
			};
		},
		handleClick: function handleClick(event) {
			if (this.props.onClick) {
				this.props.onClick(event);
			}
			this.setState({ active: !this.state.active });
		},
		getClassName: function getClassName() {
			var _classNames;

			var isIcon = this.props.variant === 'icon';

			var iconVariant = this.props.iconVariant;
			var iconMore = iconVariant === 'more';
			var iconBorder = iconVariant === 'border';
			var iconGlobalHeader = iconVariant === 'global-header';

			var showButtonVariant = this.props.variant !== 'base' && !iconVariant && !this.props.inverse && this.props.variant !== 'link' || iconVariant === 'bare';
			var plainInverseBtn = this.props.inverse && !isIcon;
			var plainInverseIcon = this.props.inverse && isIcon && !iconMore && !iconBorder;
			var moreInverseIcon = this.props.inverse && iconMore;
			var borderInverseIcon = this.props.inverse && iconBorder;

			// After hijacking `iconVariant` to let `Button` know it's in the header, we reset to container style for the actual button CSS.
			if (iconVariant === 'global-header') {
				iconVariant = 'container';
			}

			return (0, _classnames2.default)((_classNames = {
				'slds-button': this.props.variant !== 'link'
			}, _defineProperty(_classNames, 'slds-button--' + this.props.variant, showButtonVariant), _defineProperty(_classNames, 'slds-button--inverse', plainInverseBtn), _defineProperty(_classNames, 'slds-button--icon-inverse', plainInverseIcon || moreInverseIcon), _defineProperty(_classNames, 'slds-button--icon-border-inverse', borderInverseIcon), _defineProperty(_classNames, 'slds-button--icon-' + iconVariant, iconVariant && !borderInverseIcon), _defineProperty(_classNames, 'slds-global-header__button--icon', iconGlobalHeader), _defineProperty(_classNames, 'slds-button--icon-' + this.props.iconSize, iconVariant && this.props.iconSize !== 'medium'), _defineProperty(_classNames, 'slds-button--reset', this.props.variant === 'link'), _defineProperty(_classNames, 'slds-text-link', this.props.variant === 'link'), _classNames), this.props.className);
		},
		renderIcon: function renderIcon(name) {
			var iconSize = this.props.iconSize === '' || this.props.iconVariant ? null : this.props.iconSize;
			return _react2.default.createElement(_buttonIcon2.default, {
				category: this.props.iconCategory,
				className: (0, _classnames2.default)({
					'slds-global-header__icon': this.props.iconVariant === 'global-header'
				}, this.props.iconClassName),
				hint: this.props.hint,
				inverse: this.props.inverse,
				name: name,
				position: this.props.iconPosition,
				size: iconSize
			});
		},
		renderLabel: function renderLabel() {
			var iconOnly = this.props.variant === 'icon';

			return iconOnly && this.props.assistiveText ? _react2.default.createElement(
				'span',
				{ className: 'slds-assistive-text' },
				this.props.assistiveText
			) : this.props.label;
		},
		renderButton: function renderButton() {
			var _this = this;

			return _react2.default.createElement(
				'button',
				{
					'aria-describedby': this.props['aria-describedby'],
					'aria-expanded': this.props['aria-expanded'],
					'aria-haspopup': this.props['aria-haspopup'],
					className: this.getClassName(),
					disabled: this.props.disabled,
					id: this.props.id,
					onBlur: this.props.onBlur,
					onClick: this.handleClick,
					onFocus: this.props.onFocus,
					onKeyDown: this.props.onKeyDown,
					onKeyPress: this.props.onKeyPress,
					onKeyUp: this.props.onKeyUp,
					onMouseDown: this.props.onMouseDown,
					onMouseEnter: this.props.onMouseEnter,
					onMouseLeave: this.props.onMouseLeave,
					ref: function ref(component) {
						if (_this.props.buttonRef) {
							_this.props.buttonRef(component);
						}
					},
					tabIndex: this.props.tabIndex,
					title: this.props.title
				},
				this.props.iconPosition === 'right' ? this.renderLabel() : null,
				this.props.iconName ? this.renderIcon(this.props.iconName) : null,
				this.props.iconVariant === 'more' ? _react2.default.createElement(_buttonIcon2.default, { category: 'utility', name: 'down', size: 'x-small' }) : null,
				this.props.iconPosition === 'left' || !this.props.iconPosition ? this.renderLabel() : null,
				this.props.children
			);
		},
		renderTooltip: function renderTooltip() {
			return _react2.default.createElement(
				_popoverTooltip2.default,
				{
					content: this.props.tooltip
				},
				this.renderButton
			);
		},
		render: function render() {
			return this.props.tooltip ? this.renderTooltip() : this.renderButton();
		}
	});

	exports.default = Button;
});