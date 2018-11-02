import React from 'react';
import IconSettings from '~/components/icon-settings'; // `~` is replaced with design-system-react at runtime
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 10
		};
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<h1 className="slds-text-title_caps slds-p-vertical_medium">
						Counter Input
					</h1>
					<input
						onChange={(event) => {
							this.setState({ value: event.target.value });
						}}
						type="number"
						step="2"
						value={this.state.value}
					/>
					<Input
						label="Input label"
						minValue={6}
						maxValue={200}
						onChange={(event, val) => {
							const value = val !== undefined ? val : event.target.value;
							console.log('value: ', value);
							this.setState({ value });
						}}
						step={2}
						type="number"
						value={this.state.value}
					/>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'CounterInputExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
