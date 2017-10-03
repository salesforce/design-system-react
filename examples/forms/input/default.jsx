import React from 'react';
import Input from '~/components/forms/input'; // `~` is replaced with design-system-react at runtime
import createReactClass from 'create-react-class';

const Example = createReactClass({
	displayName: 'BaseInputExample',

	render () {
		return (
			<section className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
				<div className="slds-col--padded">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">Base Input with visible label</h1>
					<Input
						id="base-id"
						label="My Label"
						placeholder="My placeholder"
					/>
				</div>
				<div className="slds-col--padded">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">Base Input with hidden label (assistive text)</h1>
					<Input
						assistiveText={{ label: 'My label' }}
						id="assistiveLabel-id"
						placeholder="My placeholder"
					/>
				</div>
				<div className="slds-col--padded">
					<h1 className="slds-text-title_caps slds-p-vertical--medium">Base Input with Fixed Text</h1>
					<Input
						id="fixed-text-id"
						fixedTextLeft="$"
						label="Total amount"
						placeholder="Enter amount in USD"
					/>
				</div>
			</section>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
