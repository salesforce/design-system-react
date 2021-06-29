/* eslint-disable max-lines */
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import assign from 'lodash.assign';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator
import shortid from 'shortid';

import Dialog from '../utilities/dialog';
import CalendarWrapper from './private/calendar-wrapper';
import InputIcon from '../icon/input-icon';
import Input from '../input';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';
import componentDoc from './component.json';

import EventUtil from '../../utilities/event';
import KEYS from '../../utilities/key-code';
import lowPriorityWarning from '../../utilities/warning/low-priority-warning';

import { DATE_PICKER } from '../../utilities/constants';
import { IconSettingsContext } from '../icon-settings';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `nextMonth`: Label for button to go to the next month _Tested with snapshot testing._
	 * * `openCalendar`: Call to action label for calendar dialog trigger _Tested with snapshot testing._
	 * * `previousMonth`: Label for button to go to the previous month _Tested with snapshot testing._
	 */
	assistiveText: PropTypes.shape({
		nextMonth: PropTypes.string,
		openCalendar: PropTypes.string,
		previousMonth: PropTypes.string,
		year: PropTypes.string,
	}),
	/**
	 * Aligns the right or left side of the menu with the respective side of the trigger. _Tested with snapshot testing._
	 */
	align: PropTypes.oneOf(['left', 'right']),
	/**
	 * CSS classes to be added to tag with `slds-datepicker`. If you are looking for the outer DOM node (slds-dropdown-trigger), please review `triggerClassName`. _Tested with snapshot testing._
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Disable input and calendar. _Tested with Mocha framework._
	 */
	disabled: PropTypes.bool,
	/**
	 * This function callback receives a data object with a key of `date`. Write your own validation and return `true` if the date should be disabled, otherwise please return `false`. The value of `date` is the day rendered in the calendar with the current local time and timezone.
	 */
	dateDisabled: PropTypes.func,
	/**
	 * Date formatting function that formats the `value` prop (`value` is an ECMAScript `Date()` object) and returns a string to be rendered as the `input` value. Please use an external library such as [MomentJS](https://github.com/moment/moment/) for date formatting and internationalization. _Tested with snapshot testing._
	 * The default `formatter` function is:
	 * ```
	 * formatter(date) {
	 *   return date
	 *    ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
	 *    : '';
	 * }
	 * ```
	 */
	formatter: PropTypes.func,
	/**
	 * Value of input that gets passed to `parser` prop on initial render. This prop is only present for uncontrolled use of Datepicker which is _highly discouraged_. A better name for this prop would be `defaultFormatedValue`. Please use the `value` prop instead. _Not tested._
	 */
	formattedValue: PropTypes.string,
	/**
	 * Applies the error style to the component.
	 */
	hasError: PropTypes.bool,
	/**
	 * Prevents the dropdown from changing position based on the viewport/window. If set to true your dropdowns can extend outside the viewport _and_ overflow outside of a scrolling parent. If this happens, you might want to consider making the dropdowns contents scrollable to fit the menu on the screen. `hasStaticAlignment` disables this behavior and allows this component to extend beyond boundary elements. _Not tested._
	 */
	hasStaticAlignment: PropTypes.bool,
	/**
	 * HTML id for component _Tested with snapshot testing._
	 */
	id: PropTypes.string,
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `abbreviatedWeekDays`: Three letter abbreviations of the days of the week, starting on Sunday. _Tested with snapshot testing._
	 * * `months`: Names of the months. _Tested with snapshot testing._
	 * * `label`: This label appears above the input.
	 * * `placeholder`: Placeholder text for input. _Tested with snapshot testing._
	 * * `today`: Label of shortcut to jump to today within the calendar. This is also used for assistive text on today's date. _Tested with snapshot testing._
	 * * `weekDays`: Full names of the seven days of the week, starting on Sunday. _Tested with snapshot testing._
	 */
	labels: PropTypes.shape({
		abbreviatedWeekDays: PropTypes.array,
		label: PropTypes.string,
		months: PropTypes.array,
		placeholder: PropTypes.string,
		today: PropTypes.string,
		weekDays: PropTypes.array,
	}),
	/**
	 * An [Input](http://react.lightningdesignsystem.com/components/inputs/) component. The props from this `Input` component will be merged and override any default props. See [Component composition with prop spread](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#component-composition-with-prop-spread) for more information on this methodology.
	 */
	input: PropTypes.node,
	/**
	 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
	 */
	isOpen: PropTypes.bool,
	/**
	 * Makes Monday the first day of the week. _Tested with snapshot testing._
	 */
	isIsoWeekday: PropTypes.bool,
	/**
	 * Please select one of the following:
	 * * `absolute` - (default) The dialog will use `position: absolute` and style attributes to position itself. This allows inverted placement or flipping of the dialog.
	 * * `overflowBoundaryElement` - The dialog will overflow scrolling parents. Use on elements that are aligned to the left or right of their target and don't care about the target being within a scrolling parent. Typically this is a popover or tooltip. Dropdown menus can usually open up and down if no room exists. In order to achieve this a portal element will be created and attached to `body`. This element will render into that detached render tree.
	 * * `relative` - No styling or portals will be used. Menus will be positioned relative to their triggers. This is a great choice for HTML snapshot testing.
	 */
	menuPosition: PropTypes.oneOf([
		'absolute',
		'overflowBoundaryElement',
		'relative',
	]),
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
	 * Custom function to parse date string from the `input` value, which must return an ECMAScript `Date()` object.  Please use an external library such as [MomentJS](https://github.com/moment/moment/) for date parsing and internationalization. The default `parser` passes the input value to ECMAScript `Date()` and _prays_ for a miracle. **Do not use the default parsing function in production.** _Tested with snapshot testing._
	 * The default `parser function is:
	 * ```
	 * parser(str) {
	 *   return new Date(str);
	 * }
	 * ```
	 */
	parser: PropTypes.func,
	/**
	 * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012). _Tested with snapshot testing._
	 */
	relativeYearFrom: PropTypes.number,
	/**
	 * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012). _Tested with snapshot testing._
	 */
	relativeYearTo: PropTypes.number,
	/**
	 * CSS classes to be added to tag with `slds-datepicker-trigger`. This is typically a wrapping `div` around the input. _Tested with snapshot testing._
	 */
	triggerClassName: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Sets date with a `Date` ECMAScript object. _Tested with snapshot testing._
	 */
	value: PropTypes.instanceOf(Date),
};

const defaultProps = {
	align: 'left',
	assistiveText: {
		nextMonth: 'Next month',
		openCalendar: 'Open Calendar',
		previousMonth: 'Previous month',
		year: 'Year',
	},
	formatter(date) {
		return date
			? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
			: '';
	},
	labels: {
		abbreviatedWeekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		months: [
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
			'December',
		],
		placeholder: 'Pick a Date',
		today: 'Today',
		weekDays: [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		],
	},
	menuPosition: 'absolute',
	parser(str) {
		lowPriorityWarning(
			false,
			`Please use an external library for date parsing and internationalization like MomentJS (https://github.com/moment/moment/) instead of the default parser.`
		);
		return new Date(str);
	},
	relativeYearFrom: -10,
	relativeYearTo: 10,
	dateDisabled: () => false,
};

