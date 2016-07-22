/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Timepicker Component

// ## Dependencies

// ### React
import React, { PropTypes } from 'react';

// ### isDate
import isDate from 'lodash.isdate';

// ### Dropdown
import MenuDropdown from '../menu-dropdown';
import TimepickerDropdownTrigger from './dropdown-trigger';

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
		 * This label appears above the input.
		 */
		label: PropTypes.string,
		/**
		 * Custom element that overrides the default Menu Item component.
		 */
		listItemRenderer: PropTypes.func,
		/**
		 * Renders menu within an absolutely positioned container at an elevated z-index.
		 */
		modal: PropTypes.bool,
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
			modal: false,
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
		return (
			<MenuDropdown
				checkmark={false}
				constrainToScrollParent={this.props.constrainToScrollParent}
				disabled={this.props.disabled}
				inheritTargetWidth={this.props.inheritTargetWidth}
				label={this.props.label}
				listItemRenderer={this.props.listItemRenderer}
				menuStyle={{
					maxHeight: '20em',
					overflowX: 'hidden',
					minWidth: '100%'
				}}
				modal={this.props.modal}
				onSelect={this.handleSelect}
				options={this.state.options}
			>
				<TimepickerDropdownTrigger
					onChange={this.handleInputChange}
					iconCategory="utility"
					iconName="clock"
					iconPosition="right"
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
		const string = event.target.value;

		this.setState({
			strValue: string
		});

		if (this.props.onDateChange) {
			const parsedDate = this.props.parser(string);
			this.props.onDateChange(parsedDate, string);
		}
	}
});

module.exports = Timepicker;
