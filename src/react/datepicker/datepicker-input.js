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
		ariaLabel: React.PropTypes.string,
		onChange: React.PropTypes.func.isRequired
	},
	
	componentWillMount () {
		this.setState({
			selectedDate: this.props.selectedDate
		});
	},
	
	componentWillReceiveProps (nextProps) {
		if (nextProps.selectedDate) {
			this.setState({
				selectedDate: nextProps.selectedDate
			});
		}
	},

	render () {
		return (
			<div className="slds-form-element">
				<div className="slds-form-element__control">
					<div className="slds-input-has-icon slds-input-has-icon--right">
						<Svg className="slds-input__icon slds-icon-text-default" icon="utility.event" />
						<input className="slds-input" type="text" placeholder={this.props.strings.DATE_FORMAT} aria-label={this.props.ariaLabel} value={this.state.selectedDate} onChange={this.handleChange} onKeyPress={this.handleKeyPress} onBlur={this.callOnChange} />
					</div>
				</div>
			</div>
		);
	},
	
	handleChange (event) {
		this.setState({
			selectedDate: event.target.value
		});
	},
	
	handleKeyPress (e) {
		if (e.key === 'Enter') {
			this.callOnChange();
		}
	},
	
	callOnChange () {
		if (this.state.selectedDate !== this.props.selectedDate) {
			this.props.onChange(this.state.selectedDate);
		}
	}
});

export default DateInput;
