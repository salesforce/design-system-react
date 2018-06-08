import React from 'react';
// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import Checkbox from '~/components/checkbox';

class Example extends React.Component {
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
							assistiveText={{
								label: 'Indeterminate',
							}}
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
	}
}

Example.displayName = 'CheckboxExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
