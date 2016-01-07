import React from 'react';
import {Datepicker} from 'design-system-react';

export default React.createClass({
	propTypes: {
		modal: React.PropTypes.bool
	},

	getInitialState () {
		return {
			selection: []
		};
	},

	render () {
		return (
			<Datepicker
				selection={this.state.selection}
				onChange={this.handleDateSelected}
				modalCalendar={this.props.modal}
				multiSelect={true}
				inputLabel="Pick a Date"/>
		);
	},

	handleDateSelected (selection) {
		this.setState({ selection });
	}
});
