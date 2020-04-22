import React from 'react';
import IconSettings from '~/components/icon-settings'; // `~` is replaced with design-system-react at runtime
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			counter2value: 10,
			counter3value: 10,
		};
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div>
					<div>
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							1. Simple counter input
						</h1>
						<Input id="counter-input-1" label="My Label" variant="counter" />
					</div>
					<div>
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							2. Controlled counter input
						</h1>
						<Input
							id="counter-input-2"
							label="My Label"
							onChange={(event, data) => {
								this.setState({ counter2value: data.value });
							}}
							value={this.state.counter2value}
							variant="counter"
						/>
					</div>
					<div>
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							3. Controlled counter input with min/max values and custom step
							size
						</h1>
						<Input
							id="counter-input-3"
							label="My Label"
							minValue={2}
							maxValue={30}
							onChange={(event, data) => {
								this.setState({ counter3value: data.value });
							}}
							step={2}
							value={this.state.counter3value}
							variant="counter"
						/>
					</div>
					<div>
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							4. Counter input with floating step size
						</h1>
						<Input
							defaultValue={10.0}
							id="counter-input-4"
							label="My Label"
							step={0.1}
							variant="counter"
						/>
					</div>
					<div>
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							5. Disabled counter input
						</h1>
						<Input
							disabled
							id="counter-input-5"
							label="My Label"
							variant="counter"
							value="10"
						/>
					</div>
					<div>
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							6. Readonly counter input
						</h1>
						<Input
							id="counter-input-6"
							label="My Label"
							readOnly
							variant="counter"
							value="10"
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'CounterInputExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
