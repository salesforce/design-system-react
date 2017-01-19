import React from 'react';
import Datepicker from '~/components/date-picker';

const Example = React.createClass({
	displayName: 'DatepickerExample',

	render () {
		return (
			<Datepicker
				isIsoWeekday
				onDateChange={({ date, formattedDate }) => {
					if (this.props.log) { this.props.log('onDateChange')(date, formattedDate); }
				}}
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
