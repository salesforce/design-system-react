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

// ### isBoolean
import isBoolean from 'lodash.isboolean';

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
		 * Text for the calendar trigger
		 */
		assistiveTextOpenCalendar: PropTypes.string,
		/**
		 * One letter abbreviations of the days of the week, starting on Sunday.
		 */
		abbrWeekDayLabels: PropTypes.array,
		/**
		 * Pass in an <Input /> component to customize it. Event handlers for the input should be added here. `<Input onKeyDown... />`.`
		 */
		children: PropTypes.node,
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
		 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
		 */
		isOpen: PropTypes.bool,
		/**
		 * Makes Monday the first day of the week
		 */
		isIsoWeekday: PropTypes.bool,
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
		 * Function called when the calendar would like hide.
		 */
		onRequestClose: PropTypes.func,
		/**
		 * Function called when the calendar would like show.
		 */
		onRequestOpen: PropTypes.func,
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
			assistiveTextOpenCalendar: 'Open Calendar Dialog',
			abbrWeekDayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
		const initDate = this.props.value ? dateString : this.props.formattedValue;
		return {
			isOpen: false,
			value: this.props.value,
			formattedValue: initDate
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
					formattedValue: this.props.formatter(nextProps.value)
				});
			}
		}
	},

	getId () {
		return this.props.id || this.generatedId;
	},

	getIsOpen () {
		return !!(isBoolean(this.props.isOpen) ? this.props.isOpen : this.state.isOpen);
	},

	handleChange (event, { date }) {
		this.setState({
			value: date,
			formattedValue: this.props.formatter(date)
		});

		if (this.props.onDateChange) {
			this.props.onDateChange({ date, formattedDate: this.props.formatter(date) });
		}
	},

	handleClickOutside () {
		this.handleClose();
	},

	handleClose () {
		if (this.props.onRequestOpen) {
			this.props.onRequestClose();
		} else {
			this.setState({ isOpen: false });
		}
		this.setFocusToInput();
	},

	openDialog () {
		if (this.props.onRequestOpen) {
			this.props.onRequestOpen();
		} else {
			this.setState({ isOpen: true });
		}
	},

	setFocusToInput () {
		if (this.input) {
			ReactDOM.findDOMNode(this.input).querySelector('input').focus();
		}
	},

	parseDate (formattedValue) {
		const parsedDate = this.props.parser(formattedValue);
		if (Object.prototype.toString.call(parsedDate) === '[object Date]') {
			if (!isNaN(parsedDate.getTime())) {
				return parsedDate;
			}
		}
		return new Date();
	},

	getInlineMenu () {
		return (
			!this.props.disabled && this.getIsOpen()
			? <div className="slds-dropdown slds-dropdown--left">
				{this.getDatePicker()}
			</div>
			: null
		);
	},

	focusToday () {
		if (this.datepickerDialog) {
			ReactDOM.findDOMNode(this.datepickerDialog).querySelector('.slds-is-selected').focus();
		}
	},

	getDialog () {
		return (
				!this.props.disabled && this.getIsOpen()
				? <Dialog
					closeOnTabKey
					constrainToScrollParent={this.props.constrainToScrollParent}
					inheritTargetWidth={this.props.inheritTargetWidth}
					flippable
					onClose={this.handleClose}
					onOpen={this.focusToday}
					targetElement={this.input}
				>
				{this.getDatePicker()}
				</Dialog>
				: null
		);
	},

	getDatePicker () {
		const date = this.state.formattedValue
			? this.parseDate(this.state.formattedValue)
			: this.state.value;

		return (<DatepickerDialog
			className={this.props.className}
			isIsoWeekday={this.props.isIsoWeekday}
			onSelectDate={this.handleChange}
			selected={this.state.selected}
			onClose={this.handleClose}
			abbrWeekDayLabels={this.props.abbrWeekDayLabels}
			weekDayLabels={this.props.weekDayLabels}
			monthLabels={this.props.monthLabels}
			todayLabel={this.props.todayLabel}
			ref={(component) => { this.datepickerDialog = component; }}
			relativeYearFrom={this.props.relativeYearFrom}
			relativeYearTo={this.props.relativeYearTo}
			selectedDate={date || new Date()}
		/>);
	},

	handleInputChange () {
		const string = ReactDOM.findDOMNode(this.input).value;
		this.setState({
			formattedValue: string
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
		const clonedProps = {
			ref: (component) => { this.input = component; },
			'aria-expanded': this.getIsOpen(),
			// className: classNames(outsideClickIgnoreClass),
			disabled: this.props.children && !!this.props.children.props.disabled || this.props.disabled,
			iconRight: this.props.children && !!this.props.children.props.iconRight || (<InputIcon
				assistiveText={this.props.assistiveTextOpenCalendar}
				aria-haspopup
				aria-expanded={this.state.isOpen}
				category="utility"
				name="event"
				onClick={this.openDialog}
			/>),
			id: this.getId(),
			onChange: this.handleInputChange,
			onClick: () => {
				this.openDialog();
				if (this.props.children && this.props.children.props.onClick) {
					this.props.children.props.onClick();
				}
			},
			onKeyDown: this.props.children && this.props.children.props.onKeyDown || this.handleKeyDown,
			placeholder: this.props.children && this.props.children.props.placeholder || this.props.placeholder,
			value: this.props.children && this.props.children.props.value || this.state.formattedValue
		};

		const clonedInput = this.props.children ? React.cloneElement(this.props.children, {
			...clonedProps
		})
		: <Input
			{...clonedProps}
		/>;

		const containerStyles = { display: 'inline' };

		return (
			<div
				className={classNames(
					'slds-datepicker-trigger',
					'ignore-react-onclickoutside', {
						'slds-is-open': this.getIsOpen()
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
