/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Combobox from '../../combobox/combobox';

const DatepickerYearSelector = createReactClass({
	displayName: 'SLDSDatepickerYearSelector',

	propTypes: {
		/**
		 * HTML id for component
		 */
		id: PropTypes.string,
		/**
		 * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
		 */
		initialDateForCalendarRender: PropTypes.instanceOf(Date).isRequired,
		/**
		 * Displayed calendar has changed or re-rendered
		 */
		onChangeMonth: PropTypes.func.isRequired,
		/**
		 * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
		 */
		relativeYearFrom: PropTypes.number,
		/**
		 * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
		 */
		relativeYearTo: PropTypes.number,
		/**
		 * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
		 */
		yearPicklistButtonRef: PropTypes.func,
	},

	getOptions () {
		const now = new Date();
		const fromYear = now.getFullYear() + this.props.relativeYearFrom;
		const toYear = now.getFullYear() + this.props.relativeYearTo;
		const opts = [];

		for (let year = fromYear; year < toYear; year += 1) {
			opts.push({ label: `${year}`, value: year, id: opts.length });
		}
		return opts;
	},

	getSelectedValueOption () {
		const selectedYear = this.props.initialDateForCalendarRender.getFullYear();
		return this.getOptions().filter((option) => option.value === selectedYear);
	},

	handleSelect (event, { selection: selectedValues }) {
		const selectedValue = selectedValues[0]; // safe since we are working with a single selection

		if (selectedValue) {
			this.props.onChangeMonth(
				new Date(
					this.props.initialDateForCalendarRender.setFullYear(
						parseInt(selectedValue.value, 10)
					)
				)
			);
		}
	},

	render () {
		const selection = this.getSelectedValueOption();
		return (
			<div className="slds-form-element slds-align-content-center">
				<Combobox
					className="slds-shrink-none"
					events={{
						onSelect: this.handleSelect,
					}}
					id={`${this.props.id}-year-picklist`}
					inheritWidthOf="target"
					menuPosition="relative"
					multiple={false}
					options={this.getOptions()}
					labels={{
						placeholder: 'Year',
					}}
					selection={selection}
					value={selection.value}
					variant="readonly"
				/>
			</div>
		);
	},
});

export default DatepickerYearSelector;
