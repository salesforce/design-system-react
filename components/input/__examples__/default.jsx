import React from 'react';

import IconSettings from '~/components/icon-settings';
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'BaseInputExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<section className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							Base Input with visible label
						</h1>
						<Input id="base-id" label="My Label" placeholder="My placeholder" />
					</div>
					<div className="slds-col_padded">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							Base Input with hidden label (assistive text)
						</h1>
						<Input
							assistiveText={{ label: 'My label' }}
							id="assistiveLabel-id"
							placeholder="My placeholder"
						/>
					</div>
					<div className="slds-col_padded">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							Base Input with Fixed Text
						</h1>
						<Input
							id="fixed-text-id"
							fixedTextLeft="$"
							label="Total amount"
							placeholder="Enter amount in USD"
						/>
					</div>
				</section>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
