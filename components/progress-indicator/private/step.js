'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _popoverTooltip = require('../../popover-tooltip');

var _popoverTooltip2 = _interopRequireDefault(_popoverTooltip);

var _constants = require('../../../utilities/constants');

var _buttonIcon = require('../../icon/button-icon');

var _buttonIcon2 = _interopRequireDefault(_buttonIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, 'a simple javascript utility for conditionally
// joining classNames together.'


// Child component


// ### Display Name
var displayName = _constants.PROGRESS_INDICATOR_STEP;

// ### Prop Types
var propTypes = {
	/**
  * Id for Steps, ranging in [0, steps.length).
  */
	id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
	/**
  * Index of step. Used for id's if no step ID exists
  */
	index: _propTypes2.default.number,
	/**
  * Determines if the step has been completed
  */
	isCompleted: _propTypes2.default.bool,
	/**
  * Determines if the step has been disabled
  */
	isDisabled: _propTypes2.default.bool,
	/**
  * Determines if the step contains an error
  */
	isError: _propTypes2.default.bool,
	/**
  * Determines if the step is currently selected (active)
  */
	isSelected: _propTypes2.default.bool,
	/**
  * Label of tooltip attached to the step if applicable.
  */
	label: _propTypes2.default.node,
	/**
  * Triggered when click on individual steps. By default, it receives an event and returns all info passed to that step.
  * users are able to re-define it by passing a function as a prop
  */
	onClick: _propTypes2.default.func,
	/**
  * Triggered when focus on individual steps. By default, it receives an event and returns all info passed to that step.
  * users are able to re-define it by passing a function as a prop
  */
	onFocus: _propTypes2.default.func,
	/**
  * Step object. This is passed into event callbacks.
  */
	step: _propTypes2.default.object,
	/**
  * Determines if the tooltip attached to step is always open.
  * This is mainly for dev test purpose.
  * Usually the tooltip should only show when hover.
  */
	tooltipIsOpen: _propTypes2.default.bool
};

/**
 * Step renders a button icon and its tooltip if applied.
 * The button is applied with different css classes under different conditions.
 * Button icons have 4 types of status: completed (success), active (in progress), error (warning) and uncompleted (not approached)
 */

var Step = function (_React$Component) {
	_inherits(Step, _React$Component);

	function Step() {
		_classCallCheck(this, Step);

		return _possibleConstructorReturn(this, (Step.__proto__ || Object.getPrototypeOf(Step)).apply(this, arguments));
	}

	_createClass(Step, [{
		key: 'buttonIcon',

		/**
   * buttonIcon represents the button icon used for each step.
   * the button is applied with different css classes under different conditions.
   */
		value: function buttonIcon(renderIcon, status, props) {
			var data = {
				isSelected: props.isSelected,
				isError: props.isError,
				isCompleted: props.isCompleted,
				isDisabled: props.isDisabled,
				step: props.step
			};

			var icon = renderIcon ? _react2.default.createElement(_buttonIcon2.default, {
				category: 'utility',
				name: this.props.isError ? 'warning' : 'success'
			}) : null;

			var handleClick = function handleClick(event) {
				return props.onClick(event, data);
			};
			var handleFocus = function handleFocus(event) {
				return props.onFocus(event, data);
			};

			var stepButton = props.isDisabled ? _react2.default.createElement(
				'span',
				{
					className: (0, _classnames2.default)('slds-button', { 'slds-button_icon': renderIcon }, 'slds-progress__marker', { 'slds-progress__marker_icon': renderIcon }),
					'aria-describedby': 'progress-indicator-tooltip-' + (this.props.step.id || this.props.index),
					tabIndex: 0,
					role: 'button'
				},
				icon,
				_react2.default.createElement(
					'span',
					{ className: 'slds-assistive-text' },
					props.step.assistiveText || 'Step ' + (props.index + 1) + ': ' + status
				)
			) : _react2.default.createElement(
				'button',
				{
					className: (0, _classnames2.default)('slds-button', { 'slds-button_icon': renderIcon }, 'slds-progress__marker', { 'slds-progress__marker_icon': renderIcon }),
					onClick: handleClick,
					onFocus: handleFocus,
					'aria-describedby': 'progress-indicator-tooltip-' + (this.props.step.id || this.props.index)
				},
				icon,
				_react2.default.createElement(
					'span',
					{ className: 'slds-assistive-text' },
					props.step.assistiveText || 'Step ' + (props.index + 1) + ': ' + status
				)
			);

			return stepButton;
		}
	}, {
		key: 'render',
		value: function render() {
			var renderIcon = this.props.isCompleted || this.props.isError;
			// step status (one of ['Error', 'Completed', 'Active', 'Uncompleted'])
			var status = '';
			if (this.props.isError) {
				status = 'Error';
			} else if (this.props.isCompleted) {
				status = 'Completed';
			} else if (this.props.isSelected) {
				status = 'Active';
			} else status = 'Uncompleted';

			var tooltipProps = {
				align: 'top',
				id: 'progress-indicator-tooltip-' + (this.props.step.id || this.props.index),
				content: this.props.step.label,
				variant: this.props.isError ? 'error' : 'info',
				triggerStyle: { display: !renderIcon ? 'flex' : '' }
			};

			// This is mainly for dev test purpose.
			// `isOpen` is only set to true if tooltip is specified to be open
			// Do not set isOpen to false or undefined otherwise, because that will
			// disable any interaction with tooltips
			if (this.props.tooltipIsOpen) {
				tooltipProps.isOpen = true;
			}

			return _react2.default.createElement(
				'li',
				{
					className: (0, _classnames2.default)('slds-progress__item', {
						'slds-is-completed': this.props.isCompleted,
						'slds-is-active': this.props.isSelected && !this.props.isError,
						'slds-has-error': this.props.isError
					})
				},
				_react2.default.createElement(
					_popoverTooltip2.default,
					tooltipProps,
					this.buttonIcon(renderIcon, status, this.props)
				)
			);
		}
	}]);

	return Step;
}(_react2.default.Component);

Step.propTypes = propTypes;
Step.displayName = displayName;

exports.default = Step; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime