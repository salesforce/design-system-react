import React from 'react';
// `~` is replaced with design-system-react at runtime
import IconSettings from '~/components/icon-settings';
import Checkbox from '~/components/checkbox';

class Example extends React.Component {
	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Checkbox
							assistiveText={{ label: 'Error state' }}
							errorText="This field is required"
							id="checkbox-error-example"
							labels={{
								label: 'Checkbox label',
							}}
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							assistiveText={{
								label: 'Indeterminate',
							}}
							id="checkbox-indeterminate-example"
							indeterminate
							labels={{
								label: 'Indeterminate',
							}}
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							assistiveText={{ label: 'Indeterminate' }}
							id="checkbox-indeterminate-required-example"
							labels={{
								label: 'Required',
							}}
							required
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							assistiveText={{ label: 'Disabled' }}
							id="checkbox-disabled-example"
							labels={{
								label: 'Disabled',
							}}
							disabled
						/>
					</div>
				</div>
			</IconSettings>
		);
	}
}

Example.displayName = 'CheckboxExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