/**
 * A date picker is a non-text input form element. You can select a single date from a popup calendar. Please use an external library such as [MomentJS](https://github.com/moment/moment/) for date formatting and parsing and internationalization. You will want to use your date library within the `parser` and `formatter` callbacks.
 *
 * The calendar is rendered with time/dates based on local browser time of the client browser. All dates are in the local user's timezones and time. Another way to put it is if a user selects a date, they are actually selecting midnight in their current time on their current day and not mightnight in UTC. If `Datepicker` is paired with a time and timezone input, you may want to convert dates provided by this component to UTC and then combine the date with your time and timezone input.
 *
 * Pairing with any other component besides an `input` is untested.
 *
 * This component is wrapped in a [higher order component to listen for clicks outside itself](https://github.com/kentor/react-click-outside) and thus requires use of `ReactDOM`.
 */
class Datepicker extends React.Component {
	constructor(props) {
		super(props);
		// Please remove `strValue` on the next breaking change.
		const formattedValue = props.formattedValue || props.strValue; // eslint-disable-line react/prop-types
		const dateString = props.formatter(props.value);
		const initDate = props.value ? dateString : formattedValue;

		this.state = {
			isOpen: false,
			isOpenFromIcon: false,
			value: props.value,
			formattedValue: initDate || '',
			inputValue: initDate || '',
		};

		this.generatedId = shortid.generate();

		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(DATE_PICKER, props, componentDoc);
	}

