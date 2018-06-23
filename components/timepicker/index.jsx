/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Timepicker Component

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### isDate
import isDate from 'lodash.isdate';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### Dropdown
import InputIcon from '../icon/input-icon';

// ### Combobox
import Combobox from '../combobox/combobox.jsx';

// ## Constants
import { TIMEPICKER } from '../../utilities/constants';

/**
 *  Component description.
 */
class TimePicker extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = TIMEPICKER;

	// ### Prop Types
	static propTypes = {
		/**
		 * Disables the input and prevents editing the contents.
		 */
		disabled: PropTypes.bool,
		/**
		 * Time formatting function
		 */
		formatter: PropTypes.func,
		/**
		 * Sets the dialog width to the width of one of the following:
		 * * `target` - (default): Sets the dialog width to the width of the target. (Menus attached to `input` typically follow this UX pattern),
		 * * `menu`: Consider setting a `menuMaxWidth` if using this value. If not, width will be set to width of largest menu item.
		 * * `none`: Does not set a width on the dialog. _Tested with snapshot testing._
		 */
		inheritWidthOf: PropTypes.oneOf(['target', 'menu', 'none']),
		/**
		 * This label appears above the input.
		 */
		label: PropTypes.string,
		/**
		 * Accepts a custom menu item rendering function that becomes a custom component. This function is passed the following props:
		 * * `assistiveText`: Object, `assistiveText` prop that is passed into Combobox
		 * * `option`: Object, option data for item being rendered that is passed into Combobox
		 * * `selected`: Boolean, allows rendering of `assistiveText.optionSelectedInMenu` in Readonly Combobox
		 *
		 * _Tested with snapshot testing._
		 */
		menuItem: PropTypes.func,
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
		/**
		 * Frequency of options
		 */
		stepInMinutes: PropTypes.number,
		/**
		 * Value for input that is parsed to create an internal state in the `date` format.
		 */
		strValue: PropTypes.string,
		/**
		 * Instance an internal state in the `date` format.
		 */
		value: PropTypes.instanceOf(Date),
	};

	static defaultProps = {
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

	state = {
		inheritWidthOf: 'target',
		options: this.getOptions(),
		strValue: this.props.strValue,
		value: this.props.value,
	};

	componentWillMount () {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(TIMEPICKER, this.props);
	}

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
	}

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
				id: options.length,
				label: formatted,
				value: new Date(curDate),
			});

			curDate.setMinutes(curDate.getMinutes() + this.props.stepInMinutes);
		}

		return options;
	}

	parseDate = (strValue) => {
		const newDate = this.props.parser(strValue);

		if (isDate(newDate)) {
			if (!isNaN(newDate.getTime())) {
				return newDate;
			}
		}

		return new Date();
	};

	handleChange = (date, strValue) => {
		this.setState({
			value: date,
			strValue,
		});

		if (this.props.onDateChange) {
			this.props.onDateChange(date, strValue);
		}
	};

	handleSelect = (event, { selection }) => {
		const val = selection[0];
		if (val && val.value) {
			this.handleChange(val.value, val.label);
		}
	};

	handleInputChange = (event) => {
		const strValue = event.target.value;

		this.setState({
			strValue,
		});

		if (this.props.onDateChange) {
			const parsedDate = this.props.parser(strValue);
			this.props.onDateChange(parsedDate, strValue);
		}
	};

	// ### Render
	render () {
		return (
			<Combobox
				disabled={this.props.disabled}
				events={{
					onChange: this.handleInputChange,
					onSelect: this.handleSelect,
				}}
				iconRight={<InputIcon category="utility" name="clock" />}
				inheritWidthOf={this.props.inheritWidthOf}
				labels={{
					label: this.props.label,
					placeholderReadOnly: this.props.placeholder,
				}}
				menuItem={this.props.menuItem}
				menuPosition={this.props.menuPosition}
				options={this.state.options}
				required={this.props.required}
				selection={this.state.options.filter(
					(option) => option.value === this.state.value
				)}
				value={this.state.strValue}
				variant="readonly"
			/>
		);
	}
}

export default TimePicker;
