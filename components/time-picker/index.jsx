/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Timepicker Component

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### isDate
import isDate from 'lodash.isdate';

// This component's `checkProps` which issues warnings to developers about properties
// when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### Dropdown
import InputIcon from '../icon/input-icon';
import MenuDropdown from '../menu-dropdown';
import TimepickerDropdownTrigger from './private/dropdown-trigger';

// ## Constants
import { TIME_PICKER } from '../../utilities/constants';

/**
*  Component description.
*/
const Timepicker = React.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: TIME_PICKER,

	// ### Prop Types
	propTypes: {
		constrainToScrollParent: PropTypes.bool,
		/**
		 * Disables the input and prevents editing the contents.
		 */
		disabled: PropTypes.bool,
		/**
		 * Time formatting function
		 */
		formatter: PropTypes.func,
		inheritTargetWidth: PropTypes.bool,
		/**
		 * Renders menu within the wrapping trigger as a sibling of the button. By default, you will have an absolutely positioned container at an elevated z-index.
		 */
		isInline: PropTypes.bool,
		/**
		 * This label appears above the input.
		 */
		label: PropTypes.string,
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer: PropTypes.func,
		/**
		 * Receives the props `(dateValue, stringValue)`
		 */
		onDateChange: PropTypes.func,
		/**
		 * Parsing date string into Date
		 */
		parser: PropTypes.func,
		/**
		 * Text that will appear in an empty input.
		 */
		placeholder: PropTypes.string,
		/**
		 * If true, adds asterisk next to input label to indicate it is a required field.
		 */
		required: PropTypes.bool,
		stepInMinutes: PropTypes.number,
		strValue: PropTypes.string,
		/**
		 * Date
		 */
		value: PropTypes.instanceOf(Date)
	},

	getDefaultProps () {
		return {
			formatter (date) {
				if (date) {
					return date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
				}

				return null;
			},
			parser (timeStr) {
				const date = new Date();
				const dateStr = date.toLocaleString(navigator.language, { year: 'numeric', month: 'numeric', day: 'numeric' });
				return new Date(`${dateStr} ${timeStr}`);
			},
			placeholder: 'Pick Time',
			value: null,
			stepInMinutes: 30
		};
	},

	getInitialState () {
		return {
			value: this.props.value,
			strValue: this.props.strValue,
			options: this.getOptions()
		};
	},

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(TIME_PICKER, this.props);
	},

	componentWillReceiveProps (nextProps) {
		if (nextProps.value && this.props.value) {
			const currentTime = this.props.value.getTime();
			const nextTime = nextProps.value.getTime();

			if (currentTime !== nextTime) {
				this.setState({
					value: nextProps.value,
					strValue: this.props.formatter(nextProps.value)
				});
			}
		}
	},

	getOptions () {
		const baseDate = new Date();
		const options = [];

		baseDate.setHours(0);
		baseDate.setMinutes(0);
		baseDate.setSeconds(0);
		baseDate.setMilliseconds(0);

		const curDate = new Date(baseDate);

		while (baseDate.getDate() === curDate.getDate()) {
			const formatted = this.props.formatter(curDate);

			options.push({
				label: formatted,
				value: new Date(curDate)
			});

			curDate.setMinutes(curDate.getMinutes() + this.props.stepInMinutes);
		}

		return options;
	},

	parseDate (strValue) {
		const newDate = this.props.parser(strValue);

		if (isDate(newDate)) {
			if (!isNaN(newDate.getTime())) {
				return newDate;
			}
		}

		return new Date();
	},

	// ### Render
	render () {
		let isInline;
		/* eslint-disable react/prop-types */
		if (this.props.isInline) {
			isInline = true;
		} else if (this.props.modal !== undefined) {
			isInline = !this.props.modal;
		}
		/* eslint-enable react/prop-types */

		return (
			<MenuDropdown
				checkmark={false}
				constrainToScrollParent={this.props.constrainToScrollParent}
				disabled={this.props.disabled}
				inheritTargetWidth={this.props.inheritTargetWidth}
				label={this.props.label}
				listItemRenderer={this.props.listItemRenderer}
				// inline style override
				menuStyle={{
					maxHeight: '20em',
					overflowX: 'hidden',
					minWidth: '100%'
				}}
				isInline={isInline}
				onSelect={this.handleSelect}
				options={this.state.options}
			>
				<TimepickerDropdownTrigger
					iconRight={<InputIcon
						category="utility"
						name="clock"
					/>}
					onChange={this.handleInputChange}
					placeholder={this.props.placeholder}
					required={this.props.required}
					type="text"
					value={this.state.strValue}
				/>
			</MenuDropdown>
		);
	},

	handleChange (date, strValue) {
		this.setState({
			value: date,
			strValue
		});

		if (this.props.onDateChange) {
			this.props.onDateChange(date, strValue);
		}
	},

	handleSelect (val) {
		if (val && val.value) {
			this.handleChange(val.value, val.label);
		}
	},

	handleInputChange (event) {
		const strValue = event.target.value;

		this.setState({
			strValue
		});

		if (this.props.onDateChange) {
			const parsedDate = this.props.parser(strValue);
			this.props.onDateChange(parsedDate, strValue);
		}
	}
});

module.exports = Timepicker;
