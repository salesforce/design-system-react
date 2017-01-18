import React, { PropTypes } from 'react';
import Datepicker from '~/components/date-picker';

const Example = React.createClass({
	displayName: 'DatepickerExample',
	propTypes: {
		log: PropTypes.func
	},

	render () {
		return (
			<Datepicker
				onChange={(event, data) => {
					if (this.props.log) {
						this.props.log('onChange')(
						data.date,
						data.formattedDate,
						data.localOffset);
					}
				}}
				onCalendarFocus={(event, data) => {
					if (this.props.log) { this.props.log('onCalendarFocus')(event, data.date); }
				}}
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
