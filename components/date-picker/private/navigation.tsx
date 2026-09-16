/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type KeyboardEvent, type SyntheticEvent } from 'react';

import YearPicklist from './year-picklist';
import Button from '../../button';

import DateUtil from '../../../utilities/date';

export interface NavigationProps {
	/** Label for button to go to the next month */
	assistiveTextNextMonth: string;
	/** Label for button to go to the previous month */
	assistiveTextPreviousMonth: string;
	/** Label for year picklist/combobox */
	assistiveTextYear: string;
	/** HTML id for component */
	id?: string;
	/** Date used to create calendar that is displayed */
	initialDateForCalendarRender: Date;
	/** Called when month changes */
	onChangeMonth: (event: SyntheticEvent | undefined, date: Date) => void;
	/** Names of the months */
	monthLabels: string[];
	/** Called on previous month button keydown */
	onPreviousMonthKeyDown?: (event: KeyboardEvent) => void;
	/** Ref callback for previous month button */
	previousMonthRef: (ref: HTMLButtonElement | null) => void;
	/** Years before current year in dropdown */
	relativeYearFrom?: number;
	/** Years after current year in dropdown */
	relativeYearTo?: number;
}

class DatepickerMonthNavigation extends React.Component<NavigationProps> {
	static displayName = 'SLDSDatepickerMonthNavigation';

	getMonthLabel = () =>
		this.props.monthLabels[
			new Date(this.props.initialDateForCalendarRender).getMonth()
		];

	getYearLabel = () =>
		new Date(this.props.initialDateForCalendarRender).getFullYear();

	handleClick = (event: React.MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
	};

	handleYearSelect = (initialDateForCalendarRender: Date) => {
		this.props.onChangeMonth(undefined, initialDateForCalendarRender);
	};

	previousMonthClicked = () => {
		this.props.onChangeMonth(
			undefined,
			DateUtil.addMonths(this.props.initialDateForCalendarRender, -1)
		);
	};

	nextMonthClicked = () => {
		this.props.onChangeMonth(
			undefined,
			DateUtil.addMonths(this.props.initialDateForCalendarRender, 1)
		);
	};

	render() {
		return (
			<div className="slds-datepicker__filter slds-grid">
				<div
					className="slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow"
					style={{ flex: 1.75 }}
				>
					<div className="slds-align-middle">
						<Button
							assistiveText={{ icon: this.props.assistiveTextPreviousMonth }}
							iconCategory="utility"
							iconName="left"
							iconVariant="container"
							onKeyDown={this.props.onPreviousMonthKeyDown}
							onClick={this.previousMonthClicked}
							buttonRef={(component: HTMLButtonElement | null) => {
								this.props.previousMonthRef(component);
							}}
							variant="icon"
							type="button"
						/>
					</div>
					<h2
						id={`${this.props.id}-month`}
						className="slds-align-middle"
						aria-live="assertive"
						aria-atomic
					>
						{this.getMonthLabel()}{' '}
						<span className="slds-assistive-text">{this.getYearLabel()}</span>
					</h2>
					<div className="slds-align-middle">
						<Button
							assistiveText={{ icon: this.props.assistiveTextNextMonth }}
							iconCategory="utility"
							iconName="right"
							iconVariant="container"
							onClick={this.nextMonthClicked}
							variant="icon"
							type="button"
						/>
					</div>
				</div>
				<YearPicklist
					assistiveTextYear={this.props.assistiveTextYear}
					id={this.props.id}
					initialDateForCalendarRender={this.props.initialDateForCalendarRender}
					onChangeMonth={this.handleYearSelect}
					relativeYearFrom={this.props.relativeYearFrom}
					relativeYearTo={this.props.relativeYearTo}
				/>
			</div>
		);
	}
}

export default DatepickerMonthNavigation;
