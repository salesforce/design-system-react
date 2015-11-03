// DATEPICKER CALENDAR - REACT FACADE

// Framework specific
import React from 'react';

const DateInput = React.createClass({

	propTypes: {
		triggerCalendar: React.PropTypes.func,
		selectedDate: React.PropTypes.any
	},

	render () {
		return (
			<div className="slds-form-element">
				<div className="slds-form-element__control">
					<div className="slds-input-has-icon slds-input-has-icon--right">
						<svg
							aria-hidden="true"
							className="slds-input__icon slds-icon-text-default"
							dangerouslySetInnerHTML={{__html: '<use xlink:href="/examples/symbols.svg#event"></use>'}} >
						</svg>
						<input className="slds-input" type="text" placeholder="Pick a Date" label="Date Picker Label" onClick={this.props.triggerCalendar} value={this.props.selectedDate}/>
					</div>
				</div>
			</div>
		);
	}
});

export default DateInput;
