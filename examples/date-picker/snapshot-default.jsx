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
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
