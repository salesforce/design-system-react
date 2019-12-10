/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';

import { TIME_PICKER_COMBOBOX } from '../../utilities/constants';

import Combobox from '../combobox';

const propTypes = {
	/**
	 * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them.
	 * This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need.
	 * _Tested with snapshot testing on Combobox._
	 */
	'aria-describedby': PropTypes.string,
	/**
	 * CSS classes to be added to tag with `.slds-combobox`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 * _Tested with snapshot testing on Combobox._
	 */
	className: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
		PropTypes.string,
	]),
	/**
	 * Disables the input and prevents editing the contents. _Tested with snapshot testing on Combobox._
	 */
	disabled: PropTypes.bool,
	/**
	 * Event Callbacks
	 * * `onBlur`: Called when `input` removes focus.
	 * * `onChange`: Called when keyboard events occur within `input`
	 * * `onClose`: Triggered when the menu has closed.
	 * * `onFocus`: Called when `input` receives focus.
	 * * `onOpen`: Triggered when the menu has opened.
	 * * `onRequestClose`: Function called when the menu would like to hide. Please use with `isOpen`.
	 * * `onRequestOpen`:  Function called when the menu would like to show. Please use with `isOpen`.
	 * * `onRequestRemoveSelectedOption`: Function called when a single selection option is to be removed.
	 * * `onSelect`: Function called when a menu item is selected. This includes header and footer items.
	 * * `onSubmit`: Function called when user presses enter or submits the `input`
	 * _Tested with Mocha testing on Combobox._
	 */
	events: PropTypes.shape({
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onClose: PropTypes.func,
		onFocus: PropTypes.func,
		onOpen: PropTypes.func,
		onRequestClose: PropTypes.func,
		onRequestOpen: PropTypes.func,
		onRequestRemoveSelectedOption: PropTypes.func,
		onSelect: PropTypes.func,
		onSubmit: PropTypes.func,
	}),
	/**
	 * Time formatting function. _Tested with Mocha testing._
	 */
	formatter: PropTypes.func,
	/**
	 * A [Tooltip](https://react.lightningdesignsystem.com/components/tooltips/) component that is displayed next to the `labels.label`. The props from the component will be merged and override any default props.
	 * _Tested with snapshot testing on Combobox._
	 */
	fieldLevelHelpTooltip: PropTypes.node,
	/**
	 * HTML id for component. _Tested with snapshot testing on Combobox._
	 */
	id: PropTypes.string,
	/**
	 * the initial date that the options are created from. _Tested with Mocha testing._
	 */
	initialDate: PropTypes.instanceOf(Date),
	/**
	 * Forces the dropdown to be open or closed. See controlled/uncontrolled callback/prop pattern for more on suggested use view [Concepts and Best Practices](https://github.com/salesforce-ux/design-system-react/blob/master/CONTRIBUTING.md#concepts-and-best-practices)
	 * _Tested with snapshot testing on Combobox._
	 */
	isOpen: PropTypes.bool,
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `label`: This label appears above the input.
	 * * `placeholderReadOnly`: Placeholder for Picklist-like Combobox
	 * _Tested with snapshot testing on Combobox._
	 */
	labels: PropTypes.shape({
		label: PropTypes.string,
		placeholderReadOnly: PropTypes.string,
	}),
	/**
	 * **Array of item objects in the dropdown menu.**
	 * Each object can contain:
	 * * `id`: A unique identifier string.
	 * * `label`: A primary string of text for a menu item or group separator.
	 * * `value`: A Date value for the option
	 * ```
	 * {
	 * 	id: '0',
	 * 	label: '12:00 AM',
	 *  value: 'Mon Dec 09 2019 00:00:00 GMT-0800 (Pacific Standard Time)'
	 * },
	 * ```
	 * _Tested with Mocha testing._
	 */
	options: PropTypes.arrayOf(
		PropTypes.PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string,
			value: PropTypes.instanceOf(Date),
		})
	),
	/**
	 * Applies label styling for a required form element. _Tested with snapshot testing on Combobox._
	 */
	required: PropTypes.bool,
	/**
	 * Accepts an array of item objects. For single selection, pass in an array of one object. _Tested with snapshot testing on Combobox._
	 */
	selection: PropTypes.arrayOf(
		PropTypes.PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string,
			value: PropTypes.date,
		})
	).isRequired,
	/**
	 * Frequency of options. _Tested with Mocha testing._
	 */
	stepInMinutes: PropTypes.number,
};

const defaultFormatter = (date) => {
	if (date) {
		if (typeof navigator !== 'undefined') {
			return date.toLocaleTimeString(navigator.language, {
				hour: '2-digit',
				minute: '2-digit',
			});
		}
		return date.toLocaleTimeString('en', {
			hour: '2-digit',
			minute: '2-digit',
		});
	}
	return null;
};

const getDefaultOptions = ({ props }) => {
	const baseDate = new Date(props.initialDate);
	const options = [];

	baseDate.setHours(0);
	baseDate.setMinutes(0);
	baseDate.setSeconds(0);
	baseDate.setMilliseconds(0);

	const curDate = new Date(baseDate);

	let index = 0;

	// eslint-disable-next-line fp/no-loops
	while (baseDate.getDate() === curDate.getDate()) {
		const formatted = props.formatter(curDate);

		// eslint-disable-next-line fp/no-mutating-methods
		options.push({
			id: `${index}`,
			label: formatted,
			value: new Date(curDate),
		});

		curDate.setMinutes(curDate.getMinutes() + props.stepInMinutes);
		index += 1;
	}

	return options;
};

const defaultProps = {
	formatter: defaultFormatter,
	events: {},
	initialDate: new Date(),
	labels: {
		label: 'Time',
		placeholderReadOnly: '',
	},
	selection: [],
	stepInMinutes: 30,
};

class TimepickerCombobox extends React.Component {
	constructor(props) {
		super(props);
		this.generatedId = shortid.generate();
	}

	getId = () => this.props.id || this.generatedId;

	getOptions = () => this.props.options || getDefaultOptions({ props: this.props });

	render() {
		return (
			<Combobox
				{...this.props}
				className={classNames('slds-timepicker', this.props.className)}
				id={this.getId()}
				inputIcon="clock"
				menuItemVisibleLength={5}
				options={this.getOptions()}
				variant="readonly"
			/>
		);
	}
}

TimepickerCombobox.displayName = TIME_PICKER_COMBOBOX;
TimepickerCombobox.propTypes = propTypes;
TimepickerCombobox.defaultProps = defaultProps;

export default TimepickerCombobox;
