/*
 Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { PropTypes } from 'react';

import Dialog from '../utilities/dialog';
import CalendarWrapper from './private/calendar-wrapper';
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

import { DATE_PICKER } from '../../utilities/constants';

/**
 * A date picker is a non text input form element. You can select a single date from a popup or inline calendar. The date picker supplied by this library comes with an input by default, but other components could be passed in as children--however, pairing with other components is untested.
 *
 * The calendar is rendered with time/dates based on local browser time of the client. All dates are in local user timezones. Another way to put it is if a user selects a date, they are selecting midnight their time on that day and not mightnight in UTC. If this component is being used in conjuction with a timezone input, you may want to convert dates provided to UTC in that timezone.
 *
 * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
 *
 * This component may use a portalMount (a disconnected React subtree mount) within an absolutely positioned DOM node created with [Drop](http://github.hubspot.com/drop/).
 */
const Datepicker = React.createClass({
	displayName: DATE_PICKER,

	propTypes: {
		/**
		 * Three letter abbreviations of the days of the week, starting on Sunday. _Tested with snapshot testing._
		 */
		abbreviatedWeekDayLabels: PropTypes.array,
		/**
		 * Label for button to go to the next month _Tested with snapshot testing._
		 */
		assistiveTextNextMonth: PropTypes.string,
		/**
		 * Call to action label for calendar dialog trigger _Tested with snapshot testing._
		 */
		assistiveTextOpenCalendar: PropTypes.string,
		/**
		 * Label for button to go to the previous month _Tested with snapshot testing._
		 */
		assistiveTextPreviousMonth: PropTypes.string,
		/**
		 * Aligns the right or left side of the menu with the respective side of the trigger. _Tested with snapshot testing._
		 */
		align: PropTypes.oneOf(['left', 'right']),
		/**
		 * Pass in an `<Input />` component to customize it. Event handlers for the input (if needed) should be added here and not to this component. `<Input onKeyDown... />`.` _Tested with Mocha framework._
		 */
		children: PropTypes.node,
		/**
		 * CSS classes to be added to tag with `slds-datepicker`. If you are looking for the outer DOM node (slds-dropdown-trigger), please review `triggerClassName`. _Tested with snapshot testing._
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
		 * If true, constrains the menu to the scroll parent. Has no effect if `isInline` is `true`. _Not tested._
		 */
		constrainToScrollParent: PropTypes.bool,
		/**
		 * Disable input and calendar. _Tested with Mocha framework._
		 */
		disabled: PropTypes.bool,
		/**
		 * Date formatting function. _Tested with snapshot testing._
		 */
		formatter: PropTypes.func,
		/**
		 * Value of input that gets passed to `parser` prop. Set the `value` prop if using a `Date` object. Use an external library such as [MomentJS](https://github.com/moment/moment/) if additional date formatting or internationalization is needed. _Not tested._
		 */
		formattedValue: PropTypes.string,
		/* Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen. _Not tested._
		*/
		hasStaticAlignment: PropTypes.bool,
		/**
		 * HTML id for component _Tested with snapshot testing._
		 */
		id: PropTypes.string,
		/**
		 * Renders menu within the wrapping trigger as a sibling of the input. By default, you will have an absolutely positioned container at an elevated z-index.
		 */
		isInline: PropTypes.bool,
		/**
		 * This label appears above the input.
		 */
		label: PropTypes.string,
		/**
		 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
		 */
		isOpen: PropTypes.bool,
		/**
		 * Makes Monday the first day of the week. _Tested with snapshot testing._
		 */
		isIsoWeekday: PropTypes.bool,
		/**
		 * Names of the months. _Tested with snapshot testing._
		 */
		monthLabels: PropTypes.array,
		/**
		 * Triggered when the user wants to focus on a new day with the keyboard. If the target node is a day it will return the keyboard event a data object with the shape: `{date: [Date object]}`. Event will be `null` when new month is re-rendered.  _Tested with Mocha framework._
		 */
		onCalendarFocus: PropTypes.func,
		/**
		 * Triggered when the date changes. `onChange` can be used for form validation if needed. It receives an event and a data object in the shape: `{date: [Date object], formattedDate: [string], timezoneOffset: [number]}`. `data.date` is Coordinated Universal Time (UTC), but the days of the calendar are in local time of the user. The `timezoneOffset` is the difference, in minutes, between UTC and the local time. Please note that this means that the offset is positive if the local timezone is behind UTC and negative if it is ahead. `timezoneOffset` is in minutes, for hours divide by `60`. _Tested with Mocha framework._
		 */
		onChange: PropTypes.func,
		/**
		 * Triggered when the calendar is closed. _Tested with Mocha framework._
		 */
		onClose: PropTypes.func,
		/**
		 * Triggered when the calendar has opened. _Tested with Mocha framework._
		 */
		onOpen: PropTypes.func,
		/**
		 * Function called when the calendar dialog would like hide. This will turn the calendar dialog into into a controlled component. Please use with `isOpen`. _Tested with Mocha framework._
		 */
		onRequestClose: PropTypes.func,
		/**
		 * Function called when the calendar dialog would like show. This will turn the calendar dialog into into a controlled component. Please use with `isOpen`. _Tested with Mocha framework._
		 */
		onRequestOpen: PropTypes.func,
		/**
		 * Custom function to parse date string into and return a `Date` object. Default function passes the input value to `Date()` and prays for a miracle. Use an external library such as [MomentJS](https://github.com/moment/moment/) if additional date parsing is needed. _Tested with snapshot testing._
		 */
		parser: PropTypes.func,
		/**
		 * Absolutely positioned DOM nodes, such as a datepicker dialog, may need their own React DOM tree root. They may need their alignment "flipped" if extended beyond the window or outside the bounds of an overflow-hidden scrolling modal. This library's portal mounts are added as a child node of `body`. This prop will be triggered instead of the default `ReactDOM.mount()` when this dialog is mounted. This prop is useful for testing and simliar to a "callback ref." Two arguments,`reactElement` and `domContainerNode` are passed in. Consider the following code that bypasses the internal mount and uses an Enzyme wrapper to mount the React root tree to the DOM.
		 *
		 * ```
		 * <Datepicker
				isOpen
				portalMount={(reactElement, domContainerNode) => {
					portalWrapper = Enzyme.mount(reactElement, { attachTo: domContainerNode });
				}}
				onOpen={() => {
					expect(portalWrapper.find(`#my-heading`)).to.exist;
					done();
				}}
			/>
			```
			_Tested with Mocha framework._
		 */
		portalMount: PropTypes.func,
		/**
		 * Placeholder text for input. _Tested with snapshot testing._
		 */
		placeholder: PropTypes.string,
		/**
		 * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012). _Tested with snapshot testing._
		 */
		relativeYearFrom: PropTypes.number,
		/**
		 * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012). _Tested with snapshot testing._
		 */
		relativeYearTo: PropTypes.number,
		/**
		 * Label of shortcut to jump to today within the calendar. This is also used for assistive text on today's date. _Tested with snapshot testing._
		 */
		todayLabel: PropTypes.string,
		/**
		 * CSS classes to be added to tag with `slds-datepicker-trigger`. This is typically a wrapping `div` around the input. _Tested with snapshot testing._
		 */
		triggerClassName: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
		/**
     * Sets date with a `Date` ECMAScript object. _Tested with snapshot testing._
     */
		value: PropTypes.instanceOf(Date),
		/**
		 * Full names of the seven days of the week, starting on Sunday. _Tested with snapshot testing._
		 */
		weekDayLabels: PropTypes.array
	},

	getDefaultProps () {
		return {
			align: 'left',
			abbreviatedWeekDayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			assistiveTextOpenCalendar: 'Open Calendar',
			assistiveTextNextMonth: 'Next month',
			assistiveTextPreviousMonth: 'Previous month',
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
		// Please remove `strValue` on the next breaking change.
		const formattedValue = this.props.formattedValue || this.props.strValue; // eslint-disable-line react/prop-types
		const dateString = this.props.formatter(this.props.value);
		const initDate = this.props.value ? dateString : formattedValue;
		return {
			isOpen: false,
			value: this.props.value,
			formattedValue: initDate || '',
			inputValue: initDate || ''
		};
	},

	componentWillMount () {
		this.generatedId = shortid.generate();

		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(DATE_PICKER, this.props);
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

	handleCalendarChange (event, { date }) {
		this.setState({
			value: date,
			formattedValue: this.props.formatter(date),
			inputValue: this.props.formatter(date)
		});

		this.handleRequestClose();

		if (this.props.onChange) {
			this.props.onChange(event, {
				date,
				formattedDate: this.props.formatter(date),
				timezoneOffset: date.getTimezoneOffset()
			});
		}

		// Please remove `onDateChange` on the next breaking change.
		/* eslint-disable react/prop-types */
		if (this.props.onDateChange) {
			this.props.onDateChange(date, this.props.formatter(date));
		}
		/* eslint-enable react/prop-types */
	},

	handleClickOutside () {
		this.handleRequestClose();
	},

	handleRequestClose () {
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}

		if (this.getIsOpen()) {
			this.setState({ isOpen: false });
		}

		if (this.inputRef) {
			this.inputRef.focus();
		}
	},

	openDialog () {
		if (this.props.onRequestOpen) {
			this.props.onRequestOpen();
		} else {
			this.setState({ isOpen: true });
		}
	},

	parseDate (formattedValue) {
		let parsedDate = this.props.parser(formattedValue);
		if (Object.prototype.toString.call(parsedDate) !== '[object Date]'
			|| isNaN(parsedDate.getTime())) {
			parsedDate = new Date();
		}
		return parsedDate;
	},

	getInlineMenu () {
		return (
			!this.props.disabled && this.getIsOpen()
			? <div
				className={classNames('slds-datepicker',
					'slds-dropdown',
					`slds-dropdown--${this.props.align}`,
				this.props.className)}
			>
				{this.getDatePicker()}
			</div>
			: null
		);
	},

	handleClose () {
		if (this.props.onClose) {
			this.props.onClose();
		}
	},

	handleOpen () {
		if (this.props.onOpen) {
			this.props.onOpen();
		}

		if (this.selectedDateCell) {
			this.selectedDateCell.focus();
		}
	},

	getDialog () {
		return (
				!this.props.disabled && this.getIsOpen()
				? <Dialog
					contentsClassName="slds-datepicker slds-dropdown"
					constrainToScrollParent={this.props.constrainToScrollParent}
					horizontalAlign={this.props.align}
					flippable={!this.props.hasStaticAlignment}
					onClose={this.handleClose}
					onOpen={this.handleOpen}
					portalMount={this.props.portalMount}
					targetElement={this.inputRef}
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

		return (<CalendarWrapper
			// Please remove `abbrWeekDayLabels` on the next breaking change.
			abbreviatedWeekDayLabels={this.props.abbreviatedWeekDayLabels || this.props.abbrWeekDayLabels} // eslint-disable-line react/prop-types
			assistiveTextNextMonth={this.props.assistiveTextNextMonth}
			assistiveTextPreviousMonth={this.props.assistiveTextPreviousMonth}
			id={this.getId()}
			isIsoWeekday={this.props.isIsoWeekday}
			monthLabels={this.props.monthLabels}
			onCalendarFocus={this.props.onCalendarFocus}
			onRequestClose={this.handleRequestClose}
			onSelectDate={this.handleCalendarChange}
			ref={() => {
				// since it's inline, there is no callback except on render
				if (this.props.isInline) {
					this.handleOpen();
				}
			}}
			relativeYearFrom={this.props.relativeYearFrom}
			relativeYearTo={this.props.relativeYearTo}
			selectedDate={date || new Date()}
			selectedDateRef={(component) => { this.selectedDateCell = component; }}
			todayLabel={this.props.todayLabel}
			weekDayLabels={this.props.weekDayLabels}
		/>);
	},

	handleInputChange (event) {
		this.setState({
			formattedValue: event.target.value,
			inputValue: event.target.value
		});

		const date = this.props.parser(event.target.value);

		if (this.props.onChange) {
			this.props.onChange(event, {
				date,
				formattedDate: event.target.value,
				timezoneOffset: date.getTimezoneOffset()
			});
		}
	},

	handleKeyDown (event) {
		// Don't open if user is selecting text
		if (event.keyCode
				&& !event.shiftKey
				&& (event.keyCode === KEYS.DOWN || event.keyCode === KEYS.UP)) {
			EventUtil.trapEvent(event);
			this.setState({ isOpen: true });
		}

		// Please remove `onKeyDown` on the next breaking change.
		/* eslint-disable react/prop-types */
		if (this.props.onKeyDown) {
			this.props.onKeyDown(event);
		}
		/* eslint-enable react/prop-types */
	},

	render () {
		const clonedProps = {
			disabled: this.props.children && !!this.props.children.props.disabled || this.props.disabled,
			iconRight: this.props.children && !!this.props.children.props.iconRight || (<InputIcon
				assistiveText={this.props.assistiveTextOpenCalendar}
				aria-haspopup
				aria-expanded={this.getIsOpen()}
				category="utility"
				name="event"
				onClick={this.openDialog}
			/>),
			id: this.getId(),
			inputRef: (component) => { this.inputRef = component; },
			label: this.props.children && this.props.children.props.label || this.props.label, // eslint-disable-line react/prop-types
			onBlur: this.props.children && this.props.children.props.onBlur || this.props.onBlur, // eslint-disable-line react/prop-types
			onChange: this.handleInputChange,
			onClick: () => {
				this.openDialog();
				if (this.props.children && this.props.children.props.onClick) {
					this.props.children.props.onClick();
				}
			},
			onFocus: this.props.children && this.props.children.props.onFocus || this.props.onFocus, // eslint-disable-line react/prop-types
			onKeyDown: this.props.children && this.props.children.props.onKeyDown || this.handleKeyDown,
			placeholder: this.props.children && this.props.children.props.placeholder || this.props.placeholder,
			required: this.props.children && this.props.children.props.required || this.props.required, // eslint-disable-line react/prop-types
			value: this.props.children && this.props.children.props.value || this.state.inputValue
		};

		const clonedInput = this.props.children ? React.cloneElement(this.props.children, {
			...clonedProps
		})
		: <Input
			{...clonedProps}
		/>;

		return (
			<div
				className={classNames(
					'slds-dropdown-trigger',
					'slds-dropdown-trigger--click',
					'ignore-react-onclickoutside', {
						'slds-is-open': this.getIsOpen()
					},
					this.props.triggerClassName
				)}
			>
				{clonedInput}
				{this.props.isInline ? this.getInlineMenu() : this.getDialog()}
			</div>
		);
	}
});

export default Datepicker;
