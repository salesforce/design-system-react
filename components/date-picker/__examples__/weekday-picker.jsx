/* eslint-disable no-console, react/prop-types */
import React from 'react';
import moment from 'moment';

import Datepicker from '~/components/date-picker';

class Example extends React.Component {
	static displayName = 'DatepickerExample';

	render() {
		return (
			<Datepicker
				labels={{
					label: 'Date',
				}}
				dateDisabled={({ date }) => date.getDay() > 5 || date.getDay() < 1}
				formatter={(date) => {
					return date ? moment(date).format('M/D/YYYY') : '';
				}}
				parser={(dateString) => {
					return moment(dateString, 'MM-DD-YYYY').toDate();
				}}
			/>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
