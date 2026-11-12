/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type SyntheticEvent } from 'react';

import Combobox from '../../combobox/combobox';
import { type ComboboxOption } from '../../combobox/private/menu';

export interface YearPicklistProps {
	/** Label for year picklist/combobox */
	assistiveTextYear: string;
	/** HTML id for component */
	id?: string;
	/** Date used to create calendar that is displayed */
	initialDateForCalendarRender: Date;
	/** Called when year changes */
	onChangeMonth: (date: Date) => void;
	/** Years before current year in dropdown */
	relativeYearFrom?: number;
	/** Years after current year in dropdown */
	relativeYearTo?: number;
}

class DatepickerYearSelector extends React.Component<YearPicklistProps> {
	static displayName = 'SLDSDatepickerYearSelector';

	getOptions = (): ComboboxOption[] => {
		const now = new Date();
		const fromYear = now.getFullYear() + (this.props.relativeYearFrom ?? 0);
		const toYear = now.getFullYear() + (this.props.relativeYearTo ?? 0);
		const opts: ComboboxOption[] = [];

		for (let year = fromYear; year < toYear; year += 1) {
			opts.push({
				label: `${year}`,
				value: `${year}`,
				id: String(opts.length),
			});
		}
		return opts;
	};

	getSelectedValueOption = (): ComboboxOption[] => {
		const selectedYear = this.props.initialDateForCalendarRender.getFullYear();
		return this.getOptions().filter(
			(option) => option.value === `${selectedYear}`
		);
	};

	handleSelect = (
		event: SyntheticEvent,
		{ selection: selectedValues }: { selection: ComboboxOption[] }
	) => {
		const selectedValue = selectedValues[0]; // safe since we are working with a single selection

		if (selectedValue && selectedValue.value !== undefined) {
			this.props.onChangeMonth(
				new Date(
					this.props.initialDateForCalendarRender.setFullYear(
						parseInt(selectedValue.value, 10)
					)
				)
			);
		}
	};

	render() {
		const selection = this.getSelectedValueOption();
		return (
			<div className="slds-form-element slds-align-content-center">
				<Combobox
					assistiveText={{ label: this.props.assistiveTextYear }}
					className="slds-shrink-none"
					classNameMenu="slds-datepicker"
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
					variant="readonly"
				/>
			</div>
		);
	}
}

export default DatepickerYearSelector;
