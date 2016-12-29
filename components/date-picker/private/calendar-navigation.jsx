/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { PropTypes } from 'react';
import SelectYear from './year-picklist';
import ButtonIcon from '../../icon/button-icon';
import Button from '../../button';
import { DateUtil, EventUtil, KEYS } from '../../../utilities';

const DatepickerMonthNavigation = React.createClass({
	displayName: 'SLDSDatepickerMonthNavigation',

	propTypes: {
		/**
		 * Label for button to go to the next month
		 */
		assistiveTextNextMonth: PropTypes.string.isRequired,
		/**
		 * Label for button to go to the previous month
		 */
		assistiveTextPreviousMonth: PropTypes.string.isRequired,
		/**
		 * Names of the months
		 */
		monthLabels: PropTypes.array.isRequired
	},

	getDefaultProps () {
		return {
			displayedDate: new Date(),
			onChangeMonth (){
				console.log('onChangeMonth should be defined');
			}
		};
	},

	handleClick (event) {
		event.preventDefault();
		event.stopPropagation();
	},

	handleChange (displayedDate) {
		if (this.props.onChange) {
			this.props.onChange(displayedDate);
		}
	},

	handleCancel () {
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	},

	previousMonth () {
		if (this.props.displayedDate && this.handleChange) {
			this.handleChange(DateUtil.addMonths(this.props.displayedDate, -1));
		}
	},

	componentDidMount () {
	},

	nextMonth () {
		if (this.props.displayedDate && this.handleChange) {
			this.handleChange(DateUtil.addMonths(this.props.displayedDate, 1));
		}
	},

	handleYearSelect (displayedDate) {
		if (this.props.onChange) {
			this.props.onChange(displayedDate);
		}
	},

	getMonthLabel () {
		return this.props.monthLabels[new Date(this.props.displayedDate).getMonth()];
	},

	getYearLabel () {
		return new Date(this.props.displayedDate).getFullYear();
	},

	render () {
		return (
			<div className="slds-datepicker__filter slds-grid">
				<div className="slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4">
					<div className="slds-align-middle">
						<Button
							assistiveText={this.props.assistiveTextPreviousMonth}
							iconCategory="utility"
							iconName="left"
							iconVariant="container"
							onKeyDown={this.handleKeyDown}
							onClick={this.previousMonth}
							ref="prevMonth"
							variant="icon"
						/>
					</div>
					<h2
						id="month"
						className="slds-align-middle"
						role="heading"
						aria-live="assertive"
						aria-atomic
					>{this.getMonthLabel()} <span className="slds-assistive-text">{this.getYearLabel()}</span></h2>
					<div className="slds-align-middle">
						<Button
							assistiveText={this.props.assistiveTextNextMonth}
							iconCategory="utility"
							iconName="right"
							iconVariant="container"
							onClick={this.nextMonth}
							ref="nextMonth"
							variant="icon"
						/>
					</div>
				</div>
				<div className="slds-picklist slds-picklist--fluid slds-shrink-none">
					<SelectYear
						displayedDate={this.props.displayedDate}
						relativeYearFrom={this.props.relativeYearFrom}
						relativeYearTo={this.props.relativeYearTo}
						onChange={this.handleYearSelect}
					/>
				</div>
			</div>

		);
	}
});

module.exports = DatepickerMonthNavigation;