	getDatePicker = ({ labels, assistiveText }) => {
		let date;
		// Use props if present. Otherwise, use state.
		if (this.props.value) {
			date = this.props.formatter(this.props.value)
				? this.parseDate(this.props.formatter(this.props.value))
				: this.props.value;
		} else {
			date = this.state.formattedValue
				? this.parseDate(this.state.formattedValue)
				: this.state.value;
		}

		return (
			<CalendarWrapper
				// Please remove `abbrWeekDayLabels` on the next breaking change.
				abbreviatedWeekDayLabels={
					this.props.abbreviatedWeekDayLabels || // eslint-disable-line react/prop-types
					this.props.abbrWeekDayLabels || // eslint-disable-line react/prop-types
					labels.abbreviatedWeekDays
				}
				/* Remove || for assistiveText at next breaking change */
				assistiveTextNextMonth={
					this.props.assistiveTextNextMonth || assistiveText.nextMonth // eslint-disable-line react/prop-types
				}
				assistiveTextPreviousMonth={
					this.props.assistiveTextPreviousMonth || assistiveText.previousMonth // eslint-disable-line react/prop-types
				}
				assistiveTextYear={assistiveText.year}
				canFocusCalendar={this.state.isOpenFromIcon}
				id={this.getId()}
				isIsoWeekday={this.props.isIsoWeekday}
				monthLabels={
					this.props.monthLabels || labels.months // eslint-disable-line react/prop-types
				}
				onCalendarFocus={this.props.onCalendarFocus}
				dateDisabled={this.props.dateDisabled}
				onRequestClose={this.handleRequestClose}
				onSelectDate={this.handleCalendarChange}
				relativeYearFrom={this.props.relativeYearFrom}
				relativeYearTo={this.props.relativeYearTo}
				selectedDate={date || new Date()}
				selectedDateRef={(component) => {
					this.selectedDateCell = component;
				}}
				todayLabel={
					this.props.todayLabel || labels.today // eslint-disable-line react/prop-types
				}
				weekDayLabels={
					this.props.weekDayLabels || labels.weekDays // eslint-disable-line react/prop-types
				}
			/>
		);
	};

	getDialog = ({ labels, assistiveText }) => {
		// FOR BACKWARDS COMPATIBILITY
		const menuPosition = this.props.isInline
			? 'relative'
			: this.props.menuPosition; // eslint-disable-line react/prop-types

		// SLDS override
		const style =
			this.props.menuPosition !== 'relative' ? { transform: 'none' } : {};

		return !this.props.disabled && this.getIsOpen() ? (
			<Dialog
				align={`bottom ${this.props.align}`}
				contentsClassName={classNames(
					'slds-datepicker slds-dropdown',
					{
						'slds-dropdown_right':
							this.props.menuPosition === 'relative' &&
							this.props.align === 'right',
						'slds-dropdown_left':
							this.props.menuPosition === 'relative' &&
							this.props.align === 'left',
					},
					this.props.className
				)}
				context={this.context}
				hasStaticAlignment={this.props.hasStaticAlignment}
				style={style}
				onClose={this.handleClose}
				onOpen={this.handleOpen}
				onRequestTargetElement={() => this.inputRef}
				position={menuPosition}
				portalMount={this.props.portalMount}
			>
				{this.getDatePicker({ labels, assistiveText })}
			</Dialog>
		) : null;
	};

