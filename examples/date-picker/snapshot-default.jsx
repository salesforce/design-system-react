import React from 'react';
import Datepicker from '~/components/date-picker/date-picker';

const Example = React.createClass({
	displayName: 'DatepickerExample',

	render () {
		return (
			<Datepicker
				id="sample-datepicker"
				isInline
				isOpen
				value={new Date(2014, 6, 23)}
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
