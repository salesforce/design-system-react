import React from 'react';

// `~` is replaced with design-system-react at runtime
import Checkbox from '~/components/checkbox';

class Example extends React.Component {
	render() {
		return (
			<div>
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Toggle',
							}}
							id="checkbox-toggle-example"
							variant="toggle"
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Toggle',
							}}
							id="checkbox-toggle-example--error"
							errorText="This field has an error"
							variant="toggle"
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Toggle (disabled)',
							}}
							id="checkbox-toggle-example--disabled"
							variant="toggle"
							disabled
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Toggle (required)',
							}}
							id="checkbox-toggle-example--required"
							variant="toggle"
							required
						/>
					</div>
				</div>
				<div className="slds-grid slds-grid_pull-padded slds-grid_vertical-align-center">
					<div className="slds-col_padded">
						<Checkbox
							assistiveText={{
								label: 'Toggle (with assistive text)',
							}}
							id="checkbox-toggle-example--assitive-text"
							variant="toggle"
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							labels={{
								label: 'Toggle (checked)',
							}}
							id="checkbox-toggle-example--checked"
							variant="toggle"
							checked
						/>
					</div>
					<div className="slds-col_padded">
						<Checkbox
							id="checkbox-toggle-example--checked-disabled"
							labels={{
								label: 'Toggle (checked + disabled)',
							}}
							variant="toggle"
							checked
							disabled
						/>
					</div>
				</div>
			</div>
		);
	}
}

Example.displayName = 'CheckboxExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
