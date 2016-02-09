import React          from 'react';
import { Datepicker } from 'design-system-react';

// SAMPLE CONTROL CODE -->

const DatepickerExample = React.createClass({
	propTypes: {
		modal: React.PropTypes.bool
	},

	getInitialState () {
		return {
		};
	},

	render () {
		return (
			<Datepicker
				startDate={this.state.startDate}
				endDate={this.state.endDate}
				onChange={this.handleDateSelected}
				modalCalendar={this.props.modal}
				multiSelect={true}
				inputLabel="Pick a Date"/>
		);
	},

	handleDateSelected (startDate, endDate) {
		this.setState({
			startDate: startDate,
			endDate: endDate
		});
	}
});

// <-- SAMPLE CONTROL CODE

export default DatepickerExample;
