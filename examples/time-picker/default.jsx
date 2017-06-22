import React from 'react';
import Timepicker from '~/components/time-picker'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'TabsExample',
	
	render () {
		return (
			<Timepicker
				placeholder="Select a time"
				stepInMinutes={30}
				onDateChange={(date, inputStr) => {
					console.log('onDateChange ', date, ' inputStr: ', inputStr);
				}}
			/>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
