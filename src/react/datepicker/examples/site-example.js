import React from 'react';
import {Datepicker} from '../../dist';

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
				onChanged={this.handleDateSelected}
				modalCalendar={this.props.modal}
				multiSelect={true}
				inputLabel="Pick a Date"/>
		);
	},

	handleDateSelected (item, selection) {
		if (selection.length > 2) {
			this.setState({ selection: item });
		} else {
			this.setState({ selection: selection });
		}
	}
});
