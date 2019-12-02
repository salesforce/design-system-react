/* eslint-disable no-console, react/prop-types */
import React from 'react';
import IconSettings from '~/components/icon-settings';
import TimepickerCombobox from '~/components/timepicker-combobox'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selection: [],
		}
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<TimepickerCombobox
					id="timepicker-combobox"
					events={{
						onSelect: (event, data) => {
							console.log('onSelect ', data);
							this.setState({
								selection: data.selection,
							});
						}
					}}
					stepInMinutes={30}
					selection={this.state.selection}
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'TimepickerExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
