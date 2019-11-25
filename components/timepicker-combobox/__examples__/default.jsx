import React from 'react';

import IconSettings from '~/components/icon-settings';
import TimepickerCombobox from '~/components/timepicker-combobox'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'TimepickerExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<TimepickerCombobox
					label="Time"
					stepInMinutes={30}
					onDateChange={(date, inputStr) => {
						console.log('onDateChange ', date, ' inputStr: ', inputStr);
					}}
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
