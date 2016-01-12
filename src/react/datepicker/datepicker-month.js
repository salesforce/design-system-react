// DATEPICKER MONTH - REACT FACADE

// Framework specific
import React from 'react';
import Button from '../button/button';

export const CONTROL = 'datepicker-year';

const DateMonth = React.createClass({
	displayName: CONTROL,

	propTypes: {
		monthName: React.PropTypes.string,
		jumpToPreviousMonth: React.PropTypes.func,
		jumpToNextMonth: React.PropTypes.func,
		strings: React.PropTypes.object.isRequired
	},

	render () {
		return (
			<div className="slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4">
				<div className="slds-align-middle">
					<Button icon="utility.left" assistiveText={this.props.strings.PREVIOUS_MONTH} iconStyle="icon-container" onClick={this.props.jumpToPreviousMonth}/>
				</div>
				<h2 id="month" className="slds-align-middle" aria-live="assertive" aria-atomic="true">{this.props.monthName}</h2>
				<div className="slds-align-middle">
					<Button icon="utility.right" assistiveText={this.props.strings.NEXT_MONTH} iconStyle="icon-container" onClick={this.props.jumpToNextMonth}/>
				</div>
			</div>
		);
	}
});

export default DateMonth;
