/* eslint-disable no-console, react/prop-types */
import React from 'react';

import IconSettings from '~/components/icon-settings';
import ColorPicker from '~/components/color-picker';

class Example extends React.Component {
	static displayName = 'ColorPickerExample';

	state = {
		value: '',
		isOpen: false,
	};

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<ColorPicker
					events={{
						onChange: (event, data) => {
							this.setState({ value: data.color });
						},
						onRequestOpen: () => {
							this.setState({ isOpen: true });
						},
						onRequestClose: () => {
							this.setState({ isOpen: false });
						},
					}}
					isOpen={this.state.isOpen}
					labels={{ label: 'Choose Color' }}
					id="default-color-picker"
					value={this.state.value}
				/>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
