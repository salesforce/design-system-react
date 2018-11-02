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
					<Input
						label="Input label"
						minValue={2}
						maxValue={30}
						onChange={(event, data) => {
							const value = data.value;
							this.setState({ value });
						}}
						step={2}
						value={this.state.value}
						variant="counter"
					/>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'CounterInputExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
