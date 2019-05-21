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
					<h1 className="slds-text-title_caps slds-p-vertical_medium">
						1. Static counter input
					</h1>
					<Input
						isStatic
						id="counter-static-input-1"
						label="My Label"
						variant="counter"
						value="10"
					/>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'CounterStaticInputExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
