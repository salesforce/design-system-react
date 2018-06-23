import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import TimePicker from '~/components/timepicker'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'TimePickerExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<TimePicker
					placeholder="Select a time"
					stepInMinutes={30}
					onDateChange={(date, inputStr) => {
						console.log('onDateChange ', date, ' inputStr: ', inputStr);
					}}
				/>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