	getId = () => this.props.id || this.generatedId;

	getIsOpen = () =>
		!!(typeof this.props.isOpen === 'boolean'
			? this.props.isOpen
			: this.state.isOpen);

	getInputProps = ({ assistiveText, labels }) => {
		/**
		 * 1. DEFAULT: Use default props or state if present.
		 * 2. DEPRECATED API: Use old "first-level" props that have been deprecated.
		 * 3. DEPRECATED API: If `children` is present, use props from single child which should be an `<Input/>`
		 * 4. CURRENT API: Use composition with props spread merge from `input` prop.
		 * */

		const defaultInputProps = {
			iconRight: (
				<InputIcon
					// Remove || for assistiveText at next breaking change
					assistiveText={{
						icon:
							this.props.assistiveTextOpenCalendar ||
							assistiveText.openCalendar, // eslint-disable-line react/prop-types
					}}
					aria-haspopup
					aria-expanded={this.getIsOpen()}
					category="utility"
					name="event"
					onClick={() => {
						this.openDialogFromIcon();
					}}
					type="button"
				/>
			),
			inputRef: (component) => {
				this.setInputRef(component);
			},
			id: this.getId(),
			onChange: this.handleInputChange,
			onClick: () => {
				this.openDialog();
			},
			onKeyDown: this.handleKeyDown,
			value: this.props.value
				? this.props.formatter(this.props.value)
				: this.state.inputValue,
		};

		// eslint-disable react/prop-types
		const topLevelDeprecatedComponentProps = {
			disabled: this.props.disabled,
			label: this.props.label || labels.label,
			onBlur: this.props.onBlur,
			onFocus: this.props.onFocus,
			placeholder: this.props.placeholder || labels.placeholder,
			required: this.props.required,
		};
		// eslint-enable react/prop-types

		const childrenProps = this.props.children && this.props.children.props;
		const childrenPropInputProps = {
			...childrenProps,
			onClick: () => {
				this.openDialog();
				if (childrenProps && childrenProps.onClick) {
					childrenProps.onClick();
				}
			},
		};

		const inputRenderProps = this.props.input && this.props.input.props;

		return {
			...defaultInputProps,
			...topLevelDeprecatedComponentProps,
			...childrenPropInputProps,
			...inputRenderProps,
		};
	};

	setInputRef = (component) => {
		this.inputRef = component;
		// yes, this is a re-render triggered by a render.
		// Dialog/Popper.js cannot place the popover until
		// the trigger/target DOM node is mounted. This
		// way `findDOMNode` is not called and parent
		// DOM nodes are not queried.
		if (!this.state.inputRendered) {
			this.setState({ inputRendered: true });
		}
	};

	handleCalendarChange = (event, { date }) => {
		if (!this.props.value) {
			this.setState({
				value: date,
				formattedValue: this.props.formatter(date),
				inputValue: this.props.formatter(date),
			});
		}

		this.handleRequestClose();

		if (this.props.onChange) {
			this.props.onChange(event, {
				date,
				formattedDate: this.props.formatter(date),
				timezoneOffset: date.getTimezoneOffset(),
			});
		}

		// Please remove `onDateChange` on the next breaking change.
		/* eslint-disable react/prop-types */
		if (this.props.onDateChange) {
			this.props.onDateChange(date, this.props.formatter(date));
		}
		/* eslint-enable react/prop-types */
	};

	handleClickOutside = () => {
		this.handleRequestClose();
	};

