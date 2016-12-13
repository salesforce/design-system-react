import React from 'react';
import Datepicker from '~/components/date-picker';

const Example = React.createClass({
	displayName: 'DatepickerExample',

	render () {
		return (
			<Datepicker
				onDateChange={function (date) {
					console.log('>>> onDateChange ', date);
				}}
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
