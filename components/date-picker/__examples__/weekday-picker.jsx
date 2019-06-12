/* eslint-disable no-console, react/prop-types */
import React from 'react';

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
			/>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