	handleClose = () => {
		if (this.props.onClose) {
			this.props.onClose();
		}
	};

	handleInputChange = (event) => {
		// Typing in the input closes the calendar when it's used as an uncontrolled component
		if (typeof this.props.isOpen !== 'boolean' && this.state.isOpen) {
			this.setState({ isOpen: false });
		}

		this.setState({
			formattedValue: event.target.value,
			inputValue: event.target.value,
		});

		const date = this.props.parser(event.target.value);

		if (this.props.onChange) {
			this.props.onChange(event, {
				date,
				formattedDate: event.target.value,
				timezoneOffset: date.getTimezoneOffset(),
			});
		}
	};

	handleKeyDown = (event) => {
		// Don't open if user is selecting text
		if (
			event.keyCode &&
			!event.shiftKey &&
			(event.keyCode === KEYS.DOWN || event.keyCode === KEYS.UP)
		) {
			EventUtil.trapEvent(event);
			this.setState({ isOpen: true });
		}

		if (event.keyCode === KEYS.ESCAPE || event.keyCode === KEYS.ENTER) {
			EventUtil.trapEvent(event);
			this.setState({ isOpen: false });
		}

		// Please remove `onKeyDown` on the next breaking change.
		/* eslint-disable react/prop-types */
		if (this.props.onKeyDown) {
			this.props.onKeyDown(event, {});
		}
		/* eslint-enable react/prop-types */
	};

	handleOpen = (event, { portal }) => {
		if (this.props.onOpen) {
			this.props.onOpen(event, { portal });
		}

		if (this.selectedDateCell && this.state.isOpenFromIcon) {
			this.selectedDateCell.focus();
		}
	};

	handleRequestClose = () => {
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}

		if (this.getIsOpen()) {
			this.setState({ isOpen: false, isOpenFromIcon: false });

			if (this.inputRef) {
				this.inputRef.focus();
			}
		}
	};

	openDialogFromIcon = () => {
		this.setState({ isOpenFromIcon: true });
		this.openDialog(true);
	};

	openDialog = (isRequestFromIcon = false) => {
		if (!isRequestFromIcon) {
			this.setState({ isOpenFromIcon: false });
		}
		if (this.props.onRequestOpen) {
			this.props.onRequestOpen();
		} else {
			this.setState({ isOpen: true });
		}
	};

	parseDate = (formattedValue) => {
		let parsedDate = this.props.parser(formattedValue);
		if (
			Object.prototype.toString.call(parsedDate) !== '[object Date]' ||
			isNaN(parsedDate.getTime())
		) {
			parsedDate = new Date();
		}
		return parsedDate;
	};

	render() {
		// Merge objects of strings with their default object
		const labels = assign({}, defaultProps.labels, this.props.labels);
		const assistiveText = assign(
			{},
			defaultProps.assistiveText,
			this.props.assistiveText
		);

		const inputProps = this.getInputProps({ assistiveText, labels });

		// `children` prop is a deprecated API. Future breaking change should limit Datepicker to only `Input` usage and not a random child node.
		const inputToRender = this.props.children ? (
			React.cloneElement(this.props.children, {
				...inputProps,
			})
		) : (
			<Input {...inputProps} />
		);

		return (
			<div
				className={classNames(
					'slds-dropdown-trigger',
					'slds-dropdown-trigger_click',
					'ignore-react-onclickoutside',
					{
						'slds-has-error': this.props.hasError,
						'slds-is-open': this.getIsOpen(),
					},
					this.props.triggerClassName
				)}
			>
				{inputToRender}
				{this.getDialog({ labels, assistiveText })}
			</div>
		);
	}
}

Datepicker.contextType = IconSettingsContext;
Datepicker.displayName = DATE_PICKER;
Datepicker.propTypes = propTypes;
Datepicker.defaultProps = defaultProps;

export default Datepicker;
