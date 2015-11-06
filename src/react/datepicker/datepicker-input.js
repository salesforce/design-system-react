// DATEPICKER CALENDAR - REACT FACADE

// Framework specific
import React from 'react';
import Svg from '../svg/svg';

const DateInput = React.createClass({

	propTypes: {
		selectedDate: React.PropTypes.any
	},

	render () {
		return (
			<div className="slds-form-element">
				<div className="slds-form-element__control">
					<div className="slds-input-has-icon slds-input-has-icon--right">
						<Svg className="slds-input__icon slds-icon-text-default" icon="utility.event" />
						<input className="slds-input" type="text" placeholder="Pick a Date" label="Date Picker Label" value={this.props.selectedDate}/>
					</div>
				</div>
			</div>
		);
	}
});

export default DateInput;
