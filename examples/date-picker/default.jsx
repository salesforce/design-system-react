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
				onChange={(event, data) => {
					if (this.props.log) { this.props.log('onChange')(data.date, data.formattedDate); }
				}}
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
