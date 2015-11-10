// DATEPICKER MONTH - REACT FACADE

// Framework specific
import React from 'react';
import Button from '../button/button';

export const CONTROL = 'datepicker-year';

const DateMonth = React.createClass({
	displayName: CONTROL,

	propTypes: {
		monthName: React.PropTypes.string,
		setViewingDate: React.PropTypes.func,
		dateViewing: React.PropTypes.instanceOf(Date)
	},

	render () {
		return (
			<div className="slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4">
				<div className="slds-align-middle">
					<Button icon="utility.left" assistiveText="Previous Month" iconStyle="icon-container" onClick={this.backMonth}/>
				</div>
				<h2 id="month" className="slds-align-middle" aria-live="assertive" aria-atomic="true">{this.props.monthName}</h2>
				<div className="slds-align-middle">
					<Button icon="utility.right" assistiveText="Next Month" iconStyle="icon-container" onClick={this.forwardMonth}/>
				</div>
			</div>
		);
	},

	backMonth () {
		const curMonth = this.props.dateViewing;

		this.props.setViewingDate( new Date(curMonth.setMonth(curMonth.getMonth() - 1)) );
	},

	forwardMonth () {
		const curMonth = this.props.dateViewing;

		this.props.setViewingDate( new Date(curMonth.setMonth(curMonth.getMonth() + 1)) );
	}
});

export default DateMonth;
