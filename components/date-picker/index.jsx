/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Dialog from '../utilities/dialog';
import DatepickerDialog from './private/datepicker-dialog';
import InputIcon from '../icon/input-icon';
import Input from '../forms/input';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

import EventUtil from '../../utilities/EventUtil';
import KEYS from '../../utilities/KEYS';

import { DATEPICKER } from '../../utilities/constants';

module.exports = React.createClass({

	displayName: DATEPICKER,

	propTypes: {
		/**
		 * One letter abbreviations of the days of the week, starting on Sunday.
		 */
		abbrWeekDayLabels: PropTypes.array,
		/**
		 * Allows customization of the input field. Event handlers for the input should be added here. <Input onKeyDown... />
		 */
		children: PropTypes.instanceOf(Input),
		/**
		 * CSS classes to be added to tag with `slds-datepicker`.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * Disable input and calendar.
		 */
		disabled: PropTypes.bool,
		/**
		 * Date formatting function
		 */
		formatter: PropTypes.func,
		/**
		 * HTML id for component
		 */
		id: PropTypes.func,
		/**
		 * Renders menu within the wrapping trigger as a sibling of the input. By default, you will have an absolutely positioned container at an elevated z-index.
		 */
		isInline: PropTypes.bool,
		/**
		 * Names of the months
		 */
		monthLabels: PropTypes.array,
		/**
		 * Triggered when the date changes. It receives an object. {date: [Date object, formattedDate: [string]}
		 */
		onDateChange: PropTypes.func,
		/**
		 * Custom function to parase date string into and return a `Date` object. Default function passes the input value to `Date()` and prays.
		 */
		parser: PropTypes.func,
		/**
		 * Placeholder text for input
		 */
		placeholder: PropTypes.string,
		/**
		 * The earliest year that can be selected in the year selection dropdown.
		 */
		relativeYearFrom: PropTypes.number,
		/**
		 * The maximum year that can be selected in the year selection dropdown.
		 */
		relativeYearTo: PropTypes.number,
		/**
		 * Label of shortcut to jump to today within the calendar
		 */
		todayLabel: PropTypes.string,
		/**
		 * CSS classes to be added to tag with `slds-datepicker-trigger`.
		 */
		triggerClassName: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
     * Sets date with a `Date` ECMAScript object.
     */
		value: PropTypes.instanceOf(Date),
		/**
		 * Names of the seven days of the week, starting on Sunday.
		 */
		weekDayLabels: PropTypes.array
	},

	getDefaultProps () {
		return {
			abbrWeekDayLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
			formatter (date) {
				return date ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}` : '';
			},
			monthLabels: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			],
			parser (str) {
				return new Date(str);
			},
			placeholder: 'Pick a Date',
			relativeYearFrom: -5,
			relativeYearTo: 5,
			todayLabel: 'Today',
			weekDayLabels: [
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday'
			]
		};
	},

	getInitialState () {
		const dateString = this.props.formatter(this.props.value);
		const initDate = this.props.value ? dateString : this.props.strValue;
		return {
			isOpen: false,
			value: this.props.value,
			strValue: initDate
		};
	},

	componentWillMount () {
		this.generatedId = shortid.generate();

		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(DATEPICKER, this.props);
	},

	componentWillReceiveProps (nextProps) {
		if (nextProps.value && this.props.value) {
			const currentDate = this.props.value.getTime();
			const nextDate = nextProps.value.getTime();

			if (currentDate !== nextDate) {
				this.setState({
					value: nextProps.value,
					strValue: this.props.formatter(nextProps.value)
				});
			}
		}
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	handleChange (event, { date }) {
		this.setState({
			value: date,
			strValue: this.props.formatter(date),
			isOpen: false
		});

		if (this.props.onDateChange) {
			this.props.onDateChange({ date, formattedDate: this.props.formatter(date) });
		}
	},

	handleClose () {
		this.setState({ isOpen: false });
		this.setFocus();
	},

	handleClick () {
		this.setState({ isOpen: true });
	},

	handleFocus (event) {
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	},

	handleBlur (event) {
		if (this.props.onBlur) {
			this.props.onBlur(event);
		}
		this.setFocus();
	},

	setFocus () {
		if (this.input) {
			ReactDOM.findDOMNode(this.input).focus();
		}
	},

	parseDate (strValue) {
		const parsedDate = this.props.parser(strValue);
		if (Object.prototype.toString.call(parsedDate) === '[object Date]') {
			if (!isNaN(parsedDate.getTime())) {
				return parsedDate;
			}
		}
		return new Date();
	},

	getInlineMenu () {
		return (
			!this.props.disabled && this.state.isOpen
			? <div className="slds-dropdown slds-dropdown--left">
				{this.getDatePicker()}
			</div>
			: null
		);
	},

	getDialog () {
		return (
				!this.props.disabled && this.state.isOpen
				? <Dialog
					closeOnTabKey
					constrainToScrollParent={this.props.constrainToScrollParent}
					inheritTargetWidth={this.props.inheritTargetWidth}
					flippable
					onClose={this.handleClose}
					targetElement={this.input}
				>
				{this.getDatePicker()}
				</Dialog>
				: null
		);
	},

	getDatePicker () {
		const date = this.state.strValue
			? this.parseDate(this.state.strValue)
			: this.state.value;

		return (<DatepickerDialog
			className={this.props.className}
			onSelectDate={this.handleChange}
			selected={this.state.selected}
			onClose={this.handleClose}
			abbrWeekDayLabels={this.props.abbrWeekDayLabels}
			weekDayLabels={this.props.weekDayLabels}
			monthLabels={this.props.monthLabels}
			todayLabel={this.props.todayLabel}
			relativeYearFrom={this.props.relativeYearFrom}
			relativeYearTo={this.props.relativeYearTo}
			selectedDate={date || new Date()}
		/>);
	},

	handleInputChange () {
		const string = ReactDOM.findDOMNode(this.input).value;
		this.setState({
			strValue: string
		});

		if (this.props.onDateChange) {
			this.props.onDateChange({ date: this.props.parser(string), formattedDate: string });
		}
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			const isShift = !!event.shiftKey;
			if (!isShift && (event.keyCode === KEYS.ENTER ||
						// event.keyCode === KEYS.SPACE ||
						event.keyCode === KEYS.DOWN ||
						event.keyCode === KEYS.UP)) {
				EventUtil.trapEvent(event);

				this.setState({
					isOpen: true
				});
			}
		}
		if (this.props.onKeyDown) {
			this.props.onKeyDown(event);
		}
	},

	render () {
		const clonedInput = this.props.children ? React.cloneElement(this.props.children, {
			ref: (component) => { this.input = component; },
			'aria-haspopup': true,
			'aria-expanded': this.state.isOpen,
			// className: classNames(outsideClickIgnoreClass),
			disabled: this.props.children.props.disabled || this.props.disabled,
			iconRight: (<InputIcon category="utility" name="event" />),
			id: this.getId(),
			onBlur: this.handleBlur,
			onChange: this.handleInputChange,
			onClick: this.handleClick,
			onFocus: this.handleFocus,
			onKeyDown: this.handleKeyDown,
			placeholder: this.props.children.props.placeholder || this.props.placeholder,
			value: this.state.strValue
		})
		: <Input
			ref={(component) => { this.input = component; }}
			aria-haspopup
			aria-expanded={this.state.isOpen}
			// className: classNames(outsideClickIgnoreClass),
			disabled={this.props.disabled}
			iconRight={<InputIcon category="utility" name="event" />}
			id={this.getId()}
			onBlur={this.handleBlur}
			onChange={this.handleInputChange}
			onClick={this.handleClick}
			onFocus={this.handleFocus}
			onKeyDown={this.handleKeyDown}
			placeholder={this.props.placeholder}
			value={this.state.strValue || ''}	// needs to be controlled from the beginning
		/>;

		const containerStyles = { display: 'inline' };

		return (
			<div
				className={classNames(
					'slds-datepicker-trigger', {
						'slds-is-open': this.state.isOpen
					},
					this.props.triggerClassName
				)}
				style={containerStyles}
			>
				{clonedInput}
				{this.props.isInline ? this.getInlineMenu() : this.getDialog()}
			</div>
		);
	}
});
