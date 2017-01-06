import React, { PropTypes } from 'react';
import Datepicker from '~/components/date-picker/date-picker';

const Example = React.createClass({
	displayName: 'DatepickerExample',
	propTypes: {
		log: PropTypes.func
	},

	render () {
		return (
			<Datepicker
				id="sample-datepicker"
				isInline
				isOpen
				onDateChange={(event, data) => {
					if (this.props.log) { this.props.log('onDateChange')(data.date, data.formattedDate); }
				}}
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
