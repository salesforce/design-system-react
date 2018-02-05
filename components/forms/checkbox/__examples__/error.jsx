import React from 'react';
import createReactClass from 'create-react-class';
import IconSettings from '~/components/icon-settings';
import Checkbox from '~/components/forms/checkbox'; // `~` is replaced with design-system-react at runtime

const Example = createReactClass({
	displayName: 'CheckboxExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid--pull-padded slds-grid--vertical-align-center">
					<div className="slds-col--padded">
						<Checkbox
							assistiveText="Error state"
							errorText="This field is required"
							label="Checkbox Label"
						/>
					</div>
					<div className="slds-col--padded">
						<Checkbox
							assistiveText="Indeterminate"
							indeterminate
							label="Indeterminate"
						/>
					</div>
					<div className="slds-col--padded">
						<Checkbox assistiveText="Indeterminate" label="Required" required />
					</div>
					<div className="slds-col--padded">
						<Checkbox assistiveText="Disabled" label="Disabled" disabled />
					</div>
				</div>
			</IconSettings>
		);
	},
});

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
