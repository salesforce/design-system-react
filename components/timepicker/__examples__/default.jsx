import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import TimePicker from '~/components/timepicker'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'TimePickerExample',

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<TimePicker
					placeholder="Select a time"
					stepInMinutes={30}
					onChange={(inputStr) => {
						console.log('user callback: onChange ', ' inputStr: ', inputStr);
					}}
					onSelect={(date, inputStr) => {
						console.log(
							'user callback: onSelect ',
							date,
							' inputStr: ',
							inputStr
						);
					}}
					onRequestRemoveSelectedOption={(date) => {
						console.log(
							'user callback: onRequestRemoveSelectedOption ',
							date,
						);
					}}
				/>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
