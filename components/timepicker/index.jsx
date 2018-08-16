/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Timepicker Component

// ## Dependencies

// ### React
import React from 'react';
import PropTypes from 'prop-types';

// ### isDate
import isDate from 'lodash.isdate';

// ### Escape RegExp
import escapeRegExp from 'lodash.escaperegexp';

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)
import checkProps from './check-props';

// ### Dropdown
import InputIcon from '../icon/input-icon';

// ### Input
import Input from '../input/index.jsx';

// ### Combobox
import Combobox from '../combobox/combobox.jsx';

// ## Constants
import { TIMEPICKER } from '../../utilities/constants';

/**
 *  A timepicker is an autocomplete text input to capture a time.
 */
class TimePicker extends React.Component {
	// ### Display Name
	// Always use the canonical component name as the React display name.
	static displayName = TIMEPICKER;

	// ### Prop Types
	static propTypes = {
		/**
		 * **Assistive text for accessibility**
		 * * `removeSingleSelectedOption`: Used by inline-listbox, single-select variant to remove the selected item (pill). This is a button with focus. The default is `Remove selected option`.
		 */
		assistiveText: PropTypes.shape({
			removeSingleSelectedOption: PropTypes.string,
		}),
		/**
		 * Disables the input and prevents editing the contents.
		 */
		disabled: PropTypes.bool,
		/**
		 * Event Callbacks
		 * * `onChange`: Called when keyboard events occur within `input`. Receives the props `(strValue)`
		 * * `onRequestRemoveSelectedOption`: Function called when selection option is to be removed. Receives the props `(value)`
		 * * `onSelect`: Function called when a menu item is selected. Receives the props `(value)`
		 * _Tested with Mocha testing._
		 */
		events: PropTypes.shape({
			onChange: PropTypes.func,
			onRequestRemoveSelectedOption: PropTypes.func,
			onSelect: PropTypes.func,
		}),
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
		assistiveText: {
			removeSingleSelectedOption: 'Remove selected option',
		},
		formatter(date) {
			if (date) {
				return date.toLocaleTimeString(navigator.language, {
					hour: '2-digit',
					minute: '2-digit',
				});
			}

			return null;
		},
		parser(timeStr) {
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
		strValue: '',
		stepInMinutes: 30,
	};

	state = {
		inheritWidthOf: 'target',
		options: this.getOptions(),
		strValue: this.props.strValue,
		value: this.props.value,
	};

	componentWillMount() {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		checkProps(TIMEPICKER, this.props);
	}

	componentWillReceiveProps(nextProps) {
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

	getOptions() {
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

	autoCompleteFilter = ({ inputValue, options, selection }) =>
		options.filter((option) => {
			const searchTermFound = option.label
				? option.label.match(new RegExp(escapeRegExp(inputValue), 'ig'))
				: false;
			const notAlreadySelected = !selection.includes(option);

			return (!inputValue || searchTermFound) && notAlreadySelected;
		});

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

		if (this.props.onSelect) {
			this.props.onSelect(date, strValue);
		}
	};

	handleSelect = (event, { selection }) => {
		const val = selection[0];
		if (val && val.value) {
			this.handleChange(val.value, val.label);
		}
	};

	handleInputChange = (event, { value }) => {
		this.setState({
			strValue: value,
		});

		if (this.props.onChange) {
			this.props.onChange(value);
		}
	};

	handleRemoveSelectedOption = (event, { option }) => {
		this.setState({
			value: null,
			strValue: '',
		});

		if (this.props.onRequestRemoveSelectedOption) {
			this.props.onRequestRemoveSelectedOption(option);
		}
	};

	// ### Render
	render() {
		const selection = this.state.options.filter(
			(option) => option.value === this.state.value
		);
		return (
			<Combobox
				classNameMenu="slds-dropdown--length-5"
				events={{
					onChange: this.handleInputChange,
					onSelect: this.handleSelect,
				}}
				input={
					<Input
						iconRight={
							selection.length > 0 ? (
								<InputIcon
									assistiveText={
										this.props.assistiveText.removeSingleSelectedOption
									}
									buttonRef={(component) => {
										this.buttonRef = component;
									}}
									category="utility"
									iconPosition="right"
									name="close"
									onClick={(event) => {
										this.handleRemoveSelectedOption(event, {
											option: selection[0],
										});
									}}
									variant="combobox"
								/>
							) : (
									<InputIcon category="utility" name="clock" variant="combobox" />
								)
						}
					/>
				}
				inheritWidthOf={this.props.inheritWidthOf}
				labels={{
					label: this.props.label,
					placeholderReadOnly: this.props.placeholder,
				}}
				menuItem={this.props.menuItem}
				menuPosition={this.props.menuPosition}
				options={this.autoCompleteFilter({
					inputValue: this.state.strValue,
					options: this.state.options,
					selection,
				})}
				predefinedOptionsOnly
				required={this.props.required}
				readOnlySingleInputDisabled={this.props.disabled}
				selection={selection}
				value={this.state.strValue}
				variant="inline-listbox"
			/>
		);
	}
}

export default TimePicker;
