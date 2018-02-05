/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Timepicker Component

// ## Dependencies

// ### React
import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

// ### isDate
import isDate from 'lodash.isdate';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
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
const Timepicker = createReactClass({
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
		 * This label appears above the input.
		 */
		label: PropTypes.string,
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer: PropTypes.func,
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
		value: PropTypes.instanceOf(Date),
	},

	getDefaultProps () {
		return {
			formatter (date) {
				if (date) {
					return date.toLocaleTimeString(navigator.language, {
						hour: '2-digit',
						minute: '2-digit',
					});
				}

				return null;
			},
			parser (timeStr) {
				const date = new Date();
				const dateStr = date.toLocaleString(navigator.language, {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
				});
				return new Date(`${dateStr} ${timeStr}`);
			},
			menuPosition: 'absolute',
			placeholder: 'Pick Time',
			value: null,
			stepInMinutes: 30,
		};
	},

	getInitialState () {
		return {
			value: this.props.value,
			strValue: this.props.strValue,
			options: this.getOptions(),
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
					strValue: this.props.formatter(nextProps.value),
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
				value: new Date(curDate),
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

	handleChange (date, strValue) {
		this.setState({
			value: date,
			strValue,
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
			strValue,
		});

		if (this.props.onDateChange) {
			const parsedDate = this.props.parser(strValue);
			this.props.onDateChange(parsedDate, strValue);
		}
	},

	// ### Render
	render () {
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
					minWidth: '100%',
				}}
				menuPosition={this.props.menuPosition}
				onSelect={this.handleSelect}
				options={this.state.options}
			>
				<TimepickerDropdownTrigger
					iconRight={<InputIcon category="utility" name="clock" />}
					onChange={this.handleInputChange}
					placeholder={this.props.placeholder}
					required={this.props.required}
					type="text"
					value={this.state.strValue}
				/>
			</MenuDropdown>
		);
	},
});

export default Timepicker;
