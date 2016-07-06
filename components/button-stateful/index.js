'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.isboolean');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isfunction');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.omit');

var _lodash6 = _interopRequireDefault(_lodash5);

var _buttonIcon = require('../icon/button-icon');

var _buttonIcon2 = _interopRequireDefault(_buttonIcon);

var _trigger = require('../popover-tooltip/trigger');

var _trigger2 = _interopRequireDefault(_trigger);

var _constants = require('../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// ## Dependencies

// ### React


// ### classNames


// ### isBoolean


// ### isFunction


// ### omit


// ## Children


var blurElement = function blurElement(e) {
	return e.currentTarget.blur();
};

var propTypes = {
	/**
  * Specifies the current state of the button. If set, the button will act as a ['controlled' component](https://facebook.github.io/react/docs/forms.html#controlled-components).
  */
	active: _react2.default.PropTypes.bool,
	/**
  * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
  * If the button has an icon and a visible label, you can omit the <code>assistiveText</code> prop and use the <code>label</code> prop.
  */
	assistiveText: _react2.default.PropTypes.string,
	disabled: _react2.default.PropTypes.bool,
	/**
  * Name of the icon. Visit <a href='http://www.lightningdesignsystem.com/resources/icons'>Lightning Design System Icons</a> to reference icon names.
  */
	iconName: _react2.default.PropTypes.string,
	iconSize: _react2.default.PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
	onClick: _react2.default.PropTypes.func,
	/**
  * If true, button scales to 100% width on small form factors.
  */
	responsive: _react2.default.PropTypes.bool,
	/**
  * Write <code>'-1'</code> if you don't want the user to tab to the button.
  */
	tabIndex: _react2.default.PropTypes.string,
	/**
  * Initial label and icon (optional) of button.
  */
	stateOne: _react2.default.PropTypes.object,
	/**
  * Selected label and icon (optional) of button.
  */
	stateTwo: _react2.default.PropTypes.object,
	/**
  *	Deselect label and icon (optional) of button.
  */
	stateThree: _react2.default.PropTypes.object,
	tooltip: _react2.default.PropTypes.node,
	/**
  * Use <code>icon-inverse</code> for white icons.
  */
	variant: _react2.default.PropTypes.oneOf(['base', 'neutral', 'brand', 'destructive', 'icon', 'inverse', 'icon-inverse'])
};

// i18n
var defaultProps = {
	disabled: false,
	iconSize: 'medium',
	responsive: false,
	stateOne: { iconName: 'add', label: 'Follow' },
	stateTwo: { iconName: 'check', label: 'Following' },
	stateThree: { iconName: 'close', label: 'Unfollow' }
};

/**
 * The ButtonStateful component is a variant of the Lightning Design System Button component. It is used for buttons that have a state of unselected or selected.
 * For icon buttons, use <code>variant='icon'</code>. For buttons with labels or buttons with labels and icons, pass data to the state props (ie. <code>stateOne={{iconName: 'add', label: 'Join'}}</code>).
 */

var ButtonStateful = function (_TooltipTrigger) {
	_inherits(ButtonStateful, _TooltipTrigger);

	function ButtonStateful(props) {
		_classCallCheck(this, ButtonStateful);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonStateful).call(this, props));

		_this.state = { active: false };
		return _this;
	}

	_createClass(ButtonStateful, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			_get(Object.getPrototypeOf(ButtonStateful.prototype), 'componentDidMount', this).call(this);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_get(Object.getPrototypeOf(ButtonStateful.prototype), 'componentWillUnmount', this).call(this);
		}
	}, {
		key: 'handleClick',
		value: function handleClick(e) {
			if ((0, _lodash4.default)(this.props.onClick)) this.props.onClick(e);
			if (!(0, _lodash2.default)(this.props.active)) this.setState({ active: !this.state.active });
		}
	}, {
		key: 'getClassName',
		value: function getClassName(active) {
			return (0, _classnames2.default)(this.props.className, 'slds-button', {
				'slds-button--neutral': this.props.variant !== 'icon',
				'slds-button--inverse': this.props.variant === 'inverse',
				'slds-not-selected': !active,
				'slds-is-selected': active,
				'slds-max-small-button--stretch': this.props.responsive,
				'slds-button--icon-border': this.props.variant === 'icon'
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var props = (0, _lodash6.default)(this.props, ['className', 'label', 'onClick', 'type', 'active']);
			var active = (0, _lodash2.default)(this.props.active) ? this.props.active : this.state.active;

			if (this.props.variant === 'icon') {
				return _react2.default.createElement(
					'button',
					_extends({
						onMouseLeave: blurElement,
						className: this.getClassName(active),
						onClick: this.handleClick.bind(this)
					}, props, {
						'aria-live': 'polite'
					}),
					_react2.default.createElement(_buttonIcon2.default, {
						assistiveText: active ? this.props.assistiveText + ' selected' : this.props.assistiveText,
						disabled: this.props.disabled,
						name: this.props.iconName,
						size: this.props.iconSize,
						className: 'slds-button__icon--stateful'
					}),
					this.getTooltip()
				);
			} else {
				return _react2.default.createElement(
					'button',
					_extends({
						onMouseLeave: blurElement,
						className: this.getClassName(active),
						'aria-live': 'assertive',
						onClick: this.handleClick.bind(this)
					}, props),
					_react2.default.createElement(
						'span',
						{ className: 'slds-text-not-selected' },
						_react2.default.createElement(_buttonIcon2.default, {
							disabled: this.props.disabled,
							name: this.props.stateOne.iconName,
							size: 'small',
							position: 'left',
							className: 'slds-button__icon--stateful'
						}),
						this.props.stateOne.label
					),
					_react2.default.createElement(
						'span',
						{ className: 'slds-text-selected' },
						_react2.default.createElement(_buttonIcon2.default, {
							disabled: this.props.disabled,
							name: this.props.stateTwo.iconName,
							size: 'small', position: 'left',
							className: 'slds-button__icon--stateful'
						}),
						this.props.stateTwo.label
					),
					_react2.default.createElement(
						'span',
						{ className: 'slds-text-selected-focus' },
						_react2.default.createElement(_buttonIcon2.default, {
							disabled: this.props.disabled,
							name: this.props.stateThree.iconName,
							size: 'small',
							position: 'left',
							className: 'slds-button__icon--stateful'
						}),
						this.props.stateThree.label
					),
					this.getTooltip()
				);
			}
		}
	}]);

	return ButtonStateful;
}(_trigger2.default);

ButtonStateful.displayName = _constants.BUTTON_STATEFUL;
ButtonStateful.propTypes = propTypes;
ButtonStateful.defaultProps = defaultProps;

module.exports = ButtonStateful;