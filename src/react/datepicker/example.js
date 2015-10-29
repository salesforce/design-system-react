import React from 'react';
import ReactDOM from 'react-dom';
import Datepicker from './datepicker';

export default function () {
	const DatepickerExample = React.createClass({
		getInitialState () {
			return {
				dateSelected: null
			};
		},

		render () {
			return (
				<Datepicker selectedDate={this.state.dateSelected} onSelectDate={this.handleDateSelected}/>
			);
		},

		handleDateSelected (date) {
			this.setState({
				dateSelected: date
			});
		}
	});

	ReactDOM.render(<DatepickerExample />, document.getElementById('datepicker-react-control'));
}
