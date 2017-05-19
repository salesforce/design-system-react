/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import MenuPicklist from '../../menu-picklist';

const DatepickerYearSelector = React.createClass({
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
		yearPicklistButtonRef: PropTypes.func
	},

	getOptions () {
		const now = new Date();
		const fromYear = now.getFullYear() + this.props.relativeYearFrom;
		const toYear = now.getFullYear() + this.props.relativeYearTo;
		const opts = [];

		for (let year = fromYear; year < toYear; year++) {
			opts.push({ label: `${year}`, value: year });
		}
		return opts;
	},

	handleSelect (selectedValue) {
		if (selectedValue) {
			this.props.onChangeMonth(new Date(this.props.initialDateForCalendarRender.setFullYear(parseInt(selectedValue.value, 10))));
		}
	},

	render () {
		return (
			<div className="slds-form-element">

				<MenuPicklist
					buttonRef={this.props.yearPicklistButtonRef}
					checkmark={false}
					className="slds-picklist--fluid slds-shrink-none"
					initialFocus
					isInline
					id={`${this.props.id}-year-picklist`}
					onSelect={this.handleSelect}
					options={this.getOptions()}
					placeholder="Year"
					value={this.props.initialDateForCalendarRender.getFullYear()}
				/>
			</div>
		);
	}
});

export default DatepickerYearSelector;
