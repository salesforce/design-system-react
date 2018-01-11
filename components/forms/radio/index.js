'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var propTypes = {
	/**
  * The ID of an element that describes this radio input. Often used for error messages.
  */
	'aria-describedby': _propTypes2.default.string,
	/**
  * This is a controlled component. This radio is checked according to this value.
  */
	checked: _propTypes2.default.bool,
	/**
  * Disable this radio input.
  */
	disabled: _propTypes2.default.bool,
	/**
  * A unique ID that is used to associating a label to the `input` element. This ID is added to the `input` element.
  */
	id: _propTypes2.default.string,
	/**
  * The string or element that is shown as both the title and the label for this radio input.
  */
	label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,
	/**
  * The name of the radio input group.
  */
	name: _propTypes2.default.string,
	/**
  * This event fires when the radio selection changes.
  */
	onChange: _propTypes2.default.func,
	/**
  * The value of this radio input.
  */
	value: _propTypes2.default.string,
	/**
  * Variant of the Radio button. Base is the default and button-group makes the radio button look like a normal button (should be a child of <RadioButtonGroup>).
  */
	variant: _propTypes2.default.oneOf(['base', 'button-group'])
};

var defaultProps = {
	variant: 'base'
};

/**
 * A radio input that can have a single input checked at any one time. Radios should be wrapped with
 * a [RadioGroup](/components/radio-group) or [RadioButtonGroup](/components/radio-button-group)
 */

var Radio = function (_React$Component) {
	_inherits(Radio, _React$Component);

	function Radio(props) {
		_classCallCheck(this, Radio);

		var _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, props));

		_this.generatedId = _shortid2.default.generate();
		return _this;
	}

	_createClass(Radio, [{
		key: 'getId',
		value: function getId() {
			return this.props.id || this.generatedId;
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'span',
				{
					className: (0, _classnames2.default)({
						'slds-radio': this.props.variant === 'base',
						'slds-button slds-radio_button': this.props.variant === 'button-group'
					})
				},
				_react2.default.createElement('input', {
					type: 'radio',
					id: this.getId(),
					name: this.props.name,
					value: this.props.value,
					checked: !this.props.disabled && this.props.checked,
					onChange: this.props.onChange,
					'aria-describedby': this.props['aria-describedby'],
					disabled: this.props.disabled
				}),
				this.props.variant === 'button-group' ? _react2.default.createElement(
					'label',
					{ className: 'slds-radio_button__label', htmlFor: this.getId() },
					_react2.default.createElement(
						'span',
						{ className: 'slds-radio_faux' },
						this.props.label
					)
				) : _react2.default.createElement(
					'label',
					{ className: 'slds-radio__label', htmlFor: this.getId() },
					_react2.default.createElement('span', { className: 'slds-radio_faux' }),
					_react2.default.createElement(
						'span',
						{ className: 'slds-form-element__label' },
						this.props.label
					)
				)
			);
		}
	}]);

	return Radio;
}(_react2.default.Component);

Radio.displayName = _constants.RADIO;
Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

module.exports = Radio;