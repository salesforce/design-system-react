'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _navigation = require('./navigation');

var _navigation2 = _interopRequireDefault(_navigation);

var _EventUtil = require('../../../utilities/EventUtil');

var _EventUtil2 = _interopRequireDefault(_EventUtil);

var _KEYS = require('../../../utilities/KEYS');

var _KEYS2 = _interopRequireDefault(_KEYS);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."


var DatepickerCalendarWrapper = _react2.default.createClass({
	displayName: 'DatepickerCalendarWrapper',

	propTypes: {
		/**
   * Label for button to go to the next month
   */
		assistiveTextNextMonth: _react.PropTypes.string.isRequired,
		/**
   * Label for button to go to the previous month
   */
		assistiveTextPreviousMonth: _react.PropTypes.string.isRequired,
		/**
   * One letter abbreviations of the days of the week, starting on Sunday.
   */
		abbreviatedWeekDayLabels: _react.PropTypes.array.isRequired,
		/**
   * CSS classes to be added to tag with `slds-datepicker`.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * HTML id for component
   */
		id: _react.PropTypes.string,
		/**
   * Makes Monday the first day of the week
   */
		isIsoWeekday: _react.PropTypes.bool,
		/**
   * For use of datepicker outside of dropdown.
   */
		isolated: _react.PropTypes.bool,
		/**
   * Names of the months
   */
		monthLabels: _react.PropTypes.array.isRequired,
		/**
   * Triggered when the keyboard moves focus on the calendar. {date: [Date object], formattedDate: [string]}  _Tested with Mocha framework._
   */
		onCalendarFocus: _react.PropTypes.func,
		/**
   * Triggered when the calendar is supposed to close.
   */
		onRequestClose: _react.PropTypes.func.isRequired,
		/**
   * Triggered when a date on the calendar is clicked.
   */
		onSelectDate: _react.PropTypes.func.isRequired,
		/**
   * The earliest year that can be selected in the year selection dropdown.
   */
		relativeYearFrom: _react.PropTypes.number.isRequired,
		/**
   * The maximum year that can be selected in the year selection dropdown.
   */
		relativeYearTo: _react.PropTypes.number.isRequired,
		/**
   * Currently selected date
   */
		selectedDate: _react2.default.PropTypes.instanceOf(Date),
		/**
   * Component reference / DOM node for selected day.
   */
		selectedDateRef: _react.PropTypes.func,
		/**
   * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
   */
		todayLabel: _react.PropTypes.string.isRequired,
		/**
   * Names of the seven days of the week, starting on Sunday.
   */
		weekDayLabels: _react.PropTypes.array.isRequired
	},

	getDefaultProps: function getDefaultProps() {
		return {
			selectedDate: new Date(),
			value: new Date()
		};
	},
	getInitialState: function getInitialState() {
		return {
			initialDateForCalendarRender: this.props.selectedDate,
			isCalendarFocused: true
		};
	},
	handleInitialDateForCalendarRenderChange: function handleInitialDateForCalendarRenderChange(event, initialDateForCalendarRender) {
		this.setState({ initialDateForCalendarRender: initialDateForCalendarRender });
	},
	handleCalendarBlur: function handleCalendarBlur(event, _ref) {
		var direction = _ref.direction;

		if (direction === 'next' && this.previousMonthRef) {
			this.setState({ isCalendarFocused: false });
			if (this.props.onCalendarFocus) {
				this.props.onCalendarFocus(event, { direction: direction, isCalendarFocused: false, ref: this.previousMonthRef });
			}
			this.previousMonthRef.focus();
		} else if (direction === 'previous' && this.todayRef) {
			this.setState({ isCalendarFocused: false });
			if (this.props.onCalendarFocus) {
				this.props.onCalendarFocus(event, { direction: direction, isCalendarFocused: false, ref: this.todayRef });
			}
			this.todayRef.focus();
		}
	},
	handleRequestClose: function handleRequestClose() {
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
	},
	handleLastFocusableNodeKeyDown: function handleLastFocusableNodeKeyDown(event) {
		if (!event.shiftKey && event.keyCode === _KEYS2.default.TAB) {
			_EventUtil2.default.trapEvent(event);
			this.setState({ isCalendarFocused: true });
		}
	},
	handleFirstFocusableNodeKeyDown: function handleFirstFocusableNodeKeyDown(event) {
		if (event.shiftKey && event.keyCode === _KEYS2.default.TAB) {
			_EventUtil2.default.trapEvent(event);
			this.setState({ isCalendarFocused: true });
		}
	},
	handleRequestFocusDate: function handleRequestFocusDate(event, data) {
		// will be called three times, due to re-render
		if (data.ref && this.state.isCalendarFocused) {
			data.ref.focus();
		}

		// only call on actual DOM event and not on re-render
		if (this.props.onCalendarFocus && data.triggerCallback) {
			var triggerCallback = data.triggerCallback,
			    modifiedData = _objectWithoutProperties(data, ['triggerCallback']); // eslint-disable-line no-unused-vars


			this.props.onCalendarFocus(event, modifiedData);
		}
	},
	handleKeyDown: function handleKeyDown(event) {
		if (event.keyCode === _KEYS2.default.ESCAPE) {
			_EventUtil2.default.trapEvent(event);
			this.props.onRequestClose(event);
		}
	},
	render: function render() {
		var _this = this;

		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)({
					'slds-datepicker': this.props.isolated
				}, this.props.className),
				'aria-hidden': 'false',
				'data-selection': 'single',
				onKeyDown: this.handleKeyDown
			},
			_react2.default.createElement(_navigation2.default, {
				assistiveTextNextMonth: this.props.assistiveTextNextMonth,
				assistiveTextPreviousMonth: this.props.assistiveTextPreviousMonth,
				id: this.props.id,
				initialDateForCalendarRender: this.state.initialDateForCalendarRender,
				monthLabels: this.props.monthLabels,
				onChangeMonth: this.handleInitialDateForCalendarRenderChange,
				previousMonthRef: function previousMonthRef(component) {
					_this.previousMonthRef = component;
				},
				onPreviousMonthKeyDown: this.handleFirstFocusableNodeKeyDown,
				relativeYearFrom: this.props.relativeYearFrom,
				relativeYearTo: this.props.relativeYearTo
			}),
			_react2.default.createElement(_calendar2.default, {
				abbreviatedWeekDayLabels: this.props.abbreviatedWeekDayLabels,
				id: this.props.id,
				initialDateForCalendarRender: this.state.initialDateForCalendarRender,
				isIsoWeekday: this.props.isIsoWeekday,
				onCalendarBlur: this.handleCalendarBlur,
				onChangeMonth: this.handleInitialDateForCalendarRenderChange,
				onRequestClose: this.handleRequestClose,
				onRequestInternalFocusDate: this.handleRequestFocusDate,
				onSelectDate: this.props.onSelectDate,
				selectedDate: this.props.selectedDate,
				selectedDateRef: this.props.selectedDateRef,
				todayLabel: this.props.todayLabel,
				todayRef: function todayRef(component) {
					_this.todayRef = component;
				},
				onLastFocusableNodeKeyDown: this.handleLastFocusableNodeKeyDown,
				weekDayLabels: this.props.weekDayLabels
			}),
			_react2.default.createElement(
				'span',
				{ id: 'bn_prev-label', className: 'slds-assistive-text' },
				this.props.assistiveTextNextMonth
			),
			_react2.default.createElement(
				'span',
				{ id: 'bn_next-label', className: 'slds-assistive-text' },
				this.props.assistiveTextPreviousMonth
			)
		);
	}
});

module.exports = DatepickerCalendarWrapper;