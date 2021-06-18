import React from 'react';

import IconSettings from '~/components/icon-settings';
import Input from '~/components/input'; // `~` is replaced with design-system-react at runtime

class Example extends React.Component {
	static displayName = 'InactiveInputExamples';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<section className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							Disabled Input
						</h1>
						<Input
							id="disabled-input-id"
							label="My Label"
							disabled
							value="Disabled value"
						/>
					</div>
					<div className="slds-col_padded">
						<h1 className="slds-text-title_caps slds-p-vertical_medium">
							ReadOnly Input
						</h1>
						<Input
							id="unique-id-3"
							label="Input Label"
							readOnly
							value="Read Only Value"
						/>
					</div>
				</section>
			</IconSettings>
		);
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
