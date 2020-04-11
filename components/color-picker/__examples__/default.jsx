/* eslint-disable no-console, react/prop-types */
import React from 'react';

import IconSettings from '~/components/icon-settings';
import ColorPicker from '~/components/color-picker';

class Example extends React.Component {
	static displayName = 'ColorPickerExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<ColorPicker
					labels={{ label: 'Choose Color' }}
					id="default-color-picker"
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
