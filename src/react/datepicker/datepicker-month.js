// DATEPICKER MONTH - REACT FACADE

// Framework specific
import React from 'react';

const DateMonth = React.createClass({

	propTypes: {
		monthName: React.PropTypes.func,
		setViewingDate: React.PropTypes.func,
		dateViewing: React.PropTypes.date
	},

	render () {
		return (
			<div className="slds-datepicker__filter--month slds-grid slds-grid--align-spread slds-size--3-of-4">
				<div className="slds-align-middle">
					<button className="slds-button slds-button--icon-container" onClick={this.backMonth}>
						<svg
							aria-hidden="true"
							className="slds-button__icon slds-button__icon--small"
							dangerouslySetInnerHTML={{__html: '<use xlink:href="/examples/symbols.svg#left"></use>'}} >
						</svg>
						<span className="slds-assistive-text">Previous Month</span>
					</button>
				</div>
				<h2 id="month" className="slds-align-middle" aria-live="assertive" aria-atomic="true">{this.props.monthName}</h2>
				<div className="slds-align-middle">
					<button className="slds-button slds-button--icon-container" onClick={this.forwardMonth}>
						<svg
							aria-hidden="true"
							className="slds-button__icon slds-button__icon--small"
							dangerouslySetInnerHTML={{__html: '<use xlink:href="/examples/symbols.svg#right"></use>'}} >
						</svg>
						<span className="slds-assistive-text">Next Month</span>
					</button>
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
