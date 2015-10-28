import React from 'react';
import ReactDOM from 'react-dom';
import Datepicker from './datepicker';

export default function () {
	const DatepickerExample = React.createClass({
		render () {
			return (
				<Datepicker />
			);
		}
	});

	ReactDOM.render(<DatepickerExample />, document.getElementById('datepicker-react-control'));
}
