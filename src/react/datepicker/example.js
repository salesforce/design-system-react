import React from 'react';
import ReactDOM from 'react-dom';
import Datepicker from './datepicker';

export default function () {
	const DatepickerExample = React.createClass({
		getInitialState () {
			return {
				selection: []
			};
		},

		render () {
			return (
				<Datepicker selection={this.state.selection} onChanged={this.handleDateSelected} multiSelect={true}/>
			);
		},

		handleDateSelected (item, selection) {
			if (selection.length > 2) {
				this.setState({ selection: [item] });
			} else {
				this.setState({ selection: selection });
			}
		}
	});

	ReactDOM.render(<DatepickerExample />, document.getElementById('datepicker-react-control'));
}
