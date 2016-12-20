import React from 'react';
import Datepicker from '~/components/date-picker';
import Input from '~/components/forms/input';

const Example = React.createClass({
	displayName: 'DatepickerExample',

	render () {
		return (
			<Datepicker
				onDateChange={({ date, formattedDate }) => {
					if (this.props.log) { this.props.log('onDateChange')(date, formattedDate); }
				}}
			>
				<Input value="" />
			</Datepicker>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
