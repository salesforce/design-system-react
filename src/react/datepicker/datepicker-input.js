// DATEPICKER CALENDAR - REACT FACADE

// Framework specific
import React from 'react';
import Svg from '../svg/svg';

export const CONTROL = 'datepicker-input';

const DateInput = React.createClass({
	displayName: CONTROL,

	propTypes: {
		selectedDate: React.PropTypes.any,
		strings: React.PropTypes.object.isRequired,
		ariaLabel: React.PropTypes.string
	},

	render () {
		return (
			<div className="slds-form-element">
				<div className="slds-form-element__control">
					<div className="slds-input-has-icon slds-input-has-icon--right">
						<Svg className="slds-input__icon slds-icon-text-default" icon="utility.event" />
						<input className="slds-input" type="text" placeholder={this.props.strings.DATE_FORMAT} aria-label={this.props.ariaLabel} value={this.props.selectedDate}/>
					</div>
				</div>
			</div>
		);
	}
});

export default DateInput;
